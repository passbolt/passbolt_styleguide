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

class DisplayUnexpectedError extends Component {
  /**
   * Whenever the user click on the action
   */
  onClick() {
    document.location.reload();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="setup-error">
        <h1>Something went wrong.</h1>
        <p>The operation failed with the following error:</p>
        <p>{this.props.error && this.props.error.message}</p>
        <div className="form-actions">
          <button onClick={this.onClick.bind(this)} className="button primary big full-width" role="button">Try again</button>
        </div>
      </div>
    );
  }
}

DisplayUnexpectedError.propTypes = {
  error: PropTypes.any, // The error to display
  errorActionLabel: PropTypes.string, // The action label
  errorActionCallback: PropTypes.func, // The action callback
};
export default DisplayUnexpectedError;
