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
 * @since         3.4.0
 */
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component display to the user that the account recovery is not supported
 */
class DisplayAccountRecoveryNotSupported extends Component {
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
    // Prevent the native form submission.
    event.preventDefault();
    await this.toggleProcessing();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="recover-account-not-supported">
        <h1><Trans>Sorry, wrong computer or browser...</Trans></h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <Trans>You need to finalize the account recovery process with the same computer you used for the account recovery request.</Trans>
            <br/>
            <br/>
            <Trans>If you changed systems, or reinstalled passbolt web extension in the meantime, you will need to start the account recovery process from scratch.</Trans>
          </p>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${this.isProcessing ? 'processing' : ''}`}
              role="button"
              disabled={this.isProcessing}>
              <Trans>Restart from scratch</Trans>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation('common')(DisplayAccountRecoveryNotSupported);
