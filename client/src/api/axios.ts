export {}
// import * as React from 'react'
// import axios, { AxiosRequestConfig } from 'axios'
//
// const BASE_URL = 'http://localhost:3333'
//
// export const axiosPublic = axios.create({
//   baseURL: BASE_URL,
// })
//
// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// })
//
// const useRefreshToken = () => {
//   const { setAccessToken } = useAuth()
//
//   const refresh = async () => {
//     const response = await axiosPublic.post('/auth/refresh', {
//       withCredentials: true,
//     })
//     // setAuth(prev => {
//     //   console.log(JSON.stringify(prev))
//     //   console.log(response.data.accessToken)
//     //   return { ...prev, accessToken: response.data.accessToken }
//     // })
//     setAccessToken(response.data.access_token)
//
//     return response.data.accessToken
//   }
//   return refresh
// }
//
// export default useRefreshToken
//
// export const useAxiosPrivate = () => {
//   const refresh = useRefreshToken()
//   const auth = useAuth()
//
//   React.useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptors.request.use(
//       (config: AxiosRequestConfig) => {
//         console.log(config)
//         // @ts-ignore
//         if (!config.headers['Authorization']) {
//           // @ts-ignore
//           config.headers['Authorization'] = `Bearer ${auth.accessToken}`
//         }
//         return config
//       },
//       error => Promise.reject(error),
//     )
//
//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       response => response,
//       async error => {
//         const prevRequest = error?.config
//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           prevRequest.sent = true
//           const newAccessToken = await refresh()
//           prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
//           return axiosPrivate(prevRequest)
//         }
//         return Promise.reject(error)
//       },
//     )
//
//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept)
//       axiosPrivate.interceptors.response.eject(responseIntercept)
//     }
//   }, [auth, refresh])
//
//   return axiosPrivate
// }
