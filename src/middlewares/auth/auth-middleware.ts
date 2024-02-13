import {NextFunction, Request, Response} from "express";
import {HTTP_RESPONSE_CODE} from "../../types/common";

const login = 'admin';
const password = 'qwerty';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization']
    if(!auth) {
        res.sendStatus(HTTP_RESPONSE_CODE.NO_AUTH)
        return
    }

    const [basic, token] = auth.split(' ')
    if(basic !== 'Basic') {
        res.sendStatus(HTTP_RESPONSE_CODE.NO_AUTH)
        return
    }

    const decodeData = Buffer.from(token, 'base64').toString()
    const [decodesLogin,decodedPwd] = decodeData.split(':')

    if(decodesLogin !== login || decodedPwd !== password) {
        res.sendStatus(HTTP_RESPONSE_CODE.NO_AUTH)
        return
    }
    
    return next()
}