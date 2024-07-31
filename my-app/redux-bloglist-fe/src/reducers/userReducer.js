import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    loginUser: (state, action) => {
      return action.payload
    },
    logoutUser: (state, action) => {
      return null
    }
  }
})

export const { setUser, loginUser, logoutUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginAUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      dispatch(setNotification(`${user.username} logged in`, 5))
    }
    catch (error) {
      dispatch(setNotification('Wrong credentials -- try again', 5))
    }
  }
}

export const logoutTheUser = () => {
  console.log('at logout')
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      dispatch(logoutUser())
      dispatch(setNotification('logout successful', 5))
    }
    catch (error) {
      dispatch(setNotification(`Unsuccessful logout ${error.message}`, 5))
    }
  }
}

export default userSlice.reducer