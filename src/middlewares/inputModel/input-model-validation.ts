import {NextFunction, Request, Response} from "express";
import {Result, ValidationError, validationResult} from "express-validator";
import {HttpCodes} from "../../types/common";

export const inputModelValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req).formatWith((error: ValidationError) => {
        switch (error.type) {
            case 'field':
                return {
                    message: error.msg,
                    field: error.path
                }
            default:
                return {
                    message: error.msg,
                    field: 'Unknown field'
                }
        }
    })

    if (!errors.isEmpty()) {
        const err = errors.array({onlyFirstError: true})

        return res.status(HttpCodes.BAD_REQUEST).send({
            errorMessages: err
        })
    }

    return next()
}