type PostBody = {
  post_id: string;
  created_at: string;
  description: string;
  owner_id: string
  owner_avatar_url: string;
  owner_full_name: string;
  owner_username: string;
  image_names: string[]
}


export type Post = {
  id: string;
  createdAt: string;
  description: string;
  owner: {
    id: string
    avatarUrl: string;
    fullName: string;
    username: string;
  }
  imageNames: string[]
}

type PostResponse<T> = {
  body?: T,
  message: string
  success: boolean
  tokenExpired: boolean
}

function mapToPost(post: PostBody): Post {
  return ({
    id: post.post_id,
    owner: {
      id: post.owner_id,
      avatarUrl: post.owner_avatar_url,
      fullName: post.owner_full_name,
      username: post.owner_username,
    },
    description: post.description,
    createdAt: post.created_at,
    imageNames: post.image_names
  })
}

function mapToPosts(posts: PostBody[]): Post[] {
  return posts.map(mapToPost)
}

const createPost = (token: string) => async (description: string): Promise<PostResponse<Post>> => {
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
    body: mapToPost(data),
  }
}



const uploadImages = (token: string) => async (postId: string, imageUrls: string[]): Promise<PostResponse<Post>> => {
  const messagesRecognizeds = ['max upload size is']
  
  const downloadImage = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    return await response.blob()
  };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const downloaded = await Promise.all(imageUrls.map(downloadImage));

  const formData = new FormData();
  downloaded.forEach((image, index) => {
    const name = `${index+1}`
    const file = new File([image], name)
    formData.append('files', file, name);
  })

  const url = `${import.meta.env.VITE_ENDPOINT_API}/post/${postId}/images`

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: headers
  })

  if (!response.ok) {
    if (response.status === 403) {
      return {
        message: 'token expired',
        success: false,
        tokenExpired: true,
      }
    }

    if(response.status === 400) {
      const data = await response.json()
      if(data.message && typeof data.message === 'string') {
        const messageFromBody = data.message as string
        if(messagesRecognizeds.some(message => messageFromBody.includes(message))) {
          return {
            message: data.message,
            success: false,
            tokenExpired: false,
          }
        }
      }
    }
    return {
      message: 'Try again later',
      success: false,
      tokenExpired: false,
    }
  }

  const data = await response.json() as PostBody
  return {
    message: 'Post created.',
    success: true,
    tokenExpired: false,
    body: mapToPost(data),
  }
}

const downloadImage = (token: string) => async (postId: string, imageName: string): Promise<Blob> => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const url = `${import.meta.env.VITE_ENDPOINT_API}/post/${postId}/images/${imageName}`

  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  })

  return response.blob()
}


const updatePost = (token: string) => async (postId: string, description: string): Promise<PostResponse<void>> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const bodyRaw = JSON.stringify({ description })

  const url = `${import.meta.env.VITE_ENDPOINT_API}/post/${postId}`

  const response = await fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: bodyRaw,
  })

  if (!response.ok) {
    if (response.status === 403) {
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

  return {
    message: 'Post updated.',
    success: true,
    tokenExpired: false,
  }
}


const deletePost = (token: string) => async (postId: string): Promise<PostResponse<void>> => {
  const url = `${import.meta.env.VITE_ENDPOINT_API}/post/${postId}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })

  if (!response.ok) {
    if (response.status === 403) {
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

  return {
    message: 'Post deleted.',
    success: true,
    tokenExpired: false,
  }
}



const getAllByOwner = (token: string) => async (): Promise<PostResponse<Post[]>> => {
  const url = `${import.meta.env.VITE_ENDPOINT_API}/post/owner`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  if (!response.ok) {
    if (response.status === 403) {
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

  const data = await response.json() as PostBody[]
  return {
    message: 'posts fetched.',
    success: true,
    tokenExpired: false,
    body: mapToPosts(data),
  }
}

const getAll = (token: string) => async (): Promise<PostResponse<Post[]>> => {
  const url = `${import.meta.env.VITE_ENDPOINT_API}/post`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  if (!response.ok) {
    if (response.status === 403) {
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

  const data = await response.json() as PostBody[]
  return {
    message: 'posts fetched.',
    success: true,
    tokenExpired: false,
    body: mapToPosts(data),
  }
}


const remotePost = () => {
  return { createPost, getAllByOwner, getAll, deletePost, updatePost, uploadImages, downloadImage }
}

export default remotePost
