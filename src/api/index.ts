/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOCAL_STORAGE_KEY } from "@/constants/local-storage-key"
import axios, { AxiosResponse } from "axios"
const apiInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:2003/api" : "https://footex.up.railway.app/api"
})

apiInstance.interceptors.request.use(async (config) => {
    const token = sessionStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

export const asyncHandler = async <T = any>(promise: () => Promise<AxiosResponse>): Promise<SuccessfulResponse<T>> => {
    try {
        const { data } = await promise()
        return {
            data: data.data,
            success: data.success,
            message: data.message,
            accessToken: data.accessToken
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? error.message
        }
    }
}

export default apiInstance
