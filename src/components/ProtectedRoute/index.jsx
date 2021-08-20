import React from 'react'
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'
import { API_URL } from '../../helpers/env'

const ProtectedRoute = ({ component: Component, history, ...rest }) => {
    let loginInformation;

    try {
        loginInformation = JSON.parse(localStorage.getItem('login'))
    } catch (error) {
        console.log(error.message);
    }

    if (!loginInformation) return <Redirect to="/auth" />

    if (!loginInformation.token) return <Redirect to="/auth" />

    axios.get(`${API_URL}/user/verify`, { headers: { Authorization: `Bearer ${loginInformation.token}` } })
        .catch((error) => {
            console.log(error.response);
        })



    return (
        <Route component={Component} {...rest} />
    )
}

export default ProtectedRoute