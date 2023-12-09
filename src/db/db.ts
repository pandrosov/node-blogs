import {BlogType} from "../types/blog/output";
import {PostType} from "../types/post/output";

type DBtype = {
    blogs: BlogType[],
    posts: PostType[]
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
        {
            "id": "string",
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        }
    ]
}