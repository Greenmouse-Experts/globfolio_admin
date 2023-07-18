"use client";

import { CreateAdvisoryInput, CreateAdvisoryOutput, GetAdvisory } from "@/shared/types/stocks";
import { apiSlice } from "../apiSlice";

import * as ENDPOINT from "../constants";
import { getLocalToken } from "../helpers";
import { BaseResult, ErrorResult } from "@/shared/types";

export const stockApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdvisory: builder.query<GetAdvisory | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_ADVISORY}`,
        method: ENDPOINT.HTTP_METHODS.GET,
        headers: {
          Authorization: getLocalToken("token")
        }
      }),
      keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
    }),

    getOneAdvisory: builder.query<GetAdvisory | ErrorResult, void>({
        query: (param) => ({
          url: `${ENDPOINT.GET_ADVISORY}/${param}`,
          method: ENDPOINT.HTTP_METHODS.GET,
          headers: {
            Authorization: getLocalToken("token")
          }
        }),
        keepUnusedDataFor: ENDPOINT.CACHE_LIFETIME.EXTENDED,
      }),
    
    createAdvisory: builder.query<CreateAdvisoryOutput | ErrorResult, FormData>({
        query: (payload) => ({
          url: ENDPOINT.CREATE_ADVISORY,
          body: payload ,
          method: ENDPOINT.HTTP_METHODS.POST,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),

      editAdvisory: builder.query<CreateAdvisoryOutput | ErrorResult, FormData>({
        query: (payload) => ({
          url: ENDPOINT.EDIT_ADVISORY,
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
  useGetAdvisoryQuery,
  useGetOneAdvisoryQuery,
  useLazyCreateAdvisoryQuery,
  useLazyEditAdvisoryQuery
} = stockApiSlice;