import React from 'react'

const Error = ({message}) => {
    if (message) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    } else {
        return null
    }
}

export default Error
