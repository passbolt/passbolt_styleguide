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
 * @since         5.0.0
 */

import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import FileTextSVG from "../../../../img/svg/file_text.svg";

class DisplayAccountRecoveryUserSettingsHelp extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="sidebar-help-section">
        <h3>
          <Trans>Need some help?</Trans>
        </h3>
        <p>
          <Trans>For more information about account recovery, checkout the dedicated page on the help website.</Trans>
        </p>
        <a
          className="button"
          href="https://www.passbolt.com/docs/user/quickstart/browser/admin-assisted-recovery"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileTextSVG />
          <span>
            <Trans>Read the documentation</Trans>
          </span>
        </a>
      </div>
    );
  }
}

export default withTranslation("common")(DisplayAccountRecoveryUserSettingsHelp);
