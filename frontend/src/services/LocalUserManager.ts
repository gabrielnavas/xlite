import remoteUser from "./RemoteUser"

const USER = 'user' 

type User = {
  username: string
  email: string
  fullName: string
  createdAt: Date
}

const getUserLogged = async (): Promise<User> => {
  const user = localStorage.getItem(USER)
  if(!user) {
    const result =  await remoteUser().getUserLogged()
    if(!result.success) {
      throw new Error(result.message)
    }
    if(!result.body) {
      throw new Error("try again later")
    }
    localStorage.setItem(USER, JSON.stringify(result.body))
    return result.body
  }

  return JSON.parse(user) as User;
}

const localUserManager = () => {
  return { getUserLogged }
}

export default localUserManager;