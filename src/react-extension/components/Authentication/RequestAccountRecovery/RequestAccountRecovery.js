/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class RequestAccountRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    return {
      processing: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.processing;
  }

  /**
   * Go to the next process
   * @param event A form submit event
   */
  async handleSubmit(event) {
    // Avoid the form to be submitted.
    event.preventDefault();
    await this.toggleProcessing();
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
   * @returns {JSX}
   */
  render() {
    return (
      <div className="initiate-recover-account">
        <h1><Trans>Request account recovery</Trans></h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <Trans>Both the private key and passphrase are required to recover your account, if you do not have access,
              you can request an account recovery to an administrator.
            </Trans>
          </p>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${this.isProcessing ? "processing" : ""}`}
              role="button"
              disabled={this.isProcessing}>
              <Trans>Request account recovery</Trans>
            </button>
            <a href="#">
              <Trans>Learn more about account recovery</Trans>
            </a>
          </div>
        </form>
      </div>
    );
  }
}

RequestAccountRecovery.propTypes = {
  t: PropTypes.func, // The translation function
};
export default withTranslation('common')(RequestAccountRecovery);
