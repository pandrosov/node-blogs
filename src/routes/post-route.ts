import {Router, Request, Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithBodyAndParams,
    Params,
    ErrorMessageType,
    ErrorType, HTTP_RESPONSE_CODE
} from "../types/common";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";
import {PostRepository} from "../repositories/post-repository";
import {PostDto, PostReqData} from "../types/post/input";
import {OutputPostType, PostType} from "../types/post/output";
import {BlogRepository} from "../repositories/blog-repository";

export const postRoute = Router({})

postRoute.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await PostRepository.getAllPosts()
        res.status(HTTP_RESPONSE_CODE.SUCCESS).send(posts)
    } catch (error) {
        res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).send(error)
    }
})

postRoute.get('/:id', async (req: RequestWithParams<Params>, res: Response) => {
    try {
        const id = req.params.id
        const post = await PostRepository.getPostById(id)
        if(!post) {
            res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
            return
        }
        res.send(post)
    } catch (error) {
        res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).send(error)
    }
})

postRoute.post('/', authMiddleware, postValidation(), inputModelValidation, async (req: RequestWithBody<PostDto>, res: Response) => {
    const {title, shortDescription, content, blogName = "", blogId} = req.body;
    const newPost: PostReqData = {
        title,
        shortDescription,
        content,
        blogId
    }

    const createdPostId:string = await PostRepository.createPost(newPost)
    if(!createdPostId) {
        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)
        return
    }

    const post = await PostRepository.getPostById(createdPostId)
    res.status(HTTP_RESPONSE_CODE.CREATED).send(post)
})

postRoute.put('/:id', authMiddleware, postValidation(), inputModelValidation, async (req: RequestWithBodyAndParams<Params, PostDto>, res: Response) => {
    try {
        const postId = req.params.id
        let {title, shortDescription, content, blogId} = req.body
        let updatedBlog = {
            title,
            shortDescription,
            content,
            blogId
        }
        const isUpdated = await PostRepository.updatePostById(postId, updatedBlog)
        if(isUpdated) {
            res.sendStatus(HTTP_RESPONSE_CODE.NO_CONTENT)
            return
        }

        res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
    } catch (error) {
        res.sendStatus(HTTP_RESPONSE_CODE.BAD_REQUEST)
    }
})
postRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<Params>, res: Response) => {
    try {
        const postId = req.params.id
        const isDeleted = await PostRepository.deletePost(postId)

        if(isDeleted) {
            res.sendStatus(HTTP_RESPONSE_CODE.NO_CONTENT)
            return
        }

        res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
    } catch (error) {
        res.status(HTTP_RESPONSE_CODE.BAD_REQUEST)
    }
})