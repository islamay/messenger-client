import React from 'react'
import {Route} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route component={<Component/>} {...rest}/>
    )
}