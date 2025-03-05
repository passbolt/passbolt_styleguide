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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import AddSVG from "../../../../img/svg/add.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownItem from "../../Common/Dropdown/DropdownMenuItem";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import NotesSVG from "../../../../img/svg/notes.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import AlignLeftSVG from "../../../../img/svg/align_left.svg";
import ArrowBigUpDashSVG from "../../../../img/svg/arrow_big_up_dash.svg";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import TotpEntity from "../../../../shared/models/entity/totp/totpEntity";

class SelectResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      displaySecrets: true,
      displayMetadata: true,
      displayUpgrade: true,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleDisplaySecretsClick = this.handleDisplaySecretsClick.bind(this);
    this.handleDisplayMetadataClick = this.handleDisplayMetadataClick.bind(this);
    this.handleDisplayUpgradeClick = this.handleDisplayUpgradeClick.bind(this);
    this.handleSelectForm = this.handleSelectForm.bind(this);
    this.handleAddSecret = this.handleAddSecret.bind(this);
  }

  /**
   * Handles the click on the display secrets button.
   */
  handleDisplaySecretsClick() {
    this.setState({displaySecrets: !this.state.displaySecrets});
  }

  /**
   * Handles the click on the display metadata button.
   */
  handleDisplayMetadataClick() {
    this.setState({displayMetadata: !this.state.displayMetadata});
  }

  /**
   * Handles the click on the display upgrade button.
   */
  handleDisplayUpgradeClick() {
    this.setState({displayUpgrade: !this.state.displayUpgrade});
  }

  /**
   * Handle select form.
   * @param {ReactEvent} event The react event.
   * @param {string} resourceFormSelected The resource form selected.
   */
  handleSelectForm(event, resourceFormSelected) {
    if (this.props.onSelectForm) {
      this.props.onSelectForm(event, resourceFormSelected);
    }
  }

  /**
   * Handle add secret
   * @param {string} secret The secret to add
   * @param {*} value The value to add
   */
  handleAddSecret(secret, value) {
    if (this.props.onAddSecret) {
      this.props.onAddSecret(secret, value);
    }
  }

  /**
   * Get selected resource form
   * @returns {string|null|*}
   */
  get selectedForm() {
    return this.props.resourceFormSelected;
  }

  /**
   * Get the resource
   */
  get resource() {
    return this.props.resource;
  }

  /**
   * Is resource has password
   * @returns {boolean}
   */
  get isResourceHasPassword() {
    return this.resource?.secret?.password != null;
  }

  /**
   * Is resource has totp
   * @returns {boolean}
   */
  get isResourceHasTotp() {
    return this.resource?.secret?.totp != null;
  }

  /**
   * Is resource has note
   * @returns {boolean}
   */
  get isResourceHasNote() {
    return this.resource?.secret?.description != null;
  }

  /**
   * Is resource type has description metadata
   * @returns {boolean}
   */
  get isResourceTypeHasDescriptionMetadata() {
    return this.props.resourceType?.hasMetadataDescription();
  }

  /**
   * Can add secret
   * @returns {boolean}
   */
  get canAddSecret() {
    return this.canAddSecretPassword
        || this.canAddSecretTotp
        || this.canAddSecretNote;
  }

  /**
   * Can add secret password
   * @returns {boolean}
   */
  get canAddSecretPassword() {
    return !this.isResourceHasPassword && this.props.resourceTypes?.hasSomePasswordResourceTypes(this.props.resourceType?.version);
  }

  /**
   * Can add secret totp
   * @returns {boolean}
   */
  get canAddSecretTotp() {
    return !this.isResourceHasTotp && this.props.resourceTypes?.hasSomeTotpResourceTypes(this.props.resourceType?.version);
  }

  /**
   * Can add secret totp
   * @returns {boolean}
   */
  get canAddSecretNote() {
    return !this.isResourceHasNote && this.props.resourceTypes?.hasSomeNoteResourceTypes(this.props.resourceType?.version);
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <div className="left-sidebar">
        <div className="main-action-wrapper">
          <Dropdown>
            <DropdownButton className="add-secret" disabled={!this.canAddSecret}>
              <AddSVG/>
              <span><Trans>Add secret</Trans></span>
              <CaretDownSVG/>
            </DropdownButton>
            <DropdownMenu className="menu-create-primary">
              {this.canAddSecretPassword &&
                <DropdownItem>
                  <button id="password_action" type="button" className="no-border"
                    onClick={() => this.handleAddSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD, "")}>
                    <KeySVG/>
                    <span><Trans>Password</Trans></span>
                  </button>
                </DropdownItem>
              }
              {this.canAddSecretTotp &&
                <DropdownItem>
                  <button id="totp_action" type="button" className="no-border"
                    onClick={() => this.handleAddSecret(ResourceEditCreateFormEnumerationTypes.TOTP, TotpEntity.createFromDefault({}, {validate: false}))}>
                    <TotpSVG/>
                    <span><Trans>TOTP</Trans></span>
                  </button>
                </DropdownItem>
              }
              {this.canAddSecretNote &&
                <DropdownItem>
                  <button id="note_action" type="button" className="no-border"
                    onClick={() => this.handleAddSecret(ResourceEditCreateFormEnumerationTypes.NOTE, "")}>
                    <NotesSVG/>
                    <span><Trans>Note</Trans></span>
                  </button>
                </DropdownItem>
              }
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="sidebar-content-sections">
          <button type="button" className="section-header no-border" onClick={this.handleDisplaySecretsClick}>
            {this.state.displaySecrets
              ? <CaretDownSVG className="caret-down"/>
              : <CaretRightSVG className="caret-right"/>
            }
            <span className="ellipsis"><Trans>Secrets</Trans></span>
          </button>
          {this.state.displaySecrets &&
            <>
              {this.isResourceHasPassword &&
                <button type="button"
                  className={`section-content no-border ${ResourceEditCreateFormEnumerationTypes.PASSWORD === this.selectedForm ? "selected" : ""}`}
                  onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.PASSWORD)}>
                  <KeySVG/>
                  <span className="ellipsis"><Trans>Passwords</Trans></span>
                </button>
              }
              {this.isResourceHasTotp &&
                <button type="button"
                  className={`section-content no-border ${ResourceEditCreateFormEnumerationTypes.TOTP === this.selectedForm ? "selected" : ""}`}
                  onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.TOTP)}>
                  <TotpSVG/>
                  <span className="ellipsis"><Trans>TOTP</Trans></span>
                </button>
              }
              {this.isResourceHasNote &&
                <button type="button"
                  className={`section-content no-border ${ResourceEditCreateFormEnumerationTypes.NOTE === this.selectedForm ? "selected" : ""}`}
                  onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.NOTE)}>
                  <NotesSVG/>
                  <span className="ellipsis"><Trans>Note</Trans></span>
                </button>
              }
            </>
          }
          <button type="button" className="section-header no-border" onClick={this.handleDisplayMetadataClick}>
            {this.state.displayMetadata
              ? <CaretDownSVG className="caret-down"/>
              : <CaretRightSVG className="caret-right"/>
            }
            <span className="ellipsis"><Trans>Metadata</Trans></span>
          </button>
          {this.state.displayMetadata &&
            <>
              <button type="button"
                id="menu-description"
                className={`section-content no-border ${ResourceEditCreateFormEnumerationTypes.DESCRIPTION === this.selectedForm ? "selected" : ""}`}
                disabled={!this.isResourceTypeHasDescriptionMetadata}
                onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.DESCRIPTION)}>
                <AlignLeftSVG/>
                <span className="ellipsis"><Trans>Description</Trans></span>
              </button>
            </>
          }
        </div>
        <div className="section-card">
          <div className="card">
            <button type="button" className="title no-border" onClick={this.handleDisplayUpgradeClick}>
              <ArrowBigUpDashSVG/>
              <span className="text ellipsis"><Trans>Upgrade available</Trans></span>
              {this.state.displayUpgrade
                ? <CaretDownSVG className="caret-down"/>
                : <CaretRightSVG className="caret-right"/>
              }
            </button>
            {this.state.displayUpgrade &&
              <div className="content">
                <p><Trans>Upgrade for security improvements and new features.</Trans></p>
                <div className="actions-wrapper">
                  <button type="button" className="button link">
                    <span className="ellipsis"><Trans>Learn more</Trans></span>
                  </button>
                  <button type="button">
                    <span className="ellipsis"><Trans>Upgrade</Trans></span>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

SelectResourceForm.propTypes = {
  resourceFormSelected: PropTypes.string, // The resource form selected
  onSelectForm: PropTypes.func, // The on select form function
  onAddSecret: PropTypes.func, // The on add secret function
  resource: PropTypes.object, // The resource to edit or create
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource type entity
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection),
  t: PropTypes.func, // The translation function
};

export default  withResourceTypesLocalStorage(withTranslation('common')(SelectResourceForm));

