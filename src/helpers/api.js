import axios from 'axios'
const baseUrl = 'https://typeforslack.herokuapp.com'

export async function login(obj) {
  console.log(obj)
  return await axios.post(`${baseUrl}/api-token-auth/ `, obj)
  // .then(function (response) {
  //   console.log(response)
  //   const res = response
  //   console.log(res.json())
  //   return (res)
  // })
  // .catch(function (error) {
  //   const errorstatus = error.response

  //   return (errorstatus)

  // })
}

export function signup(obj) {
  console.log(obj)
  return axios.post(`${baseUrl}/register `, obj)
  // .then(function (response) {
  //   console.log(response)
  //   const res = response
  //   return (res)
  // })
  // .catch(function (error) {
  //   console.log("check")
  //   return (error)
  // })
}
