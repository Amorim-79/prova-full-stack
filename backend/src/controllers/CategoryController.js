const connection = require('../database/connection')

module.exports = {
    async index (req, res) {
        const user_id = req.headers.user

        const category = await connection('tasks')
            .where('user_id', user_id)
            .select('category')
            .distinct()

        res.json(category)
    }
}