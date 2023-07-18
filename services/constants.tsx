// NB: Lifetime is in seconds
export enum CACHE_LIFETIME {
    DEFAULT = 0,
    TINY = 20,
    MEDIUM = 180,
    EXTENDED = 3600,
  }
  
  export enum HTTP_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }

  export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // auth
  export const ADMIN_LOGIN = '/signin-admin'
  export const CHANGE_PASSWORD = '/admin/change-password'
  export const UPDATE_PROFILE = '/admin/update-account'
  export const UPDATE_PROFILE_PHOTO = '/admin/profile/update-pic'

  // manage users
  export const GET_USERS = "/admin/getAllUsers"
  export const GET_SINGLE_USER = '/admin/getUser'

  // stock advisory
  export const GET_ADVISORY = '/stockAdvisory/stockAdvisorys'
  export const CREATE_ADVISORY = '/stockAdvisory/create'
  export const EDIT_ADVISORY = '/stockAdvisory/update'

  // subscription plans
  export const GET_SUBSCRIPTION = '/subscription/plans'
  export const CREATE_SUBSCRIPTION = '/subscription/create'
  export const EDIT_SUBSCRIPTION = '/subscription/update'
