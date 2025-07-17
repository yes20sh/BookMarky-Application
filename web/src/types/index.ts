// =======================
// User Types
// =======================

export interface IUser {
  _id?: string;
  username: string;
  password?: string; // Optional when retrieved from backend
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  username: string;
}

// =======================
// Bookmark Types
// =======================

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
