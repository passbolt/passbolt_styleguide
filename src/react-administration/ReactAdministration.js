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
 */

import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppContext from "./contexts/AppContext";
import DialogContextProvider from "./contexts/Common/DialogContext";
import ContextualMenuContextProvider from "./contexts/Common/ContextualMenuContext";
import AdministrationWorkspaceContextProvider from "./contexts/AdministrationWorkspaceContext";
import {ApiClient} from "./lib/apiClient/apiClient";
import {ApiClientOptions} from "./lib/apiClient/apiClientOptions";
import AdministrationWorkspace from "./components/Administration/AdministrationWorkspace";
import ActionFeedbackContextProvider from "../react-extension/contexts/ActionFeedbackContext";
import ShareActionFeedbacks from "../react-extension/components/Share/ShareActionFeedbacks";
import ManageDialogs from "../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import ManageContextualMenu from "../react-extension/components/ManageContextualMenu";
import ResourceWorkspaceContextProvider from "../react-extension/contexts/ResourceWorkspaceContext";

class ReactAdministration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallbacks();
    this.initEventHandlers();
  }

  async componentDidMount() {
    this.getLoggedInUser();
  }

  getDefaultState() {
    return {
      loggedInUser: null, // The logged in user
      trustedDomain: window.location.origin,

      displayTestUserDirectoryDialogProps: {
        userDirectoryTestResult: null, // The result of the test user directory
      },

      setContext: context => {
        this.setState(context);
      },
      setLoggedInUser: () => {
      }, // Set the logged in user
    };
  }

  bindCallbacks() {
  }

  initEventHandlers() {
  }

  async getLoggedInUser() {
    // http://passbolt.local/users/d57c10f5-639d-5160-9c81-8a0c6c4ec856.json?api-version=v2&contain%5Bprofile%5D=1
    const apiClientOptions = new ApiClientOptions().setBaseUrl(this.state.trustedDomain).setResourceName("users");
    const apiClient = new ApiClient(apiClientOptions);
    const result = await apiClient.get("me");
    this.setLoggedInUser(result.body);
  }

  setLoggedInUser(loggedInUser) {
    this.setState({loggedInUser});
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <ActionFeedbackContextProvider>
          <DialogContextProvider>
            <ContextualMenuContextProvider>
              { /* Action Feedback Management */}
              <ShareActionFeedbacks/>
              <Router>
                <Switch>
                  <Route path="/app/administration">
                    <AdministrationWorkspaceContextProvider>
                      <ManageDialogs/>
                      <ManageContextualMenu/>
                      <AdministrationWorkspace/>
                    </AdministrationWorkspaceContextProvider>
                  </Route>
                </Switch>
              </Router>
            </ContextualMenuContextProvider>
          </DialogContextProvider>
        </ActionFeedbackContextProvider>
      </AppContext.Provider>
    );
  }
}

export default ReactAdministration;
