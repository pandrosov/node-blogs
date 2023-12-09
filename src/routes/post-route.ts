import {Router, Request, Response} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithBodyAndParams,
    Params,
    ErrorMessageType,
    ErrorType
} from "../types/common";

export const postRoute = Router({})

postRoute.get('/', (req: Request, res: Response) => {
    res.send()
})

postRoute.get('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const id = +req.params.id

    res.send()
})

postRoute.post('/', (req: RequestWithBody<Params>, res: Response) => {
    res.status(201).send()
})

postRoute.put('/:id', (req: RequestWithBodyAndParams<Params, Params>, res: Response) => {

    res.sendStatus(204)
})
postRoute.delete('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const id = +req.params.id

    res.sendStatus(204)
    res.send()
})