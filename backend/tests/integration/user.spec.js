const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('User', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })
    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to register a new User', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                user: "Pedro",
	            password: "123456789"
            })

        expect(response.body).toHaveProperty('token')
    })

    it('should be able to login a user', async () => {
         await request(app)
            .post('/register')
            .send({
                user: "Pedro2",
	            password: "123456789"
            })

        const response = await request(app)
            .post('/login')
            .send({
                user: "Pedro2",
	            password: "123456789"
            })

        expect(response.body).toHaveProperty('token')
    })
})