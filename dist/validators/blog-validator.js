"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage('Incorrect name');
const descriptionValidation = (0, express_validator_1.body)('description').isString().trim().isLength({
    min: 1,
    max: 500
}).withMessage('Incorrect description');
const websiteUrlValidation = (0, express_validator_1.body)('name').isString().trim().isLength({
    min: 1,
    max: 100
}).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$').withMessage('Incorrect website url');
const blogPostValidation = () => [nameValidation, descriptionValidation, websiteUrlValidation];
exports.blogPostValidation = blogPostValidation;
