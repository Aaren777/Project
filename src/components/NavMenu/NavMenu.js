import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Styles from './NavMenuStyle.module.css';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';


function NavMenu({ props,  isAuthenticated }) {
  return (
    <Navbar bg="dark" variant="dark" align-self= "flex-end">
      <Nav className={Styles.nav}>
      <div> 
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
            </div>
        {
          isAuthenticated ?
            <Button
            onClick= {()=>props.logout(
            )}
            >
            Log Out
            </Button>
            :
            <div >
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
            </div>
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
const mapDispatchToProps = {
  logout
};
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);