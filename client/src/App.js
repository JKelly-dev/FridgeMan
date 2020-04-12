import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./app.scss";
//Pages
import Stocks from "./pages/Stocks/Stocks";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
//Icons
import Hamburger from "./assets/images/Hamburger";
import CloseMenu from "./assets/images/CloseMenu";
import DashboardIcon from "./assets/images/Dashboard";
import LoginIcon from "./assets/images/LogIn";
import SignupIcon from "./assets/images/Signup";
import HomeIcon from "./assets/images/Home";

const App = () => {
  //State
  const [isMobile, setIsMobile] = useState();
  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  //Component Functions
  const openNavigation = () => {
    setNavOpen(true);
  };
  const closeNavigation = () => {
    setNavOpen(false);
  };
  const checkMobile = () => {
    if (window.innerWidth <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const getLocations = async () => {
    await fetch("/api/locations")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocationList(data);
      });
  };
  const authenticateUser = async () => {
    await fetch("/api/auth/", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        if (data.response) {
          setIsAuthenticated(data.response);
          setEmail(data.email);
          setIsLoading(false);
          return true;
        } else {
          setIsAuthenticated(false);
          setEmail("");
          setIsLoading(false);
          return false;
        }
      });
    });
  };
  const LoadingPage = () => (
    <div className="loading page">
      <section className="loading">
        <span className="background-text">Loading...</span>
        <div className="loading-content">
          <h1>Loading...</h1>
        </div>
      </section>
    </div>
  );

  //Listeners
  useEffect(() => {
    getLocations();
    checkMobile();
    authenticateUser();
  }, []);

  window.addEventListener("resize", checkMobile);

  return (
    <Router>
      {!isMobile ? (
        <div className="navigation-bar">
          <div className="navigation-background">
            <div className="navigation-background-top"></div>
            <svg
              version="1.1"
              className="navigation-curve"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1920 100"
            >
              <path d="M1920,0C1152,100,768,100,0,0L1920,0z" />
            </svg>
          </div>
          <nav className="desktop">
            <ul>
              <li>
                <NavLink activeClassName="active" to="/home">
                  <HomeIcon />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/login">
                  <LoginIcon />
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/signup">
                  <SignupIcon />
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/dashboard">
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="navigation-bar">
          <nav className="mobile">
            <div
              className="circle"
              style={{
                width: navOpen ? "100vw" : "140px",
                height: navOpen ? "100vh" : "140px",
                borderRadius: navOpen ? "0" : "100px",
                top: navOpen ? "0" : "-70px",
                right: navOpen ? "0" : "-70px",
              }}
              onClick={navOpen ? closeNavigation : openNavigation}
            >
              <Hamburger navOpen={navOpen}></Hamburger>
            </div>
          </nav>
          <nav
            className="mobile-full"
            style={{
              transitionDelay: navOpen ? ".2s" : "0s",
              opacity: navOpen ? 1 : 0,
              pointerEvents: navOpen ? "auto" : "none",
            }}
          >
            <div className="navigation-content">
              <span className="background-text">Navigation</span>
              <ul>
                <li>
                  <CloseMenu closeNavigation={closeNavigation} />
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to="/home"
                    onClick={closeNavigation}
                  >
                    <HomeIcon />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to="/login"
                    onClick={closeNavigation}
                  >
                    <LoginIcon />
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to="/signup"
                    onClick={closeNavigation}
                  >
                    <SignupIcon />
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    to="/dashboard"
                    onClick={closeNavigation}
                  >
                    <DashboardIcon />
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}

      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route path="/signup">
                  {isLoading ? (
                    <LoadingPage />
                  ) : !isAuthenticated ? (
                    <Signup isMobile={isMobile} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )}
                </Route>
                <Route path="/login">
                  {isLoading ? (
                    <LoadingPage />
                  ) : !isAuthenticated ? (
                    <Login isMobile={isMobile} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )}
                </Route>
                <Route path="/locations">
                  {isLoading ? (
                    <LoadingPage />
                  ) : isAuthenticated ? (
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
                  {isLoading ? (
                    <LoadingPage />
                  ) : isAuthenticated ? (
                    <Stocks locationList={locationList} isMobile={isMobile} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/dashboard">
                  {isLoading ? (
                    <LoadingPage />
                  ) : isAuthenticated ? (
                    <Dashboard email={email} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/home">
                  <Home isMobile={isMobile} />
                </Route>
                <Route path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
};

export default App;
