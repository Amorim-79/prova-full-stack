import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'
import { login } from '../../services/auth'

export default function Register() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    // FUNÇÃO QUE REALIZA O REGISTRO
    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            user,
            password
        }

        try{
            const response = await api.post('/register', data)

            login(response.data.token)
            localStorage.setItem('userId',response.data.response.id)

            alert('Usuário criado com sucesso.')

            history.push('/main')
        }catch(err) {
            alert('Erro ao criar usuário, tente novamente.')
        }
    }

    return(
        <div className="register-container">
            <h1>Criar uma nova conta</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <input
                type="text"
                placeholder="Usuário"
                value={user}
                onChange={e => setUser(e.target.value)}
                />

                <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Criar conta</button>
            </form>
            <Link className="link-redirect" to="/login">
                <FiArrowLeft />
                Já tenho conta
            </Link>
        </div>
    )
}