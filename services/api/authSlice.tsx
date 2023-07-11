"use client";

import { AdminLoginInput, AdminLoginResult } from "@/shared/types/auth";
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

    // userLogin: builder.query<AdminLoginResult | ErrorResult, AdminLoginInput>({
    //   query: (login) => ({
    //     url: `${ENDPOINT.USER_LOGIN}`,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     body: login,
    //   }),
    //   keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.DEFAULT,
    // }),

    // changePassword: builder.query<AdminLoginResult | ErrorResult, UpdatePasswordInput>({
    //   query: (payload) => ({
    //     url: ENDPOINT.ADMIN_CHANGE_PASSWORD,
    //     body: payload ,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     headers: {
    //       Authorization: requestAuthorization(),
    //     },
    //   }),
    // }),

    // userChangePassword: builder.query<AdminLoginResult | ErrorResult, UpdatePasswordInput>({
    //   query: (payload) => ({
    //     url: ENDPOINT.USER_CHANGE_PASSWORD,
    //     body: payload ,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     headers: {
    //       Authorization: requestAuthorization(),
    //     },
    //   }),
    // }),

    // updateAdminProfile: builder.query<AdminLoginResult | ErrorResult, UpdateProfileInput>({
    //   query: (payload) => ({
    //     url: ENDPOINT.ADMIN_UPDATE_PROFILE,
    //     body: payload ,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     headers: {
    //       Authorization: requestAuthorization(),
    //     },
    //   }),
    // }),

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

    // forgetPassword: builder.query<BaseResult | ErrorResult, forgetPasswordInput>({
    //   query: (payload) => ({
    //     url: ENDPOINT.USER_FORGET_PASSWORD,
    //     body: payload ,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     headers: {
    //       Authorization: requestAuthorization(),
    //     },
    //   }),
    // }),

    // resetPassword: builder.query<BaseResult | ErrorResult, ResetPasswordInput>({
    //   query: (payload) => ({
    //     url: ENDPOINT.USER_RESET_PASSWORD,
    //     body: payload ,
    //     method: ENDPOINT.HTTP_METHODS.POST,
    //     headers: {
    //       Authorization: requestAuthorization(),
    //     },
    //   }),
    // }),

    // updateAdminPhoto: builder.query({
    //     query: (payload) => ({
    //       url: ENDPOINT.ADMIN_UPDATE_PHOTO,
    //       body: payload ,
    //       method: ENDPOINT.HTTP_METHODS.POST,
    //       headers: {
    //         Authorization: requestAuthorization(),
    //       },
    //     }),
    //   }),

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
    
      logout: builder.query<BaseResult | ErrorResult, void >({
        query: () => ({
          url: ENDPOINT.ADMIN_LOGOUT,
          method: ENDPOINT.HTTP_METHODS.POST,
          headers: {
            Authorization: requestAuthorization(),
          },
        }),
      }),
  }),
  overrideExisting: true,
});

export const {
  useLazyAdminLoginQuery,
  useLazyLogoutQuery,
} = authApiSlice;