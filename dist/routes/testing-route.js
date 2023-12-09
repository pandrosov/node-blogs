"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoute = void 0;
const express_1 = require("express");
const testing_repository_1 = require("../repositories/testing-repository");
const common_1 = require("../types/common");
exports.testingRoute = (0, express_1.Router)({});
exports.testingRoute.delete('/all-data', (req, res) => {
    testing_repository_1.TestingRepository.deleteBlogAndPosts();
    res.sendStatus(common_1.HttpCodes.NO_CONTENT);
});
