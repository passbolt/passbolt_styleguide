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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";

class LoadingBar extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindHandlers();
  }

  /**
   * Binds component handlers
   */
  bindHandlers() {
    this.handleProgressEnd = this.handleProgressEnd.bind(this);
  }

  /**
   * Handles the progress end
   */
  handleProgressEnd() {
    this.props.onProgressCompleted();
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="update-loading-bar">
        <div className="progress-bar"  >
          <span className="progress"
            onTransitionEnd={this.handleProgressEnd}
            style={{"width": `${this.props.progress}%` || 0}}>
          </span>
        </div>
      </div>
    );
  }
}

LoadingBar.propTypes = {
  progress: PropTypes.number, // The progress rate to reach
  onProgressCompleted: PropTypes.func // Whenever the progress rate has been reached
};

export default LoadingBar;
