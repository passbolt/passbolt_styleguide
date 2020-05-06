import React, { Component} from "react";
import MainMenu from "./components/Common/MainMenu/MainMenu";
import ReportsWorkspace from "./components/Workspace/Reports/ReportsWorkspace";
import Footer from "./components/Common/Footer/Footer";
import AppContext from "./contexts/AppContext";
import PasswordsWorkspace from "./components/Workspace/Passwords/PasswordsWorkspace";

import config from "./config/config";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component{
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.initEventHandlers();
  }

  componentDidMount() {
    this.setState({"loading": false});


    this.initServerSettingsWithDefaults();
    this.getSettings();
    this.getLoggedInUser();
    this.getAccountSettings();
  }

  initEventHandlers() {
    this.LaunchingScreen = this.LaunchingScreen.bind(this);
    this.MainMenu = this.MainMenu.bind(this);
  }

  /**
   * Init server settings with default.
   * At least, we initialize the base url, since some critical components will need it.
   */
  initServerSettingsWithDefaults() {
    const baseUrl = this.getBaseUrl();
    const serverSettings = {
      "app": {
        "url": baseUrl
      }
    }
    this.setState({ "appContext" : { ...this.state.appContext, serverSettings: serverSettings } });
  }

  getDefaultState() {
    return {
      showStart: true,
      loading: true,
      appContext: {
        "serverSettings": {},
        "accountSettings": {},
        "currentUser": {}
      }
    }
  }

  getBaseUrl() {
    const baseUrl = document.getElementsByTagName("base");
    if (baseUrl) {
      return baseUrl[0].getAttribute('href');
    }

    return "/";
  }

  getSettings() {
    fetch(config.url.settings)
    .then(response => {
      return response.json()
    })
    .then((serverSettings) => {
      this.state.appContext.serverSettings = serverSettings;
      this.setState({ "appContext" : { ...this.state.appContext, serverSettings: serverSettings } });
    });
  }

  getLoggedInUser() {
    fetch(config.url.currentUser)
    .then(response => {
      return response.json()
    })
    .then((currentUser) => {
      this.state.appContext.currentUser = currentUser.body;
      this.setState({ "appContext" : { ...this.state.appContext, currentUser: currentUser.body } });
    });
  }

  getAccountSettings() {
    // TODO: Only make the call if allowed.
    fetch(config.url.accountSettings).then((accountSettings) => {
      this.state.appContext.accountSettings = accountSettings.body;
      this.setState({ "appContext" : { ...this.state.appContext, accountSettings: accountSettings } });
    });
  }

  handleWorkspaceSelect(menuItem) {
    // If we selected anything else than reports, redirect to the corresponding url.
    if(menuItem.id === 'reports') {
      console.log("display report");
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log("go to url", menuItem.url);
    } else {
      document.location.href= menuItem.url;
    }
  }

  LaunchingScreen() {
    return (
      <div className="launching-screen">
        <div className="launching-screen-holder">
          <div className="logo no-img">
            <h1>
              <span>Passbolt</span>
            </h1>
          </div>
          <div className="progress-bar-wrapper">
        <span className="progress-bar big infinite">
          <span className="progress "></span>
        </span>
          </div>
          <p className="details">loading, please wait...</p>
        </div>
      </div>
    );
  }

  MainMenu() {
    return (
      <div className="home">
        <div style={{padding:'1em'}}>
          <h1>Reports</h1>
          <ul>
            <li>
              <Link to="/passwords">Passwords dashboard</Link>
            </li>
            <li>
              <Link to="/reports">Reports dashboard</Link>
            </li>
            <li>
              <Link to="/reports/mfa-users-onboarding">HTML Iframe Report</Link>
            </li>
            <li>
              <Link to="/reports/xxxx">Report doesnt exist</Link>
            </li>
            <li>
              <Link to="/reports/report-loading">Report is loading</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }


  render(){
    return(
        <AppContext.Provider value={this.state.appContext}>
          <Router basename="/app">
            <div>
              <div id="container" className="page">
                {this.state.loading &&
                  <this.LaunchingScreen/>
                }
                <div className="header first">
                  <MainMenu onClick={this.handleWorkspaceSelect} />
                </div>
                <Switch>
                  <Route path="/passwords">
                    <PasswordsWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
                  </Route>
                  <Route path="/reports">
                    <ReportsWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
                  </Route>
                  {process.env.NODE_ENV === 'development' &&
                  <Route path="/">
                    <this.MainMenu/>
                  </Route>
                  }
                </Switch>
              </div>
              <Footer/>
            </div>
          </Router>
        </AppContext.Provider>
    );
  }
}

export default App;
