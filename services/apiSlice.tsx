"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,CACHE_LIFETIME } from "./constants";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: CACHE_LIFETIME.TINY,
  tagTypes: [],
  endpoints: (builder) => ({}),
});