import {BlogType} from "../types/blog/output";

type DBtype = {
    blogs: BlogType[],
    posts: []
}

export const db = {
    blogs: [
        {
            "id": "string",
            "name": "string",
            "description": "string",
            "websiteUrl": "string"
        }
    ],
    posts: [

    ]
}