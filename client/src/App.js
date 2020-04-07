import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//Pages
import Stocks from "./pages/Stocks/Stocks";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const App = () => {
  //State
  const [isMobile, setIsMobile] = useState();
  const [locationList, setLocationList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Component Functions
  const checkMobile = () => {
    if (window.innerWidth <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const logOut = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  };
  const getLocations = async () => {
    await fetch("http://localhost:5000/api/locations")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocationList(data);
      });
  };
  const authenticateUser = async () => {
    await fetch("http://localhost:5000/api/auth/", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        if (data.response) {
          setIsAuthenticated(data.response);
        } else {
          setIsAuthenticated(false);
        }
      });
    });
  };

  //Listeners
  useEffect(() => {
    getLocations();
    checkMobile();
    authenticateUser();
  }, []);

  window.addEventListener("resize", checkMobile);

  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">Stocks</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
            {!isAuthenticated ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/locations">
            {isAuthenticated ? (
              <Locations
                locationList={locationList}
                setLocationList={setLocationList}
                getLocations={getLocations}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/stocks">
            {isAuthenticated ? (
              <Stocks locationList={locationList} isMobile={isMobile} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default App;
