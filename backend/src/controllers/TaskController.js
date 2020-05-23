const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { title, description, category, initialDate, finalDate } = req.body

        const user_id = req.headers.user

        const response = await connection('tasks').insert({
            title,
            description,
            category,
            initial_date: initialDate,
            final_date: finalDate,
            user_id,
        })

        res.json(response)
    },

    async update(req, res) {
        const { id } = req.params
        const user_id = req.headers.user

        const task = await connection('tasks')
            .where('id', id)
            .select('user_id', 'status')
            .first()

        // VERIFICA SE O USUÁRIO É DONO DA TASK
        if (task.user_id != user_id) {
            return res.status(401).json({ error: 'Operação não permitida.' })
        }

        // ALTERA O STATUS DA TASK (true / false | 0 / 1)
        let status = task.status

        status == 0 ? status = 1 : status = 0

        await connection('tasks').where('id', id).update({
            status
        })

        return res.status(204).send()
    },

    async delete(req, res) {
        const { id } = req.params
        const user_id = req.headers.user

        const task = await connection('tasks')
            .where('id', id)
            .select('user_id')
            .first()

        // VERIFICA SE O USUÁRIO É DONO DA TASK
        if (task.user_id != user_id) {
            return res.status(401).json({ error: 'Operação não permitida.' })
        }

        await connection('tasks').where('id', id).delete()

        return res.status(204).send()
    },

    async index (req, res) {
        const user_id = req.headers.user

        // LISTA TODAS AS TASKS DO USUÁRIO LOGADO
        const tasks = await connection('tasks')
            .where('user_id', user_id)
            .select('*')

        return res.json(tasks)
    }
}