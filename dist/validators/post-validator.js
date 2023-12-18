"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = void 0;
const express_validator_1 = require("express-validator");
const blog_repository_1 = require("../repositories/blog-repository");
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Incorrect shortDescription');
const titleValidation = (0, express_validator_1.body)('title').isString().trim().isLength({ min: 1, max: 30 }).withMessage('Incorrect title');
const contentValidation = (0, express_validator_1.body)('content').isString().trim().isLength({ min: 1, max: 1000 }).withMessage('Incorrect content');
const blogPostValidation = (0, express_validator_1.body)('blogId').isString().trim().custom((value) => {
    const blog = blog_repository_1.BlogRepository.getBlogById(value);
    if (!blog)
        throw new Error("Incorrect blogId!");
    return true;
}).withMessage('Incorrect blogId!');
const postValidation = () => [titleValidation, shortDescriptionValidation, contentValidation, blogPostValidation];
exports.postValidation = postValidation;
