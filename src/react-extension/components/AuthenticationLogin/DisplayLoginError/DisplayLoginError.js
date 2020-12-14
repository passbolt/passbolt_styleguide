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
import PropTypes from "prop-types";

/**
 * This component displays an error when the user cannot log in
 */
class DisplayLoginError extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * Whenever the users submits his passphrase
   * @param event Dom event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.context.onTryLoginAgainRequested();
  }


  /**
   * Render the component
   */
  render() {
    return (
      <div>
        <h2>Sorry, you have not been logged in  </h2>
        <p>Something went wrong, the login failed with the following error: </p>
        <p>{this.props.error}</p>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big`}
              role="button">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

DisplayLoginError.propTypes = {
  error: PropTypes.any // The error to display
};
export default DisplayLoginError;
