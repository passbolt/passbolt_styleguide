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
import Icon from "../../../../react/components/Common/Icons/Icon";
import DescriptionEditor from "./DescriptionEditor";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import AppContext from "../../../contexts/AppContext";

/**
 * This component display the description section of a resource
 */
class PasswordSidebarDescriptionSection extends React.Component {
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
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: false,
      error: false,
      isSecretDecrypting: false,
      showDescriptionEditor: false,
      description: undefined,
      plaintextDto: undefined,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.toggleInputDescriptionEditor = this.toggleInputDescriptionEditor.bind(this);
    this.onCloseDescriptionEditor = this.onCloseDescriptionEditor.bind(this);
  }

  componentDidMount() {
    if (this.state.open) {
      this.setDescription();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.resource.id !== prevProps.resource.id || this.props.resource.modified !== prevProps.resource.modified) {
      if (this.state.open) {
        this.setDescription();
      } else {
        this.setState({description: undefined});
      }
    }
  }

  setDescription() {
    if (this.isResourceDescriptionEncrypted()) {
      this.decryptSecret();
    } else {
      this.setState({description: this.resource.description});
    }
  }

  /*
   * =============================================================
   *  Decryption
   * =============================================================
   */
  isDecryptionRequired() {
    return (this.isResourceDescriptionEncrypted && typeof this.state.description === undefined);
  }

  isResourceDescriptionEncrypted() {
    if (!this.resource.resource_type_id) {
      return false;
    }
    return this.context.resourceTypesSettings.assertResourceTypeIdHasEncryptedDescription(
      this.resource.resource_type_id
    );
  }

  /**
   * Return the description from a given plaintextDto
   * @param {object|string} plaintextDto
   */
  getSecretDescription(plaintextDto) {
    let description = undefined;
    if (typeof plaintextDto === 'string') {
      description = plaintextDto;
    } else if (plaintextDto.description) {
      description = plaintextDto.description;
    }

    return description;
  }

  /**
   * Decrypt the password plaintextDto
   * @return {Promise<boolean>}
   */
  async decryptSecret() {
    this.setState({isSecretDecrypting: true});

    try {
      const plaintextDto = await this.context.port.request("passbolt.secret.decrypt", this.resource.id, {showProgress: false});
      const description = this.getSecretDescription(plaintextDto);
      this.setState({
        plaintextDto: plaintextDto,
        description: description,
        isSecretDecrypting: false
      });
    } catch (error) {
      console.error(error);
      this.setState({
        isSecretDecrypting: false,
        error: true,
        errorMsg: `Sorry the description could not be decrypted. ${error.message}`
      });

      return false;
    }

    return true;
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
    return this.props.resource;
  }

  /**
   * Get the current plaintextDto
   * @returns {object|string|undefined} plaintextDto dto
   */
  get plaintextDto() {
    return this.state.plaintextDto;
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resourceTypesSettings() {
    return this.context.resourceTypesSettings.resourceTypesSettings;
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
    if (open && this.state.description === undefined) {
      this.setDescription();
    }
    this.setState({open});
  }

  /**
   * Display or not the input tag editor
   */
  toggleInputDescriptionEditor() {
    if (this.canEdit()) {
      const showDescriptionEditor = !this.state.showDescriptionEditor;
      this.setState({showDescriptionEditor});
    }
  }

  onCloseDescriptionEditor(description) {
    this.setState({description}, this.toggleInputDescriptionEditor());
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
    return !this.description;
  }

  /**
   * @returns {boolean}
   */
  canEdit() {
    return !this.state.error && this.resource.permission && this.resource.permission.type >= 7;
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
            <a onClick={this.handleTitleClickEvent} role="button" className="section-opener">
              Description
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          {this.canEdit() &&
          <a className="section-action" onClick={this.toggleInputDescriptionEditor}>
            <Icon name="edit"/>
            <span className="visuallyhidden">edit</span>
          </a>
          }
          {this.state.isSecretDecrypting &&
          <p className="description-content">
            <span className="processing-wrapper">
              <span className="processing-text">Decrypting</span>
            </span>
          </p>
          }
          {this.state.error &&
          <p className="description-content error-message">
            {this.state.errorMsg}
          </p>
          }
          {this.mustShowEmptyDescription() &&
          <p className="description-content">
            {!this.canEdit() &&
              <em className="empty-content">There is no description</em>
            }
            {this.canEdit() &&
            <em className="empty-content" onClick={this.toggleInputDescriptionEditor}>
              There is no description yet, click here to add one
            </em>
            }
          </p>
          }
          {this.mustShowDescription() &&
          <p className="description-content" onClick={this.toggleInputDescriptionEditor}>
            {this.description}
          </p>
          }
          {this.mustShowDescriptionEditor() &&
          <DescriptionEditor
            description={this.description}
            resource={this.resource}
            plaintextDto={this.state.plaintextDto}
            onClose={this.onCloseDescriptionEditor}/>
          }
        </div>
      </div>
    );
  }
}

PasswordSidebarDescriptionSection.contextType = AppContext;

PasswordSidebarDescriptionSection.propTypes = {
  resource: PropTypes.any, // The resource
};

export default withResourceWorkspace(PasswordSidebarDescriptionSection);
