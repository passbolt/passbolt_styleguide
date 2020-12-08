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
 * @since        3.0.0
 */
import React, {Component} from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import InsertAppIframe from "./components/InsertAppIframe";
import InsertFileIframe from "./components/InsertFileIframe";
import InsertClipboardIframe from "./components/InsertClipboardIframe";

/**
 * The passbolt application
 */
class ExtBootstrapApp extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={[
            "/app/folders/view/:filterByFolderId",
            "/app/groups/view/:selectedGroupId",
            "/app/passwords/view/:selectedResourceId",
            "/app/passwords",
            "/app/settings",
            "/app/settings/keys",
            "/app/settings/mfa",
            "/app/settings/profile",
            "/app/settings/theme",
            "/app/users/view/:selectedUserId",
            "/app/users",
            "/",
          ]}>
            <InsertAppIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
            <InsertClipboardIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
            <InsertFileIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

ExtBootstrapApp.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
};

export default ExtBootstrapApp;
