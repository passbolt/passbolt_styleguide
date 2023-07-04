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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withLoading} from "../../../contexts/LoadingContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";
import {maxSizeValidation} from '../../../lib/Error/InputValidator';
import {RESOURCE_TAG_MAX_LENGTH} from "../../../../shared/constants/inputs.const";

/**
 * Component allows the user to edit a tag from a dialog
 */
class EditResourceTag extends Component {
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
      nameWarning: "",
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
    this.setState({name:  this.props.context.tagToEdit.slug});
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
    const nameWarning = maxSizeValidation(this.state.name, RESOURCE_TAG_MAX_LENGTH, this.translate);
    this.setState({nameWarning});
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.context.setContext({tagToEdit: null});
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
      id: this.props.context.tagToEdit.id,
      slug: this.state.name,
      is_shared: this.props.context.tagToEdit.is_shared
    };

    try {
      this.props.loadingContext.add();
      const updatedTag = await this.props.context.port.request("passbolt.tags.update", tagDto);
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

    await this.props.actionFeedbackContext.displaySuccess(this.translate("The tag has been updated successfully"));

    const previousTagId = this.props.context.tagToEdit.id;
    this.props.context.setContext({tagToEdit: null});
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
        error: error
      };
      this.props.dialogContext.open(NotifyError, errorDialogProps);
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
      nameError = this.translate("A tag name is required.");
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

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper
        title={this.translate("Edit tag")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="edit-tag-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-tag-form-name"><Trans>Tag name</Trans>{this.state.nameWarning &&
                  <Icon name="exclamation"/>
              }</label>
              <input id="edit-tag-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid"
                maxLength="128"
                required="required" autoComplete="off" autoFocus={true}/>
              {this.state.nameError &&
                  <div className="name error-message">{this.state.nameError}</div>
              }
              {this.state.nameWarning && (
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
                </div>
              )}
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick} />
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditResourceTag.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog congtext
  loadingContext: PropTypes.any, // The loading context
  resourceWorkspaceContext: PropTypes.any, // The resources workspace context
  location: PropTypes.object, // Router location prop
  match: PropTypes.object, // Router match prop
  history: PropTypes.object, // Route history prop
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withResourceWorkspace(withLoading(withActionFeedback(withDialog(withTranslation('common')(EditResourceTag)))))));
