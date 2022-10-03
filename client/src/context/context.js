import React, { useEffect, createContext, useReducer, useContext } from 'react'
import Reducer from './reducers'
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
}

export const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  })

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
