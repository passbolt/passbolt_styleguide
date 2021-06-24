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
 * @since         3.4.0
 */
import React, {Component} from "react";
import {detectBrowserName} from "../../../../shared/lib/Browser/detectBrowserName";
import {withAppContext} from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAuthenticationContext} from "../../../contexts/AuthenticationContext";

class IntroduceSetupExtension extends Component {
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
    this.props.authenticationContext.onCompleteIntroduceSetupExtension();
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
      <div className="introduce-setup-extension">
        <h1><Trans>Congratulation! Passbolt extension has been installed.</Trans></h1>
        <form onSubmit={this.handleSubmit}>
          <div className={`animated-setup-introduction ${this.state.browserName}`}></div>
          <div className="arrow"></div>
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

IntroduceSetupExtension.propTypes = {
  authenticationContext: PropTypes.any, // The authentication context
  t: PropTypes.func, // The translation function
};
export default withAppContext(withAuthenticationContext(withTranslation('common')(IntroduceSetupExtension)));
