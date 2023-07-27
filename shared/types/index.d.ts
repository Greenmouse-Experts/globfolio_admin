export interface BaseResult {
  success: boolean;
  message: string;
}

export interface ErrorResult {
  success: boolean;
  message: string;
  errors: Array[any];
  [key: string]: any;
}

export interface UserProfile {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phone_no: string;
  gender: string;
  country: string;
  isActive: boolean;
  token: string;
  userType: string;
  email_verify: boolean;
  referralId: string;
  aboutUs: string | null;
  isSuspended: boolean;
  app: string | null;
  facebook_id: string | null;
  google_id: string | null;
  apple_id: string | null;
  planId: string | null;
  hasActiveSubscription: string | null;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
  picture: string | null,
  subscriptionPlan: string | null
}

export interface UserDataResult {
  status: boolean
  data: UserProfile[]
}

export interface SingleUserDataResult {
  status: boolean
  message: UserProfile
}