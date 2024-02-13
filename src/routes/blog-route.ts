import {Router, Request, Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithBodyAndParams,
    Params, HTTP_RESPONSE_CODE
} from "../types/common";
import {BlogRepository} from "../repositories/blog-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation} from "../validators/blog-validator";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";
import {blogDto} from "../types/blog/input";
import {BlogType} from "../types/blog/output";

export const blogRoute = Router({})

blogRoute.get('/', async (req: Request, res: Response) => {
    try {
        const blogs = await BlogRepository.getAllBlogs()
        res.status(HTTP_RESPONSE_CODE.SUCCESS).send(blogs)
    } catch (error) {
        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)
    }
})

blogRoute.get('/:id', async (req: RequestWithParams<Params>, res: Response) => {
    try {
        const id = req.params.id
        const blog = await BlogRepository.getBlogById(id)
        if (!blog) {
            res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
            return
        }

        res.send(blog)
    } catch (error) {
        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)
    }
})

blogRoute.post('/', authMiddleware, blogPostValidation(), inputModelValidation, async (req: RequestWithBody<blogDto>, res: Response) => {
    try {
        const {name, description, websiteUrl} = req.body;
        const newBlog: blogDto = {
            name,
            description,
            websiteUrl
        }
        const createdBlogId : string = await BlogRepository.createBlog(newBlog)
        if(!createdBlogId)
            res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)

        const blog = await BlogRepository.getBlogById(createdBlogId)
        res.status(HTTP_RESPONSE_CODE.CREATED).send(blog)
    } catch (error) {
        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST).send(error)
    }
})

blogRoute.put('/:id', authMiddleware, blogPostValidation(), inputModelValidation, async (req: RequestWithBodyAndParams<Params, BlogType>, res: Response) => {
    try {
        const blogId = req.params.id
        let {name, description, websiteUrl} = req.body
        let updatedBlog = {
            name,
            description,
            websiteUrl
        }
        const isUpdated = await BlogRepository.updateBlogById(blogId, updatedBlog)
        if(isUpdated)
            res.sendStatus(HTTP_RESPONSE_CODE.NO_CONTENT)

        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)
    } catch (error) {
        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)
    }
})

blogRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<Params>, res: Response) => {
    const blogId = req.params.id
    const isDeleted = await BlogRepository.deletedBlog(blogId)

    if(isDeleted) {
        res.sendStatus(HTTP_RESPONSE_CODE.NO_CONTENT)
        return
    }

    res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
})