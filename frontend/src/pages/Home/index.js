import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import imgHome from '../../assets/3412977.jpg'

import './styles.css'

export default function Home() {
    return(
        <div className="container">

            <Link to="/register" className="link-home">
                <FiArrowLeft />            
                Criar Conta
            </Link>
            
            <img src={imgHome} alt="multiple tasks" />
            
            <Link to="/login" className="link-home">
                Entrar
                <FiArrowRight />
            </Link>
            
        </div>
    )
}