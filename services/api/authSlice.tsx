"use client";

import { AdminLoginInput, AdminLoginResult, UpdatePasswordInput } from "@/shared/types/auth";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { BaseResult, ErrorResult } from "@/shared/types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.query<AdminLoginResult | ErrorResult, AdminLoginInput>({
      query: (login) => ({
        url: `${ENDPOINT.ADMIN_LOGIN}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        body: login,
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
    }),

    changePassword: builder.query<AdminLoginResult | ErrorResult, UpdatePasswordInput>({
      query: (payload) => ({
        url: ENDPOINT.CHANGE_PASSWORD,
        body: payload ,
        method: ENDPOINT.HTTP_METHODS.PATCH,
        headers: {
          Authorization: requestAuthorization(),
        },
      }),
    }),

    // updateUserProfile: builder.query<AdminLoginResult | ErrorResult, UpdateProfileInput>({
    //   query: (payload) => ({
    //     url: ENDPOINT.USER_UPDATE_PROFILE,
    //     body: payload ,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     headers: {
    //       Authorization: requestAuthorization(),
    //     },
    //   }),
    // }),

    //   updateUserPhoto: builder.query({
    //     query: (payload) => ({
    //       url: ENDPOINT.USER_UPDATE_PHOTO,
    //       body: payload ,
    //       method: ENDPOINT.HTTP_METHODS.POST,
    //       headers: {
    //         Authorization: requestAuthorization(),
    //       },
    //     }),
    //   }),
    
  }),
  overrideExisting: true,
});

export const {
  useLazyAdminLoginQuery,
  useLazyChangePasswordQuery
} = authApiSlice;