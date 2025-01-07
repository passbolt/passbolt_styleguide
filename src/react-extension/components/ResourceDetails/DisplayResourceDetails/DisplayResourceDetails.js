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
import {withTranslation, Trans} from "react-i18next";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import DisplayResourceDetailsPassword from "./DisplayResourceDetailsPassword";
import DisplayResourceDetailsTotp from "./DisplayResourceDetailsTotp";
import KeySVG from "../../../../img/svg/key.svg";
import LinkSVG from "../../../../img/svg/link.svg";
import Tabs from "../../Common/Tab/Tabs";
import Tab from "../../Common/Tab/Tab";
import DisplayResourceDetailsNote from "./DisplayResourceDetailsNote";

class DisplayResourceDetails extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Get the sidebar subtitle
   */
  get subtitle() {
    const resource = this.props.resourceWorkspaceContext.details.resource;

    // Resources types might not be yet initialized at the moment this component is rendered.
    if (!this.props.resourceTypes) {
      return "";
    }

    const resourceType = this.props.resourceTypes.getFirstById(resource.resource_type_id);
    switch (resourceType.slug) {
      case "password-string":
        return this.translate("Password");
      case "password-and-description":
        return this.translate("Password and Encrypted description");
      case "password-description-totp":
        return this.translate("Password, Encrypted description and TOTP");
      case "totp":
        return this.translate("TOTP");
      default:
        return this.translate("Resource");
    }
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.props.resourceWorkspaceContext.details.resource.id}`;
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
   * Is TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return this.props.resourceTypes?.getFirstById(this.props.resourceWorkspaceContext.details.resource.resource_type_id)?.isStandaloneTotp();
  }

  /**
   * Is password resource
   * @return {boolean}
   */
  get isPasswordResources() {
    return this.props.resourceTypes?.getFirstById(this.props.resourceWorkspaceContext.details.resource.resource_type_id)?.hasPassword();
  }

  /**
   * Is totp resource
   * @return {boolean}
   */
  get isTotpResources() {
    return this.props.resourceTypes?.getFirstById(this.props.resourceWorkspaceContext.details.resource.resource_type_id)?.hasTotp();
  }

  /**
   * Has description
   * @return {boolean}
   */
  get hasDescription() {
    return this.props.resourceTypes?.getFirstById(this.props.resourceWorkspaceContext.details.resource.resource_type_id)?.hasMetadataDescription();
  }

  /*
   * Is resource with secure note
   * @return {boolean}
   */
  get hasSecureNote() {
    return this.props.resourceTypes?.getFirstById(this.props.resourceWorkspaceContext.details.resource.resource_type_id)?.hasSecretDescription();
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
        <DisplayResourceDetailsInformation />
        {this.isPasswordResources &&
          <DisplayResourceDetailsPassword/>
        }
        {this.isTotpResources &&
          <DisplayResourceDetailsTotp isStandaloneTotp={this.isStandaloneTotpResource}/>
        }
        {this.hasDescription &&
          <DisplayResourceDetailsDescription />
        }
        {this.hasSecureNote &&
          <DisplayResourceDetailsNote />
        }
        {canViewShare &&
          <DisplayResourceDetailsPermission />
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
        <div className="sidebar-header">
          <div className="teaser-image">
            <KeySVG/>
          </div>
          <div className="title-area">
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.props.resourceWorkspaceContext.details.resource.metadata.name}</span>
              </div>
              <span className="subtitle">{this.subtitle}</span>
            </h3>
            <button type="button" className="title-link button-transparent inline" title={this.translate("Copy the link to this password")} onClick={this.handlePermalinkClick}>
              <LinkSVG/>
              <span className="visuallyhidden"><Trans>Copy the link to this password</Trans></span>
            </button>
          </div>
        </div>

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
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withResourceWorkspace(withResourceTypesLocalStorage(withActionFeedback(withTranslation('common')(DisplayResourceDetails))))));
