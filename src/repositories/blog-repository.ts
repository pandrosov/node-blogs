import {blogCollection} from "../db/db";
import {blogDto} from "../types/blog/input";
import {ObjectId, WithId} from "mongodb"
import {BlogType, IResponse, OutputBlogType} from "../types/blog/output";
import {blogMapper} from "../types/blog/mapper";

export class BlogRepository {
    static async getAllBlogs() {
        try {
            const blogs: WithId<BlogType>[] = await blogCollection.find({}).toArray()
            return blogs.map(blogMapper)
        } catch {
            return null
        }
    }

    static async getBlogById(id: string): Promise<OutputBlogType | null> {
        try {
            const blog = await blogCollection.findOne({_id: new ObjectId(id)})
            if (!blog)
                return null
            return blogMapper(blog)
        } catch (error) {
            return null
        }
    }

    static async createBlog(createData: blogDto): Promise<string> {
        try {
            const newBlog: BlogType = {
                ...createData,
                createdAt: new Date().toISOString(),
                isMembership: false
            }
            const newBlogResponse = await blogCollection.insertOne(newBlog)
            return newBlogResponse.insertedId.toString()
        } catch (error) {
            return ""
        }
    }

    static async updateBlogById(id: string, updateData: blogDto) : Promise<boolean> {
        try {
            const updatedBlogResponse = await blogCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    ...updateData
                }
            })

            return !!updatedBlogResponse?.modifiedCount
        } catch {
            return false
        }

    }

    static async deletedBlog(id: string): Promise<boolean> {
        const response = await blogCollection.deleteOne({_id: new ObjectId(id)})

        return !!response?.deletedCount
    }
}