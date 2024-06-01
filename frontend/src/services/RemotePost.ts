import localAuthManager from "./LocalAuthManager";

type PostBody = {
  post_id: string;
  created_at: Date;
  description: string;
  owner_id: string
  owner_avatar_url: string;
  owner_full_name: string;
  owner_username: string;
}


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

type PostResponse<T> = {
  body?: T,
  message: string
  success: boolean
  tokenExpired: boolean
}

const createPost = async (description: string): Promise<PostResponse<Post>> => {
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
      tokenExpired: false,
    }
  }

  const data = await response.json() as PostBody
  return {
    message: 'Post created.',
    success: true,
    tokenExpired: false,
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


const getAllMyPosts = async (): Promise<PostResponse<Post[]>> => {
  const token = localAuthManager().getToken(); 

  const url = `${import.meta.env.VITE_ENDPOINT_API}/post`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  if (!response.ok) {
    if(response.status === 403) {
      return {
        message: 'token expired',
        success: false,
        tokenExpired: true,
      }  
    }
    return {
      message: 'try again later',
      success: false,
      tokenExpired: false,
    }
  }

  const data = await response.json()
  return {
    message: 'posts fetched.',
    success: true,
    tokenExpired: false,
    body: data.map((post: PostBody) => ({
      id: post.post_id,
      owner: {
        id: post.owner_id,
        avatarUrl: post.owner_avatar_url,
        fullName: post.owner_full_name,
        username: post.owner_username,
      },
      description: post.description,
      createdAt: new Date(post.created_at)
    })),
  }
}

const remotePost = () => {
  return { createPost, getAllMyPosts }
}

export default remotePost