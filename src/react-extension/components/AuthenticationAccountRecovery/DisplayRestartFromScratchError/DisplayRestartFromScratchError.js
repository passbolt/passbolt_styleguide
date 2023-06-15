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

class DisplayRestartFromScratchError extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="setup-error">
        <h1><Trans>Sorry, wrong computer or browser...</Trans></h1>
        <p><Trans>You need to finalize the account recovery process with the same computer you used for the account recovery request.</Trans><br/><br/>
          <Trans>If you changed systems, or reinstalled passbolt web extension in the meantime, you will need to start the account recovery process from scratch.</Trans></p>
        <div className="form-actions">
          <a href={`${this.props.context.trustedDomain}/users/recover`}
            className="button primary big full-width"
            role="button"
            rel="noopener noreferrer">
            <Trans>Restart from scratch</Trans>
          </a>
        </div>
      </div>
    );
  }
}

DisplayRestartFromScratchError.propTypes = {
  context: PropTypes.any, // The application context
};
export default withAppContext(withTranslation("common")(DisplayRestartFromScratchError));
