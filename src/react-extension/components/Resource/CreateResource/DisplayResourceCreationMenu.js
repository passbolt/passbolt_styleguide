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
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {Trans, withTranslation} from "react-i18next";
import Tab from "../../Common/Tab/Tab";
import Tabs from "../../Common/Tab/Tabs";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import MetadataTypesSettingsEntity, {RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {withResourceTypesLocalStorage} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {withMetadataTypesSettingsLocalStorage} from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";

class DisplayResourceCreationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      processing: false,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleClose = this.handleClose.bind(this);
    this.handleContentTypeClick = this.handleContentTypeClick.bind(this);
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Handles a click on the content type buttons
   * @param {React.Event} event
   * @param {string} resourceTypeSlug
   */
  handleContentTypeClick(event) {
    event.preventDefault();
    //@todo: implement call to resource create dialog
  }

  /**
   * Returns the default tab to displayed based on the current configuration.
   * @returns {string}
   */
  get defaultDisplayedTab() {
    return this.props.metadataTypeSettings.defaultResourceTypes === RESOURCE_TYPE_VERSION_5
      ? "resourceV5"
      : "resourceV4";
  }

  /**
   * Returns true if the v4 content types are available
   * @returns {boolean}
   */
  get areLegacyCleartextMetadataContentTypesAvailable() {
    return this.props.metadataTypeSettings.allowCreationOfV4Resources
      && this.props.resourceTypes?.hasSomeOfVersion(RESOURCE_TYPE_VERSION_4);
  }

  /**
   * Returns true if the v4 content types are available
   * @returns {boolean}
   */
  get areEncryptedMetadataContentTypesAvailable() {
    return this.props.metadataTypeSettings.allowCreationOfV5Resources
      && this.props.resourceTypes?.hasSomeOfVersion(RESOURCE_TYPE_VERSION_5);
  }

  /**
   * Returns true if both v5 and v4 resources types are available therefore, tabs should be displayed
   * @returns {boolean}
   */
  get shouldDisplayTabs() {
    return this.areEncryptedMetadataContentTypesAvailable
      && this.areLegacyCleartextMetadataContentTypesAvailable;
  }

  /**
   * Returns true if there is at least 1 content type v4 with a password associated.
   * @returns {boolean}
   */
  get hasPasswordV4() {
    return this.props.resourceTypes?.hasSomePasswordResourceTypes(RESOURCE_TYPE_VERSION_4);
  }

  /**
   * Returns true if there is at least 1 content type v4 with a totp associated.
   * @returns {boolean}
   */
  get hasTotpV4() {
    return this.props.resourceTypes?.hasSomeTotpResourceTypes(RESOURCE_TYPE_VERSION_4);
  }

  /**
   * Returns true if there is at least 1 content type v5 with a password associated.
   * @returns {boolean}
   */
  get hasPasswordV5() {
    return this.props.resourceTypes?.hasSomePasswordResourceTypes(RESOURCE_TYPE_VERSION_5);
  }

  /**
   * Returns true if there is at least 1 content type v5 with a totp associated.
   * @returns {boolean}
   */
  get hasTotpV5() {
    return this.props.resourceTypes?.hasSomeTotpResourceTypes(RESOURCE_TYPE_VERSION_5);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Return the content of the encrypted metadata content types panel
   * @returns {JSX}
   */
  get encryptedMetadataContentTypes() {
    return (
      <div className="grid">
        {this.hasPasswordV5 &&
          <button id="password_action" type="button" className="button-transparent card" onClick={e => this.handleContentTypeClick(e, RESOURCE_TYPE_V5_DEFAULT_SLUG)}>
            <KeySVG/>
            <div className="card-information">
              <span className="title"><Trans>Password</Trans></span>
              <span className="info"><Trans>Resource description</Trans></span>
            </div>
          </button>
        }
        {this.hasTotpV5 &&
          <button id="totp_action" type="button" className="button-transparent card" onClick={e => this.handleContentTypeClick(e, RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG)}>
            <TotpSVG/>
            <div className="card-information">
              <span className="title"><Trans>TOTP</Trans></span>
              <span className="info"><Trans>Resource description</Trans></span>
            </div>
          </button>
        }
      </div>
    );
  }

  /**
   * Return the content of the legacy cleartext metadata content types panel
   * @returns {JSX}
   */
  get legacyCleartextMetadataContentTypes() {
    return (
      <div className="grid">
        {this.hasPasswordV4 &&
          <button id="password_action" type="button" className="button-transparent card" onClick={e => this.handleContentTypeClick(e, RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG)}>
            <KeySVG/>
            <div className="card-information">
              <span className="title"><Trans>Password</Trans></span>
              <span className="info"><Trans>Resource description</Trans></span>
            </div>
          </button>
        }
        {this.hasTotpV4 &&
          <button id="totp_action" type="button" className="button-transparent card" onClick={e => this.handleContentTypeClick(e, RESOURCE_TYPE_TOTP_SLUG)}>
            <TotpSVG/>
            <div className="card-information">
              <span className="title"><Trans>TOTP</Trans></span>
              <span className="info"><Trans>Resource description</Trans></span>
            </div>
          </button>
        }
      </div>
    );
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    const shouldShowTabs = this.shouldDisplayTabs;
    return (
      <DialogWrapper title={this.translate("Create a resource")} className="create-resource-menu"
        disabled={this.state.processing} onClose={this.handleClose}>
        <div className="dialog-body">
          {shouldShowTabs &&
            <Tabs activeTabName={this.defaultDisplayedTab}>
              <Tab key='resourceV5' name={this.props.t('Resources with encrypted metadata')} type='resourceV5'>
                {this.encryptedMetadataContentTypes}
              </Tab>
              <Tab key='resourceV4' name={this.props.t('Legacy resources')} type='resourceV4'>
                {this.legacyCleartextMetadataContentTypes}
              </Tab>
            </Tabs>
          }
          {!shouldShowTabs && this.areEncryptedMetadataContentTypesAvailable && this.encryptedMetadataContentTypes}
          {!shouldShowTabs && this.areLegacyCleartextMetadataContentTypesAvailable && this.legacyCleartextMetadataContentTypes}
        </div>
      </DialogWrapper>
    );
  }
}

DisplayResourceCreationMenu.propTypes = {
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  folderParentId: PropTypes.string, // The folder parent id
  onClose: PropTypes.func, // Whenever the component must be closed
  t: PropTypes.func, // The translation function
};

export default  withMetadataTypesSettingsLocalStorage(withResourceTypesLocalStorage(withTranslation('common')(DisplayResourceCreationMenu)));

