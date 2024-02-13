import request from "supertest"
import {app} from "../src/settings"
import {describe} from "node:test";
import {HttpCodes, RouterPaths} from "../src/types/common";


describe(`/${RouterPaths.blogs}`, () => {
    // DELETE ALL
    beforeAll(async () => {
        await request(app).delete(`/${RouterPaths.testing}/all-data`).expect(204)
    })

    // GET TEST
    it('+ GET blogs = []', async () => {
        const res = await request(app).get(`/${RouterPaths.blogs}/`);
        expect(res.status).toBe(HttpCodes.SUCCESS);
        expect(res.body).toEqual([]);
    })
    //
    // it('- GET products by incorrect ID', async () => {1
    //     await request(app).get('/videos/123').expect(HttpCodes.HTTP_404)
    // })
    //
    // // POST TEST
    // it('- POST Required field title. Does not create the video with incorrect data (no title)', async function () {
    //     await request(app)
    //         .post('/videos/')
    //         .send({ title: '', author: 'valid author' })
    //         .expect(HttpCodes.HTTP_400, {
    //             errorsMessages: [
    //                 { message: 'Invalid title', field: 'title' },
    //             ],
    //         })
    //
    //     const res = await request(app).get('/videos/')
    //     expect(res.body).toEqual([])
    // })
    //
    // it('- POST Required field author. Does not create the video with incorrect data (no author)', async function () {
    //     await request(app)
    //         .post('/videos/')
    //         .send({ title: 'valid title', author: '' })
    //         .expect(HttpCodes.HTTP_400, {
    //             errorsMessages: [
    //                 { message: 'Invalid author', field: 'author' },
    //             ],
    //         })
    //
    //     const res = await request(app).get('/videos/')
    //     expect(res.body).toEqual([])
    // })
    //
    // // it('- POST. Does not create the video with incorrect data (canBeDownloaded - not boolean)', async function () {
    // //     const res = await request(app)
    // //         .post('/videos/')
    // //         .send({ title: 'valid', author: 'valid', canBeDownloaded: 1241241241})
    // //         .expect(HttpCodes.HTTP_400)
    // //
    // //     expect(res.body).toEqual({
    // //         errorsMessages: [
    // //             {
    // //                 message: expect.any(String),
    // //                 field: 'canBeDownloaded'
    // //             }
    // //         ]
    // //     })
    // //
    // //     const resAll = await request(app).get('/videos/')
    // //     expect(resAll.body).toEqual([])
    // // })
    //
    // it('- POST. Does not create the video with incorrect data (availableResolutions)', async function () {
    //     const postResponse = await request(app)
    //         .post('/videos/')
    //         .send({ title: 'valid', author: 'valid', availableResolutions: ['P144','P360', 'P361']})
    //         .expect(HttpCodes.HTTP_400)
    //
    //     expect(postResponse.body).toEqual({
    //         errorsMessages: [
    //             {
    //                 message: expect.any(String),
    //                 field: 'availableResolutions'
    //             }
    //         ]
    //     })
    //     const res = await request(app).get('/videos/')
    //     expect(res.body).toEqual([])
    // })
    //
    // let newVideo: any = null;
    // it('+ POST create video with correct data', async function () {
    //     const videoData ={
    //         title: '1234',
    //         author: 'Pavel Androsov'
    //     }
    //     const res = await request(app)
    //         .post('/videos/')
    //         .send(videoData)
    //         .expect(HttpCodes.HTTP_201)
    //
    //     const videoResponse = res.body;
    //     checkVideoType(videoResponse, videoData)
    //     newVideo = videoResponse
    // })
    //
    // // PUT TEST
    // it('- PUT video by incorrect ID', async function() {
    //     await request(app).put('/videos/')
    //         .send({})
    //         .expect(HttpCodes.HTTP_404)
    //
    //     await request(app).put('/videos/123')
    //         .send({title: 'hello', author: 'hello2'})
    //         .expect(HttpCodes.HTTP_404)
    //
    // })
    //
    // it('- PUT video with incorrect data - check validation (minage incorrect)', async function() {
    //     const putResponse = await request(app).put(`/videos/${newVideo.id}`)
    //         .send({
    //             minAgeRestriction: 21
    //         }).expect(HttpCodes.HTTP_400)
    //     expect(putResponse.body).toEqual({
    //         errorsMessages: [
    //             {
    //                 message: expect.any(String),
    //                 field: 'title'
    //             },
    //             {
    //                 message: expect.any(String),
    //                 field: 'author'
    //             },
    //             {
    //                 message: expect.any(String),
    //                 field: 'minAgeRestriction'
    //             }
    //         ]
    //     })
    // })
    //
    // it('- PUT video with incorrect data - check validation (minage correct)', async function() {
    //     const videoData = {
    //         minAgeRestriction: 17,
    //         author: 'hello 2',
    //         title: 'hello 3'
    //     }
    //     const putResponse = await request(app).put(`/videos/${newVideo.id}`)
    //         .send(videoData).expect(HttpCodes.HTTP_204)
    // })
    //
    // it('- PUT video with incorrect data - check validation', async function() {
    //     const putResponse = await request(app).put(`/videos/${newVideo.id}`)
    //         .send({
    //             title: 'sfhaskjdfhasjdfhaksdhfkjasdfhjasdfjahsdjkfhasjkdfhasdfhasdfkjasdfjk',
    //             author: '42342424234234242342342424234wdfsfsdwerwerw'
    //         }).expect(HttpCodes.HTTP_400)
    //     expect(putResponse.body).toEqual({
    //         errorsMessages: [
    //             {
    //                 message: expect.any(String),
    //                 field: 'title'
    //             },
    //             {
    //                 message: expect.any(String),
    //                 field: 'author'
    //             }
    //         ]
    //     })
    // })
    //
    // // DELETE TEST
    // it('- DELETE video by incorrect ID', async function() {
    //     const res = await request(app).delete('/videos/123')
    //     expect(res.status).toBe(HttpCodes.HTTP_404)
    // })
    //
    // it('+ DELETE video by incorrect ID', async function() {
    //     const res = await request(app).delete(`/videos/${newVideo.id}`)
    //     expect(res.status).toBe(HttpCodes.HTTP_204)
    // })
})