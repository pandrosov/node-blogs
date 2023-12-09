import {Router, Request, Response} from "express";
import {TestingRepository} from "../repositories/testing-repository";
import {HttpCodes} from "../types/common";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
export const testingRoute = Router({})

testingRoute.delete('/all-data', (req: Request, res: Response) => {
    TestingRepository.deleteBlogAndPosts()
    res.sendStatus(HttpCodes.NO_CONTENT)
})