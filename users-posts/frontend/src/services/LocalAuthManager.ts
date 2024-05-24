const JWT_KEY = "jwt" 

const setToken = (token: string): void => {
  localStorage.setItem(JWT_KEY, token)
}

const logout = () => {
  localStorage.clear();
}

const localAuthManager = () => {
  return { setToken, logout }
}


export default localAuthManager;