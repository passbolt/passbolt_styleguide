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
import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {
  ResourceWorkspaceFilterTypes,
  withResourceWorkspace
} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {formatDateTimeAgo, formatExpirationDateTimeAgo} from "../../../../shared/utils/dateUtils";
import AttentionSVG from "../../../../img/svg/attention.svg";
import ShareFolderSVG from "../../../../img/svg/share_folder.svg";
import FolderSVG from "../../../../img/svg/folder.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";
import CabinetSVG from "../../../../img/svg/cabinet.svg";

class DisplayResourceDetailsInformation extends React.Component {
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
      creator: null, // the data of the resource creator
      modifier: null, // the data of the resource creator
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFolderParentClickEvent = this.handleFolderParentClickEvent.bind(this);
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.isFolderParentShared = this.isFolderParentShared.bind(this);
  }

  componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
    if (this.state.open) {
      this.loadUserInformation();
    }
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
  }

  /**
   * Loads the information about the creator and the modifier of the current selected resource.
   * @returns {Promise<void>}
   */
  async loadUserInformation() {
    const resourceInformation = await this.props.context.port.request("passbolt.resources.find-details", this.resource.id);
    const hasInformationChanged = this.resource.created_by !== resourceInformation.created_by
      || this.resource.modified_by !== resourceInformation.modified_by;

    if (hasInformationChanged) {
      //current selected resource might have changed and the information received doesn't match anymore. In such case we don't update the state.
      return;
    }
    this.setState({
      creator: resourceInformation?.creator,
      modifier: resourceInformation?.modifier,
    });
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  handleResourceChange(previousResource) {
    const hasResourceChanged = this.resource.id !== previousResource.id;
    const hasResourceUpdated = this.resource.modified !== previousResource.modified;
    if ((hasResourceChanged || hasResourceUpdated) && this.state.open) {
      this.setState({plaintextSecretDto: null, previewedSecret: null});
    }

    if (!hasResourceChanged) {
      return;
    }

    const hasModifierOrCreatorChanged = this.resource.created_by !== previousResource.created_by
      || this.resource.modified_by !== previousResource.modified_by;

    if (!hasModifierOrCreatorChanged) {
      return;
    }

    this.setState({creator: null, modifier: null});
    if (this.state.open) {
      this.loadUserInformation();
    }
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }


  /**
   * Handle when the user selects the folder parent.
   */
  handleFolderParentClickEvent() {
    if (this.resource.folder_parent_id) { // Case of specific folder
      const folderParent = this.props.context.folders.find(item => item.id === this.resource.folder_parent_id);
      const filterIsDifferent = this.props.resourceWorkspaceContext.filter.payload?.folder?.id !== folderParent.id;
      if (filterIsDifferent) {
        this.props.history.push(`/app/folders/view/${folderParent.id}`);
      }
    } else { // Case of root folder
      const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
      this.props.history.push(`/app/passwords`, {filter});
    }
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});

    if (!open) {
      this.setState({creator: null, modifier: null});
    } else {
      this.loadUserInformation();
    }
  }

  /**
   * Get the folder name.
   * @param {string} folderParentId The folder parent id
   * @returns {string}
   */
  getFolderName(folderParentId) {
    if (folderParentId === null) {
      return this.translate("My workspace");
    }

    if (this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === folderParentId);
      if (folder) {
        return folder.name;
      }
    }

    return "";
  }

  /**
   * Check if folder parent is shared
   * @returns {boolean}
   */
  isFolderParentShared() {
    const isShared = false;

    if (this.resource.folder_parent_id !== null && this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === this.resource.folder_parent_id);
      if (folder) {
        return !folder.personal;
      }
    }

    return isShared;
  }

  /**
   * Returns true if the resource requires some attention.
   * @returns {boolean}
   */
  get isAttentionRequired() {
    return this.isAttentionRequiredOnExpiryDate;
  }

  /**
   * Returns the expiration status of the current resource.
   * @returns {string}
   */
  get resourceExpirationStatus() {
    if (!this.resource?.expired) {
      return this.translate("Not set");
    }
    return formatExpirationDateTimeAgo(this.resource?.expired, this.props.t, this.props.context.locale);
  }

  /**
   * Returns true if the current resource is expired or about to expire.
   * @returns {boolean}
   */
  get isAttentionRequiredOnExpiryDate() {
    if (!this.resource?.expired) {
      return false;
    }

    const expiryDate = new Date(this.resource.expired);
    return expiryDate <= new Date();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the tooltip folders structure.
   * @param {array<FolderEntity>} folderStructure The folders structure.
   * @render {JSX}
   */
  renderTooltipFolderStructure(folderStructure) {
    if (folderStructure.length === 0) {
      return <span><Trans>My workspace</Trans></span>;
    }

    return folderStructure?.map((folder, index) =>
      <div key={folder.id} className="folder-level" style={{marginLeft: `${5 * index}px`}}>
        {folder.folder_parent_id !== null &&
          <span className="caret">›</span>
        }
        <span>{folder.name}</span>
      </div>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canUseFolders = this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
    const canUsePasswordExpiry = this.props.passwordExpiryContext.isFeatureEnabled();

    const creatorUsername = this.state.creator?.username || "";
    const modifierUsername = this.state.modifier?.username || "";
    const createdDateTimeAgo = formatDateTimeAgo(this.resource.created, this.props.t, this.props.context.locale);
    const modifiedDateTimeAgo = formatDateTimeAgo(this.resource.modified, this.props.t, this.props.context.locale);
    const folderStructure = this.props.context.getHierarchyFolderCache(this.resource.folder_parent_id);

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span className="accordion-title">
                <Trans>Information</Trans>
                {canUsePasswordExpiry && this.isAttentionRequired && <AttentionSVG className="attention-required"/>}
              </span>
              {this.state.open
                ? <CaretDownSVG/>
                : <CaretRightSVG/>
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
          <div className="accordion-content">
            <div className="information-label">
              <span className="created label"><Trans>Created</Trans></span>
              <span className="created-by label"><Trans>Created by</Trans></span>
              <span className="modified label"><Trans>Modified</Trans></span>
              <span className="modified-by label"><Trans>Modified by</Trans></span>
              {canUseFolders &&
                <span className="location label"><Trans>Location</Trans></span>
              }
              {canUsePasswordExpiry &&
                <div className="expiry label label-with-icon">
                  <span className="ellipsis">
                    <Trans>Expiry</Trans>
                  </span>
                  {this.isAttentionRequiredOnExpiryDate &&
                    <AttentionSVG className="attention-required"/>
                  }
                </div>
              }
            </div>
            <div className="information-value">
              <span className="created value" title={this.resource.created}>{createdDateTimeAgo}</span>
              <span className="created-by value">{creatorUsername}</span>
              <span className="modified value" title={this.resource.modified}>{modifiedDateTimeAgo}</span>
              <span className="modified-by value">{modifierUsername}</span>
              {canUseFolders &&
                <span className="location value">
                  <TooltipPortal message={this.renderTooltipFolderStructure(folderStructure)}>
                    <button type="button" onClick={this.handleFolderParentClickEvent} disabled={!this.props.context.folders} className="no-border">
                      {this.resource.folder_parent_id === null &&
                        <>
                          <CabinetSVG />
                          <span><Trans>My workspace</Trans></span>
                        </>
                      }
                      {this.resource.folder_parent_id !== null &&
                        <>
                          {this.isFolderParentShared() ? <ShareFolderSVG/> : <FolderSVG/>}
                          {folderStructure.map(folder =>
                            <Fragment key={folder.id}>
                              {folder.folder_parent_id !== null &&
                                <span className="caret">›</span>
                              }
                              <span>{folder.name}</span>
                            </Fragment>
                          )}
                        </>
                      }
                    </button>
                  </TooltipPortal>
                </span>
              }
              {canUsePasswordExpiry &&
                <span className="expiry value">{this.resourceExpirationStatus}</span>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

DisplayResourceDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  passwordExpiryContext: PropTypes.object, // the passowrd expiry context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withRouter(withResourceWorkspace(withPasswordExpiry(withTranslation('common')(DisplayResourceDetailsInformation))))));
