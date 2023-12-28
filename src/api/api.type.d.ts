/* eslint-disable @typescript-eslint/no-explicit-any */
declare type SuccessfulResponse<T = any> = {
    data?: T
    success: boolean
    message: string
    accessToken?: string
}

declare interface IApi {
    readonly path: string
}

declare type FailResponse<T = any> = Omit<SuccessfulResponse<T>, "data" | "accessToken">
