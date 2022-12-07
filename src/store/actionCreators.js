import { Dispatch } from "@reduxjs/toolkit"
import api from "../auth/api"
import { loginStart, loginSucess, loginFailure, logoutSuccess,loadProfileStart, loadProfileFailure, loadProfileSucess } from "./reducers/authReducer"
import { history } from '../auth/utils/history'
import { store } from "../auth/store"
import { AxiosPromise } from "axios"
import { isTokenExpired } from "../auth/utils/jwt"

export const loginUser =
  (data) =>
    async (dispatch) => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)

        dispatch(loginSucess(res.data.accessToken))
        dispatch(getProfile())
        
      } catch (e) {
        console.error(e)

        dispatch(loginFailure(e.message))
      }
    }

export const logoutUser =
  () =>
  async (dispatch) => {
      try {
        await api.auth.logout()

        dispatch(logoutSuccess())

        history.push('/')
      } catch (e) {
          console.error(e)
      }
  }

export const getProfile = () =>
  async (dispatch) => {
    try {
      dispatch(loadProfileStart())

      const res = await api.auth.getProfile()

      dispatch(loadProfileSucess(res.data))
    } catch (e) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }

// переменная для хранения запроса токена (для избежания race condition)
let refreshTokenRequest = null

export const getAccessToken =
    () =>
    async (dispatch) => {
        try {
            const accessToken = store.getState().auth.authData.accessToken

            if (!accessToken || isTokenExpired(accessToken)) {
              if (refreshTokenRequest === null) {
                  refreshTokenRequest = api.auth.refreshToken()
              }

              const res = await refreshTokenRequest
              refreshTokenRequest = null

              dispatch(loginSucess(res.data.accessToken))

              return res.data.accessToken
            }
            
            return accessToken
        } catch (e) {
            console.error(e)

            return null
        }
    }