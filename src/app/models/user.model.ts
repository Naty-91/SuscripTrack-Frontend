export interface User {
  id: number;
  username: string;
  name: string;
}

export interface UserCreate {
  username: string;
  password: string;
  name: string;
}
