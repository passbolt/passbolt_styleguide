/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.7.0
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import InfoSVG from "../../../../img/svg/info.svg";

class DisplaySecretHistoryAdministrationHelp extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="sidebar-help-section">
        <h3>
          <Trans>Need help?</Trans>
        </h3>
        <p>
          <Trans>
            For more information about the secret history settings, checkout the dedicated page on the official website.
          </Trans>
        </p>
        <a
          className="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://passbolt.com/docs/admin/secret-history"
        >
          <InfoSVG />
          <span>
            <Trans>Read the documentation</Trans>
          </span>
        </a>
      </div>
    );
  }
}

DisplaySecretHistoryAdministrationHelp.propTypes = {
  t: PropTypes.func, // translation function
};

export default withTranslation("common")(DisplaySecretHistoryAdministrationHelp);
