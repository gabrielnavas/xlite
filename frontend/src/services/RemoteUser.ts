import localAuthManager from "./LocalAuthManager"

type User = {
  username: string
  email: string
  fullName: string
  createdAt: Date
  avatarUrl: string
}

type UserFromResponse = {
  username: string
  email: string
  full_name: string
  created_at: string
}

type UserResponse<T> = {
  body?: T,
  message: string
  success: boolean
}

const getUserLogged = async (): Promise<UserResponse<User>> => {
  const token = localAuthManager().getToken(); 

  const url = `${import.meta.env.VITE_ENDPOINT_API}/users/logged`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  if (!response.ok) {
    return {
      message: 'try again later',
      success: false,
    }
  }

  const data = await response.json() as UserFromResponse

  return {
    message: 'user found',
    success: true,
    body: {
      username: data.username,
      email: data.email,
      createdAt: new Date(data.created_at),
      fullName: data.full_name,
      avatarUrl: "https://pbs.twimg.com/profile_images/1743633889216630784/j6WRSKS4_400x400.jpg"
    },
  }
}

const remoteUser = () => {
  return { getUserLogged }
}

export default remoteUser