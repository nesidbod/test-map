import IAction from '../../models/IAction'
export const LOGGING_IN = 'LOGGING_IN'

export const login = (email: string, name: string): IAction => ({
  payload: { email, name },
  type: LOGGING_IN
})
