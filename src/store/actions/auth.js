import axios from 'axios';

import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkOutTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = isSignup
      ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDAytZ8eTMjtwVn8ZPf0lBR9b9EI-J5vTI'
      : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDAytZ8eTMjtwVn8ZPf0lBR9b9EI-J5vTI';

    axios.post(
      url,
      authData)
    .then(response => {
      console.log(response)
      const expirationDate = new Date(new Date().getTime() + (Number(response.data.expiresIn) + 1000))
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId)
      dispatch(authSuccess(response.data.idToken, response.data.localId))
      dispatch(checkOutTimeout(response.data.expiresIn))
    })
    .catch(error => {
      console.log(error)
      dispatch(authFail(error.response.data.error));
    });

  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }

}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const token = localStorage.getItem('token')
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        debugger
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkOutTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ))
      }
    }
  }
}
