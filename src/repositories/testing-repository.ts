import {blogCollection, postCollection} from "../db/db";

export class TestingRepository {
    static async deleteBlogAndPosts() {
        try {
            await postCollection.deleteMany({})
            await blogCollection.deleteMany({})
        } catch(error) {
            throw error
        }
    }
}