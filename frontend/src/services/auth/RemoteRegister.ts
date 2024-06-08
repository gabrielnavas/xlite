import { AuthResponse, BodyResponse } from "./types";

const possivelBadRequestsMessages = ['user already exists with email', 'user already exists with username']

const formatMessage = (message: string) => {
  const firstLetterUppercase = message[0].toLocaleUpperCase();
  const restMessage = message.substring(1, message.length);
  const messageFormatted = `${firstLetterUppercase}${restMessage}.`;
  return messageFormatted;
}

const remoteRegister = async (fullName: string, username: string, email: string, password: string, passwordConfirmation: string): Promise<AuthResponse> => {
  const body = {
    full_name: fullName,
    username: username,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation
  }

  const url = `${import.meta.env.VITE_ENDPOINT_API}/auth/register`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const data = await response.json();
    if (data.message) {
      const isRecognizableMessage = possivelBadRequestsMessages.some(message => message === data.message)
      if (isRecognizableMessage) {
        return {
          message: formatMessage(data.message),
          success: false
        }
      }
    }
    return {
      message: 'try again later',
      success: false,
    }
  }

  const data = await response.json() as BodyResponse
  return {
    message: 'Register with success',
    success: true,
    body: {
      token: data.token,
      user: {
        createdAt: data.user.created_at,
        email: data.user.email,
        fullName: data.user.full_name,
        roles: data.user.roles,
        username: data.user.username
      }
    },
  }
}

export default remoteRegister;