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
    id: number
    account_type: string
    title: string | null
    first_name: string
    middle_name: string | null
    last_name: string
    email: string
    phone: string
    phone2: string | null
    gender: string | null
    dob: string | null
    avatar: string | null
    email_verified_at: string
    current_password: string | null
    role: string
    wallet: number | null
    fcm_token: string | null
    means_of_identification: string | null
    address: string | null
    zone_id: string | null
    truck_id: string | null
    isVerified: string
    status: string
    created_at: string
    updated_at: string
}

export interface authUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    token: string;
    country?: string;
    user_type: string
    admin_type: string
    avatar: string
}