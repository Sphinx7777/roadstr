import { normalize, Schema, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { fork, put, call, select } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import { entityRequest, setQueryAC, getMessageAC } from './action';
import { CRUD, METHOD } from './common';
import { fromJS } from 'immutable';


class Entity {
  public static mSagas: any[] = [];
  public mSchema: Schema;
  public mEntityName: string;
  static token: string;
  public static mContext: any;

  constructor(name: string = 'entity', definitions: any = {}, options: any = {}) {
    this.mEntityName = name;
    this.mSchema = name && [new schema.Entity(name, definitions, options)]
  }

  protected API_URL = '​ https://dev.roadstr.io/api/';

  static addSaga(sagas: any[]) {
    for (let func of sagas) {
      Entity.mSagas.push(fork(func));
    }
  }

  public get context() {
    return Entity.mContext;
  }

  public get entityName() {
    return this.mEntityName;
  }

  public xFetch = async (uri: string, method: METHOD, data?: any, token?: string) => {
    const url = this.API_URL + uri;
    console.log('url', url, 'method', method, 'data', JSON.stringify({ ...data }))
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch('https://dev.roadstr.io/api/v11/auth/nextjs', {
      method,
      headers,
      body: data ? JSON.stringify({ ...data }) : null,
    })
      .then((res: any) => {
        console.log('res', res)
        return res.json()
      })
      .then((res: any) => {
        if (!res) {
          return Promise.reject({
            success: false,
            message: "Error #1",
            data: null,
          })
        }
        return Promise.resolve(res);
      })
      .catch((err: any) => {
        console.log(err);
        return Promise.reject({
          success: false,
          message: err.message,
          data: null,
        })
      });
  }

  private getAction(crud: any = null) {
    let action = entityRequest(this)[CRUD.READ];
    switch (crud) {
      case CRUD.CREATE:
        action = entityRequest(this)[CRUD.CREATE];
        break;
      case CRUD.UPDATE:
        action = entityRequest(this)[CRUD.UPDATE];
        break;
      case CRUD.DELETE:
        action = entityRequest(this)[CRUD.DELETE];
        break;
      default:
      case CRUD.READ:
        break;
    }
    return action;
  }

  protected * actionRequest(uri: string, crud: CRUD, method: METHOD, data?: any) {
    const action = this.getAction(crud);
    yield put(action.request(data));
    const token = yield select((state: any) => state.auth && state.auth.get('token'));
    let query = yield select((state: any) => {
      return state.queries
    });
    if (!query || query.length <= 0 || Object.getOwnPropertyNames(query).length === 0) {
      query = yield call(this.xFetch, uri, method, data, token);
    }
    const { result, entities: response } = normalize(camelizeKeys(JSON.parse(JSON.stringify(query.data))), this.mSchema);
    if (response) {
     if(query.pager){
      response.pager = query.pager
      response.result = result
     }
      yield put(action.success(data, response));
      const message = query && query.message ? query.message : null
      const success = query && query.success ? query.success : null
      if (message) {
        yield put(getMessageAC({ payload: { message, success } }));
      }
    } else {
      yield put(action.failure(data, result));
      const message = query && query.message ? query.message : null
      const success = query && query.success ? query.success : null
      yield put(getMessageAC({ payload: { message, success } }));
    }
    yield put(setQueryAC({ query: null }));
    return { response, result };
  }

  public xSave = (uri: string, data: any = {}) => {
    return this.actionRequest(uri, CRUD.CREATE, METHOD.POST, data);
  }

  public xUpdate = (uri: string, data: any = {}) => {
    return this.actionRequest(uri, CRUD.UPDATE, METHOD.POST, data);
  }

  public xRead = (uri: string, data: any = {}) => {
    return this.actionRequest(uri, CRUD.READ, METHOD.GET);
  }

  public xDelete = (uri: string, data: any = {}) => {
    return this.actionRequest(uri, CRUD.DELETE, METHOD.DELETE, data);
  }

  public static fetch(uri: string, data?: any, token?: string) {
    return new Entity().fetch(uri, data, token);
  }

  public async fetch(uri: string, data?: any, token?: string) {
    let query: any = await this.xFetch(uri, METHOD.POST, data, token);
    console.log('query', query, 'uri', uri)
    let action = this.getAction(CRUD.READ);
    this.context.dispatch(action.request(data));

    if (query) {
      this.context.dispatch(action.success(data, query.data));
      const message = query && query.message ? query.message : null
      const success = query && query.success ? query.success : null
      message && this.context.dispatch(getMessageAC({ payload: { message, success } }));
      
    } else {
      this.context.dispatch(action.failure(data, { error: "Error" }));
    }
    return query;
  }
}

export default Entity




