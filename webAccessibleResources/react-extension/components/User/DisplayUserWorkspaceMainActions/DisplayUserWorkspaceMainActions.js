/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import CreateUser from "../CreateUser/CreateUser";
import {withDialog} from "../../../contexts/DialogContext";
import CreateUserGroup from "../../UserGroup/CreateUserGroup/CreateUserGroup";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component is a container of multiple actions applicable on user
 */
class DisplayUserWorkspaceMainActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      createMenuOpen: false, // create menu open or not
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleCreateClickEvent = this.handleCreateClickEvent.bind(this);
    this.handleCreateMenuUserClickEvent = this.handleCreateMenuUserClickEvent.bind(this);
    this.handleCreateMenuGroupClickEvent = this.handleCreateMenuGroupClickEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
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
    this.createMenuRef = React.createRef();
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.createMenuRef.current && this.createMenuRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseCreateMenu();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right click on an element of the menu
    if (this.createMenuRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseCreateMenu();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.handleCloseCreateMenu();
  }

  /**
   * Handle create click event
   */
  handleCreateClickEvent() {
    const createMenuOpen = !this.state.createMenuOpen;
    this.setState({createMenuOpen});
  }

  /**
   * Handle user click event
   */
  handleCreateMenuUserClickEvent() {
    this.openCreateUserDialog();
    this.handleCloseCreateMenu();
  }

  /**
   * Open create user dialog
   */
  openCreateUserDialog() {
    this.props.dialogContext.open(CreateUser);
  }

  /**
   * Handle group click event
   */
  handleCreateMenuGroupClickEvent() {
    this.openCreateGroupDialog();
    this.handleCloseCreateMenu();
  }

  /**
   * Open create group dialog
   */
  openCreateGroupDialog() {
    this.props.dialogContext.open(CreateUserGroup);
  }

  /**
   * Close the create menu
   */
  handleCloseCreateMenu() {
    this.setState({createMenuOpen: false});
  }

  /**
   * Check if the user can use the create capability.
   * @returns {boolean}
   */
  canIUseCreate() {
    return this.isLoggedInUserAdmin();
  }

  /**
   * Can update the resource
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col1 main-action-wrapper">
        {this.canIUseCreate() &&
        <div className="dropdown" ref={this.createMenuRef}>
          <button type="button" className={`create primary ${this.state.createMenuOpen ? "open" : ""}`} onClick={this.handleCreateClickEvent}>
            <Icon name="add"/>
            <span><Trans>Create</Trans></span>
          </button>
          <ul className={`dropdown-content menu right ${this.state.createMenuOpen ? "visible" : ""}`}>
            <li id="user_action">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button type="button" className="link no-border" onClick={this.handleCreateMenuUserClickEvent}>
                      <span><Trans>New user</Trans></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li id="group_action">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button type="button" className="link no-border" onClick={this.handleCreateMenuGroupClickEvent}>
                      <span><Trans>New group</Trans></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        }
      </div>
    );
  }
}

DisplayUserWorkspaceMainActions.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.any, // the dialog context
};

export default withAppContext(withDialog(withTranslation("common")(DisplayUserWorkspaceMainActions)));
