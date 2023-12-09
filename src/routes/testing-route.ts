import {Router, Request, Response} from "express";
import {TestingRepository} from "../repositories/testing-repository";
import {HttpCodes} from "../types/common";
export const testingRoute = Router({})

testingRoute.delete('/all-data', (req: Request, res: Response) => {
    TestingRepository.deleteBlogAndPosts()
    res.sendStatus(HttpCodes.NO_CONTENT)
})