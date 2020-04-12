import React, { Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import MainMenu from "./components/Common/MainMenu/MainMenu";
import ReportsWorkspace from "./components/Workspace/Reports/ReportsWorkspace";
import Footer from "./components/Common/Footer/Footer";

import AppContext from "./contexts/AppContext";

class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

class App extends Component{
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.getSettings();
    this.getLoggedInUser();
    this.getAccountSettings();
  }

  getDefaultState() {
    return {
      showStart: true,
      appContext: {
        "serverSettings": {},
        "accountSettings": {},
        "currentUser": {}
      }
    }
  }

  getSettings() {
    fetch('/settings.json').then((serverSettings) => {
      this.state.appContext.serverSettings = serverSettings;
      this.setState({ "appContext" : { ...this.state.appContext, serverSettings: serverSettings } });
    });
  }

  getLoggedInUser() {
    fetch('/me.json').then((currentUser) => {
      this.setState({ "appContext" : { ...this.state.appContext, currentUser: currentUser.body } });
     // this.state.appContext.currentUser = currentUser.body;
    });
  }

  getAccountSettings() {
    // TODO: Only make the call if allowed.
    fetch('/account/settings.json').then((accountSettings) => {
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

    // Else, call the report workspace.
    //document.location.href='menuItem.url';
    console.log("go to url", menuItem.url);
    return;
  }

  render(){
    return(
        <AppContext.Provider value={this.state.appContext}>
          <Router>
            <div>
              <div id="container" className="page">
                <div className="header first">
                  <MainMenu onClick={this.handleWorkspaceSelect} />
                </div>
                <Switch>
                  <Route path="/reports">
                    <ReportsWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
                  </Route>
                  <Route path="/">
                    <div className="home">This is home</div>
                  </Route>
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
