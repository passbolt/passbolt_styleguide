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
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class DownloadRecoveryKit extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      isStoredRecoveryKitSafe: false,
    };
  }
  /**
   * ComponentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.onDownload();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    this.setState({ [name]: value });
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.state.usernameError !== null || this.state.agreedTermsError;
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
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return !this.state.isStoredRecoveryKitSafe;
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="generate-key-feedback">
        <h1>
          <Trans>Store your recovery kit in a safe place.</Trans>
        </h1>
        <p>
          <strong>
            <Trans>You will need this recovery kit later to access your account (for example on a new device).</Trans>
          </strong>
        </p>
        <p>
          <Trans>A download of your recovery kit, containing your secret key, has automatically started.</Trans>
        </p>
        <div className="input checkbox">
          <input
            type="checkbox"
            name="isStoredRecoveryKitSafe"
            checked={this.state.isStoredRecoveryKitSafe}
            onChange={this.handleInputChange}
            id="checkbox-recovery-kit"
          />
          <label htmlFor="checkbox-recovery-kit">
            <Trans>I safely stored my recovery kit.</Trans>
          </label>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className={`button primary big full-width`}
            disabled={this.hasAllInputDisabled()}
            onClick={this.handleNext}
          >
            <Trans>Next</Trans>
          </button>
          <button className="link" type="button" id="download-kit" onClick={this.handleDownload}>
            <Trans>Download the kit again!</Trans>
          </button>
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
