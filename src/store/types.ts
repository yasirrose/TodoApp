export interface IUser {
    name: string;
    email: string;
    role: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  
export interface IGenericResponse {
  status: string;
  message: string;
}


export interface Register {
  username: string,
  email: string,
  password: string
}

export interface RegisterResponse {
  username: string, 
  email: string, 
  password: string
}

export interface LoginInput {
  username: string, 
  password: string,
}

export interface LoginResponse {
  access: string,
  refresh: string,
}

export interface ValidateResponse {
  valid: true | false,
}


export interface PostTodo {
  title: string,
  category: string,
  done: boolean,
  priority: string,
  purpose: string
}

export interface ReturnPostData {
  title: string,
  category: string,
  done: boolean,
  priority: string,
  purpose: string,
  id: number,
  user: number
}