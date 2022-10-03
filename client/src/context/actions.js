export const loginStart = (userCredentials) => ({
  type: 'LOGIN_START',
})

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCESS',
  payload: user,
})

export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
})

export const logOut = () => ({
  type: 'LOGOUT',
})

export const updateStart = (userCredentials) => ({
  type: 'UPDATE_START',
})

export const updateSuccess = (user) => ({
  type: 'UPDATE_SUCESS',
  payload: user,
})

export const updateFailure = () => ({
  type: 'UPDATE_FAILURE',
})
