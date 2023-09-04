"use client";

import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken, requestAuthorization } from "../helpers";
import { BaseResult, ErrorResult } from "@/shared/types";

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoom: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.CREATE_CHATROOM}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getRoomUsers: builder.query<any | ErrorResult, any>({
      query: (id) => ({
        url: `${ENDPOINT.GET_ROOM}/${id}/suscribers`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getUserQuery: builder.query<any | ErrorResult, string>({
        query: (param) => ({
          url: `${ENDPOINT.GET_USER_QUERY}?search=${param}`,
          method: ENDPOINT.HTTP_METHODS.GET,
          headers: {
            Authorization: getLocalToken("token")
          }
        }),
        keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
      }),

      getRoomFiles: builder.query<any | ErrorResult, string>({
        query: (param) => ({
          url: `${ENDPOINT.GET_ROOM_FILES}/${param}/files`,
          method: ENDPOINT.HTTP_METHODS.GET,
          headers: {
            Authorization: getLocalToken("token")
          }
        }),
        keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
      }),

      getPrevious: builder.query<any | ErrorResult, void>({
        query: () => ({
          url: `${ENDPOINT.GET_PREVIOUS_CHAT}`,
          method: ENDPOINT.HTTP_METHODS.GET,
          headers: {
            Authorization: getLocalToken("token")
          }
        }),
        keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
      }),

    createChatRoom: builder.query<BaseResult | ErrorResult, any>({
        query: (payload) => ({
          url: ENDPOINT.CREATE_CHATROOM,
          body: payload ,
          method: ENDPOINT.HTTP_METHODS.POST,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),

      suspendChatRoom: builder.query<BaseResult | ErrorResult, any>({
        query: (payload) => ({
          url: `${ENDPOINT.GET_ROOM}/${payload.id}/suspension`,
          method: ENDPOINT.HTTP_METHODS.POST,
          body: payload ,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),

      deleteChatMsg: builder.query<BaseResult | ErrorResult, any>({
        query: (payload) => ({
          url: `${ENDPOINT.DELETE_MESSAGE}`,
          method: ENDPOINT.HTTP_METHODS.DELETE,
          body: payload ,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetRoomQuery,
  useLazyCreateChatRoomQuery,
  useLazyGetUserQueryQuery,
  useGetRoomUsersQuery,
  useGetRoomFilesQuery,
  useGetPreviousQuery,
  useLazySuspendChatRoomQuery,
  useLazyDeleteChatMsgQuery
} = subscriptionApiSlice;