import axios from 'axios'
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
  const getToken = localStorage.getItem('token')
  return axios.get(`${baseUrl}/para `, {
    headers: {
      Authorization: `token ${getToken}`,
    },
  })
}

export function logout() {
  const getToken = localStorage.getItem('token')
  return axios.get(`${baseUrl}/logout `, {
    headers: {
      Authorization: `token ${getToken}`,
    },
  })
}

export function userlog() {
  const getToken = localStorage.getItem('token')
  return axios.get(`${baseUrl}/userlog `, {
    headers: {
      Authorization: `token ${getToken}`,
    },
  })
}
