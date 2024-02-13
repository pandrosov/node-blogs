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
import {PostDto} from "../types/post/input";
import {PostType} from "../types/post/output";

export const postRoute = Router({})

postRoute.get('/', (req: Request, res: Response) => {
    const posts = PostRepository.getAllPosts()
    res.send(posts)
})

postRoute.get('/:id', (req: RequestWithParams<Params>, res: Response) => {
    // const id = req.params.id
    // const post = PostRepository.getPostById(id)
    // if(!post) {
    //     res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
    //     return
    // }

    res.sendStatus(200)
})

postRoute.post('/', authMiddleware, postValidation(), inputModelValidation, (req: RequestWithBody<PostDto>, res: Response) => {
    const {title, shortDescription, content, blogName = "", blogId} = req.body;
    // const newPost: PostDto = {
    //     title,
    //     shortDescription,
    //     content,
    //     blogName,
    //     blogId
    // }
    // const createdPost:PostType = PostRepository.createPost(newPost)
    res.status(HTTP_RESPONSE_CODE.CREATED).send({result: true})
})

postRoute.put('/:id', authMiddleware, postValidation(), inputModelValidation, (req: RequestWithBodyAndParams<Params, PostDto>, res: Response) => {
    const postId = req.params.id
    // const postIndex = PostRepository.searchPostIndex(postId)
    // if(postIndex === -1) {
    //     res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
    //     return
    // }
    // let {title, shortDescription, content, blogName, blogId} = req.body
    // let updatedPost = {
    //     title,
    //     shortDescription,
    //     content,
    //     blogName,
    //     blogId
    // }
    // PostRepository.updatePostByIndex(postIndex, updatedPost)
    res.sendStatus(204)
})
postRoute.delete('/:id', authMiddleware, (req: RequestWithParams<Params>, res: Response) => {
    // const id = req.params.id
    // const postIndex = PostRepository.searchPostIndex(id)
    // if(postIndex === -1) {
    //     res.sendStatus(HTTP_RESPONSE_CODE.NOT_FOUND)
    //     return
    // }
    // PostRepository.deletePost(postIndex)
    res.sendStatus(HTTP_RESPONSE_CODE.NO_CONTENT)
})