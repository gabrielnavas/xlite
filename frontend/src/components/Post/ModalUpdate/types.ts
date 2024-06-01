export type UpdateForm = {
  description: string;
}

export type Data = {
  user: {
    avatarUrl: string
    name: string;
    username: string;
  },
  post: {
    text: string;
    createdAt: Date;
  }
}
