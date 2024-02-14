import {body} from "express-validator";
import {BlogRepository} from "../repositories/blog-repository";

const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('Incorrect shortDescription')
const titleValidation = body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('Incorrect title')
const contentValidation = body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('Incorrect content')
const blogPostValidation = body('blogId').isString().trim().custom(async (value) => {
    const blog = await BlogRepository.getBlogById(value)

    if(!blog)
        throw new Error("Incorrect blogId!")

    return true;
}).withMessage('Incorrect blogId!')

export const postValidation = () => [shortDescriptionValidation, titleValidation, contentValidation, blogPostValidation]