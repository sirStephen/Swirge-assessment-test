import request from 'supertest';
import app from '../server.js';

beforeAll(() => {
    process.env.NODE_ENV = 'test'
})

describe('HOME ROUTE', () => {
    it('responds to /', async () => {
        const res = await request(app).get('/');

        expect(/json/)
        expect(res.status).toBe(200);
        expect(res.body).toEqual({"message":"Welcome to the beginning of nothingness."});
    })
});

describe('CATFACT', () => {
    describe('cat fact ID does not exist', () => {
        it('it should attempt to get a single cat fact but return a status of 404', async () => {
            const id = 'catfact-id';
            const res = await request(app).get(`/api/v1/onecatfact/${id}`);

            expect(res.status).toBe(404);
            expect(/json/);
            expect(res.body.success).toEqual(true);
            expect.objectContaining(res.body.result);
            expect(res.body.result.message).toEqual(`cat fact with id ${id} is invalid`);
        })
    })

    describe('cat fact ID exist', () => {
        it('it should get a single cat fact and return a status of 200', async () => {
            const id = '58e008630aac31001185ed01';
            const res = await request(app).get(`/api/v1/onecatfact/${id}`);

            expect(res.status).toBe(200);
            expect(/json/);
            expect(res.body.success).toEqual(true);
            expect.objectContaining(res.body.result);
            expect.objectContaining(res.body.result.message);
        })
    })

    describe('get all cat facts', () => {
        it('it should fetch all cat facts and return a status of 200', async () => {
            const res = await request(app).get('/api/v1/allcatfacts');

            expect(res.status).toBe(200);
            expect(/json/)
            expect(res.body.success).toEqual(true);
            expect.objectContaining(res.body.result.message);
        })
    });

    describe('successfully add cat facts', () => {
        it('it should return a status of 201', () => {
            const res = request(app).post(`/api/v1/addcatfacts`);

            res.then((data) => {
                expect(data.length).toBeGreaterThan(0);
                data.map((post) => {
                    console.log(post);
                    expect(post).toEqual(
                        expect.objectContaining({post}),
                        expect(res.status).toBe(201),
                        expect(/json/),
                        expect(res.body.success).toEqual(true),
                        expect.objectContaining(res.body.result.message)
                    )
                })
            })
        })
    });  

    describe('update cat fact', () => {
        it('it should update a single cat fact and return a status of 200', async () => {
            const id = '58e008780aac31001185ed05';
            let info = {
                text: 'Change type from cat to dog',
                type: 'dog'
            }

            const res = await request(app).put(`/api/v1/updatecatfact/${id}`).send(info)
            expect(res.status).toBe(200);
            expect(/json/)
            expect(res.body.success).toEqual(true);
            expect(res.body.result.statusCode).toBe(200);
            expect.objectContaining(res.body.result);
        })
    });

    describe('update cat fact ID does not exist', () => {
        it('it should attempt to update a single cat fact but return a status of 404', async () => {
            const id = '58e008630aac31001185ed';
            let info = {
                text: 'test update for cat'
            }

            const res = await request(app).put(`/api/v1/updatecatfact/${id}`).send(info)
            expect(res.status).toBe(404);
            expect(/json/)
            expect(res.body.success).toEqual(true);
            expect(res.body.result.statusCode).toBe(404);
            expect.objectContaining(res.body.result);
            expect(res.body.result.message).toEqual(`cat fact with id ${id} is invalid`);
        })
    });

    describe('delete cat fact', () => {
        it('it should delete and return a status of 200', async () => {
            const id = '58e008630aac31001185ed01';
            const res = await request(app).delete(`/api/v1/deletecatfact/${id}`);
            expect(res.status).toBe(200);
            expect(/json/)
            expect(res.body.success).toEqual(true);
            expect(res.body.result.statusCode).toBe(200);
            expect.objectContaining(res.body.result);
            expect(res.body.result.message).toEqual(`cat fact with id ${id} was deleted successfully`);
        })
    });

    describe('delete cat fact ID does not exist', () => {
        it('it should attempt do delete and return a status of 404', async () => {
            const id = '58e008630aac31001185ed';
            const res = await request(app).delete(`/api/v1/deletecatfact/${id}`);
            expect(res.status).toBe(404);
            expect(/json/)
            expect(res.body.success).toEqual(true);
            expect(res.body.result.statusCode).toBe(404);
            expect.objectContaining(res.body.result);
            expect(res.body.result.message).toEqual(`cat fact with id ${id} is invalid`);
        })
    });
})