import React from 'react'
import {Nav, Navbar } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import Styles from './NavMenuStyle.module.css'

export default function NavMenu() {
  return(
    <Navbar bg="dark" variant="dark">
        <Nav className="ml-3" width="100%">
            <NavLink className="mr-3"
             to='/'
             activeClassName={Styles.active}
             exact
             >
             Home
             </NavLink>
            <NavLink className="mr-3"
            to='/about'
            activeClassName={Styles.active}
            exact
            >
            About Us
            </NavLink>
            <NavLink 
            to='/contact'
            activeClassName={Styles.active}
            exact
            >Contact
            </NavLink>
        </Nav>
    </Navbar>
  )
}