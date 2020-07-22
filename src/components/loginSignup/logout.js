import { removeAuthToken } from '../../helpers/storage'
// import { gapi } from 'gapi-script'
import { logout } from '../../helpers/api'

import { navigate } from '@reach/router'

export default async function Logout() {
  navigate('/login')
  try {
    const response = await logout()
    console.log(response)
    removeAuthToken()
  } catch (e) {
    console.log('error')
  }
}
