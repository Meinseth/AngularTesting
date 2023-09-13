export interface IUser {
  guid: string;
  password: string,
  firstname: string,
  lastname: string
  email: string,
}

export interface IUserLogin {
  email: string,
  password: string
}

export interface IMovie {
  position: number,
  title: string,
  year: Date,
  length: string,
  rating: number
}