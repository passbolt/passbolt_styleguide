/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.12.0
 */
import React, {Component} from "react";
import CheckMailBox from "./components/Authentication/CheckMailBox/CheckMailBox";
import {BrowserRouter as Router, Route} from "react-router-dom";
import DisplayBrowserNotSupported
  from "./components/Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported";
import InstallExtension from "./components/Authentication/InstallExtension/InstallExtension";
import DisplayError from "./components/Authentication/DisplayError/DisplayError";
import EnterUsernameForm from "./components/Authentication/EnterUsernameForm/EnterUsernameForm";
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import EnterNameForm from "./components/Authentication/EnterNameForm/EnterNameForm";
import {ApiClientOptions} from "./lib/apiClient/apiClientOptions";
import {ApiClient} from "./lib/apiClient/apiClient";
import SiteSettings from "./lib/Settings/SiteSettings";
import ApiFooter from "./components/Footer/ApiFooter";
import Delay from "./components/Common/Delay/Delay";
import LoadingSpinner from "./components/Common/Loading/LoadingSpinner/LoadingSpinner";
import AppContext from "./contexts/AppContext";

class ApiTriage extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      username: null, // The username to setup or recover or login
      siteSettings: null, // The site settings
      trustedDomain: window.location.origin, // The current url origin

      setContext: context => {
        this.setState(context);
      },
    };
  }

  async componentDidMount() {
    await this.getSiteSettings();
  }

  /**
   * Fetch the site settings
   */
  async getSiteSettings() {
    const apiClientOptions = new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain)
      .setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const {body} = await apiClient.findAll();
    await this.setState({siteSettings: new SiteSettings(body)});
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <ActionFeedbackContextProvider>
          <Router>
            <div id="container" className="container page login">
              <div className="content">
                <div className="header">
                  <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                </div>
                <div className="login-form">
                  <Route exact path={['/auth/login', '/users/recover']}>
                    <Delay
                      duration={1000}
                      fallback={<LoadingSpinner/>}>
                      <EnterUsernameForm/>
                    </Delay>
                  </Route>
                  <Route path="/setup/name">
                    <EnterNameForm/>
                  </Route>
                  <Route path={["/setup/check-mailbox", "/setup/recover/check-mailbox", "/auth/login/check-mailbox"]}>
                    <CheckMailBox/>
                  </Route>
                  <Route path={["/setup/not-supported", "/setup/recover/not-supported"]}>
                    <DisplayBrowserNotSupported/>
                  </Route>
                  <Route path={["/setup/install/:userId/:token", "/setup/recover/:userId/:token"]}>
                    <Delay
                      duration={1000}
                      fallback={<LoadingSpinner/>}>
                      <InstallExtension/>
                    </Delay>
                  </Route>
                  <Route path={["/setup/error", "/setup/recover/error", "/auth/login/error"]}>
                    <DisplayError/>
                  </Route>
                </div>
              </div>
            </div>
          </Router>
          <ApiFooter siteSettings={this.state.siteSettings}/>
        </ActionFeedbackContextProvider>
      </AppContext.Provider>
    );
  }
}

export default ApiTriage;
