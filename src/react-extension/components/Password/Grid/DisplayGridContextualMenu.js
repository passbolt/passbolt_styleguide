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
import {withDialog} from "../../../contexts/Common/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import PasswordEditDialog from "../PasswordEditDialog/PasswordEditDialog";

class DisplayGridContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
  }

  /**
   * handle edit resource
   */
  handleEditClickEvent() {
    const passwordEditDialogProps = {
      id: this.resource.id
    };
    this.context.setContext({passwordEditDialogProps});
    this.props.dialogContext.open(PasswordEditDialog);
    this.props.hide();
  }

  /**
   * the resource selected
   * @returns {*}
   */
  get resource() {
    return this.props.resource;
  }

  /**
   * is owner of the resource
   */
  isOwnerOfTheResource() {
    return this.resource.permission.type >= 7;
  }

  /**
   * Get the contextual menu style.
   */
  getStyle() {
    return {
      position: "fixed",
      display: "block",
      left: this.props.left,
      top: this.props.top
    };
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li key="option-edit-resource" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="edit" className={`${this.isOwnerOfTheResource() ? "" : "disabled"}`}
                  onClick={this.handleEditClickEvent}><span>Edit</span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

DisplayGridContextualMenu.contextType = AppContext;

DisplayGridContextualMenu.propTypes = {
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  dialogContext: PropTypes.any, // the dialog context
  resource: PropTypes.object // resource selected
};

export default withDialog(withResourceWorkspace(DisplayGridContextualMenu));
