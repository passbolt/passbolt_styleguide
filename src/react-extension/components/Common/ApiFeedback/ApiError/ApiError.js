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
 * @since         3.9.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import AnimatedFeedback from "../../../../../shared/components/Icons/AnimatedFeedback";
import Icon from "../../../../../shared/components/Icons/Icon";

class ApiError extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      displayLogs: false,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleDisplayLogsClick = this.handleDisplayLogsClick.bind(this);
  }

  /**
   * Handles the click on the display logs button.
   */
  handleDisplayLogsClick() {
    this.setState({displayLogs: !this.state.displayLogs});
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div id="container" className="container api-feedback page">
        <div className="content">
          <div className="header">
            <div className="logo"><span className="visually-hidden">Passbolt</span></div>
          </div>
          <div className="api-feedback-card">
            <AnimatedFeedback name="attention"/>
            <p>
              <Trans>Something went wrong!</Trans><br/>
              <Trans>Please try again later or contact your administrator.</Trans>
            </p>
            <div className="accordion-header">
              <button type="button" className="link no-border" onClick={this.handleDisplayLogsClick}>
                <Icon name={this.state.displayLogs ? "caret-down" : "caret-right"}/> <Trans>Logs</Trans>
              </button>
            </div>
            {this.state.displayLogs &&
              <div className="accordion-content">
                <textarea readOnly={true} value={this.props.message}/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ApiError.propTypes = {
  message: PropTypes.string.isRequired, // The message to display on the UI
  t: PropTypes.func // the translation function
};

export default withTranslation("common")(ApiError);
