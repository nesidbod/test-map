import initialState from '../../models/auth/authInitialState'
import IAuthState from '../../models/auth/IAuthState'
import Action from '../../models/IAction'
import {
  LOGGING_IN,
} from '../actions/authActions'

export default function auth(
  state = initialState,
  { type, payload }: Action
): IAuthState {
  switch (type) {
    case LOGGING_IN:
      return { ...state, isAuthenticated: true, user: { name: payload.name, email: payload.email } }
    default:
      return state
  }
}
