const AUTH_KEY = 'type_for_slack__token'

export function setAuthToken(token) {
  localStorage.setItem(AUTH_KEY, token)
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_KEY)
}
