import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import MainMenu, { MainMenuItem } from './components/MainMenu/MeinMenu';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import KorisnikPage from './components/KorisnikPage/KorisnikPage';
import { Switch } from 'react-router';
import KorisnikLoginPage from './components/KorisnikLoginPage/KorisnikLoginPage';
import KontaktPage from './components/KontakPage/KontaktPage';
import { KorisnikRegistrationPage } from './components/KorisnikRegistrattionPage/KorisnikRegistrattionPage';

const menuItems = [
  new MainMenuItem('Home', '/'),
  new MainMenuItem('Korisnik', '/korisnik'),
  new MainMenuItem('Registracija korisnika', '/register/korisnik'),
  new MainMenuItem('Log in', '/login/korisnik'),
]

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items = { menuItems }></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path = "/" component = { HomePage }></Route>
        <Route path = "/korisnik" component = { KorisnikPage }></Route>
        <Route path = "/kontakt/:kId" component = { KontaktPage }></Route>
        <Route path = "/register/korisnik" component = { KorisnikRegistrationPage }></Route>
        <Route path = "/login/korisnik" component = { KorisnikLoginPage }></Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
