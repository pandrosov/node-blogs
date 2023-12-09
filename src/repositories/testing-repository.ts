import {db} from '../db/db'

export class TestingRepository {
    static deleteBlogAndPosts() {
        db.blogs.splice(0, db.blogs.length)
        db.posts.splice(0, db.posts.length)

        console.log(db.posts)
    }
}