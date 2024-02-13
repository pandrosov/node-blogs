import {MongoClient} from "mongodb"
import {BlogType} from "../types/blog/output";
import {PostType} from "../types/post/output";
import * as dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 9100;
const mongoUri = process.env.MONGODB_URI ||  "";
const client = new MongoClient(mongoUri)
const db = client.db('node-blog')

export const blogCollection = db.collection<BlogType>('blog')
export const postCollection = db.collection<PostType>('post')

export const runDb = async () => {
    try {
        await client.connect()
        console.log(`Client connect to DB`)
        console.log(`App start to ${port}`)
    } catch (e) {
        console.log(`${e}`)
        await client.close()
    }
}