import React from 'react'
import { withAuth } from '../context/AuthProvider'

const MainAdmin = () => {
    return (
        <div>
            <h1>Esto es Main Admin</h1>
        </div>
    )
}

export default withAuth(MainAdmin)
