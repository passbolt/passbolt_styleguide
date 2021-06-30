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
   * Returns the authentication check status
   * @return {number}
   */
  static get informCallToActionCheckPeriod() {
    return 6000;
  }

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
  componentDidMount() {
    this.scheduleCheckInformCallToActionStatus();
  }

  /**
   * Whenever the component will unmount
   */
  componentWillUnmount() {
    clearTimeout(this.scheduledCheckIsAuthenticatedTimeout);
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      isReady: false, // True if the component is ready to be rendered
      status: {
        isActive: false, // By default, inactive call-to-action
        suggestedResourcesCount: null // The number of resources to suggest
      }
    }
  }



  /**
   * Returns the count of suggested resources
   */
  get suggestedResourcesCount() {
    return this.state.status.suggestedResourcesCount;
  }

  /**
   * Bind the event handlers
   */
  bindEventHandlers() {
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  /**
   * Whenever the user clicks on the in-form passbolt icon
   */
  handleIconClick() {
    this.execute();
  }

  /**
   * Check periodically the in-form call-to-action status
   */
  async scheduleCheckInformCallToActionStatus() {
    await this.checkAuthenticationStatus();
    this.scheduledCheckIsAuthenticatedTimeout = setTimeout(async() => {
      await this.checkAuthenticationStatus();
      await this.scheduleCheckInformCallToActionStatus();
    }, AskInFormMenuDisplay.informCallToActionCheckPeriod);
  }

  /**
   * Check the user authentication status
   */
  async checkAuthenticationStatus() {
    const {isAuthenticated, isMfaRequired} = await this.props.context.port.request("passbolt.in-form-cta.check-status");
    this.setState({
      isReady: true,
      status: {
        isActive: isAuthenticated && !isMfaRequired,
        suggestedResourcesCount: 0
      },
    });
  }

  /**é
   * Perform the call-to-action
   */
  execute() {
    this.props.context.port.request("passbolt.in-form-cta.execute");
  }

  /**
   * Render the component
   */
  render() {
    const logoClassModifier = this.state.status.isActive ? this.suggestedResourcesCount : 'inactive';
    return (
      <>
        {this.state.isReady &&
          <a onClick={this.handleIconClick}>
            <div className="in-form-icon">
              <div className={`in-form-icon-logo  in-form-icon-logo--${logoClassModifier}`} />
            </div>
          </a>
        }

      </>
    );
  }

}

AskInFormMenuDisplay.propTypes = {
  context: PropTypes.any // The application context
};

export default withAppContext(AskInFormMenuDisplay);