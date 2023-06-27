/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React, {Component} from "react";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class DisplayExpiredTokenError extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="setup-error">
        <h1><Trans>The request is expired.</Trans></h1>
        <p><Trans>If you still need to recover your account, you will need to start the process from scratch.</Trans></p>
        <div className="form-actions">
          <a href={`${this.props.context.trustedDomain}`}
            className="button primary big full-width"
            role="button"
            rel="noopener noreferrer">
            <Trans>Continue</Trans>
          </a>
        </div>
      </div>
    );
  }
}

DisplayExpiredTokenError.propTypes = {
  context: PropTypes.any, // The application context
};
export default withAppContext(withTranslation("common")(DisplayExpiredTokenError));
