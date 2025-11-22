export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}

export interface User {
  id: number
  userName: string
  email: string
  role: UserRole
}

export interface AuthResponse {
  id: number
  userName: string
  role: UserRole
}
