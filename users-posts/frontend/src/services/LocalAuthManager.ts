const JWT_KEY = "jwt"

const setToken = (token: string): void => {
  localStorage.setItem(JWT_KEY, token)
}

const getToken = (): string => {
  const token = localStorage.getItem(JWT_KEY)
  if (token == null) {
    throw new Error("missing token");
  }
  return token
}

const logout = () => {
  localStorage.clear();
}

const localAuthManager = () => {
  return { setToken, logout, getToken }
}


export default localAuthManager;