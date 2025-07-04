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
import DisplayResourceDetailsInformation from "./DisplayResourceDetailsInformation";
import DisplayResourceDetailsTag from "./DisplayResourceDetailsTag";
import DisplayResourceDetailsComment from "./DisplayResourceDetailsComment";
import DisplayResourceDetailsDescription from "./DisplayResourceDetailsDescription";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import DisplayResourceDetailsPermission from "./DisplayResourceDetailsPermission";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayResourceDetailsActivity from "./DisplayResourceDetailsActivity";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import DisplayResourceDetailsPassword from "./DisplayResourceDetailsPassword";
import DisplayResourceDetailsTotp from "./DisplayResourceDetailsTotp";
import LinkSVG from "../../../../img/svg/link.svg";
import Tabs from "../../Common/Tab/Tabs";
import Tab from "../../Common/Tab/Tab";
import DisplayResourceDetailsNote from "./DisplayResourceDetailsNote";
import ResourceIcon from "../../../../shared/components/Icons/ResourceIcon";
import ArrowBigUpDashSVG from "../../../../img/svg/arrow_big_up_dash.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import {
  V4_TO_V5_RESOURCE_TYPE_MAPPING
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import DisplayResourceDetailsCustomFields from "./DisplayResourceDetailsCustomFields";
import DisplayResourceDetailsURIs from "./DisplayResourceDetailsURIs";

