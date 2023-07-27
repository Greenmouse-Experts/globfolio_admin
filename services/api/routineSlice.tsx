"use client";

import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken, requestBasicAuthorization } from "../helpers";
import { CreateSubscriptionOutput, SubscriptionPlanResult } from "@/shared/types/subscription";
import { ErrorResult } from "@/shared/types";
import { FeedbackResult } from "@/shared/types/routine";

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
  useLazyEditSubscriptionQuery
} = routineApiSlice;