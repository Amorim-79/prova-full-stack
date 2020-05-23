import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'

export default function NewTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [initialDate, setInitialDate] = useState('')
    const [finalDate, setFinalDate] = useState('')

    const userId = localStorage.getItem('userId')

    const history = useHistory()

    // FUNÇÃO QUE CRIA UMA NOVA TASK
    async function handleNewTask(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            category,
            initialDate,
            finalDate
        }

        try{
            await api.post('/tasks', data, {
                headers: {
                    user: userId
                }
            })

            alert('Tarefa criada com sucesso.')

            history.push('/main')
        }catch(err){
            alert('Erro ao criar tarefa, verifique os campos e tente novamente.')
        }
    }

    return (
        <div className="new-task-container">
            <h1>Criar uma nova tarefa</h1>
            <form onSubmit={handleNewTask} className="task-form">
                <input
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />

                <textarea
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />

                <input
                placeholder="Categoria"
                value={category}
                onChange={e => setCategory(e.target.value)}
                />

                <label>Data Inicial(opcional)</label>
                <input
                type="datetime-local"
                name="initial_date"
                value={initialDate}
                onChange={e => setInitialDate(e.target.value)}
                />

                <label>Data Final(opcional)</label>
                <input
                type="datetime-local"
                name="final_date"
                value={finalDate}
                onChange={e => setFinalDate(e.target.value)}
                />

                <button type="submit">Criar</button>
            </form>

            <Link className="link-redirect" to="/main" style={{marginTop: 20}}>
                <FiArrowLeft />
                Voltar para as tarefas
            </Link>
        </div>
    )
}