import { take, put, call } from 'redux-saga/effects';
import Entity from '../../others/utilities/entity';
import { schema } from 'normalizr';
import {
  setAuthUserAC,
  SET_REGISTRATION,
  SET_LOGOUT_USER,
  SET_IDENTITY,
  GET_USERS,
  DELL_USER,
  GET_MESSAGE,
  setMessageAC,
  dellMessageAC
} from '../../others/utilities/action';


class UserSagas extends Entity {
  constructor() {
    super('authUser', {
      id: new schema.Entity('authUser'),
      users: new schema.Entity('authUser')
    });

    Entity.addSaga([
      this.setRegisteredUser.bind(this),
      // this.setIdentity.bind(this),
      // this.setLogout.bind(this),
      // this.getUsers.bind(this),
      // this.dellUser.bind(this),
      // this.messagesControl.bind(this)
    ])
  }

  public * setRegisteredUser() {
    while (true) {
      const data = yield take(SET_REGISTRATION)
      
      const { email, password } = data
      const  response  = yield call(Entity.fetch, `v11/auth/${email}`, { password })
      console.log('SAGA_data',email, password, 'response', response)
      
    }
  }
  // public * getUsers() {
  //   while (true) {
  //     yield take(GET_USERS)
  //     yield call(this.xRead, `${this.uri}/getUsers`)
  //   }
  // }

  // public * dellUser() {
  //   while (true) {
  //     const data = yield take(DELL_USER)
  //     yield call(this.xDelete, `${this.uri}/dellUser`, data)
  //   }
  // }

  // public * setLogout() {
  //   while (true) {
  //     const data = yield take(SET_LOGOUT_USER)
  //     const response = yield call(Entity.fetch, `${this.uri}/logout`, data.data)
  //     yield put(setAuthUserAC({ authUser: response.data }))
  //     document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  //    }
  // }


  // public * setIdentity() {
  //   while (true) {
  //     const data = yield take(SET_IDENTITY)
  //     yield put(setAuthUserAC({ authUser: data.authUser }))
  //   }
  // }

  // public * messagesControl() {
  //   while (true) {
  //     const message = yield take(GET_MESSAGE)
  //     const response = yield put(setMessageAC({ payload: message.payload }))
  //     response && setTimeout(() => this.context.dispatch(dellMessageAC()), 5000)
  //   }
  // }
}


export default new UserSagas;

