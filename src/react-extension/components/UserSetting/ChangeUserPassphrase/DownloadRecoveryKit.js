
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

import React from 'react';
import PropTypes from "prop-types";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import {Trans, withTranslation} from "react-i18next";

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
      <div className="grid grid-responsive-12 profile-passphrase">
        <div className="row">
          <div className="col7 last">
            <h3><Trans>The passphrase was updated!</Trans></h3>
            <div className="success success-large message animated">
              <div className="illustration">
                <svg id="successAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 70 70">
                  <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#000000" strokeWidth="3"
                    strokeLinecap="round" fill="transparent"/>
                  <polyline id="successAnimationCheck" stroke="#000000" strokeWidth="3" points="23 34 34 43 47 27"
                    linecap="round" fill="transparent"/>
                </svg>
              </div>
              <div className="additional-information">
                <p><Trans>Your passphrase has been changed. Make sure you keep a backup of your secret key encrypted with this new passphrase.</Trans></p>
                <p><Trans>Keep this backup in a safe place, you will need it in case of emergency.</Trans></p>
                <p>
                  <a className="button primary medium" role="button" onClick={this.handleDownloadBackup}><Trans>Download backup</Trans></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DownloadRecoveryKit.propTypes = {
  userSettingsContext: PropTypes.object // The user settings context
};

export default withUserSettings(withTranslation('common')(DownloadRecoveryKit));
