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
import {withAppContext} from "../../../contexts/AppContext";
import EditResourceTag from "../../ResourceTag/EditResourceTag/EditResourceTag";
import DeleteResourceTag from "../../ResourceTag/DeleteResourceTag/DeleteResourceTag";
import {withDialog} from "../../../contexts/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import {Trans, withTranslation} from "react-i18next";

class FilterResourcesByTagsListContextualMenu extends React.Component {
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
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
  }

  /**
   * Handle click on the edit tag menu option.
   */
  handleEditClickEvent() {
    this.props.context.setContext({tagToEdit: this.props.selectedTag});
    this.props.dialogContext.open(EditResourceTag);
    this.props.hide();
  }

  /**
   * Handle click on the delete tag menu option.
   */
  handleDeleteClickEvent() {
    this.props.context.setContext({tagToDelete: this.props.selectedTag});
    this.props.dialogContext.open(DeleteResourceTag);
    this.props.hide();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
        <li key="option-edit-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="edit-tag" onClick={this.handleEditClickEvent}><span><Trans>Edit Tag</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-delete-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="delete-tag" onClick={this.handleDeleteClickEvent}><span><Trans>Delete Tag</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

FilterResourcesByTagsListContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  selectedTag: PropTypes.object,
  dialogContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withTranslation('common')(FilterResourcesByTagsListContextualMenu)));
