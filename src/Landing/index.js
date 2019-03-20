import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { PATHS } from '../constants'

const Landing = () => {  
    return (
        <div className="intro">
            <div className="intro-text-container">
            <h3>Jet Liability Insurance at the Speed of Sound</h3>
            <Link to={ PATHS.QUOTE }>Get a Quote</Link>
            </div>
        </div>
    )
}

export default Landing