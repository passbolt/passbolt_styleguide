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
 * @since         2.14.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import Icon from "../../../../react/components/Common/Icons/Icon";

/**
 * This component displays the success of a resource file import
 */
class PasswordImportResultDialog extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      showErrorsDetails: false // Display flag of the error details area
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleErrorDetailsToggle = this.handleErrorDetailsToggle.bind(this);
  }

  /**
   * Returns the import result
   */
  get importResult() {
    return this.props.resourceWorkspaceContext.resourceFileImportResult;
  }

  /**
   * Whenever the user intends to close the dialog
   */
  handleClose() {
    this.close();
  }

  /**
   * Handle the toggle display of error details
   */
  handleErrorDetailsToggle() {
    this.toggleErrorDetails();
  }

  /**
   * Closes the dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Toggle the display of the error details
   */
  toggleErrorDetails() {
    this.setState({showErrorDetails: !this.state.showErrorDetails});
  }

  /**
   * Render the component
   */
  render() {
    const {resources, folders, options, importTag} = this.importResult;
    const hasFolders = options.hasFoldersPlugin && options.importFolders;
    const hasTags = options.hasTagsPlugin && options.importTags;

    const resourcesHasErrors = resources && resources.errors && resources.errors.length > 0;
    const foldersHasErrors = hasFolders && folders && folders.errors && folders.errors.length > 0;
    const hasErrors = resourcesHasErrors || foldersHasErrors;

    const resourceErrorsDetails = hasErrors && (resourcesHasErrors ? `${JSON.stringify(resources.errors, null, 4)}` : '');
    const folderErrorDetails = hasErrors &&  (foldersHasErrors ? `${JSON.stringify(folders.errors, null, 4)}\n` : '');
    const errorsDetails = `${resourceErrorsDetails}${folderErrorDetails}`;
    return (
      <>
        <DialogWrapper
          title={hasErrors ? "Something went wrong!" : "Success!" }
          onClose={this.handleClose}>
          <form onSubmit={this.handleClose}>
            <div className="form-content">
              {!resourcesHasErrors &&
                <p><strong>{resources.created ? resources.created.length : 'No'} passwords have been imported successfully.</strong></p>
              }
              {resourcesHasErrors &&
                <>
                  <p className="error inline-error">There was an issue while importing passwords:</p>
                  <p><strong>{resources.created.length} out of {resources.created.length + resources.errors.length}</strong> passwords have been imported.</p>
                </>
              }
              {hasFolders && !foldersHasErrors &&
                <p><strong>{folders.created ? folders.created.length : ' No' } folders have been imported successfully..</strong></p>
              }
              {hasFolders && foldersHasErrors &&
                <>
                  <p className="error inline-error">There was an issue while importing folders:</p>
                  <p><strong>{folders.created.length} out of {folders.created.length + folders.errors.length}</strong> folders have been imported.</p>
                </>
              }
              {hasTags &&
                <p>You can find these newly imported passwords under the tag: {importTag}.</p>
              }
              {hasErrors &&
                <div className="accordion error-details">
                  <div className="accordion-header">
                    <a onClick={this.handleErrorDetailsToggle}>
                      Errors details
                      <Icon baseline={true} name={this.state.showErrorDetails ? "caret-up" : "caret-down"}/>
                    </a>
                  </div>
                  {this.state.showErrorDetails &&
                    <div className="accordion-content" >
                      <div className="input text">
                        <label
                          htmlFor="js_field_debug"
                          className="visuallyhidden">
                          Errors details
                        </label>
                        <textarea
                          id="js_field_debug"
                          defaultValue={errorsDetails}
                          readOnly/>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>

            <div className="submit-wrapper clearfix">
              <FormSubmitButton
                value="Ok"/>
            </div>
          </form>
        </DialogWrapper>
      </>
    );
  }
}



PasswordImportResultDialog.contextType = AppContext;

PasswordImportResultDialog.propTypes = {
  onClose: PropTypes.func, // Whenever the dialogs closes
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceWorkspaceContext: PropTypes.any // The resource context
};

export default withResourceWorkspace(withActionFeedback(PasswordImportResultDialog));