class DisplayResourceDetails extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
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
      displayUpgrade: true,
      processing: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleDisplayUpgradeClick = this.handleDisplayUpgradeClick.bind(this);
    this.handleUpgradeClick = this.handleUpgradeClick.bind(this);
  }

  /**
   * Get the sidebar subtitle
   */
  get subtitle() {
    const resource = this.resource;

    // Resources types might not be yet initialized at the moment this component is rendered.
    if (!this.props.resourceTypes) {
      return "";
    }

    const resourceType = this.props.resourceTypes.getFirstById(resource.resource_type_id);
    switch (resourceType?.slug) {
      case "password-string":
      case "v5-password-string":
        return this.translate("Password");
      case "password-and-description":
      case "v5-default":
        return this.translate("Password and Note");
      case "password-description-totp":
      case "v5-default-with-totp":
        return this.translate("Password, Note and TOTP");
      case "totp":
      case "v5-totp-standalone":
        return this.translate("TOTP");
      case "v5-custom-fields-standalone":
        return this.translate("Custom fields");
      default:
        return this.translate("Resource");
    }
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.resource.id}`;
    await ClipBoard.copy(permalink, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
  }

  /**
   * Handle close sidebar click
   */
  handleCloseClick() {
    this.props.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Handles the click on the display upgrade button.
   */
  handleDisplayUpgradeClick() {
    this.setState({displayUpgrade: !this.state.displayUpgrade});
  }

  /**
   * Handle upgrade resource
   */
  async handleUpgradeClick() {
    this.setState({processing: true});
    try {
      const resourceFormEntity = await this.createResourceFormEntity();
      resourceFormEntity.upgradeToV5();
      await this.save(resourceFormEntity);
    } catch (error) {
      await this.handleSaveError(error);
    } finally {
      this.setState({processing: false});
    }
  }

  /**
   * Create resource form entity
   * @returns {Promise<ResourceFormEntity>}
   */
  async createResourceFormEntity() {
    const resourceDto = {...this.resource};
    resourceDto.secret = await this.getDecryptedSecret();
    return new ResourceFormEntity(resourceDto, {resourceTypes: this.props.resourceTypes});
  }

  /**
   * Get the decrypted secret associated to the resource
   * @returns {Promise<void>}
   */
  async getDecryptedSecret() {
    return await this.props.context.port.request("passbolt.secret.find-by-resource-id", this.resource.id);
  }

  /**
   * Save the resource
   * @param {ResourceFormEntity} resource
   * @returns {Promise<void>}
   */
  async save(resource) {
    await this.updateResource(resource);
    await this.handleSaveSuccess();
  }

  /**
   * Update the resource
   * @param {ResourceFormEntity} resource
   * @returns {Promise<void>}
   */
  async updateResource(resource) {
    const resourceDto = resource.toResourceDto();
    const secretDto = resource.toSecretDto();
    await this.props.context.port.request("passbolt.resources.update", resourceDto, secretDto);
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The resource has been updated successfully"));
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error?.name === "UserAbortsOperationError" || error?.name === "UntrustedMetadataKeyError") {
      console.warn(error);
      return;
    }
    await this.props.actionFeedbackContext.displayError(error.message);
  }

  /**
   * Get the resource selected
   * @returns {*}
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.isStandaloneTotp();
  }

  /**
   * Is password resource
   * @return {boolean}
   */
  get isPasswordResources() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasPassword();
  }

  /**
   * Is totp resource
   * @return {boolean}
   */
  get isTotpResources() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasTotp();
  }

  /**
   * Has description
   * @return {boolean}
   */
  get hasDescription() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasMetadataDescription();
  }

  /*
   * Is resource with secure note
   * @return {boolean}
   */
  get hasSecureNote() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasSecretDescription();
  }


  /*
   * Is resource has custom fields
   * @return {boolean}
   */
  get hasCustomFields() {
    return this.props.resourceTypes?.getFirstById(this.resource.resource_type_id)?.hasCustomFields() && this.resource.metadata.custom_fields?.length > 0;
  }

  /**
   * Checks if the resource has multiple URIs.
   * @returns {boolean} True if the resource has more than one URI, false otherwise.
   */
  get hasMultipleUris() {
    return this.resource.metadata.uris?.length > 1;
  }

  /**
   * Should display the upgrade resource section
   * @returns {boolean}
   */
  get shouldDisplayUpgradeResource() {
    const resourceType = this.props.resourceTypes?.getFirstById(this.resource.resource_type_id);
    const v5ResourceTypeSlug = V4_TO_V5_RESOURCE_TYPE_MAPPING[resourceType?.slug];
    return this.canUpdate && this.props.metadataTypeSettings?.allowV4V5Upgrade && resourceType?.isV4() && this.props.resourceTypes.hasOneWithSlug(v5ResourceTypeSlug);
  }

  /**
   * Can update the resource
   */
  get canUpdate() {
    return this.resource.permission.type >= 7;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Renders the "Details" section tab of a resource.
   * @returns {JSX}
   */
  renderResourceDetail() {
    const canUseTags = this.props.context.siteSettings.canIUse("tags")
      && this.props.rbacContext.canIUseUiAction(uiActions.TAGS_USE);
    const canViewShare = this.props.rbacContext.canIUseUiAction(uiActions.SHARE_VIEW_LIST);
    const canSeeComments = this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_SEE_COMMENTS);

    return (
      <>
        {this.isPasswordResources &&
          <DisplayResourceDetailsPassword/>
        }
        {this.isTotpResources &&
          <DisplayResourceDetailsTotp isStandaloneTotp={this.isStandaloneTotpResource}/>
        }
        {this.hasCustomFields &&
          <DisplayResourceDetailsCustomFields />
        }
        {this.hasSecureNote &&
          <DisplayResourceDetailsNote />
        }
        {this.hasMultipleUris &&
          <DisplayResourceDetailsURIs />
        }
        {canViewShare &&
          <DisplayResourceDetailsPermission />
        }
        <DisplayResourceDetailsInformation />
        {this.hasDescription &&
          <DisplayResourceDetailsDescription />
        }
        {canUseTags &&
        <DisplayResourceDetailsTag />
        }
        {canSeeComments &&
          <DisplayResourceDetailsComment />
        }
      </>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canUseAuditLog = (this.props.context.siteSettings.canIUse("auditLog")
      || this.props.context.siteSettings.canIUse("audit_log")) // @deprecated remove with v4
      && this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_SEE_ACTIVITIES);

    return (
      <div className="sidebar resource">
        <div className={`sidebar-header ${canUseAuditLog ? "" : "with-separator"}`}>
          <ResourceIcon resource={this.resource}/>
          <div className="title-area">
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.resource.metadata.name}</span>
              </div>
              <span className="subtitle">{this.subtitle}</span>
            </h3>
            <button type="button" className="title-link button-transparent inline" title={this.translate("Copy the link to this password")} onClick={this.handlePermalinkClick}>
              <LinkSVG/>
              <span className="visuallyhidden"><Trans>Copy the link to this password</Trans></span>
            </button>
          </div>
        </div>
        {this.shouldDisplayUpgradeResource &&
          <div className="section-card">
            <div className="card">
              <button type="button" className="title no-border" onClick={this.handleDisplayUpgradeClick}>
                <ArrowBigUpDashSVG/>
                <span className="text ellipsis"><Trans>Resource upgrade available</Trans></span>
                {this.state.displayUpgrade
                  ? <CaretDownSVG className="caret-down"/>
                  : <CaretRightSVG className="caret-right"/>
                }
              </button>
              {this.state.displayUpgrade &&
                <div className="content">
                  <p><Trans>Upgrade for security improvements and new features.</Trans></p>
                  <div className="actions-wrapper">
                    <a className="link" href="https://www.passbolt.com/blog/the-road-to-passbolt-v5-encrypted-metadata-and-other-core-security-changes-2" target="_blank" rel="noopener noreferrer">
                      <span className="ellipsis"><Trans>Learn more</Trans></span>
                    </a>
                    <button disabled={this.state.processing} type="button" onClick={this.handleUpgradeClick}>
                      <span className="ellipsis"><Trans>Upgrade</Trans></span>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }
        <div className="sidebar-content">
          {!canUseAuditLog
            ? this.renderResourceDetail()
            : <Tabs activeTabName='Details'>
              <Tab key='Details' name={this.props.t('Details')} type='Details'>
                {this.renderResourceDetail()}
              </Tab>
              <Tab key='Activity' name={this.props.t('Activity')} type='Activity'>
                <DisplayResourceDetailsActivity />
              </Tab>
            </Tabs>
          }
        </div>
      </div>
    );
  }
}

DisplayResourceDetails.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.object,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  actionFeedbackContext: PropTypes.any, // The action feedback context
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withMetadataTypesSettingsLocalStorage(withResourceTypesLocalStorage(withActionFeedback(withResourceWorkspace(withTranslation('common')(DisplayResourceDetails)))))));
