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
 * @since         3.0.0
 */

import React from 'react';
import {withAppContext} from "../../../contexts/AppContext";
import PropTypes from "prop-types";

/**
 * This component displays the user MFA information
 */
class DisplayUserMfa extends React.Component {
  /**
   * Render the component
   */
  render() {
    return (
      <iframe id="setup-mfa" src={`${this.props.context.trustedDomain}/mfa/setup/select`} width="100%" height="100%"/>
    );
  }
}

DisplayUserMfa.propTypes = {
  context: PropTypes.any, // The application context provider
};

export default withAppContext(DisplayUserMfa);
