export type UpdateForm = {
  description: string;
}

export type Data = {
  user: {
    avatarUrl: string
    fullName: string;
    username: string;
  },
  post: {
    text: string;
    createdAt: Date;
  }
}
