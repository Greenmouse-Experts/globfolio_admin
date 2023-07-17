import { BaseResult } from ".";

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface AdminLoginResult extends BaseResult {
    token: string
    data: UserData
}

export interface UserData {
    id?: string;
    fullname: string;
    email: string;
    phone_no?: string;
    access_token: string;
    country?: string;
    userType?: string
    avatar: string
    email_verify?: boolean
    createdAt?: string
    updatedAt?: string
    expiresIn?: string
    status: string
    created_at: string
    updated_at: string
}

export interface authUser {
    id?: string;
    fullname: string;
    email: string;
    phone?: string;
    token: string;
    country?: string;
    userType?: string
    avatar: string
    email_verify?: boolean
    createdAt?: string
    updatedAt?: string
    expiresIn?: string
}

export interface UpdatePasswordInput {
    password: string
    new_password: string
    confirm_password: string
}