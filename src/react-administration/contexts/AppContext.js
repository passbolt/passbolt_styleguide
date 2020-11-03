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
import * as React from "react";

/**
 * Context related to the applications
 */
const AppContext = React.createContext({
  loggedInUser: null, // The logged in user
  trustedDomain: null,
  setLoggedInUser: () => {}, // Set the logged in user
});
export default AppContext;


/**
 * Administration Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withApp(WrappedComponent) {
  return class WithApp extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {
            appContext => <WrappedComponent appContext={appContext} {...this.props} />
          }
        </AppContext.Consumer>
      );
    }
  };
}
