import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import { isAuthenticated } from './services/auth'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Main from './pages/Main'
import NewTask from './pages/NewTask'

// APLICANDO AUTHENTICAÇÃO E CRIANDO ROTAS PRIVADAS
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: {from: props.location} }} />
        )
    } />
)

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/main" component={Main} />
                <PrivateRoute path="/task/new" component={NewTask} />
            </Switch>
        </BrowserRouter>
    )
}