import {ObjectId} from "mongodb";

export type OutputBlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export interface IResponse {
    status: boolean,
    data: ObjectId
}