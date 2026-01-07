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

import React from "react";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component displays the user security token help
 */
class DisplayUserGpgInformationHelp extends React.Component {
  /**
   * Render the component
   */
  render() {
    return (
      <div className="sidebar-help-section">
        <h3>
          <Trans>Why is this token needed?</Trans>
        </h3>
        <p>
          <Trans>
            This security token will be displayed when your passphrase is requested, so you can verify quickly the form
            is coming from passbolt.
          </Trans>
          &nbsp;
          <Trans>
            This will help protect you from{" "}
            <a
              href="https://en.wikipedia.org/wiki/Phishing"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="phishingLink"
            >
              phishing attacks
            </a>
            .
          </Trans>
        </p>
        <a
          className="button"
          href="https://www.passbolt.com/docs/user/settings/browser/security-token/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Trans>Learn more</Trans>
        </a>
      </div>
    );
  }
}

DisplayUserGpgInformationHelp.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(DisplayUserGpgInformationHelp);
