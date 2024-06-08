import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const POSTS_SLICE_NAME = "posts"

interface Post {
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

interface PostsState {
  timeline: Post[]
}

const initialState: PostsState = {
  timeline: [] as Post[],
}

const timelineHome = createSlice({
  name: POSTS_SLICE_NAME,
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
      const timeline = state.timeline
      const newPosts = action.payload.posts
      for (const newPost of newPosts) {
        const postInTimeline = timeline.find(oldPost => oldPost.id === newPost.id)
        if (!postInTimeline) {
          timeline.unshift(newPost)
        }
      }
      const timelineOrderByCreated = sortedPostsByCreatedAt(timeline)
      state.timeline = timelineOrderByCreated
    },
    removePost: (state, action: PayloadAction<{ postId: string }>) => {
      state.timeline = state.timeline.filter(post => post.id !== action.payload.postId);
    },
    updatePost: (state, action: PayloadAction<{ postId: string, description: string }>) => {
      const timeline = state.timeline
      const newTimeline = timeline.map(post => {
        if (post.id === action.payload.postId) {
          const postUpdated = { ...post }
          postUpdated.description = action.payload.description
          return postUpdated
        }
        return post;
      });
      state.timeline = newTimeline
    },
  }
})

export const getPostsByUsername = (username: string, posts: Post[]) => {
  return posts.filter(post => post.owner.username === username)
}

const sortedByCreatedAt = (postA: Post, postB: Post) =>
  new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()

const sortedPostsByCreatedAt = (posts: Post[]) => {
  return posts.sort(sortedByCreatedAt)
}

export default timelineHome.reducer
export const {
  addPosts,
  removePost,
  updatePost
} = timelineHome.actions