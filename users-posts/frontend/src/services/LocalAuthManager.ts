const JWT_KEY = "jwt"

const setToken = (token: string): void => {
  localStorage.setItem(JWT_KEY, token)
}

const localAuthManager = () => {
  return { setToken }
}


export default localAuthManager;