import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'
import { login } from '../../services/auth'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    // FUNÇÃO QUE REALIZA O LOGIN
    async function handleLogin(e) {
        e.preventDefault()

        const data = {
            user,
            password
        }

        try{
            const response = await api.post('/login', data)

            login(response.data.token)

            localStorage.setItem('userId',response.data.response.id)

        history.push('/main')
        }catch(err){
            alert('Falha no login, tente novamente. ')
        }
    }

    return(
        <div className="login-container">
            <h1>Faça login</h1>
            <form className="login-form" onSubmit={handleLogin}>
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

                <button type="submit">Entrar</button>
            </form>
            <Link className="link-redirect" to="/register">
                <FiArrowLeft />
                Ainda não possuo conta
            </Link>
        </div>
    )
}