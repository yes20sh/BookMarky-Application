import { Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string; // ✅ Add this line
  password: string;
}


export interface IUserResponse {
  _id: string; // Keep this as string if you're sending it to the client (after .toJSON())
  username: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
  email: string;
}

