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
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withMfa} from "../../../contexts/MFAContext";

class DisplayUserBadgeMenu extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  getDefaultState() {
    return {
      open: false,
      loading: true,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleToggleMenuClick = this.handleToggleMenuClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleThemeClick = this.handleThemeClick.bind(this);
    this.handleMobileAppsClick = this.handleMobileAppsClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
    if (this.props.context.siteSettings.canIUse('mfaPolicies')) {
      this.props.mfaContext.checkMfaChoiceRequired();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.userBadgeMenuRef = React.createRef();
  }

  /**
   * Can the user access the theme capability.
   * @returns {bool}
   */
  get canIUseThemeCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountSettings');
  }

  /**
   * Can the user access the mobile capability.
   * @returns {bool}
   */
  get canIUseMobileCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('mobile');
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.userBadgeMenuRef.current.contains(event.target)) {
      return;
    }
    this.closeUserBadgeMenu();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right click on an element of the menu
    if (this.userBadgeMenuRef.current.contains(event.target)) {
      return;
    }
    this.closeUserBadgeMenu();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.closeUserBadgeMenu();
  }

  /**
   * Close the user badge menu
   */
  closeUserBadgeMenu() {
    this.setState({open: false});
  }

  /**
   * Get the user full name
   * @returns {string}
   */
  getUserFullName() {
    if (!this.props.user || !this.props.user.profile) {
      return '...';
    }
    return `${this.props.user.profile.first_name} ${this.props.user.profile.last_name}`;
  }

  /**
   * Get the user username
   * @returns {string}
   */
  getUserUsername() {
    if (!this.props.user || !this.props.user.username) {
      return '...';
    }
    return `${this.props.user.username}`;
  }

  /**
   * Handle click on menu (toggle open state)
   * @param {Event} e
   * @return {void}
   */
  handleToggleMenuClick(e) {
    e.preventDefault();
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace profile section.
   */
  handleProfileClick() {
    this.props.navigationContext.onGoToUserSettingsProfileRequested();
    this.closeUserBadgeMenu();
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace theme section.
   */
  handleThemeClick() {
    this.props.navigationContext.onGoToUserSettingsThemeRequested();
    this.closeUserBadgeMenu();
  }

  /**
   * Handle mobile apps click
   * @return {void}
   */
  handleMobileAppsClick() {
    this.props.navigationContext.onGoToUserSettingsMobileRequested();
    this.closeUserBadgeMenu();
  }

  /**
   * Returns true if the account recovery needs to be configured.
   * @return {bool}
   */
  get attentionRequired() {
    return this.props.accountRecoveryContext.isAccountRecoveryChoiceRequired() || this.props.mfaContext.isMfaChoiceRequired();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="col3 profile-wrapper">
        <div className="user profile dropdown" ref={this.userBadgeMenuRef}>
          <div className={`avatar-with-name button ${this.state.open ? "open" : ""}`} onClick={this.handleToggleMenuClick}>
            <UserAvatar user={this.props.user} className="avatar picture left-cell" baseUrl={this.props.baseUrl} attentionRequired={this.attentionRequired}/>
            <div className="details center-cell">
              <span className="name">{this.getUserFullName()}</span>
              <span className="email">{this.getUserUsername()}</span>
            </div>
            <div className="more right-cell">
              <button type="button" className="link no-border">
                <Icon name="caret-down"/>
              </button>
            </div>
          </div>
          {this.state.open &&
          <ul className="dropdown-content right visible">
            <li key="profile">
              <div className="row">
                <button type="button" className="link no-border" onClick={this.handleProfileClick}>
                  <span><Trans>Profile</Trans></span>{this.attentionRequired && <Icon name="exclamation" baseline={true}/>}
                </button>
              </div>
            </li>
            {this.canIUseThemeCapability &&
            <li key="theme">
              <div className="row">
                <button type="button" className="link no-border" onClick={this.handleThemeClick}>
                  <span><Trans>Theme</Trans></span>
                </button>
              </div>
            </li>
            }
            {this.canIUseMobileCapability &&
            <li key="mobile">
              <div className="row">
                <button type="button" className="link no-border" onClick={this.handleMobileAppsClick}>
                  <span><Trans>Mobile Apps</Trans></span>
                  <span className="chips new">new</span>
                </button>
              </div>
            </li>
            }
          </ul>
          }
        </div>
      </div>
    );
  }
}

DisplayUserBadgeMenu.propTypes = {
  context: PropTypes.object, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  mfaContext: PropTypes.object, // The mfa context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  baseUrl: PropTypes.string,
  user: PropTypes.object,
};

export default withAppContext(withNavigationContext(withAccountRecovery(withMfa(withTranslation("common")(DisplayUserBadgeMenu)))));
