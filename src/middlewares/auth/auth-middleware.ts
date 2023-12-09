import {NextFunction, Request, Response} from "express";
import {HttpCodes} from "../../types/common";

const login = 'admin';
const password = 'qwerty';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization']
    if(!auth) {
        res.sendStatus(HttpCodes.NO_AUTH)
        return
    }

    const [basic, token] = auth.split(' ')
    if(basic !== 'Basic') {
        res.sendStatus(HttpCodes.NO_AUTH)
        return
    }

    const decodeData = Buffer.from(token, 'base64').toString()
    const [decodesLogin,decodedPwd] = decodeData.split(':')

    if(decodesLogin !== login || decodedPwd !== password) {
        res.sendStatus(HttpCodes.NO_AUTH)
        return
    }
    
    return next()
}