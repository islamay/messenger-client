import React from 'react'
import './style.scss'

const TextInput = ({ className, ...props }) => {
    return (
        <input className={`text-input-component ${className}`} {...props} />
    )
}

export default TextInput