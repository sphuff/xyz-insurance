import React from 'react'
import './styles.css'
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import { PATHS } from '../constants'

const Header = () => {
    return (
        <header id="header">
            <h1 id="logo">XYZ</h1>
            <div className="header-link-container">
            <Link to={ PATHS.HOME }>Home</Link>
            <Link to={ PATHS.QUOTE }>Quote</Link>
            <Link to={ PATHS.CONTACT }>Contact Us</Link>
            </div>
        </header>
    )
}

export default Header;