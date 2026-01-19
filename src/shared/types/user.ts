export interface ApiUserName {
  firstname: string
  lastname: string
}

export interface ApiUser {
  id: number
  email: string
  username: string
  name: ApiUserName
}
