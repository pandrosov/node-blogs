import {Router, Request, Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithBodyAndParams,
    Params,
    HttpCodes
} from "../types/common";
import {BlogRepository} from "../repositories/blog-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation} from "../validators/blog-validator";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";
import {BlogDto} from "../types/blog/input";

export const blogRoute = Router({})

blogRoute.get('/', (req: Request, res: Response) => {
    const blogs = BlogRepository.getAllBlogs()

    res.send(blogs)
})

blogRoute.get('/:id', authMiddleware, (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const blog = BlogRepository.getBlogById(id)
    if (!blog)
        res.sendStatus(HttpCodes.NOT_FOUND)

    res.send(blog)
})

blogRoute.post('/', authMiddleware, blogPostValidation(), inputModelValidation, (req: RequestWithBody<BlogDto>, res: Response) => {
    const {name, description, websiteUrl} = req.body;
    const newBlog: BlogDto = {
        name,
        description,
        websiteUrl
    }
    BlogRepository.createBlog(newBlog)
    res.status(201).send()
})

blogRoute.put('/:id', authMiddleware, blogPostValidation(), inputModelValidation, (req: RequestWithBodyAndParams<Params, BlogDto>, res: Response) => {
    const blogId = req.params.id
    const blogIndex = BlogRepository.searchBlogIndex(blogId)
    if(blogIndex === -1) {
        res.sendStatus(HttpCodes.NOT_FOUND)
        return
    }
    let {name, description, websiteUrl} = req.body
    let updatedBlog = {
        name,
        description,
        websiteUrl
    }
    BlogRepository.updateBlogByIndex(blogIndex, updatedBlog)

    res.sendStatus(204)
})

blogRoute.delete('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const blogId = req.params.id
    const blogIndex = BlogRepository.searchBlogIndex(blogId)
    if(blogIndex === -1) {
        res.sendStatus(HttpCodes.NOT_FOUND)
        return
    }

    BlogRepository.deleteBlog(blogIndex);
    res.sendStatus(204)
    res.send()
})