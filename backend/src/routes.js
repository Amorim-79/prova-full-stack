const express = require('express')

const routes = express.Router()

const authMiddleware = require('./middlewares/auth')

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const CategoryController = require('./controllers/CategoryController')

// ROTAS DE USUÁRIOS (REGISTRO, LOGIN)
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)


// ROTAS DAS TAREFAS (CRIAÇÃO, LISTAGEM, ATUALIZAÇÃO, EXCLUSÃO)
routes.post('/tasks', authMiddleware, TaskController.create)
routes.get('/tasks/:category', authMiddleware, TaskController.index)

routes.put('/task/:id', authMiddleware, TaskController.update)
routes.delete('/task/:id', authMiddleware, TaskController.delete)

// ROTA PARA LISTAR AS CATEGORIAS CRIADAS SEM REPETIÇÃO
routes.get('/categorys', CategoryController.index)

module.exports = routes