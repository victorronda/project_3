import React from 'react'
import { withAuth } from '../context/AuthProvider'

const LoginAdmin = () => {
    return (
        <div>
            <h1>Admin Loooogin</h1>
        </div>
    )
}

export default withAuth(LoginAdmin)
