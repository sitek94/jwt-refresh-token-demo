import axios from 'axios'

import { env } from 'config/env'

export const authAxios = axios.create({
  baseURL: `${env.apiUrl}/auth`,
})
