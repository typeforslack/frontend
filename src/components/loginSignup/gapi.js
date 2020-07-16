import { gapi } from 'gapi-script'

export default function authenticate() {
  var auth2 = gapi.auth2.init()
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id:
        '580794985194-gjre1am52q072bhig904440e5fsd7r5b.apps.googleusercontent.com',
      fetch_basic_profile: false,
      scope: 'profile',
    })

    // Sign the user in, and then retrieve their ID.
    auth2.signIn().then(function () {
      console.log(auth2.currentUser.get().getId())
    })
  })
}
