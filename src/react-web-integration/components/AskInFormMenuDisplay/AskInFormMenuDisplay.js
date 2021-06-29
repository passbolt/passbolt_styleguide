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
 * @since        3.4.0
 */

import React from "react";
import {withAppContext} from "../../contexts/AppContext";
import PropTypes from "prop-types";


/**
 * This component is a call-to-action integrated into a target web page which includes
 * an identified authentication form. When some Passbolt actions are available, the performed call-to-action
 * proposes a menu of these available actions (DisplayInFormMenu)
 */
class AskInFormMenuDisplay extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.checkAuthenticationStatus();
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      isUserAuthenticated: false
    }
  }

  /**
   * Returns the authentication check status
   * @return {number}
   */
  get isAuthenticatedCheckPeriod() {
    return 6000;
  }

  /**
   * Bind the event handlers
   */
  bindEventHandlers() {
    this.openInFormMenu = this.openInFormMenu.bind(this);
  }

  /**
   * Check periodically the user authentication status
   */
  scheduleCheckAuthenticationStatus() {
    this.checkAuthenticationStatus();
    this.scheduledCheckIsAuthenticatedTimeout = setTimeout(async() => {
      await this.checkAuthenticationStatus();
      this.scheduleCheckAuthenticationStatus();
    }, this.isAuthenticatedCheckPeriod);
  }

  /**
   * Check the user authentication status
   */
  async checkAuthenticationStatus() {
    const {isAuthenticated, isMfaRequired} = await this.props.context.port.request("passbolt.auth.check-status");
    this.setState({
      isUserAuthenticated: isAuthenticated && !isMfaRequired
    });
  }

  /**
   * Open the in-form menu
   */
  openInFormMenu() {
    this.props.context.port.request("passbolt.inform.open");
  }

  /**
   * Render the component
   */
  render() {
    return (
      <>
        <a onClick={this.openInFormMenu}>
          <div className="in-form-icon">
            <div className={`in-form-icon-logo ${this.state.isUserAuthenticated? '' : 'in-form-icon-logo--inactive'}`} />
          </div>
        </a>
      </>
    );
  }
}

AskInFormMenuDisplay.propTypes = {
  context: PropTypes.any // The application context
};

export default withAppContext(AskInFormMenuDisplay);