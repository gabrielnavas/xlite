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

const isAuth = (): boolean => {
  const token = localStorage.getItem(JWT_KEY)
  return token !== null;
}

const localAuthManager = () => {
  return { setToken, logout, getToken, isAuth }
}


export default localAuthManager;