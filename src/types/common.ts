import {Request} from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithBodyAndParams<P, B> = Request<P, {}, B, {}>

export type Params = {
    id: string
}

export type ErrorType = {
    errorsMessages: ErrorMessageType[]
}

export type ErrorMessageType = {
    field: string,
    message: string
}

export enum HTTP_RESPONSE_CODE {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    NO_AUTH = 401
}

export enum RouterPaths {
    blogs = 'blogs',
    posts = 'posts',
    testing = 'testing'
}