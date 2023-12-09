"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const common_1 = require("../types/common");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_validator_1 = require("../validators/post-validator");
const input_model_validation_1 = require("../middlewares/inputModel/input-model-validation");
const post_repository_1 = require("../repositories/post-repository");
exports.postRoute = (0, express_1.Router)({});
exports.postRoute.get('/', (req, res) => {
    const posts = post_repository_1.PostRepository.getAllPosts();
    res.send(posts);
});
exports.postRoute.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = post_repository_1.PostRepository.getPostById(id);
    if (!post) {
        res.sendStatus(common_1.HttpCodes.NOT_FOUND);
        return;
    }
    res.send(post);
});
exports.postRoute.post('/', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), input_model_validation_1.inputModelValidation, (req, res) => {
    const { title, shortDescription, content, blogName, blogId } = req.body;
    const newPost = {
        title,
        shortDescription,
        content,
        blogName,
        blogId
    };
    const createdPost = post_repository_1.PostRepository.createPost(newPost);
    res.status(common_1.HttpCodes.CREATED).send(createdPost);
});
exports.postRoute.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), input_model_validation_1.inputModelValidation, (req, res) => {
    const postId = req.params.id;
    const postIndex = post_repository_1.PostRepository.searchPostIndex(postId);
    if (postIndex === -1) {
        res.sendStatus(common_1.HttpCodes.NOT_FOUND);
        return;
    }
    let { title, shortDescription, content, blogName, blogId } = req.body;
    let updatedPost = {
        title,
        shortDescription,
        content,
        blogName,
        blogId
    };
    post_repository_1.PostRepository.updatePostByIndex(postIndex, updatedPost);
    res.sendStatus(204);
});
exports.postRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const postIndex = post_repository_1.PostRepository.searchPostIndex(id);
    if (postIndex === -1) {
        res.sendStatus(common_1.HttpCodes.NOT_FOUND);
    }
    post_repository_1.PostRepository.deletePost(postIndex);
    res.sendStatus(common_1.HttpCodes.NO_CONTENT);
    res.send();
});
