const connection = require('../database/connection')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// FUNÇÃO GERADORA DE TOKENS, reutilizavel
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async register(req, res) {
        const { user, password } = req.body

        // CRIPTOGRAFIA DO PASSWORD, com bcrypt usando salt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // VERIFICAÇÃO SE O USUÁRIO JÁ EXISTE E INSERT DO NOVO NO BANCO, retorna um token
        const userExist = await connection('users')
            .where('user', user)
            .first()

        if (userExist) {
            return res.status(400).send({ error: 'O usuário já existe' })

        } else {
            const response = await connection('users').insert({
                user,
                password: hash
            })

            return res.json({
                response,
                token: generateToken({ id: response.id })
            })

        }
    },

    async login(req, res) {
        const { user, password } = req.body

        // VERIFICAÇÃO SE O USUÁRIO EXISTE E SE A SENHA ESTÁ CORRETA, retorna um token
        const response = await connection('users')
            .where('user', user)
            .first()

        if (!response) {
            return res.status(400).send({ error: 'Usuário não encontrado' })
        }

        if (!bcrypt.compareSync(password, response.password)) {
            return res.status(400).send({ error: 'Senha inválida' })
        }

        response.password = undefined

        res.send({
            response,
            token: generateToken({ id: response.id })
        })
    }
}