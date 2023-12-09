import {db} from "../db/db";
import {BlogDto} from "../types/blog/input";
import { v4 as uuidv4 } from "uuid"
import {BlogType} from "../types/blog/output";

export class BlogRepository {
    static getAllBlogs() {
        return db.blogs
    }

    static searchBlogIndex(id: string) {
        return db.blogs.findIndex(blog => blog.id !== id)
    }

    static updateBlogByIndex(blogIndex: number, blogData: BlogDto) {
        const blog = db.blogs[blogIndex]
        const updatedBlog: BlogType = {
            ...blog,
            name: blogData.name,
            description: blogData.description,
            websiteUrl: blogData.websiteUrl
        }

        return db.blogs.splice(blogIndex, 1, updatedBlog)
    }

    static deleteBlog(blogIndex: number) {
        return db.blogs.splice(blogIndex, 1)
    }

    static getBlogById(id: string) {
        const blog = db.blogs.find(blog => blog.id === id)

        if(!blog) {
            return null;
        }

        return blog;
    }

    static createBlog(createObj: BlogDto) {
        const blogId = uuidv4();
        const newBlog = {id: blogId, ...createObj}

        db.blogs.push(newBlog)
        return newBlog
    }
}