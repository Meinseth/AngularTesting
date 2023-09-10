export interface IUser {
  password: string,
  firstname: string,
  lastname: string
  email: string,
}

export interface IUserLogin {
  email: string,
  password: string
}