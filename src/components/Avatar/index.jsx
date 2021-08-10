import React from 'react'
import './style.scss'

const Avatar = ({ avatarSrc, ...rest }) => {

    return (
        <div className={`avatar-component`} {...rest}>
            <img src={avatarSrc} alt="avatar" />
        </div>
    )
}

export default Avatar