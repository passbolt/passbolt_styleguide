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
      error: "",
      name: this.props.tag.slug,
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
      id: this.props.tag.id,
      slug: this.state.name,
      is_shared: this.props.tag.is_shared
    };

    try {
      await this.context.port.request("passbolt.tags.update", tagDto);
      await this.handleSaveSuccess();
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
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The tag has been updated successfully");
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.setState({
        error: error.message,
        processing: false
      });
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

  render() {

    return (
      <DialogWrapper
        title="Edit tag"
        tooltip="Edit tag"
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
                {this.state.error &&
                <div className="feedbacks message error">{this.state.error}</div>
                }
                <div className="submit-wrapper clearfix">
                  <input type="submit" className="button primary" role="button" value="Save"/>
                  <a className="cancel" role="button" onClick={this.handleCloseClick}>Cancel</a>
                </div>
              </div>
            </form>
      </DialogWrapper>
    );
  }
}

TagEditDialog.contextType = AppContext;

TagEditDialog.propTypes = {
  onClose: PropTypes.func,
  tag: PropTypes.object,
  actionFeedbackContext: PropTypes.any // The action feedback context
};

export default withActionFeedback(TagEditDialog);
