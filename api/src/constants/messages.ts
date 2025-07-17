export enum AuthMessage {
  USERNAME_PASSWORD_REQUIRED = 'Username and password required',
  USERNAME_TAKEN = 'Username already taken',
  REGISTRATION_FAILED = 'Registration failed',
  INVALID_CREDENTIALS = 'Invalid credentials',
  LOGIN_FAILED = 'Login failed',
}

export enum BookmarkMessage {
  MISSING_USER_ID = 'Missing or invalid userId',
  FETCH_FAILED = 'Failed to fetch bookmarks',
  CREATE_FAILED = 'Failed to create bookmark',
  DELETE_FAILED = 'Failed to delete bookmark',
  NOT_FOUND = 'Bookmark not found',
  MISSING_FIELDS = 'Missing required fields',
}
