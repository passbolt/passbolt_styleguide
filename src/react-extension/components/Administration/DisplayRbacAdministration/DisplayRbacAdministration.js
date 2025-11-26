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
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayAdministrationRbacActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationRbacsActions/DisplayAdministrationRbacActions";
import {withAdminRbac} from "../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext";
import DisplayRbacSection from "./DisplayRbacSection";
import DisplayRbacItem from "./DisplayRbacItem";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import RoleApiService from "../../../../shared/services/api/role/roleApiService";
import RbacApiService from "../../../../shared/services/api/rbac/rbacApiService";
import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";
import RbacEntity from "../../../../shared/models/entity/rbac/rbacEntity";
import FileTextSVG from "../../../../img/svg/file_text.svg";
import {createSafePortal} from "../../../../shared/utils/portals";


/**
 * This component allows to display the internationalisation for the administration
 */
class DisplayRbacAdministration extends React.Component {
  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      roles: null,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.updateRbacControlFunction = this.updateRbacControlFunction.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.findAndLoadRoles(this.props.RoleApiService);
    this.findAndLoadRbacSettings(this.props.RbacApiService);
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.adminRbacContext.clearContext();
  }

  /**
   * Find and load the roles
   * @returns {Promise<void>}
   */
  async findAndLoadRoles() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    const roleApiService = new this.props.RoleApiService(apiClientOptions);
    const apiResponse = await roleApiService.findAll();
    const rolesDto = apiResponse.body;
    const roles = new RolesCollection(rolesDto);
    this.setState({roles});
  }

  /**
   * Find and load the rbac settings
   * @returns {Promise<void>}
   */
  async findAndLoadRbacSettings() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    const rbacApiService = new this.props.RbacApiService(apiClientOptions);
    const rbacsDto = await rbacApiService.findAll({ui_action: true, action: true});
    const rbacs = new RbacsCollection(rbacsDto, true);
    this.props.adminRbacContext.setRbacs(rbacs);
  }

  /**
   * Update a rbac setting.
   * @param {RoleEntity} role The role to update the rbac for.
   * @param {string} actionName The action to update the rbac for.
   * @param {string} controlFunction The new control function for the rbac.
   */
  updateRbacControlFunction(role, actionName, controlFunction) {
    const rbacsUpdated = this.props.adminRbacContext.rbacsUpdated;
    const rbac = this.props.adminRbacContext.rbacs.findRbacByRoleAndActionName(role, actionName);
    // If the function is has the original one, remove it from the list of changes.
    if (rbac.controlFunction === controlFunction) {
      rbacsUpdated.remove(rbac);
    } else {
      // If the control function is not the rbac to the list of changes.
      const clonedRbac = new RbacEntity(rbac.toDto({ui_action: true, action: true}));
      clonedRbac.controlFunction = controlFunction;
      rbacsUpdated.pushOrReplace(clonedRbac);
    }

    this.props.adminRbacContext.setRbacsUpdated(rbacsUpdated);
  }

  /**
   * Is the user allowed to use the tags capability
   * @returns {boolean}
   */
  get canIUseTags() {
    return this.props.context.siteSettings.canIUse("tags");
  }

  /**
   * Is the user allowed to use the desktop export capability
   * @returns {boolean}
   */
  get canIUseDesktop() {
    return this.props.context.siteSettings.canIUse("desktop");
  }

  /**
   * Is the user allowed to use the mobile export capability
   * @returns {boolean}
   */
  get canIUseMobile() {
    return this.props.context.siteSettings.canIUse("mobile");
  }

  /**
   * Is the user allowed to use the folders capability
   * @returns {boolean}
   */
  get canIUseFolders() {
    return this.props.context.siteSettings.canIUse("folders");
  }

  /**
   * Is the user allowed to use preview password capability.
   * @returns {boolean}
   */
  get canIUsePreviewPassword() {
    return this.props.context.siteSettings.canIUse("previewPassword");
  }

  /**
   * Is the user allowed to use export capability.
   * @returns {boolean}
   */
  get canIUseExport() {
    return this.props.context.siteSettings.canIUse("export");
  }

  /**
   * Is the user allowed to use import capability.
   * @returns {boolean}
   */
  get canIUseImport() {
    return this.props.context.siteSettings.canIUse("import");
  }

  /**
   * Check if the component is ready to display its rows.
   * @returns {boolean}
   */
  get isReady() {
    return this.state.roles !== null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const hasSaveWarning = this.props.adminRbacContext.hasSettingsChanges();
    return (
      <div className="row">
        <div className="rbac-settings main-column">
          <div className="main-content">
            <h3><Trans>Role-Based Access Control</Trans></h3>
            <p><Trans>In this section you can define access controls for each user role.</Trans></p>
            <form className="form">
              <div className="flex-container outer">
                <div className="flex-container inner header-flex">
                  <div className="flex-item first">
                    <label><Trans>UI Permissions</Trans></label>
                  </div>
                  <div className="flex-item centered">
                    <label><Trans>Admin</Trans></label>
                  </div>
                  <div className="flex-item centered">
                    <label><Trans>User</Trans></label>
                  </div>
                </div>
                {this.isReady &&
                  <>
                    <DisplayRbacSection label={this.props.t('Resources')} level={1}>
                      {(this.canIUseImport || this.canIUseExport) &&
                        <DisplayRbacSection label={this.props.t('Import/Export')} level={2}>
                          {this.canIUseImport &&
                            <DisplayRbacItem label={this.props.t('Can import')}
                              actionName={uiActions.RESOURCES_IMPORT} level={3}
                              rbacs={this.props.adminRbacContext.rbacs}
                              rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                              roles={this.state.roles} onChange={this.updateRbacControlFunction}/>
                          }
                          {this.canIUseExport &&
                            <DisplayRbacItem label={this.props.t('Can export')}
                              actionName={uiActions.RESOURCES_EXPORT} level={3}
                              rbacs={this.props.adminRbacContext.rbacs}
                              rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                              roles={this.state.roles}
                              onChange={this.updateRbacControlFunction}/>
                          }
                        </DisplayRbacSection>
                      }
                      <DisplayRbacSection label={this.props.t('Password')} level={2}>
                        {this.canIUsePreviewPassword &&
                          <DisplayRbacItem label={this.props.t('Can preview')}
                            actionName={uiActions.SECRETS_PREVIEW} level={3}
                            rbacs={this.props.adminRbacContext.rbacs}
                            rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                            roles={this.state.roles}
                            onChange={this.updateRbacControlFunction}/>
                        }
                        <DisplayRbacItem label={this.props.t('Can copy')}
                          actionName={uiActions.SECRETS_COPY} level={3}
                          rbacs={this.props.adminRbacContext.rbacs}
                          rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                          roles={this.state.roles}
                          onChange={this.updateRbacControlFunction}/>
                      </DisplayRbacSection>
                      <DisplayRbacSection label={this.props.t('Metadata')} level={2}>
                        <DisplayRbacItem label={this.props.t('Can see password activities')}
                          actionName={uiActions.RESOURCES_SEE_ACTIVITIES} level={3}
                          rbacs={this.props.adminRbacContext.rbacs}
                          rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                          roles={this.state.roles}
                          onChange={this.updateRbacControlFunction}/>
                        <DisplayRbacItem label={this.props.t('Can see password comments')}
                          actionName={uiActions.RESOURCES_SEE_COMMENTS} level={3}
                          rbacs={this.props.adminRbacContext.rbacs}
                          rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                          roles={this.state.roles}
                          onChange={this.updateRbacControlFunction}/>
                      </DisplayRbacSection>
                      {(this.canIUseFolders || this.canIUseTags) &&
                        <DisplayRbacSection label={this.props.t('Organization')} level={2}>
                          {this.canIUseFolders &&
                            <DisplayRbacItem label={this.props.t('Can use folders')}
                              actionName={uiActions.FOLDERS_USE} level={3}
                              rbacs={this.props.adminRbacContext.rbacs}
                              rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                              roles={this.state.roles}
                              onChange={this.updateRbacControlFunction}/>
                          }
                          {this.canIUseTags &&
                            <DisplayRbacItem label={this.props.t('Can use tags')}
                              actionName={uiActions.TAGS_USE} level={3}
                              rbacs={this.props.adminRbacContext.rbacs}
                              rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                              roles={this.state.roles}
                              onChange={this.updateRbacControlFunction}/>
                          }
                        </DisplayRbacSection>
                      }
                      <DisplayRbacSection label={this.props.t('Sharing')} level={2}>
                        <DisplayRbacItem label={this.props.t('Can see with whom passwords are shared with')}
                          actionName={uiActions.SHARE_VIEW_LIST} level={3}
                          rbacs={this.props.adminRbacContext.rbacs}
                          rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                          roles={this.state.roles}
                          onChange={this.updateRbacControlFunction}/>
                        <DisplayRbacItem label={this.props.t('Can share folders')}
                          actionName={uiActions.SHARE_FOLDER} level={3}
                          rbacs={this.props.adminRbacContext.rbacs}
                          rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                          roles={this.state.roles}
                          onChange={this.updateRbacControlFunction}/>
                      </DisplayRbacSection>
                    </DisplayRbacSection>
                    <DisplayRbacSection label={this.props.t('Users')} level={1}>
                      <DisplayRbacItem label={this.props.t('Can see users workspace')}
                        actionName={uiActions.USERS_VIEW_WORKSPACE} level={3}
                        rbacs={this.props.adminRbacContext.rbacs}
                        rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                        roles={this.state.roles}
                        onChange={this.updateRbacControlFunction}/>
                    </DisplayRbacSection>
                    {
                      (this.canIUseMobile || this.canIUseDesktop) &&
                      <DisplayRbacSection label={this.props.t('User settings')} level={1}>
                        {
                          this.canIUseMobile && <DisplayRbacItem label={this.props.t('Can see mobile setup')}
                            actionName={uiActions.MOBILE_TRANSFER} level={3}
                            rbacs={this.props.adminRbacContext.rbacs}
                            rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                            roles={this.state.roles}
                            onChange={this.updateRbacControlFunction}/>
                        }
                        {
                          this.canIUseDesktop &&
                          <DisplayRbacItem label={this.props.t('Can see desktop application setup')}
                            actionName={uiActions.DESKTOP_TRANSFER} level={3}
                            rbacs={this.props.adminRbacContext.rbacs}
                            rbacsUpdated={this.props.adminRbacContext.rbacsUpdated}
                            roles={this.state.roles}
                            onChange={this.updateRbacControlFunction}/>
                        }
                      </DisplayRbacSection>
                    }
                  </>
                }
              </div>
            </form>
          </div>
          {hasSaveWarning &&
            <div className="warning message">
              <div>
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          }
        </div>
        <DisplayAdministrationRbacActions/>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>Check out the Role Based Access Control documentation.</Trans></p>
            <a className="button" href="https://passbolt.com/docs/admin/role-based-access-control/" target="_blank"
              rel="noopener noreferrer">
              <FileTextSVG/>
              <span><Trans>Read RBAC doc</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplayRbacAdministration.defaultProps = {
  RoleApiService: RoleApiService,
  RbacApiService: RbacApiService
};

DisplayRbacAdministration.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminRbacContext: PropTypes.object, // The administration rbac context
  RoleApiService: PropTypes.func, // The role service to inject
  RbacApiService: PropTypes.func, // The rbac service to inject
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminRbac(withAdministrationWorkspace(withTranslation('common')(DisplayRbacAdministration))));
