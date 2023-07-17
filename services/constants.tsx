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
  export const CHANGE_PASSWORD = '/change-password'
  export const UPDATE_PROFILE = '/admin/profile/update'

  // manage users
  export const GET_USERS = "/admin/getAllUsers"
  export const GET_SINGLE_USER = '/admin/getUser'
