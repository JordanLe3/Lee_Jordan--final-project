import React, {useState, useEffect} from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navigation from './components/shared/Navigation';
import Footer from './components/shared/Footer'
import Homepage from './components/pages/Homepage';
import Portfolio from './components/pages/Portfolio';
import Resume from './components/pages/Resume';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import AddUser from './components/pages/AddUser';
import PrivateRoute from './components/shared/PrivateRoute'
import Listings from './components/pages/Listing'
import isAuthenticated from './helpers/authHelper'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    isAuthenticated() ? console.log(true) : console.log(false);
  }, []);
  return (
    <BrowserRouter>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/Portfolio" component={Portfolio} />
        <Route exact path="/Resume" component={Resume} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/Login" component={Login}/>
        <PrivateRoute path="/Submissions">
          <Listings/>
        </PrivateRoute>
        <PrivateRoute path="/AddUser">
          <AddUser/>
        </PrivateRoute>
      </Switch>
      <Footer/> 
    </BrowserRouter>
  );
}

export default App;