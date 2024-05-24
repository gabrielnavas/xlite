import localAuthManager from "./LocalAuthManager";

type Post = {
  id: string;
  createdAt: Date;
  description: string;
  owner: {
    id: string
    avatarUrl: string;
    fullName: string;
    username: string;
  }
}

type PostResponse = {
  body?: Post,
  message: string
  success: boolean
}

const createPost = async (description: string): Promise<PostResponse> => {
  const token = localAuthManager().getToken(); 
  
  const body = {
    description,
  }

  const url = `${import.meta.env.VITE_ENDPOINT_API}/post`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    return {
      message: 'try again later',
      success: false,
    }
  }

  const data = await response.json()
  return {
    message: 'Post created.',
    success: true,
    body: {
      id: data.post_id,
      owner: {
        id: data.owner_id,
        avatarUrl: data.owner_avatar_url,
        fullName: data.owner_full_name,
        username: data.owner_username,
      },
      description: data.description,
      createdAt: new Date(data.created_at)
    },
  }
}

const remotePost = () => {
  return { createPost }
}

export default remotePost