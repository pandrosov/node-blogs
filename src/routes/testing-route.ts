import {Router, Request, Response} from "express";
import {TestingRepository} from "../repositories/testing-repository";
import {HTTP_RESPONSE_CODE} from "../types/common";
export const testingRoute = Router({})

testingRoute.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await TestingRepository.deleteBlogAndPosts()
        res.sendStatus(HTTP_RESPONSE_CODE.NO_CONTENT)
    } catch (error) {
        res.status(HTTP_RESPONSE_CODE.BAD_REQUEST)
    }
})