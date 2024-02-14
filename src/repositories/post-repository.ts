import {OutputPostType, PostType} from "../types/post/output";
import {PostDto, PostReqData} from "../types/post/input";
import {blogCollection, postCollection} from "../db/db";
import {ObjectId, WithId} from "mongodb";
import {postMapper} from "../types/post/mapper";
import {BlogRepository} from "./blog-repository";

export class PostRepository {
    static async getAllPosts() {
        try {
            const posts:WithId<PostType>[] = await postCollection.find({}).toArray()
            return posts.map(postMapper)
        } catch {
            return null
        }
    }

    static async getPostById(id: string): Promise<OutputPostType | null> {
        try {
            const post = await postCollection.findOne({_id: new ObjectId(id)})
            if(!post)
                return null
            return postMapper(post)
        } catch {
            return null
        }
    }

    static async createPost(postData: PostReqData): Promise<string> {
        try {
            const blog = await BlogRepository.getBlogById(postData.blogId)
            const newPost:PostType = {
                ...postData,
                blogName: blog!.name,
                createdAt: new Date().toISOString()
            }

            const newPostResponse = await postCollection.insertOne(newPost)
            return newPostResponse.insertedId.toString()
        } catch (error) {
            return ""
        }
    }

    static async updatePostById(id: string, postData: PostReqData) {
        try {
            const updatedPostResponse = await postCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    title: postData.title,
                    shortDescription: postData.shortDescription,
                    content: postData.content,
                    blogId: postData.blogId
                }
            })

            return !!updatedPostResponse.matchedCount
        } catch {
            return false
        }
    }

    static async deletePost(id: string): Promise<boolean> {
        try {
            const response = await postCollection.deleteOne({_id: new ObjectId(id)})

            return !!response?.deletedCount
        } catch (e) {
            return false
        }
    }


}