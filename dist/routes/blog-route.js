"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const common_1 = require("../types/common");
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const blog_validator_1 = require("../validators/blog-validator");
const input_model_validation_1 = require("../middlewares/inputModel/input-model-validation");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/', (req, res) => {
    const blogs = blog_repository_1.BlogRepository.getAllBlogs();
    res.sendStatus(common_1.HttpCodes.SUCCESS).send(blogs);
});
exports.blogRoute.get('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const blog = blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(common_1.HttpCodes.NOT_FOUND);
        return;
    }
    res.sendStatus(common_1.HttpCodes.SUCCESS).send(blog);
});
exports.blogRoute.post('/', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogPostValidation)(), input_model_validation_1.inputModelValidation, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const newBlog = {
        name,
        description,
        websiteUrl
    };
    const createdBlog = blog_repository_1.BlogRepository.createBlog(newBlog);
    res.status(common_1.HttpCodes.CREATED).send(createdBlog);
});
exports.blogRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogPostValidation)(), input_model_validation_1.inputModelValidation, (req, res) => {
    const blogId = req.params.id;
    const blogIndex = blog_repository_1.BlogRepository.searchBlogIndex(blogId);
    if (blogIndex === -1) {
        res.sendStatus(common_1.HttpCodes.NOT_FOUND);
        return;
    }
    let { name, description, websiteUrl } = req.body;
    let updatedBlog = {
        name,
        description,
        websiteUrl
    };
    blog_repository_1.BlogRepository.updateBlogByIndex(blogIndex, updatedBlog);
    res.sendStatus(204);
});
exports.blogRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const blogId = req.params.id;
    const blogIndex = blog_repository_1.BlogRepository.searchBlogIndex(blogId);
    if (blogIndex === -1) {
        res.sendStatus(common_1.HttpCodes.NOT_FOUND);
        return;
    }
    blog_repository_1.BlogRepository.deleteBlog(blogIndex);
    res.sendStatus(204);
    res.send();
});
