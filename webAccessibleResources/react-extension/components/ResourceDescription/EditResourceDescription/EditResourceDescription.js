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
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withLoading} from "../../../contexts/LoadingContext";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";

/**
 * This component allows the current user to edit the description of a resource
 */
class EditResourceDescription extends React.Component {
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
   * @returns {object}
   */
  getDefaultState() {
    return {
      encryptDescription: this.mustEncryptDescription(),
      description: this.props.plaintextSecretDto?.description || this.props.resource.description, // description of the resource
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
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.elementRef = React.createRef();
    this.textareaRef = React.createRef();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.handleOutsideEditorClickEvent();
    this.setFocusOnDescriptionEditor();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
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
    return this.resourceTypesSettings.mustEncryptDescription(this.props.resource.resource_type_id);
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
    return this.props.context.resourceTypesSettings;
  }

  /*
   * =============================================================
   *  Resource type helpers
   * =============================================================
   */
  /**
   * Is the encrypted description content type enabled.
   * @returns {boolean}
   */
  isEncryptedDescriptionEnabled() {
    return this.resourceTypesSettings.isEncryptedDescriptionEnabled();
  }

  /**
   * Are resources types enabled.
   * @returns {boolean}
   */
  areResourceTypesEnabled() {
    return this.resourceTypesSettings.areResourceTypesEnabled();
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
      const updateDescriptionResult = await this.updateResource();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The description has been updated successfully"));
      await this.props.resourceWorkspaceContext.onResourceDescriptionEdited();
      this.props.onUpdate(updateDescriptionResult.description, updateDescriptionResult.plaintextSecretDto);
      this.close(updateDescriptionResult);
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
    if (!this.state.encryptDescription) {
      return this.updateCleartextDescription();
    }

    return this.updateWithEncryptedDescription();
  }

  /**
   * Update the resource with clear description.
   * @returns {Promise<Object>} updated resource
   */
  async updateCleartextDescription() {
    const resourceDto = {
      ...this.props.resource,
      description: this.state.description
    };

    await this.props.context.port.request("passbolt.resources.update", resourceDto, null);

    return {description: this.state.description};
  }

  /**
   * Update the resource with encrypted description content type
   * @returns {Promise<Object>}
   */
  async updateWithEncryptedDescription() {
    const description = this.state.description;
    const resourceDto = {...this.props.resource};
    resourceDto.description = '';
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );

    let plaintextSecretDto = this.props.plaintextSecretDto;
    // It happens if the description was previously not encrypted and the user decided to encrypt it.
    if (!plaintextSecretDto) {
      plaintextSecretDto = await this.props.context.port.request("passbolt.secret.decrypt", resourceDto.id);
    }
    const plaintextSecretToUpdateDto = {
      ...plaintextSecretDto,
      description
    };

    await this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextSecretToUpdateDto);

    return {description, plaintextSecretDto: plaintextSecretToUpdateDto};
  }

  /*
   * =============================================================
   *  Out of widget actions
   * =============================================================
   */
  /**
   * Toggle the editor back to display mode
   */
  close() {
    return this.props.onClose();
  }

  /**
   * Remove listener for outside description editor clicks that aims to closes the editor
   */
  removeOutsideEditorClickEvent() {
    document.removeEventListener('click', this.handleEditorClickEvent, {capture: true});
  }

  /**
   * handle a click outside of the editor
   */
  handleOutsideEditorClickEvent() {
    document.addEventListener('click', this.handleEditorClickEvent, {capture: true});
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
    const descriptionLength = this.state.description ? this.state.description.length : 0;
    this.textareaRef.current.selectionStart = descriptionLength;
    this.textareaRef.current.selectionEnd = descriptionLength;
    this.textareaRef.current.focus();
  }

  /**
   * Handle click events on editor. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleEditorClickEvent(event) {
    // Prevent stop editing when the user click on an element of the editor or is in processing state and click to enter his passphrase
    if (this.elementRef.current.contains(event.target) || this.state.processing) {
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

  /**
   * Switch to toggle description field encryption
   */
  async handleDescriptionToggle(event) {
    /*
     * When click on the lock button
     * the click is detected out of the element and the editor close.
     * To fix that an immediate stop propagation enable to avoid the editor close.
     * Need absolutely an immediate propagation to stop other listeners.
     */
    event.nativeEvent.stopImmediatePropagation();
    // Description is not encrypted and encrypted description type is not supported => leave it alone
    if (!this.isEncryptedDescriptionEnabled() && !this.state.encryptDescription) {
      return;
    }

    // No obligation to keep description encrypted, allow toggle
    if (!this.mustEncryptDescription()) {
      const encrypt = !this.state.encryptDescription;
      this.setState({encryptDescription: encrypt});
    }
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
          <div className="input textarea required">
            <textarea name="description" className="fluid" aria-required={true} ref={this.textareaRef}
              maxLength="10000" placeholder={this.translate("Enter a description")} value={this.state.description}
              onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} autoComplete="off"/>
          </div>
          {this.state.error &&
          <div className="feedbacks error-message">{this.state.error}</div>
          }
          <div className="actions">
            <div className="description-lock">
              {!this.areResourceTypesEnabled() &&
                <Tooltip message={this.translate("Do not store sensitive data. Unlike the password, this data is not encrypted. Upgrade to version 3 to encrypt this information.")}>
                  <Icon name="info-circle"/>
                </Tooltip>
              }
              {this.areResourceTypesEnabled() && !this.state.encryptDescription &&
                <button type="button" onClick={event => this.handleDescriptionToggle(event)} className="link no-border lock-toggle">
                  <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                    <Icon name="lock-open"/>
                  </Tooltip>
                </button>
              }
              {this.areResourceTypesEnabled() && this.state.encryptDescription &&
                <button type="button" onClick={event => this.handleDescriptionToggle(event)} className="link no-border lock-toggle">
                  <Tooltip message={this.translate("The description content will be encrypted.")} icon="">
                    <Icon name="lock"/>
                  </Tooltip>
                </button>
              }
            </div>
            <button type="button" disabled={this.hasAllInputDisabled()} className="cancel"
              onClick={this.handleCancel}><Trans>Cancel</Trans>
            </button>
            <button type="button" disabled={this.hasAllInputDisabled()} className={`primary description-editor-submit ${this.hasAllInputDisabled() ? "processing" : ""}`}
              onClick={this.handleFormSubmit}>
              <span><Trans>Save</Trans></span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

EditResourceDescription.propTypes = {
  context: PropTypes.any, // The application context
  plaintextSecretDto: PropTypes.object, // The plaintext secret DTO
  resource: PropTypes.any, // the resource to update the description for
  onClose: PropTypes.func, // toggle to display or not the editor
  onUpdate: PropTypes.func, // Whenever the description is updated
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withLoading(withActionFeedback(withTranslation('common')(EditResourceDescription)))));
