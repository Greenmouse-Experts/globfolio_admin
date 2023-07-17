"use client";

import { AdminLoginInput, AdminLoginResult, UpdatePasswordInput } from "@/shared/types/auth";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { requestAuthorization } from "../helpers";
import { BaseResult, ErrorResult } from "@/shared/types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<AdminLoginResult | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_USERS}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authrization: requestAuthorization()
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
} = userApiSlice;