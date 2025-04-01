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
 * @since         3.3.0
 */
import React from "react";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import IconBadgeInactiveSVG from "../../../img/logo/icon-inactive.svg";
import IconWithoutBadgeSVG from "../../../img/logo/icon-without-badge.svg";
import IconBadge1SVG from "../../../img/logo/icon-badge-1.svg";
import IconBadge2SVG from "../../../img/logo/icon-badge-2.svg";
import IconBadge3SVG from "../../../img/logo/icon-badge-3.svg";
import IconBadge4SVG from "../../../img/logo/icon-badge-4.svg";
import IconBadge5SVG from "../../../img/logo/icon-badge-5.svg";
import IconBadge5PlusSVG from "../../../img/logo/icon-badge-5+.svg";
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
  componentDidMount() {
    this.props.context.port.on("passbolt.auth.after-logout", this.handleUserLoggedOut.bind(this));
    this.props.context.port.on("passbolt.auth.after-login", this.handleUserLoggedIn.bind(this));
    this.checkAuthenticationStatus();
  }

  /**
   * Handle when the user is logged in.
   */
  async handleUserLoggedIn() {
    const suggestedResourcesCount = await this.props.context.port.request("passbolt.in-form-cta.suggested-resources");
    this.setState({
      status: {
        isActive: true,
        suggestedResourcesCount
      },
    });
  }

  /**
   * Handle when the user is logged out.
   */
  handleUserLoggedOut() {
    this.setState({
      status: {
        isActive: false,
        suggestedResourcesCount: 0
      },
    });
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
    };
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
   * Check the user authentication status
   */
  async checkAuthenticationStatus() {
    const {isAuthenticated, isMfaRequired} = await this.props.context.port.request("passbolt.in-form-cta.check-status");
    const isActive = isAuthenticated && !isMfaRequired;

    const suggestedResourcesCount = isActive
      ? await this.props.context.port.request("passbolt.in-form-cta.suggested-resources")
      : 0;

    this.setState({
      isReady: true,
      status: {
        isActive,
        suggestedResourcesCount
      },
    });
  }

  /**
   * Returns the Inform logo to be displayed based on the user auth status and suggested resources count.
   * @returns {ReactDOM}
   */
  get informLogo() {
    if (!this.state.status.isActive) {
      return <IconBadgeInactiveSVG className="in-form-icon-logo inactive"/>;
    }

    const count = this.state.status.suggestedResourcesCount;
    if (count > 5) {
      return <IconBadge5PlusSVG className="in-form-icon-logo"/>;
    }

    return {
      0: <IconWithoutBadgeSVG className="in-form-icon-logo"/>,
      1: <IconBadge1SVG className="in-form-icon-logo"/>,
      2: <IconBadge2SVG className="in-form-icon-logo"/>,
      3: <IconBadge3SVG className="in-form-icon-logo"/>,
      4: <IconBadge4SVG className="in-form-icon-logo"/>,
      5: <IconBadge5SVG className="in-form-icon-logo"/>,
    }[count];
  }

  /**
   * Perform the call-to-action
   */
  execute() {
    this.props.context.port.request("passbolt.in-form-cta.execute");
  }

  /**
   * Render the component
   */
  render() {
    if (!this.state.isReady) {
      return null;
    }

    return (
      <a onClick={this.handleIconClick}>
        <div className="in-form-icon">
          {this.informLogo}
        </div>
      </a>
    );
  }
}

AskInFormMenuDisplay.propTypes = {
  context: PropTypes.any // The application context
};

export default withAppContext(AskInFormMenuDisplay);
