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
 * @since         3.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import EditResourceDescription from "../../ResourceDescription/EditResourceDescription/EditResourceDescription";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

/**
 * This component display the description section of a resource
 */
class DisplayResourceDetailsDescription extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {object}
   */
  getDefaultState() {
    return {
      open: false,
      error: false,
      isSecretDecrypting: false,
      showDescriptionEditor: false,
      description: null,
      plaintextSecretDto: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.toggleInputDescriptionEditor = this.toggleInputDescriptionEditor.bind(this);
    this.onCloseDescriptionEditor = this.onCloseDescriptionEditor.bind(this);
    this.onUpdateDescription = this.onUpdateDescription.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleRetryDecryptClickEvent = this.handleRetryDecryptClickEvent.bind(this);
  }

  componentDidMount() {
    if (this.state.open) {
      this.loadDescription();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.resource.id !== prevProps.resourceWorkspaceContext.details.resource.id
      || this.resource.modified !== prevProps.resourceWorkspaceContext.details.resource.modified
      && !this.state.showDescriptionEditor) {
      // Avoid an update when the user do it with the description editor to not asking his passphrase again
      if (this.state.open) {
        this.loadDescription();
      } else {
        this.setState({description: null});
      }
    }
  }

  /**
   * Load the description.
   * Trigger the secret decrypting if the description is part of the resource secret.
   * @returns {Promise<void>}
   */
  async loadDescription() {
    if (this.isResourceDescriptionEncrypted()) {
      return this.decryptAndLoadEncryptedDescription();
    }

    const description = this.resource.description;
    const plaintextSecretDto = null; // Reset the plaintext secret description.
    const error = false; // Reset any errors.
    this.setState({description, plaintextSecretDto, error});
  }

  /*
   * =============================================================
   *  Decryption
   * =============================================================
   */
  isResourceDescriptionEncrypted() {
    if (!this.resource.resource_type_id) {
      return false;
    }
    return this.props.context.resourceTypesSettings.assertResourceTypeIdHasEncryptedDescription(
      this.resource.resource_type_id
    );
  }

  /**
   * Decrypt the resource secret and load its description in the component.
   * @return {Promise<void>}
   */
  async decryptAndLoadEncryptedDescription() {
    this.setState({isSecretDecrypting: true});

    try {
      const plaintextSecretDto = await this.props.context.port.request("passbolt.secret.decrypt", this.resource.id);
      this.setState({
        description: plaintextSecretDto.description,
        plaintextSecretDto: plaintextSecretDto,
        isSecretDecrypting: false,
        error: false
      });
      this.props.resourceWorkspaceContext.onResourceDescriptionDecrypted();
    } catch (error) {
      console.error(error);
      this.setState({
        description: null,
        plaintextSecretDto: null,
        isSecretDecrypting: false,
        error: true,
        errorMsg: this.props.t("Decryption failed, click here to retry")
      });
      await this.props.actionFeedbackContext.displayError(error.message);
    }
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resourceTypesSettings() {
    return this.props.context.resourceTypesSettings.resourceTypesSettings;
  }

  /**
   * Get the description if decrypted undefined otherwise
   * @returns {string|undefined} description
   */
  get description() {
    return this.state.description;
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    if (open && this.state.description === null) {
      this.loadDescription();
    }
    this.setState({open});
  }

  /**
   * Display or not the input tag editor
   */
  toggleInputDescriptionEditor() {
    const hasTextSelected = Boolean(window.getSelection().toString());
    if (!hasTextSelected && this.canEdit()) {
      const showDescriptionEditor = !this.state.showDescriptionEditor;
      this.setState({showDescriptionEditor});
    }
  }

  /**
   * Check if description must be decrypted before editing
   */
  handleEditClickEvent() {
    if (this.state.description === null) {
      this.handleRetryDecryptClickEvent();
    }
    this.toggleInputDescriptionEditor();
  }

  /**
   * Retry to decrypted description
   */
  handleRetryDecryptClickEvent() {
    this.loadDescription();
  }

  /**
   * Handle the description editor closing.
   */
  onCloseDescriptionEditor() {
    this.setState({showDescriptionEditor: false});
  }

  /**
   * Handle the description updated.
   * @param {string} description The updated description
   * @param {object} plaintextSecretDto The plaintext secret DTO updated if any.
   */
  onUpdateDescription(description, plaintextSecretDto) {
    this.setState({description, plaintextSecretDto, showDescriptionEditor: false});
  }

  /*
   * =============================================================
   *  Display helpers
   * =============================================================
   */
  /**
   * @returns {boolean}
   */
  hasNoDescription() {
    return this.state.description === null
      || this.state.description?.length === 0;
  }

  /**
   * @returns {boolean}
   */
  canEdit() {
    return this.resource.permission
      && this.resource.permission.type >= 7
      && !this.props.context.resourceTypesSettings.assertResourceTypeIdHasTotp(this.resource.resource_type_id);
  }

  /**
   * @returns {boolean}
   */
  mustShowDescriptionEditor() {
    return !this.state.error && !this.state.isSecretDecrypting && this.canEdit() && this.state.showDescriptionEditor;
  }

  /**
   * @returns {boolean}
   */
  mustShowEmptyDescription() {
    return !this.state.error && !this.state.isSecretDecrypting && this.hasNoDescription() && !this.state.showDescriptionEditor;
  }

  /**
   * @returns {boolean}
   */
  mustShowDescription() {
    return !this.state.error && !this.state.isSecretDecrypting && !this.hasNoDescription() && !this.state.showDescriptionEditor;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClickEvent} className="link no-border section-opener">
              <Trans>Description</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          {this.canEdit() &&
          <button type="button" className="link no-border section-action button-transparent" onClick={this.handleEditClickEvent}>
            <Icon name="edit"/>
            <span className="visuallyhidden"><Trans>Edit</Trans></span>
          </button>
          }
          {this.state.isSecretDecrypting &&
          <p className="description-content">
            <span className="processing-wrapper">
              <Icon name="spinner"/>
              <span className="processing-text"><Trans>Decrypting</Trans></span>
            </span>
          </p>
          }
          {this.state.error && !this.state.isSecretDecrypting &&
          <p className="description-content error-message">
            <button type="button" className="link no-border empty-content" onClick={this.handleRetryDecryptClickEvent}>
              {this.state.errorMsg}
            </button>
          </p>
          }
          {this.mustShowEmptyDescription() &&
          <p className="description-content">
            {!this.canEdit() &&
              <span className="empty-content"><Trans>There is no description.</Trans></span>
            }
            {this.canEdit() &&
            <span className="empty-content" onClick={this.toggleInputDescriptionEditor}>
              <Trans>There is no description yet, click here to add one.</Trans>
            </span>
            }
          </p>
          }
          {this.mustShowDescription() &&
          <p className="description-content" onClick={this.toggleInputDescriptionEditor}>
            {this.state.description}
          </p>
          }
          {this.mustShowDescriptionEditor() &&
          <EditResourceDescription
            plaintextSecretDto={this.state.plaintextSecretDto}
            resource={this.resource}
            onClose={this.onCloseDescriptionEditor}
            onUpdate={this.onUpdateDescription}
            onUpdateDescription={this.onUpdateDescription}/>
          }
        </div>
      </div>
    );
  }
}

DisplayResourceDetailsDescription.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any, // The resource
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withActionFeedback(withTranslation('common')(DisplayResourceDetailsDescription))));
