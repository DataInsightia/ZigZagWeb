import API from '../api'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
const LOAD_USER_FAIL = 'LOAD_USER_FAIL'
const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS'
const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL'
const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
const REFRESH_FAIL = 'REFRESH_FAIL'
const SET_AUTH_LOADING = 'SET_AUTH_LOADING'
const REMOVE_AUTH_LOADING = 'REMOVE_AUTH_LOADING'

export const load_user = () => async (dispatch) => {
  try {
    const res = await fetch(`${API}/api/user/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })

    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    })
  }
}

export const check_auth_status = () => async (dispatch) => {
  const access = localStorage.getItem('access')
  const body = JSON.stringify({
    token: access,
  })

  try {
    const res = await fetch(`${API}/api/token/verify/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      })
      dispatch(load_user())
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    })
  }
}

export const request_refresh = () => async (dispatch) => {
  const refresh = localStorage.getItem('refresh')
  const body = JSON.stringify({
    refresh,
  })

  try {
    const res = await fetch(`${API}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      })
      dispatch(check_auth_status())
    } else {
      dispatch({
        type: REFRESH_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    })
  }
}

export const login_auth = (cust_id, password) => async (dispatch) => {
  const body = JSON.stringify({
    cust_id,
    password,
  })

  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch(`${API}/api/customer_login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await res.json()

    if (data.status == true) {
      const login_id = data.user.login_id
      const pay = JSON.stringify({
        login_id,
        password,
      })
      const resp = await fetch(`${API}/api/token/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: pay,
      })

      const datas = await resp.json()
      localStorage.setItem('access', datas.access)
      localStorage.setItem('refresh', datas.refresh)
    }

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      })
      dispatch(load_user())
    } else {
      dispatch({
        type: LOGIN_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

export const logout = () => async (dispatch) => {
  try {
    if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
      localStorage.setItem('access', '')
      localStorage.setItem('refresh', '')

      dispatch({
        type: LOGOUT_SUCCESS,
      })
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    })
  }
}
