import React from 'react';
import { Nav, Navbar, button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Styles from './NavMenuStyle.module.css';
import { connect } from 'react-redux';

function NavMenu({ isAuthenticated }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="ml-3" width="100%">
        {
          isAuthenticated &&
          <NavLink className="mr-3"
            to='/'
            activeClassName={Styles.active}
            exact
          >
            Home
             </NavLink>
        }
        <NavLink className="mr-3"
          to='/about'
          activeClassName={Styles.active}
          exact
        >
          About Us
            </NavLink>
        <NavLink className="mr-3"
          to='/contact'
          activeClassName={Styles.active}
          exact
        >Contact
            </NavLink>
        {
          isAuthenticated ?
            <button>Log Out</button>
            :
            <>
              <NavLink className="mr-3"
                to='/login'
                activeClassName={Styles.active}
                exact
              >Login
            </NavLink>
              <NavLink
                to='/register'
                activeClassName={Styles.active}
                exact
              >Register
            </NavLink>
            </>
        }
      </Nav>
    </Navbar>
  )
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};
export default connect(mapStateToProps)(NavMenu);