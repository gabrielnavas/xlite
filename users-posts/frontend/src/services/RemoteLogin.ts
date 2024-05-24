type RegisterResponse = {
  message: string;
  success: boolean
  body?: { token: string }
};

const possivelBadRequestsMessages = ['email or password is incorrect',]

const formatMessage = (message: string) => {
  const firstLetterUppercase = message[0].toLocaleUpperCase();
  const restMessage = message.substring(1, message.length);
  const messageFormatted = `${firstLetterUppercase}${restMessage}.`;
  return messageFormatted;
}

const remoteLogin = async (email: string, password: string): Promise<RegisterResponse> => {
  const body = {
    email: email,
    password: password,
  }

  const url = `${import.meta.env.VITE_ENDPOINT_API}/auth/login`
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

  const data = await response.json()
  return {
    message: 'Login with success',
    success: true,
    body: {
      token: data.token,
    },
  }
}

export default remoteLogin;