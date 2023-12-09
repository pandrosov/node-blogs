"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static searchBlogIndex(id) {
        return db_1.db.blogs.findIndex(blog => blog.id !== id);
    }
    static updateBlogByIndex(blogIndex, blogData) {
        const blog = db_1.db.blogs[blogIndex];
        const updatedBlog = Object.assign(Object.assign({}, blog), { name: blogData.name, description: blogData.description, websiteUrl: blogData.websiteUrl });
        return db_1.db.blogs.splice(blogIndex, 1, updatedBlog);
    }
    static deleteBlog(blogIndex) {
        return db_1.db.blogs.splice(blogIndex, 1);
    }
    static getBlogById(id) {
        const blog = db_1.db.blogs.find(blog => blog.id === id);
        if (!blog) {
            return null;
        }
        return blog;
    }
    static createBlog(createObj) {
        const blogId = (0, uuid_1.v4)();
        const newBlog = Object.assign({ id: blogId }, createObj);
        db_1.db.blogs.push(newBlog);
        return newBlog;
    }
}
exports.BlogRepository = BlogRepository;
