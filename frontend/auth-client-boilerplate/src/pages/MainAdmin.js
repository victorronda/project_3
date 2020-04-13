import React from 'react'
import { withAuth } from '../context/AuthProvider'

const MainAdmin = () => {
    return (
        <div>
            <h1>Main Adminn!!</h1>
        </div>
    )
}

export default withAuth(MainAdmin)
