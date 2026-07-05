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
 * @since         5.14.0
 */

import React from "react";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component displays the passkey login help.
 */
class DisplayPasskeyUserSettingsHelp extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="sidebar-help-section">
        <h3>
          <Trans>What is passkey login?</Trans>
        </h3>
        <p>
          <Trans>
            Passkey login lets you sign in with a passkey instead of typing your passphrase. Your passphrase still
            unlocks your account, so a lost passkey never locks you out.
          </Trans>
        </p>
        <p>
          <Trans>
            The passphrase is protected locally by a key split between this browser profile and the server; neither half
            alone can recover it, and the server never sees your passphrase.
          </Trans>
        </p>
      </div>
    );
  }
}

DisplayPasskeyUserSettingsHelp.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(DisplayPasskeyUserSettingsHelp);
