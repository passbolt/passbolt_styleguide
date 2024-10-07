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
import ResourcePasswordStringViewModel from "../../../../shared/models/resource/ResourcePasswordStringViewModel";
import ResourcePasswordDescriptionViewModel from "../../../../shared/models/resource/ResourcePasswordDescriptionViewModel";
import ResourcePasswordDescriptionTotpViewModel from "../../../../shared/models/resource/ResourcePasswordDescriptionTotpViewModel";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

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
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Get default state
   * @returns {object}
   */
  get defaultState() {
    return {
      processing: false, // component processing
      unexpectedError: null,
      resourceViewModel: null,
      originalResourceTypeSlug: null,
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
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
    this.initializeResourceViewModel();
    this.setFocusOnDescriptionEditor();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.removeOutsideEditorClickEvent();
  }

  /**
   * initialize the resource view model
   */
  initializeResourceViewModel() {
    const originalResourceType = this.props.resourceTypes?.getFirstById(this.props.resource.resource_type_id);
    const resourceViewModelType = this.getViewModelTypeBySlug(originalResourceType?.slug);

    let resourceViewModel = resourceViewModelType
      .createFromEntity(this.props.resource);

    if (this.props.plaintextSecretDto) {
      resourceViewModel = resourceViewModel.updateSecret(this.props.plaintextSecretDto);
    }

    this.setState({resourceViewModel, originalResourceTypeSlug: originalResourceType?.slug});
  }

  /**
   * Returns the corresponding ResourceViewModel type based on the given slug.
   * @param {string} slug
   * @returns {typeof ResourceViewModel}
   * @throws {Error} if the slug is unknown
   */
  getViewModelTypeBySlug(slug) {
    switch (slug) {
      case ResourcePasswordStringViewModel.resourceTypeSlug:
        return ResourcePasswordStringViewModel;
      case ResourcePasswordDescriptionViewModel.resourceTypeSlug:
        return ResourcePasswordDescriptionViewModel;
      case ResourcePasswordDescriptionTotpViewModel.resourceTypeSlug:
        return ResourcePasswordDescriptionTotpViewModel;
      default:
        throw new Error("There is no ResourceViewModel mathching the given slug");
    }
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
      this.close();
    } catch (error) {
      // It can happen when the user has closed the passphrase entry dialog by instance.
      if (error.name === "UserAbortsOperationError") {
        this.setState({processing: false});
        return;
      }

      // Unexpected error occurred.
      console.error(error);
      this.setState({
        unexpectedError: error.message,
        processing: false
      });
    }
  }

  /**
   * Update the resource
   * @returns {Promise<Object>} updated resource
   */
  async updateResource() {
    let resourceViewModel = this.state.resourceViewModel;
    const resourceDto = resourceViewModel.toResourceDto();

    const hasResourceTypeChange = this.state.originalResourceTypeSlug !== resourceViewModel.constructor.resourceTypeSlug;
    const hasSecretChanged = this.props.plaintextSecretDto && resourceViewModel.areSecretsDifferent(this.props.plaintextSecretDto);
    const shouldUpdateSecret = hasResourceTypeChange || hasSecretChanged;

    if (hasResourceTypeChange) {
      const description = resourceViewModel.description;
      //if resource type has change, we need to find the entire secret of the resource to avoid removing fields like `password` for instance
      const plaintextSecretDto = await this.props.context.port.request("passbolt.secret.find-by-resource-id", resourceViewModel.id);

      resourceViewModel = resourceViewModel
        .updateSecret(plaintextSecretDto)
        .cloneWithMutation("description", description);
    }

    const secretDto = shouldUpdateSecret
      ? resourceViewModel.toSecretDto()
      : null;

    await this.props.context.port.request("passbolt.resources.update", resourceDto, secretDto);

    return {description: this.state.resourceViewModel.description, plaintextSecretDto: this.state.resourceViewModel.toSecretDto()};
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
    const descriptionLength = this.state.resourceViewModel?.description?.length || 0;
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
    const name = target.name;
    const value = target.value || null;

    this.setState({
      resourceViewModel: this.state.resourceViewModel.cloneWithMutation(name, value),
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
  async handleDescriptionToggle() {
    //only a resource of type `password-string` can toggle its description field encryption state in the edit form.
    const isOriginalResourcePasswordString =  this.state.originalResourceTypeSlug === ResourcePasswordStringViewModel.resourceTypeSlug;
    if (!isOriginalResourcePasswordString) {
      return;
    }

    const canToggleDescription = this.state.resourceViewModel.canToggleDescription();
    if (!canToggleDescription) {
      return;
    }

    const resourceViewModel = this.state.resourceViewModel;
    const newResourceViewModelType = resourceViewModel.isDescriptionUnencrypted()
      ? ResourcePasswordDescriptionViewModel
      : ResourcePasswordStringViewModel;

    const resourceType = this.props.resourceTypes.getFirstBySlug(newResourceViewModelType.resourceTypeSlug);
    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: resourceType.id
    };

    const newResourceViewModel = new newResourceViewModelType(dto);
    this.setState({resourceViewModel: newResourceViewModel});
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
    const isReady = Boolean(this.state.resourceViewModel);
    return (
      <form onKeyDown={this.handleKeyDown} noValidate className="description-editor">
        <div className="form-content" ref={this.elementRef}>
          <div className="input textarea required">
            <textarea name="description" className="fluid" aria-required={true} ref={this.textareaRef}
              maxLength="10000" placeholder={this.translate("Enter a description")} value={isReady ? this.state.resourceViewModel.description : ""}
              onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} autoComplete="off"/>
          </div>
          {this.state.unexpectedError &&
            <div className="feedbacks error-message">{this.state.unexpectedError}</div>
          }
          <div className="actions">
            <div className="description-lock">
              <button type="button" onClick={this.handleDescriptionToggle} className="link no-border lock-toggle">
                {isReady &&
                  <>
                    {this.state.resourceViewModel.isDescriptionUnencrypted()
                      ? (
                        <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                          <Icon name="lock-open"/>
                        </Tooltip>
                      ) : (
                        <Tooltip message={this.translate("The description content will be encrypted.")} icon="">
                          <Icon name="lock"/>
                        </Tooltip>
                      )}
                  </>}
              </button>
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
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  actionFeedbackContext: PropTypes.any, // The action feedback context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withResourceTypesLocalStorage(withLoading(withActionFeedback(withTranslation('common')(EditResourceDescription))))));
