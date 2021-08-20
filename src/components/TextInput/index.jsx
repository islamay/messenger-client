import React from 'react'
import './style.scss'

const TextInput = ({ className, inputType, ...props }) => {

    if (inputType === "text-box") {
        return (
            <textarea className={`text-input-component ${className}`} {...props}></textarea>
        )
    }

    return (
        <input className={`text-input-component ${className}`} {...props} />
    )
}

export default TextInput