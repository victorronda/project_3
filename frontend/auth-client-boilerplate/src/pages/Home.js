import React from 'react'
import { withAuth } from '../context/AuthProvider'

const Home = () => {

    
    return (
        <div>
            <h1>Holiiiiiiii (home)</h1>
        </div>
    )
}

export default withAuth(Home)
