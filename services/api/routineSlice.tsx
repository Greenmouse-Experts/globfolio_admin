"use client";

import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken, requestBasicAuthorization } from "../helpers";
import { CreateSubscriptionOutput } from "@/shared/types/subscription";
import { BaseResult, ErrorResult } from "@/shared/types";
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

    getSector: builder.query<any | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_SECTOR}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
            authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    addSector: builder.query<BaseResult | ErrorResult, any>({
      query: (payload) => ({
        url: `${ENDPOINT.GET_SECTOR}`,
        method: ENDPOINT.HTTP_METHODS.POST,
        headers: {
            authorization: getLocalToken("token")
        },
        body: payload ,
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetFeedQuery,
  useGetTransactQuery,
  useGetNotifyQuery,
  useGetSectorQuery,
  useLazyAddSectorQuery
} = routineApiSlice;