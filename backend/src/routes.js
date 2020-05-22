const express = require('express')

const routes = express.Router()

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

// ROTAS DE USUÁRIOS (REGISTRO, LOGIN)
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)


// ROTAS DAS TAREFAS (CRIAÇÃO, LISTAGEM, ATUALIZAÇÃO, EXCLUSÃO)
routes.post('/task', TaskController.create)
routes.get('/task', TaskController.index)
routes.put('/task/:id', TaskController.update)
routes.delete('/task/:id', TaskController.delete)

module.exports = routes