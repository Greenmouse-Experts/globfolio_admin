"use client";

import { AdminLoginInput, AdminLoginResult, UpdatePasswordInput } from "@/shared/types/auth";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken, requestAuthorization } from "../helpers";
import { CreateSubscriptionOutput, SubscriptionPlanResult } from "@/shared/types/subscription";
import { ErrorResult } from "@/shared/types";

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<SubscriptionPlanResult | any, void>({
      query: () => ({
        url: `${ENDPOINT.GET_SUBSCRIPTION}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authrization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    createSubscription: builder.query<CreateSubscriptionOutput | ErrorResult, CreateSubscriptionOutput>({
        query: (payload) => ({
          url: ENDPOINT.CREATE_SUBSCRIPTION,
          body: payload ,
          method: ENDPOINT.HTTP_METHODS.POST,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),

      editSubscription: builder.query<CreateSubscriptionOutput | ErrorResult, CreateSubscriptionOutput>({
        query: (payload) => ({
          url: ENDPOINT.EDIT_SUBSCRIPTION,
          body: payload ,
          method: ENDPOINT.HTTP_METHODS.PATCH,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetSubscriptionQuery,
  useLazyEditSubscriptionQuery
} = subscriptionApiSlice;