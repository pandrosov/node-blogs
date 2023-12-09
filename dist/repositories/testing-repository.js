"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingRepository = void 0;
const db_1 = require("../db/db");
class TestingRepository {
    static deleteBlogAndPosts() {
        db_1.db.blogs.splice(0, db_1.db.blogs.length);
        db_1.db.posts.splice(0, db_1.db.posts.length);
        console.log(db_1.db.posts);
    }
}
exports.TestingRepository = TestingRepository;
