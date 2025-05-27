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
import LinkSVG from "../../../../img/svg/link.svg";
import PaintBrushSVG from "../../../../img/svg/paintbrush.svg";
//import ArrowBigUpDashSVG from "../../../../img/svg/arrow_big_up_dash.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";

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
    this.handleDeleteSecret = this.handleDeleteSecret.bind(this);
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
   */
  handleAddSecret(secret) {
    if (this.props.onAddSecret) {
      this.props.onAddSecret(secret);
    }
  }

  /**
   * Handle delete secret
   * @param {string} secret The secret to delete
   */
  handleDeleteSecret(secret) {
    if (this.props.onDeleteSecret) {
      this.props.onDeleteSecret(secret);
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
   * Is resource has multiple secret
   * @returns {boolean}
   */
  get isResourceHasMultipleSecret() {
    const isSecretProperty = prop => prop !== "object_type";
    const isSecretHasValue = value => value != null;
    const isSecretPropertyAndHasValue = ([prop, value]) => isSecretProperty(prop) && isSecretHasValue(value);

    return this.resource?.secret && Object.entries(this.resource?.secret).filter(isSecretPropertyAndHasValue).length > 1;
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
   * Is resource type has metadata
   * @returns {boolean}
   */
  get isResourceTypeHasMetadata() {
    return this.isResourceTypeV5 || this.isResourceTypeV4PasswordString;
  }

  /**
   * Is resource type has description metadata
   * @returns {boolean}
   */
  get isResourceTypeHasDescriptionMetadata() {
    return this.props.resourceType?.hasMetadataDescription();
  }

  /**
   * Is resource type V5
   * @returns {boolean}
   */
  get isResourceTypeV5() {
    return this.props.resourceType?.isV5();
  }

  /**
   * Returns true if the resource has appearance customisation available
   * @returns {boolean}
   */
  get hasResourceAppearance() {
    return this.props.resourceType.isV5();
  }

  /**
   * Should the 'Metadata' section be displayed
   * @returns {boolean}
   */
  get shouldDisplayMetadataSection() {
    return this.isResourceTypeHasDescriptionMetadata || this.hasResourceAppearance;
  }

  /**
   * Is resource type v4 password string
   * @returns {boolean}
   */
  get isResourceTypeV4PasswordString() {
    return this.props.resourceType?.isV4() && this.props.resourceType?.isPasswordString();
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
    return !this.isResourceHasNote && !this.isResourceTypeV4PasswordString
      && this.props.resourceTypes?.hasSomeNoteResourceTypes(this.props.resourceType?.version);
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
            <DropdownButton className="add-secret" disabled={!this.canAddSecret || this.props.disabled}>
              <AddSVG/>
              <span><Trans>Add secret</Trans></span>
              <CaretDownSVG/>
            </DropdownButton>
            <DropdownMenu className="menu-create-primary">
              {this.canAddSecretPassword &&
                <DropdownItem>
                  <button id="password_action" type="button" className="no-border"
                    onClick={() => this.handleAddSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD)}>
                    <KeySVG/>
                    <span><Trans>Password</Trans></span>
                  </button>
                </DropdownItem>
              }
              {this.canAddSecretTotp &&
                <DropdownItem>
                  <button id="totp_action" type="button" className="no-border"
                    onClick={() => this.handleAddSecret(ResourceEditCreateFormEnumerationTypes.TOTP)}>
                    <TotpSVG/>
                    <span><Trans>TOTP</Trans></span>
                  </button>
                </DropdownItem>
              }
              {this.canAddSecretNote &&
                <DropdownItem>
                  <button id="note_action" type="button" className="no-border"
                    onClick={() => this.handleAddSecret(ResourceEditCreateFormEnumerationTypes.NOTE)}>
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
                <div className={`section-content ${ResourceEditCreateFormEnumerationTypes.PASSWORD === this.selectedForm ? "selected" : ""}`}>
                  <button type="button" className="no-border"
                    id="secret-password-tab"
                    disabled={this.props.disabled}
                    onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.PASSWORD)}>
                    <KeySVG/>
                    <span className="ellipsis"><Trans>Passwords</Trans></span>
                  </button>
                  {this.isResourceHasMultipleSecret &&
                    <button type="button" id="delete-password" disabled={this.props.disabled} className="button-transparent inline" onClick={() => this.handleDeleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD)}>
                      <DeleteSVG/>
                    </button>
                  }
                </div>
              }
              {this.isResourceHasTotp &&
                <div className={`section-content ${ResourceEditCreateFormEnumerationTypes.TOTP === this.selectedForm ? "selected" : ""}`}>
                  <button type="button" className="no-border"
                    id="secret-totp-tab"
                    disabled={this.props.disabled}
                    onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.TOTP)}>
                    <TotpSVG/>
                    <span className="ellipsis"><Trans>TOTP</Trans></span>
                  </button>
                  {this.isResourceHasMultipleSecret &&
                    <button type="button" id="delete-totp" disabled={this.props.disabled} className="button-transparent inline" onClick={() => this.handleDeleteSecret(ResourceEditCreateFormEnumerationTypes.TOTP)}>
                      <DeleteSVG/>
                    </button>
                  }
                </div>
              }
              {this.isResourceHasNote &&
                <div className={`section-content ${ResourceEditCreateFormEnumerationTypes.NOTE === this.selectedForm ? "selected" : ""}`}>
                  <button type="button" className="no-border"
                    id="secret-note-tab"
                    disabled={this.props.disabled}
                    onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.NOTE)}>
                    <NotesSVG/>
                    <span className="ellipsis"><Trans>Note</Trans></span>
                  </button>
                  {this.isResourceHasMultipleSecret &&
                    <button type="button" id="delete-note" disabled={this.props.disabled} className="button-transparent inline" onClick={() => this.handleDeleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE)}>
                      <DeleteSVG/>
                    </button>
                  }
                </div>
              }
            </>
          }
          {this.shouldDisplayMetadataSection &&
            <>
              <button type="button" className="section-header no-border" onClick={this.handleDisplayMetadataClick}>
                {this.state.displayMetadata
                  ? <CaretDownSVG className="caret-down"/>
                  : <CaretRightSVG className="caret-right"/>
                }
                <span className="ellipsis"><Trans>Metadata</Trans></span>
              </button>
              {this.state.displayMetadata &&
                <>
                  {this.hasResourceAppearance &&
                    <div className={`section-content ${ResourceEditCreateFormEnumerationTypes.APPEARANCE === this.selectedForm ? "selected" : ""}`}>
                      <button type="button" id="menu-appearance" className="no-border" disabled={this.props.disabled}
                        onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.APPEARANCE)}>
                        <PaintBrushSVG/>
                        <span className="ellipsis"><Trans>Appearance</Trans></span>
                      </button>
                    </div>
                  }
                  {this.isResourceTypeV5 &&
                    <div className={`section-content ${ResourceEditCreateFormEnumerationTypes.URIS === this.selectedForm ? "selected" : ""}`}>
                      <button type="button" id="menu-uris" className="no-border" disabled={this.props.disabled}
                        onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.URIS)}>
                        <LinkSVG/>
                        <span className="ellipsis"><Trans>URIs</Trans></span>
                      </button>
                    </div>
                  }
                  {this.isResourceTypeHasDescriptionMetadata &&
                  <div className={`section-content ${ResourceEditCreateFormEnumerationTypes.DESCRIPTION === this.selectedForm ? "selected" : ""}`}>
                    <button type="button" id="menu-description" className="no-border" disabled={this.props.disabled}
                      onClick={event => this.handleSelectForm(event, ResourceEditCreateFormEnumerationTypes.DESCRIPTION)}>
                      <AlignLeftSVG/>
                      <span className="ellipsis"><Trans>Description</Trans></span>
                    </button>
                  </div>
                  }
                </>
              }
            </>
          }
        </div>
        {/* Upgrade v4 to v5

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

        */}
      </div>
    );
  }
}

SelectResourceForm.propTypes = {
  resourceFormSelected: PropTypes.string, // The resource form selected
  onSelectForm: PropTypes.func, // The on select form function
  onAddSecret: PropTypes.func, // The on add secret function
  onDeleteSecret: PropTypes.func, // The on delete secret function
  onUpgradeToV5: PropTypes.func, // The on delete secret function
  resource: PropTypes.object, // The resource to edit or create
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource type entity
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection),
  disabled: PropTypes.bool, // The disabled property
  t: PropTypes.func, // The translation function
};

export default  withResourceTypesLocalStorage(withTranslation('common')(SelectResourceForm));

