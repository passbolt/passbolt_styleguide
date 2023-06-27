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
import Icon from "../../../../shared/components/Icons/Icon";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import RoleService from "../../../../shared/services/api/role/roleService";
import RbacService from "../../../../shared/services/api/rbac/rbacService";
import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";
import RbacEntity from "../../../../shared/models/entity/rbac/rbacEntity";

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
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationRbacActions);
    this.findAndLoadRoles(this.props.RoleService);
    this.findAndLoadRbacSettings(this.props.RbacService);
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminRbacContext.clearContext();
  }

  /**
   * Find and load the roles
   * @returns {Promise<void>}
   */
  async findAndLoadRoles() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    const roleService = new this.props.RoleService(apiClientOptions);
    const rolesDto = await roleService.findAll();
    const roles = new RolesCollection(rolesDto);
    this.setState({roles});
  }

  /**
   * Find and load the rbac settings
   * @returns {Promise<void>}
   */
  async findAndLoadRbacSettings() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    const rbacService = new this.props.RbacService(apiClientOptions);
    const rbacsDto = await rbacService.findAll({ui_action: true});
    const rbacs = new RbacsCollection(rbacsDto);
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
    const rbac = this.props.adminRbacContext.rbacs.findRbacByRoleAndUiActionName(role, actionName);

    // If the function is has the original one, remove it from the list of changes.
    if (rbac.controlFunction === controlFunction) {
      rbacsUpdated.remove(rbac);
    } else {
      // If the control function is not the rbac to the list of changes.
      const clonedRbac = new RbacEntity(rbac.toDto({ui_action: true, action: true}));
      clonedRbac.controlFunction = controlFunction;
      rbacsUpdated.addOrReplace(clonedRbac);
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
    return (
      <div className="row">
        <div className="rbac-settings col8 main-column">
          <h3><Trans>Role-Based Access Control</Trans></h3>
          <p><Trans>In this section you can define access controls for each user role.</Trans></p>
          <form className="form">
            <div className="flex-container outer">
              <div className="flex-container inner header">
                <div className="flex-item first border-right">
                  <label><Trans>UI Permissions</Trans></label>
                </div>
                <div className="flex-item border-right centered">
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
                            roles={this.state.roles}
                            onChange={this.updateRbacControlFunction}/>
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
                </>
              }
            </div>
          </form>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>Check out the Role Based Access Control documentation.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/rbac" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read RBAC doc</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayRbacAdministration.defaultProps = {
  RoleService: RoleService,
  RbacService: RbacService
};

DisplayRbacAdministration.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminRbacContext: PropTypes.object, // The administration rbac context
  RoleService: PropTypes.func, // The role service to inject
  RbacService: PropTypes.func, // The rbac service to inject
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminRbac(withAdministrationWorkspace(withTranslation('common')(DisplayRbacAdministration))));
