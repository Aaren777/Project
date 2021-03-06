import React, { useEffect } from 'react'
import Styles from './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button } from 'react-bootstrap';
import ToDo from "./components/Pages/ToDo/ToDo.js";
import About from "./components/Pages/About/About.js";
import Contact from "./components/Pages/Contact/Contact.js";
import Register from './components/Pages/Register/Register.js';
import Login from './components/Pages/Login/Login.js'
import NotFound from "./components/Pages/NotFound/NotFound.js";
import SingleTask from "./components/Pages/SingleTask/SingleTask.js";
import NavMenu from "./components/NavMenu/NavMenu";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './components/Spinner/spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from './helpers/history';
import AuthRoute from './components/AuthRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

const toastProps = {
  position: "bottom-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}
function App({ loading, successMessage, errorMessage }) {
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastProps);
    }
    if (errorMessage) {
      toast.error(errorMessage, toastProps);
    }
  }, [successMessage, errorMessage])
  return (
    <div
      className={Styles.app}>
      <Router history={history} >
        <NavMenu />
        <Switch>
          <AuthRoute
            path='/'
            component={ToDo}
            type='private'
            exact
          />
          <AuthRoute
            path='/home'
            component={ToDo}
            type='private'
            exact
          />
          <Route
            path='/about'
            component={About}
            exact
          />
          <Route
            path='/contact'
            component={Contact}
            exact
          />
          <AuthRoute
            path='/register'
            component={Register}
            type='public'
            exact
          />
          <AuthRoute
            path='/login'
            component={Login}
            type='public'
            exact
          />
          <AuthRoute
            path='/task/:taskId'
            component={SingleTask}
            type='private'
            exact
          />
          <Route
            path='/NotFound'
            component={NotFound}
            exact
          />
          <Redirect to='/NotFound' />
        </Switch>
      </Router>
      { loading && <Spinner />}
      <ToastContainer />
      <footer className={Styles.footer}>
       <div> <a href='https://github.com/Aaren777' target='_blank' rel='noreferrer noopener'><Button><FontAwesomeIcon icon={faCodeBranch}/>Github</Button></a></div>
        <div><a href='https://www.linkedin.com/in/aren-arzumanyan-05a04920a/' target='_blank' rel='noreferrer noopener'><Button><FontAwesomeIcon icon={faExternalLinkSquareAlt}/>Linkedin</Button></a></div>
      </footer>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage
  };
};
export default connect(mapStateToProps)(App);
