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
import {Redirect, withRouter} from "react-router-dom";

// The default path to redirect the users to.
const DEFAULT_PATH_NAME = "/app/passwords";

/**
 * Handle the route fallback.
 *
 * @todo 404 management
 *
 * Historically this component was handling the application first load route, the logic has been moved in the HandleApplicationFirstLoad component.
 *
 * This component was by default redirecting the user to passwords workspace, to not introduce a side effect that we don't
 * measure, keep the previous default behavior. Later this behavior should be replaced by a 404.
 */
class HandleRouteFallback extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return <Redirect to={DEFAULT_PATH_NAME}/>;
  }
}

export default withRouter(HandleRouteFallback);
