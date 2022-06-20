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
   * @returns {*}
   */
  getDefaultState() {
    return {
      encryptDescription: false,
      description: undefined, // description of the resource
      plaintextDto: undefined, // description of the resource
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
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
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
      plaintextDto: this.props.plaintextDto,
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
    return this.props.context.resourceTypesSettings.mustEncryptDescription(this.props.resource.resource_type_id);
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
  isEncryptedDescriptionEnabled() {
    return this.resourceTypesSettings.isEncryptedDescriptionEnabled();
  }

  areResourceTypesEnabled() {
    return this.resourceTypesSettings.areResourceTypesEnabled();
  }

  /**
   * @returns {string}
   */
  get description() {
    return this.state.description;
  }

  /**
   * @returns {}
   */
  get plaintextDto() {
    return this.state.plaintextDto;
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
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The description has been updated successfully"));
      await this.props.resourceWorkspaceContext.onResourceDescriptionEdited();
      this.close(this.state.description);
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
   * Update the resource (LEGACY)
   * @returns {Promise<Object>} updated resource
   * @deprecated will be removed when v2 support is dropped
   */
  async updateCleartextDescription() {
    const resourceDto = {...this.props.resource};
    resourceDto.description = this.description;

    return this.props.context.port.request("passbolt.resources.update", resourceDto, null);
  }

  /**
   * Update the resource with encrypted description content type
   * @returns {Promise<Object>} updated resource
   */
  async updateWithEncryptedDescription() {
    const resourceDto = {...this.props.resource};
    resourceDto.description = '';
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );

    let plaintextDto = {};
    if (this.plaintextDto === undefined) {
      const password = await this.props.context.port.request("passbolt.secret.decrypt", resourceDto.id, {showProgress: false});
      plaintextDto.password = password;
    } else {
      plaintextDto = {...this.plaintextDto};
    }

    plaintextDto.description = this.description;
    await this.setState({plaintextDto});

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /*
   * =============================================================
   *  Out of widget actions
   * =============================================================
   */
  /**
   * Toggle the editor back to display mode
   * @param description The description to display
   * @returns {string} Send back the updated description and plaintextDto to avoid potential unnecessary decrypt round
   */
  close(description) {
    return this.props.onClose(description, this.plaintextDto);
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
    // Prevent stop editing when the user click on an element of the editor or is in processing state and click to enter his passphrase
    if (this.elementRef.current.contains(event.target) || this.state.processing) {
      return;
    }
    this.close(this.props.description);
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
      this.close(this.props.description);
    }
  }

  /**
   * On cancel button click
   */
  handleCancel() {
    this.close(this.props.description);
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
            <textarea name="description" className="fluid" ref={this.textareaRef}
              maxLength="10000" placeholder={this.translate("Enter a description")} value={this.description}
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
                <a role="button" onClick={event => this.handleDescriptionToggle(event)} className="lock-toggle">
                  <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                    <Icon name="lock-open"/>
                  </Tooltip>
                </a>
              }
              {this.areResourceTypesEnabled() && this.state.encryptDescription &&
                <a role="button" onClick={event => this.handleDescriptionToggle(event)} className="lock-toggle">
                  <Tooltip message={this.translate("The description content will be encrypted.")} icon="">
                    <Icon name="lock"/>
                  </Tooltip>
                </a>
              }
            </div>
            <a className={`cancel button ${this.hasAllInputDisabled() ? "disabled" : ""}`} role="button"
              onClick={this.handleCancel}><Trans>Cancel</Trans>
            </a>
            <a className={`button primary description-editor-submit ${this.hasAllInputDisabled() ? "processing disabled" : ""}`}
              onClick={this.handleFormSubmit} role="button">
              <span><Trans>Save</Trans></span>
            </a>
          </div>
        </div>
      </form>
    );
  }
}

EditResourceDescription.propTypes = {
  context: PropTypes.any, // The application context
  description: PropTypes.string, // the description
  resource: PropTypes.any, // the resource to update the description for
  plaintextDto: PropTypes.any, // the plaintext secret to update if description is encrypted
  onClose: PropTypes.func, // toggle to display or not the editor
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withLoading(withActionFeedback(withTranslation('common')(EditResourceDescription)))));
