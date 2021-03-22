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
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component downloads autamatically the recovery kit including the GPG key
 */
class DownloadRecoveryKit extends Component {
  /**
   * Default contrustor
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.download();
  }

  /**
   * Binds the component event handlers
   */
  bindEventHandlers() {
    this.handleNext = this.handleNext.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  /**
   * Whenever the user wants to continue the setup
   */
  handleNext() {
    this.continueSetup();
  }

  /**
   * Whenever the user wants to download the recovery kit again
   */
  handleDownload() {
    this.download();
  }

  /**
   * Continue the setup process
   */
  continueSetup() {
    this.context.onRecoveryKitDownloaded();
  }

  /**
   * Download the recovery kit
   */
  async download() {
    await this.context.onDownloadRecoveryKitRequested();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
          <Trans>Make sure you store it in a safe place. You may need it later.</Trans>
        </p>
        <div className="form-actions">
          <button
            type="submit"
            className={`button primary big full-width`}
            onClick={this.handleNext}
            role="button">
            Next
          </button>
          <a
            id="download-kit"
            onClick={this.handleDownload}>
            <Trans>Download the kit again!</Trans>
          </a>
        </div>
      </div>
    );
  }
}

DownloadRecoveryKit.contextType = AuthenticationContext;

DownloadRecoveryKit.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(DownloadRecoveryKit);
