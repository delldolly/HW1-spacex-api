import React from "react";
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

import logo from './img/logo.png';

const App = () => {
  const logoStyle = {
    height: "90%"
  }
  return (

    <Router>
      <div class="topnav">
        <div className="logo-img">
          <img src={logo} style={logoStyle} />
        </div>
        <NavLink exact to="/" activeClassName="is-active">
          <span>Home</span>
        </NavLink>
        <NavLink to="/Rockets" activeClassName="is-active">
          <span>Rockets</span>
        </NavLink>
        <NavLink to="/Launches" activeClassName="is-active">
          <span>Launches</span>
        </NavLink>
      </div>

      <Switch>
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