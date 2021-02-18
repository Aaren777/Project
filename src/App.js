import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from "./components/Pages/ToDo/ToDo.js";
import About from "./components/Pages/About/About.js";
import Contact from "./components/Pages/Contact/Contact.js";
import NotFound from "./components/Pages/NotFound/NotFound.js";
import SingleTask from "./components/Pages/SingleTask/SingleTask.js";
import NavMenu from "./components/NavMenu/NavMenu";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavMenu/>
        <Switch>
          <Route
          path= '/'
          component= {ToDo}
          exact
          />
          <Route
          path= '/home'
          component= {ToDo}
          exact
          />
          <Route
          path= '/about'
          component= {About}
          exact
          />
          <Route
          path= '/contact'
          component= {Contact}
          exact
          />
          <Route
          path= '/task/:taskId'
          component= {SingleTask}
          exact
          />
          <Route
          path= '/NotFound'
          component= {NotFound}
          exact
          />
          <Redirect to='/NotFound'/>
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
