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
 * @since         3.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withUserSettings } from "../../../contexts/UserSettingsContext";
import { Trans, withTranslation } from "react-i18next";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";

/**
 * This component displays the user profile information
 */
class DownloadRecoveryKit extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDownloadBackup = this.handleDownloadBackup.bind(this);
  }

  /**
   * Whenever the user wants to download the recovery kit again
   */
  handleDownloadBackup() {
    this.download();
  }

  /**
   * Download the recovery kit
   */
  async download() {
    await this.props.userSettingsContext.onDownloadRecoveryKitRequested();
  }

  render() {
    return (
      <>
        <div className="main-column recovery-kit">
          <div className="main-content">
            <h3>
              <Trans>The passphrase was updated!</Trans>
            </h3>
            <div className="feedback-card">
              <AnimatedFeedback name="success" />
              <div className="additional-information">
                <p>
                  <Trans>
                    Your passphrase has been changed. Make sure you keep a backup of your secret key encrypted with this
                    new passphrase.
                  </Trans>
                </p>
                <p>
                  <Trans>Keep this backup in a safe place, you will need it in case of emergency.</Trans>
                </p>
              </div>
            </div>
          </div>
          <div className="message warning">
            <p>
              <Trans>
                <strong>Warning</strong>: This recovery kit replace the old one.
              </Trans>
            </p>
            <p>
              <Trans>You will need this recovery kit later to access your account (for example on a new device).</Trans>
            </p>
          </div>
        </div>
        <div className="actions-wrapper">
          <button type="button" className="button primary form" onClick={this.handleDownloadBackup}>
            <Trans>Download backup</Trans>
          </button>
        </div>
      </>
    );
  }
}

DownloadRecoveryKit.propTypes = {
  userSettingsContext: PropTypes.object, // The user settings context
};

export default withUserSettings(withTranslation("common")(DownloadRecoveryKit));
