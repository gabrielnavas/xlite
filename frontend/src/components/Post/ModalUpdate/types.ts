export type UpdateForm = {
  description: string
}

export type OnFinishUpdate = (postId: string, postDescription: string) => void 