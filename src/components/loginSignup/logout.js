import { removeAuthToken } from '../../helpers/storage'
// import { gapi } from 'gapi-script'

import { navigate } from '@reach/router'

export default function Logout() {
  removeAuthToken()
  navigate('/login')
  // var auth2 = gapi.auth2.getAuthInstance()
  // auth2.signOut().then(function () {
  //     console.log('User signed out.')
  // })
}
