"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const common_1 = require("../../types/common");
const login = 'admin';
const password = 'qwerty';
const authMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(common_1.HttpCodes.NO_AUTH);
        return;
    }
    const [basic, token] = auth.split(' ');
    if (basic !== 'Basic') {
        res.sendStatus(common_1.HttpCodes.NO_AUTH);
        return;
    }
    const decodeData = Buffer.from(token, 'base64').toString();
    const [decodesLogin, decodedPwd] = decodeData.split(':');
    if (decodesLogin !== login || decodedPwd !== password) {
        res.sendStatus(common_1.HttpCodes.NO_AUTH);
        return;
    }
    return next();
};
exports.authMiddleware = authMiddleware;
