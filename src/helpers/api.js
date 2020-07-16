import axios from 'axios'
import { getAuthToken } from './storage'
const baseUrl = 'https://typeforslack.herokuapp.com'

export async function login(obj) {
  return await axios.post(`${baseUrl}/api-token-auth/ `, obj)
}

export function id_token(id) {
  return axios.post(`${baseUrl}/userId/ `, id)
}

export function signup(obj) {
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

export function getUserlog() {
  return axios.get(`${baseUrl}/userlog `, {
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
  })
}

export function postUserlog(data) {
  return axios.post(`${baseUrl}/userlog`, data, {
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
  })
}
