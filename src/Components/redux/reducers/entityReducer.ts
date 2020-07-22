import { combineReducers } from 'redux';
import { fromJS} from 'immutable';
import { CRUD } from '../../others/utilities/common';
import { reducer as form } from 'redux-form'
import { SET_QUERY, SET_AUTH_USER, SET_MESSAGE, DELL_MESSAGE } from '../../others/utilities/action';



const initialState = fromJS({
  users: {}
});

const entities = (state = initialState, action: any) => {
  if (action.response && action.glob && action.glob.crud && action.glob.entity.mEntityName) {
    const entityName = action.glob.entity.mEntityName
    switch (action.glob.crud) {
      case CRUD.READ:
        return state.mergeDeep(fromJS(action.response));
      case CRUD.CREATE:
        return state.mergeDeep(fromJS(action.response));
      case CRUD.UPDATE:
        if (action.response && action.response.entities) {
          const { response: { entities } } = action;
          if (entities) {
              Object.keys(entities).map((entityName) => {
                  let list = state.get(entityName);
                  if (list && list.size > 0) {
                      Object.keys(entities[entityName]).map((id) => list = list.remove(id));
                  }
                  state = state.set(entityName, list);
              });
              state = state.mergeDeep(fromJS(entities));
          }
      }
        return state
      case CRUD.DELETE:
      let list = state.get(entityName);
          if (list) {
              list = list.remove(action.data.id);
              state = state.set(entityName, list);
          }
          return state
      default:
        return state;
    }
  }
  return state;
}

const authUserInitialState = fromJS({
});

const auth = (state = authUserInitialState, action: any) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return state.mergeDeep(fromJS(action.authUser));
    default:
      return state;
  }
}

const queryInitialState: any = null;

const queries = (state = queryInitialState, action: any) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return state;
  }
}

const messagesInitialState: any = [];

const messages = (state = messagesInitialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGE: {
      return [...state, action.payload]
    }

    case DELL_MESSAGE:
      state.splice(0, 1)
      return [...state]
    default:
      return state;
  }
}





export default combineReducers({ entities, queries, auth, messages, form});