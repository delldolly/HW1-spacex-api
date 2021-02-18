import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink
} from "react-router-dom";

import './App.css';

import Home from './Components/Home';
import Rockets from './Components/Rockets';
import Launches from './Components/Launches';
import LaunchDetail from './Components/LaunchDetail';
import RocketsDetail from './Components/RocketsDetail';

import logo from './img/logo.png';
import { Nav } from "reactstrap";

const App = () => {
  const logoStyle = {
    height: "90%"
  }
  return (

    <Router>
      <div class="topnav">
        {/* Left - logo */}

        <Link to="/">
          <div className="logo-img">
            <img src={logo} style={logoStyle} />
          </div>
        </Link>

        {/* Right - menu */}
        <ul className="nav-menu">

          <NavLink exact to="/" className="nav-menu" activeClassName="is-active">
            <li>Home</li>
          </NavLink>

          <NavLink to="/Rockets" className="nav-menu" activeClassName="is-active">
            <li>Rockets</li>
          </NavLink>

          <NavLink to="/Launches" className="nav-menu" activeClassName="is-active">
            <li>Launches</li>
          </NavLink>

        </ul>
      </div>

      {/* Switch path */}
      <Switch>
        <Route path="/LaunchDetails/:id">
          <LaunchDetail />
        </Route>
        <Route path="/RocketsDetail/:id">
          <RocketsDetail />
        </Route>
        <Route path="/Rockets">
          <Rockets />
        </Route>
        <Route path="/Launches">
          <Launches />
        </Route>
        <Route path="/">
          <Home />
        </Route>

      </Switch>

    </Router>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
{/* 
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Rockets">Rockets</Link>
          </li>
          <li>
            <Link to="/Launches">Launches</Link>
          </li>
        </ul> */}