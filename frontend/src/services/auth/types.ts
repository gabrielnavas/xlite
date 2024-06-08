export type BodyResponse = {
  message: string
  token: string,
  user: {
    username: string
    email: string
    full_name: string
    created_at: string
    roles: string[]
  }
}

export type User = {
  username: string
  email: string
  fullName: string
  createdAt: string
  roles: string[]
}

export type AuthResponse = {
  message: string;
  success: boolean
  body?: {
    token: string,
    user: User,
  },
};
