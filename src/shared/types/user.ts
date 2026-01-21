export interface Login {
  firstname: string
  lastname: string
}

export interface User {
  id: number
  email: string
  username: string
  name: Login
}

export interface UserWithPassword extends User {
  password: string
}
