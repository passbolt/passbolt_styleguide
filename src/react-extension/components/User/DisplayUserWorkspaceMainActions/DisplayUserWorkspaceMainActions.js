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
import AppContext from "../../../contexts/AppContext";
import Icon from "../../../../react/components/Common/Icons/Icon";
import CreateUserDialog from "../CreateUser/CreateUserDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import CreateGroupDialog from "../../Group/CreateGroup/CreateGroupDialog";

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
    document.addEventListener('click', this.handleDocumentClickEvent);
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent);
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent);
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent);
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent);
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
    this.props.dialogContext.open(CreateUserDialog);
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
    this.props.dialogContext.open(CreateGroupDialog);
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
    return this.context.loggedInUser && this.context.loggedInUser.role.name === 'admin';
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
          <a className="button create primary ready" onClick={this.handleCreateClickEvent}>
            <Icon name="plus-circle"/>
            <span>Create</span>
          </a>
          <ul className={`dropdown-content menu ready ${this.state.createMenuOpen ? "visible" : ""}`}>
            <li id="user_action">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.handleCreateMenuUserClickEvent}>
                      <span>New user</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li id="group_action">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.handleCreateMenuGroupClickEvent}>
                      <span>New group</span>
                    </a>
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

DisplayUserWorkspaceMainActions.contextType = AppContext;

DisplayUserWorkspaceMainActions.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
};

export default withDialog(DisplayUserWorkspaceMainActions);
