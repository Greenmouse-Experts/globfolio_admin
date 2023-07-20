"use client";

import { CreateAdvisoryInput, CreateAdvisoryOutput, DraftsToMain, GetAdvisory } from "@/shared/types/stocks";
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

    getDraftAdvisory: builder.query<GetAdvisory | ErrorResult, void>({
      query: () => ({
        url: `${ENDPOINT.GET_DRAFT_ADVISORY}`,
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

      getOneDraftAdvisory: builder.query<GetAdvisory | ErrorResult, void>({
        query: (param) => ({
          url: `${ENDPOINT.GET_DRAFT_ADVISORY}/${param}`,
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

      draftAdvisory: builder.query<CreateAdvisoryOutput | ErrorResult, FormData>({
        query: (payload) => ({
          url: ENDPOINT.DRAFT_ADVISORY,
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

      publishAdvisory: builder.query<BaseResult | ErrorResult, DraftsToMain>({
        query: (payload) => ({
          url: ENDPOINT.UPDATE_TO_MAIN,
          body: payload ,
          method: ENDPOINT.HTTP_METHODS.PATCH,
          headers: {
            Authorization: getLocalToken("token"),
          },
        }),
      }),

      deleteAdvisory: builder.query<BaseResult | ErrorResult, string>({
        query: (param) => ({
          url: `${ENDPOINT.DELETE_ADVISORY}/${param}`,
          method: ENDPOINT.HTTP_METHODS.DELETE,
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
  useLazyDraftAdvisoryQuery,
  useLazyEditAdvisoryQuery,
  useGetDraftAdvisoryQuery,
  useGetOneDraftAdvisoryQuery,
  useLazyDeleteAdvisoryQuery,
  useLazyPublishAdvisoryQuery
} = stockApiSlice;