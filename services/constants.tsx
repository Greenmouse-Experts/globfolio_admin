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
  export const SUSPEND_USER = '/admin/suspend-user'
  export const UNSUSPEND_USER = '/admin/unSuspend-user'

  // stock advisory
  export const GET_ADVISORY = '/stockAdvisory/stockAdvisorys'
  export const CREATE_ADVISORY = '/stockAdvisory/create'
  export const DRAFT_ADVISORY = '/stockAdvisory/createDraft'
  export const EDIT_ADVISORY = '/stockAdvisory/update'
  export const GET_DRAFT_ADVISORY = '/stockAdvisory/stockAdvisorysDraft'
  export const DELETE_ADVISORY = '/stockAdvisory/delete'
  export const UPDATE_TO_MAIN = '/stockAdvisory/draftToMain'
  export const GET_SECTOR = '/subscription/sector'

  // subscription plans
  export const GET_SUBSCRIPTION = '/subscription/plans'
  export const CREATE_SUBSCRIPTION = '/subscription/create'
  export const EDIT_SUBSCRIPTION = '/subscription/update'
  export const GET_SUBSCRIBED_USERS = '/subscription/getPlanUsers'
  export const DELETE_SUBSCRIPTION = '/subscription/delete'

  //feedbacks
  export const GET_FEEDBACKS = '/admin/getFeedbacks'

  // transaction
  export const GET_TRANSACTION = '/transactions'

  // notification
  export const GET_ADMIN_NOTIFICATION = '/notifications/admin'
  export const MARK_NOTIFY = '/notifications/mark-read'
  export const DELETE_NOTIFY = '/notifications/delete'

  // for chats and chat room
  export const CREATE_CHATROOM = '/chat/rooms'
  export const GET_USER_QUERY = '/admin/getAllUsers'
  export const GET_ROOM = '/chat/room'
  export const GET_ROOM_FILES = '/chat/room'
  export const GET_PREVIOUS_CHAT = '/chat/history'
  export const DELETE_MESSAGE = '/chat/room/message'
  export const EDIT_ROOM = '/chat/rooms/'
  export const REMOVE_USER = '/chat/room/ban/member'
  export const ASSIGN_USER = '/chat/room/moderator/assign'

  // routine
  export const GET_DASHBOARD = '/admin/stats'
  