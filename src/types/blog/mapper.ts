import {BlogType, OutputBlogType} from "./output";
import {WithId} from "mongodb"

export const blogMapper = (blog: WithId<BlogType>): OutputBlogType => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: new Date().toISOString(),
        isMembership: true
    }
}