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
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

class DownloadRecoveryKit extends Component {
  /**
   * ComponentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.onDownload();
  }

  /**
   * Whenever the user completed the step.
   */
  handleNext() {
    this.props.onComplete();
  }

  /**
   * Whenever the user wants to download the recovery kit again.
   */
  handleDownload() {
    this.props.onDownload();
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="generate-key-feedback">
        <h1><Trans>Keep your recovery kit in a safe place.</Trans></h1>
        <p>
          <Trans>A download of your recovery kit, containing your secret key, has automatically started.</Trans>
          &nbsp;
          <Trans>Make sure you store it in a safe place. You may need it later.</Trans>
        </p>
        <div className="form-actions">
          <button
            type="submit"
            className={`button primary big full-width`}
            onClick={this.handleNext.bind(this)}
            role="button">
            <Trans>Next</Trans>
          </button>
          <a
            id="download-kit"
            onClick={this.handleDownload.bind(this)}>
            <Trans>Download the kit again!</Trans>
          </a>
        </div>
      </div>
    );
  }
}

DownloadRecoveryKit.propTypes = {
  onDownload: PropTypes.func.isRequired, // Callback to trigger when the user wants to download its recovery kit.
  onComplete: PropTypes.func.isRequired, // Callback to trigger when the step is completed.
};

export default withTranslation("common")(DownloadRecoveryKit);
