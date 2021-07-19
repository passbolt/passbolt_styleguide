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

/**
 * This component allows the user to log in with his account
 */
class StepLogin extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      step: 'username', // The step of login
    };
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  handleNextStep() {
    this.setState({step: 'password'});
  }

  handlePreviousStep() {
    this.setState({step: 'username'});
  }

  isUsernameStep() {
    return this.state.step === 'username';
  }

  isPasswordStep() {
    return this.state.step === 'password';
  }

  /**
   * Render the component
   */
  render() {
    return (
      <form acceptCharset="utf-8" className="login-form" style={{margin: "auto", width:"50rem"}}>
        {this.isUsernameStep() &&
          <>
            <div className="input text required">
              <label htmlFor="username">
                Username
              </label>
              <div className="username">
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="login-username-input"
                  autoFocus={true}/>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="button primary big full-width"
                role="button"
                onClick={this.handleNextStep}>
                Next
              </button>
            </div>
          </>
        }
        {this.isPasswordStep() &&
          <>
            <div className="input text required">
              <label htmlFor="password">
                Password
              </label>
              <div className="password with-token">
                <input
                  id="passphrase"
                  type="password"
                  name="passphrase"
                  className="login-passphrase-input"/>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="button big full-width"
                style={{marginBottom: "1rem"}}
                role="button"
                onClick={this.handlePreviousStep}>
                Cancel
              </button>
              <button
                type="submit"
                className="button primary big full-width"
                role="button">
              Sign in
              </button>
            </div>
          </>
        }
      </form>
    );
  }
}

StepLogin.propTypes = {
};
export default StepLogin;
