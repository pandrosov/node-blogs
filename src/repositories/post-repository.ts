import {db} from "../db/db";
import { v4 as uuidv4 } from "uuid"
import {PostType} from "../types/post/output";
import {PostDto} from "../types/post/input";

export class PostRepository {
    static getAllPosts() {
        return db.posts
    }

    static searchPostIndex(id: string) {
        return db.posts.findIndex(post => post.id !== id)
    }

    static updatePostByIndex(postIndex: number, postData: PostDto) {
        const post = db.posts[postIndex]
        let {title, shortDescription, content, blogId, blogName} = postData
        const updatedPost: PostType = {
            ...post,
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName ? blogName : post.blogName
        }

        return db.posts.splice(postIndex, 1, updatedPost)
    }

    static deletePost(postIndex: number) {
        return db.posts.splice(postIndex, 1)
    }

    static getPostById(id: string) : PostType | null {
        const post = db.posts.find(post => post.id === id)

        if(!post) {
            return null;
        }

        return post;
    }

    static createPost(createObj: PostDto) {
        const postId = uuidv4();
        const newPost = {id: postId, ...createObj}

        db.posts.push(newPost)
        return newPost
    }
}