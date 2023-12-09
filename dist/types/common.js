"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCodes = void 0;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["SUCCESS"] = 200] = "SUCCESS";
    HttpCodes[HttpCodes["CREATED"] = 201] = "CREATED";
    HttpCodes[HttpCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCodes[HttpCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCodes[HttpCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCodes[HttpCodes["NO_AUTH"] = 401] = "NO_AUTH";
})(HttpCodes || (exports.HttpCodes = HttpCodes = {}));
