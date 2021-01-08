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
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withLoading} from "../../../../react/contexts/Common/LoadingContext";

/**
 * This component allows the current user to edit the description of a resource
 */
class DescriptionEditor extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      encryptDescription: false,
      description: undefined, // description of the resource
      loading: true, // component loading
      processing: false, // component processing
      error: "" // error to display
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditorClickEvent = this.handleEditorClickEvent.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.elementRef = React.createRef();
    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    this.handleOutsideEditorClickEvent();
    const state = {
      loading: false,
      description: this.props.description,
      encryptDescription: this.mustEncryptDescription()
    };
    this.setState(state, this.setFocusOnDescriptionEditor.bind(this));
  }

  componentWillUnmount() {
    this.removeOutsideEditorClickEvent();
  }

  /*
   * =============================================================
   *  Resource type helpers
   * =============================================================
   */
  /**
   * Must the description be kept encrypted?
   * @returns {boolean}
   */
  mustEncryptDescription() {
    return this.context.resourceTypesSettings.mustEncryptDescription(this.props.resource.resource_type_id);
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * @returns {ResourceTypesSettings}
   */
  get resourceTypesSettings() {
    return this.context.resourceTypesSettings;
  }

  /**
   * @returns {string}
   */
  get description() {
    return this.state.description;
  }

  /*
   * =============================================================
   *  Save the description
   * =============================================================
   */
  /**
   * Save the changes.
   */
  async save() {
    this.setState({processing: true});

    try {
      await this.updateResource();
      await this.props.actionFeedbackContext.displaySuccess("The description has been updated successfully");
      this.close();
    } catch (error) {
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
  }

  /**
   * Update the resource
   * @returns {Promise<Object>} updated resource
   */
  async updateResource() {
    // Resource types enabled but legacy type requested
    if (!this.mustEncryptDescription()) {
      return this.updateCleartextDescription();
    }

    return this.updateWithEncryptedDescription();
  }

  /**
   * Update the resource (LEGACY)
   * @returns {Promise<Object>} updated resource
   * @deprecated will be removed when v2 support is dropped
   */
  async updateCleartextDescription() {
    const resourceDto = {...this.props.resource};
    resourceDto.description = this.description;

    return this.context.port.request("passbolt.resources.update", resourceDto, null);
  }

  /**
   * Update the resource with encrypted description content type
   * @returns {Promise<Object>} updated resource
   */
  async updateWithEncryptedDescription() {
    const resourceDto = {...this.props.resource};
    resourceDto.description = '';
    resourceDto.resource_type_id = this.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );

    const plaintextDto = {...this.props.plaintextDto};
    plaintextDto.description = this.description;

    return this.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /*
   * =============================================================
   *  Out of widget actions
   * =============================================================
   */
  /**
   * Toggle the editor back to display mode
   * @returns {string} send back the updated description to avoid potential unnecessary decrypt round
   */
  close() {
    return this.props.onClose(this.description);
  }

  /**
   * Remove listener for outside description editor clicks that aims to closes the editor
   */
  removeOutsideEditorClickEvent() {
    document.removeEventListener('click', this.handleEditorClickEvent);
  }

  /**
   * handle a click outside of the editor
   */
  handleOutsideEditorClickEvent() {
    document.addEventListener('click', this.handleEditorClickEvent);
  }

  /*
   * =============================================================
   *  Widget related events
   * =============================================================
   */
  /**
   * set the focus at the end of the description editor
   */
  setFocusOnDescriptionEditor() {
    const descriptionLength = this.description ? this.description.length : 0;
    this.textareaRef.current.selectionStart = descriptionLength;
    this.textareaRef.current.selectionEnd = descriptionLength;
    this.textareaRef.current.focus();
  }

  /**
   * Handle click events on editor. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleEditorClickEvent(event) {
    // Prevent stop editing when the user click on an element of the editor
    if (this.elementRef.current.contains(event.target)) {
      return;
    }
    this.close();
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Handle key down on the component.
   * @params {ReactEvent} The react event
   */
  handleKeyDown(event) {
    // Close the editor when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // Stop the event propagation in order to avoid a parent component to react to this ESC event.
      event.stopPropagation();
      this.close();
    }
  }

  /**
   * On cancel button click
   */
  handleCancel() {
    this.close();
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
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      this.props.loadingContext.add();
      await this.save();
      this.props.loadingContext.remove();
    }
  }

  /*
   * =============================================================
   * Render
   * =============================================================
   */
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <form onKeyDown={this.handleKeyDown} noValidate className="description-editor">
        <div className="form-content" ref={this.elementRef}>
          <div className="input text required">
            <textarea name="description" className="fluid" ref={this.textareaRef}
              maxLength="10000" placeholder="enter a description" value={this.description}
              onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} autoComplete="off"/>
          </div>
          {this.state.error &&
          <div className="feedbacks message error">{this.state.error}</div>
          }
          <div className="actions">
            <a className={`button description-editor-submit ${this.hasAllInputDisabled() ? "primary processing disabled" : ""}`}
              onClick={this.handleFormSubmit} role="button">
              <span>Save</span>
            </a>
            <a className={`cancel button ${this.hasAllInputDisabled() ? "disabled" : ""}`} role="button"
              onClick={this.handleCancel}>Cancel</a>
          </div>
        </div>
      </form>
    );
  }
}

DescriptionEditor.contextType = AppContext;

DescriptionEditor.propTypes = {
  description: PropTypes.string, // the description
  resource: PropTypes.any, // the resource to update the description for
  plaintextDto: PropTypes.any, // the plaintext secret to update if description is encrypted
  onClose: PropTypes.func, // toggle to display or not the editor
  actionFeedbackContext: PropTypes.any, // The action feedback context
  loadingContext: PropTypes.any // The loading context
};

export default withLoading(withActionFeedback(DescriptionEditor));
