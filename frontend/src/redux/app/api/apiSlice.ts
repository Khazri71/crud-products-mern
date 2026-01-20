import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl : import.meta.env.VITE_BASE_URI
})

const apiSlice = createApi({
    baseQuery,
    endpoints: () => ({}), // endpoints injectés plus tard
     tagTypes: ["Products"],
})
export default apiSlice