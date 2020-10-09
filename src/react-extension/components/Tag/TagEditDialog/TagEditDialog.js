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
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/Common/DialogContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import {withLoading} from "../../../contexts/Common/LoadingContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";

/**
 * Component allows the user to edit a tag from a dialog
 */
class TagEditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
  }

  getDefaultState() {
    return {
      name: '',
      nameError: "",
      processing: false
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.setState({name:  this.context.tagToEdit.slug});
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.save();
    }
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    const state = this.validateNameInput();
    this.setState(state);
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.context.setContext({tagToEdit: null});
    this.props.onClose();
  }

  /**
   * Save the changes.
   */
  async save() {
    this.setState({processing: true});

    if (!await this.validate()) {
      this.handleValidateError();
      return;
    }

    const tagDto = {
      id: this.context.tagToEdit.id,
      slug: this.state.name,
      is_shared: this.context.tagToEdit.is_shared
    };

    try {
      this.props.loadingContext.add();
      const updatedTag = await this.context.port.request("passbolt.tags.update", tagDto);
      await this.handleSaveSuccess(updatedTag);
    } catch (error) {
      this.handleSaveError(error);
      this.setState({processing: false});
      this.focusFieldError();
      return;
    }
  }

  /**
   * Handle validation error.
   */
  handleValidateError() {
    this.setState({processing: false});
    this.focusFieldError();
  }

  /**
   * Handle save operation success.
   * @param {object} updatedTag The updated tag
   */
  async handleSaveSuccess(updatedTag) {
    this.props.loadingContext.remove();
    this.props.onClose();

    await this.props.actionFeedbackContext.displaySuccess("The tag has been updated successfully");

    const previousTagId = this.context.tagToEdit.id;
    this.context.setContext({tagToEdit: null});
    this.selectUpdatedTag(previousTagId, updatedTag);
  }

  /**
   * Select the updated tag if required.
   * While updating a tag, a new tag with a new id is returned, that's why if the tag was selected it needs to
   * be reselected manually.
   *
   * @param {string} previousTagId The updated tag previous id
   * @param {object} updatedTag The updated tag
   */
  selectUpdatedTag(previousTagId, updatedTag) {
    const isFilterByTag = this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.TAG;
    if (isFilterByTag) {
      const isTagSelected = this.props.resourceWorkspaceContext.filter.payload.tag.id === previousTagId;
      if (isTagSelected) {
        const filter = {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: updatedTag}};
        this.props.history.push({pathname: "/app/passwords", state: {filter}});
      }
    }
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    this.props.loadingContext.remove();
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      const errorDialogProps = {
        title: "There was an unexpected error...",
        message: error.message
      };
      this.context.setContext({errorDialogProps});
      this.props.dialogContext.open(ErrorDialog);
    }
  }

  /**
   * Focus the field of the form which is in error state.
   */
  focusFieldError() {
    if (this.state.nameError) {
      this.nameInputRef.current.focus();
    }
  }

  /**
   * Validate the name input.
   * @return {Promise}
   */
  validateNameInput() {
    const name = this.state.name.trim();
    let nameError = "";
    if (!name.length) {
      nameError = "A tag name is required.";
    }

    return new Promise(resolve => {
      this.setState({nameError: nameError}, resolve);
    });
  }

  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      error: "",
      nameError: "",
    });

    // Validate the form inputs.
    await this.validateNameInput();

    return this.state.nameError === "";
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  render() {
    return (
      <DialogWrapper
        title="Edit tag"
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="edit-tag-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
              <label htmlFor="edit-tag-form-name">Tag name</label>
              <input id="edit-tag-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid"
                maxLength="128"
                required="required" autoComplete="off" autoFocus={true}/>
              {this.state.nameError &&
                  <div className="name error message">{this.state.nameError}</div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value="Save"/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick} />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

TagEditDialog.contextType = AppContext;

TagEditDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog congtext
  loadingContext: PropTypes.any, // The loading context
  resourceWorkspaceContext: PropTypes.any, // The resources workspace context
  location: PropTypes.object, // Router location prop
  match: PropTypes.object, // Router match prop
  history: PropTypes.object, // Route history prop
};

export default withRouter(withResourceWorkspace(withLoading(withActionFeedback(withDialog(TagEditDialog)))));
