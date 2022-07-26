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
 * @since         3.3.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {detectBrowserName} from "../../../../shared/lib/Browser/detectBrowserName";

class IntroduceExtension extends Component {
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
      browserName: detectBrowserName(),
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
    event.preventDefault();
    await this.toggleProcessing();
    this.props.onComplete();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="introduce-setup-extension">
        <h1><Trans>Congratulation! Passbolt extension has been installed.</Trans></h1>
        <form onSubmit={this.handleSubmit}>
          <div className={`animated-setup-introduction ${this.state.browserName}`}/>
          <div className="arrow"/>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${this.isProcessing ? 'disabled processing' : ''}`}
              role="button"
              disabled={this.isProcessing}>
              <Trans>Next</Trans>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

IntroduceExtension.propTypes = {
  onComplete: PropTypes.func.isRequired, // The callback to trigger when the user complete the step.
};
export default withTranslation("common")(IntroduceExtension);
