import {body} from "express-validator";

const nameValidation = body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('Incorrect name')
const descriptionValidation = body('description').isString().trim().isLength({
    min: 1,
    max: 500
}).withMessage('Incorrect description')
const websiteUrlValidation = body('websiteUrl').isString().trim().isLength({
    min: 1,
    max: 100
}).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$').withMessage('Incorrect website url')

export const blogPostValidation = () => [websiteUrlValidation, nameValidation, descriptionValidation]