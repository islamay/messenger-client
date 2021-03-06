import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, history, ...rest }) => {
    let loginInformation;

    loginInformation = JSON.parse(localStorage.getItem('login'))

    if (!loginInformation) return <Redirect to="/auth" />

    if (!loginInformation.token) return <Redirect to="/auth" />

    if (!loginInformation.publicProfile) return <Redirect to="/auth" />

    return (
        <Route component={Component} {...rest} />
    )
}

export default ProtectedRoute