"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static searchPostIndex(id) {
        return db_1.db.posts.findIndex(post => post.id === id);
    }
    static updatePostByIndex(postIndex, postData) {
        const post = db_1.db.posts[postIndex];
        let { title, shortDescription, content, blogId, blogName } = postData;
        const updatedPost = Object.assign(Object.assign({}, post), { title,
            shortDescription,
            content,
            blogId, blogName: blogName ? blogName : post.blogName });
        return db_1.db.posts.splice(postIndex, 1, updatedPost);
    }
    static deletePost(postIndex) {
        return db_1.db.posts.splice(postIndex, 1);
    }
    static getPostById(id) {
        const post = db_1.db.posts.find(post => post.id === id);
        if (!post) {
            return null;
        }
        return post;
    }
    static createPost(createObj) {
        const postId = (0, uuid_1.v4)();
        const newPost = Object.assign({ id: postId }, createObj);
        db_1.db.posts.push(newPost);
        return newPost;
    }
}
exports.PostRepository = PostRepository;
