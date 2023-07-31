"use client";

import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken, requestBasicAuthorization } from "../helpers";
import { CreateSubscriptionOutput } from "@/shared/types/subscription";
import { ErrorResult } from "@/shared/types";
import { FeedbackResult, NotifyResult } from "@/shared/types/routine";

export const routineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeed: builder.query<FeedbackResult | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_FEEDBACKS}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getTransact: builder.query<any| ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_TRANSACTION}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getNotify: builder.query<NotifyResult | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_ADMIN_NOTIFICATION}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
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
  useGetFeedQuery,
  useGetTransactQuery,
  useLazyEditSubscriptionQuery,
  useGetNotifyQuery
} = routineApiSlice;