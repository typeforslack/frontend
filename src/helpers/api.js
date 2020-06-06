import axios from 'axios'
import { getAuthToken } from './storage'
const baseUrl = 'https://typeforslack.herokuapp.com'

export async function login(obj) {
  console.log(obj)
  return await axios.post(`${baseUrl}/api-token-auth/ `, obj)
}

export function signup(obj) {
  console.log(obj)
  return axios.post(`${baseUrl}/register `, obj)
}

export function fetchPara() {
  return axios.get(`${baseUrl}/para `, {
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
  })
}

export function logout() {
  return axios.get(`${baseUrl}/logout `, {
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
  })
}

export function userlog() {
  return axios.get(`${baseUrl}/userlog `, {
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
  })
}
