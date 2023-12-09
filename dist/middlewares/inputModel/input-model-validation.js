"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputModelValidation = void 0;
const express_validator_1 = require("express-validator");
const common_1 = require("../../types/common");
const inputModelValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith((error) => {
        switch (error.type) {
            case 'field':
                return {
                    message: error.msg,
                    field: error.path
                };
            default:
                return {
                    message: error.msg,
                    field: 'Unknown field'
                };
        }
    });
    if (!errors.isEmpty()) {
        const err = errors.array({ onlyFirstError: true });
        return res.status(common_1.HttpCodes.BAD_REQUEST).send({
            errorMessages: err
        });
    }
    return next();
};
exports.inputModelValidation = inputModelValidation;
