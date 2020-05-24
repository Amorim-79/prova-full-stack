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

    it('should be able to create a new task', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                user: "Pedro",
	            password: "123456789"
            })

            const response = await request(app)
            .post('/tasks')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            .send({
                title: "Comprar cenoura",
	            description: "Ir ao mercado comprar cenoura",
	            category: "Compras",
	            initial_date: "2020-05-23T03:19",
            	final_date: "2020-05-24T03:19"
            })

        expect(response.body).not.toBeNull()
    })

    it('should be able to list all tasks', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                user: "Pedro",
	            password: "123456789"
            })

        await request(app)
            .post('/tasks')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            .send({
                title: "Comprar cenoura",
	            description: "Ir ao mercado comprar cenoura",
	            category: "Compras",
	            initial_date: "2020-05-23T03:19",
            	final_date: "2020-05-24T03:19"
            })

        const response = await request(app)
            .get('/tasks/*')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            

        expect(response.body).not.toBeNull()
    })

    it('should be able to update a task', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                user: "Pedro",
	            password: "123456789"
            })

        await request(app)
            .post('/tasks')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            .send({
                title: "Comprar cenoura",
	            description: "Ir ao mercado comprar cenoura",
	            category: "Compras",
	            initial_date: "2020-05-23T03:19",
            	final_date: "2020-05-24T03:19"
            })

        await request(app)
            .put('/tasks/1')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            
        expect(204)
    })

    it('should be able to delete a task', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                user: "Pedro",
	            password: "123456789"
            })

        await request(app)
            .post('/tasks')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            .send({
                title: "Comprar cenoura",
	            description: "Ir ao mercado comprar cenoura",
	            category: "Compras",
	            initial_date: "2020-05-23T03:19",
            	final_date: "2020-05-24T03:19"
            })

        await request(app)
            .delete('/tasks/1')
            .set('user', 1)
            .set('authorization', `Bearer ${user.body.token}`)
            
        expect(204)
    })

})