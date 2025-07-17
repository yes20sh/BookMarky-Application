
export interface IUser {
  _id?: string;              
  username: string;
  password?: string;           
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;       
  password: string;
}


export interface AuthResponse {
  userId: string;
  username: string;
}

export interface IBookmark {
  _id?: string;                
  userId: string;
  title: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookmarkInput {
  userId: string;
  title: string;
  url: string;
}

// export interface AuthState {
//   userId: string | null;
//   username: string | null;
//   loading: boolean;
//   error: string | null;
// }
// types/index.ts

export interface AuthState {
  userId: string | null;
  username: string | null;
}
