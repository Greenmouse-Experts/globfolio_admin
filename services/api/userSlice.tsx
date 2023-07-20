"use client";

import { AdminLoginInput, AdminLoginResult, SuspendUserInput, UpdatePasswordInput } from "@/shared/types/auth";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken, requestAuthorization } from "../helpers";
import { BaseResult, ErrorResult, SingleUserDataResult, UserDataResult } from "@/shared/types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserDataResult | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_USERS}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getOneUsers: builder.query<SingleUserDataResult | ErrorResult, string>({
      query: (param) => ({
        url: `${ENDPOINT.GET_SINGLE_USER}/${param}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    suspendUser: builder.query<BaseResult | ErrorResult, SuspendUserInput>({
      query: (payload) => ({
        url: ENDPOINT.SUSPEND_USER,
        body: payload ,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
          Authorization: getLocalToken("token"),
        },
      }),
    }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useGetOneUsersQuery,
  useLazySuspendUserQuery
} = userApiSlice;