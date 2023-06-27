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
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";
import DisplayAdministrationUserDirectoryActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationUserDirectoryActions/DisplayAdministrationUserDirectoryActions";
import UserDirectoryFormService from '../../../../shared/services/forms/userDirectory/UserDirectoryFormService';
import {withAdminUserDirectory} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";

/**
 * This component allows to display the MFA for the administration
 */
class DisplayUserDirectoryAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.userDirectoryFormService = UserDirectoryFormService.getInstance(this.props.adminUserDirectoryContext, this.props.t);
    this.bindCallbacks();
  }


  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      hasFieldFocus: false, // true if the form field has focus
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */

  componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationUserDirectoryActions);
    this.props.adminUserDirectoryContext.findUserDirectorySettings();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminUserDirectoryContext.clearContext();
    UserDirectoryFormService.killInstance();
    this.userDirectoryFormService = null;
  }


  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCredentialTitleClicked = this.handleCredentialTitleClicked.bind(this);
    this.handleDirectoryConfigurationTitleClicked = this.handleDirectoryConfigurationTitleClicked.bind(this);
    this.handleSynchronizationOptionsTitleClicked = this.handleSynchronizationOptionsTitleClicked.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle the click on the credential title
   * @param {UserDirectory} userDirectory state
   */
  handleCredentialTitleClicked() {
    const settings = this.props.adminUserDirectoryContext.getSettings();
    this.props.adminUserDirectoryContext.setSettings("openCredentials", !settings.openCredentials);
  }

  /**
   * Handle the click on the credential title
   * @param {UserDirectory} userDirectory state
   */
  handleDirectoryConfigurationTitleClicked() {
    const settings = this.props.adminUserDirectoryContext.getSettings();
    this.props.adminUserDirectoryContext.setSettings('openDirectoryConfiguration', !settings.openDirectoryConfiguration);
  }

  /**
   * Handle the click on the credential title
   * @param {UserDirectory} userDirectory state
   */
  handleSynchronizationOptionsTitleClicked() {
    const settings = this.props.adminUserDirectoryContext.getSettings();
    this.props.adminUserDirectoryContext.setSettings('openSynchronizationOptions', !settings.openSynchronizationOptions);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.props.adminUserDirectoryContext.setSettings(name, value);
    this.validateInput(name, value);
  }

  /**
   * validate the input
   * @params {string} The input name
   * @params {string} The input valude
   * @returns {void}
   */
  validateInput(name, value) {
    switch (name) {
      case 'host':
        this.userDirectoryFormService.validateHostInput(value);
        break;
      case 'domain':
        this.userDirectoryFormService.validateDomainInput(value);
        break;
      case 'port':
        this.userDirectoryFormService.validatePortInput(value);
        break;
    }
  }

  /**
   * Handle field focus
   */
  handleFieldFocus() {
    this.setState({hasFieldFocus: true});
  }

  /**
   * Handle field blur
   */
  handleFieldBlur() {
    this.setState({hasFieldFocus: false});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    const settings = this.props.adminUserDirectoryContext.getSettings();
    return settings.processing || settings.loading;
  }

  /**
   * If user directory is checked
   * @returns {boolean}
   */
  isUserDirectoryChecked() {
    return this.props.adminUserDirectoryContext.getSettings().userDirectoryToggle;
  }

  /**
   * If active directory is checked
   */
  isActiveDirectoryChecked() {
    return this.props.adminUserDirectoryContext.getSettings().directoryType === "ad";
  }

  /**
   * If open ldap is checked
   */
  isOpenLdapChecked() {
    return this.props.adminUserDirectoryContext.getSettings().directoryType === "openldap";
  }

  /**
   * If use email prefix is checked
   */
  isUseEmailPrefixChecked() {
    return this.props.adminUserDirectoryContext.getSettings().useEmailPrefix;
  }

  /**
   * Get users allowed to be default admin
   */
  getUsersAllowedToBeDefaultAdmin() {
    const users = this.props.adminUserDirectoryContext.getUsers();
    if (users !== null) {
      const usersFiltered = users.filter(user => user.active === true && user.role.name === "admin");
      return usersFiltered && usersFiltered.map(user => ({value: user.id, label: this.displayUser(user)}));
    }
    return [];
  }

  /**
   * Get users allowed to be default group admin
   */
  getUsersAllowedToBeDefaultGroupAdmin() {
    const users = this.props.adminUserDirectoryContext.getUsers();
    if (users !== null) {
      const usersFiltered = users.filter(user => user.active === true);
      return usersFiltered && usersFiltered.map(user => ({value: user.id, label: this.displayUser(user)}));
    }
    return [];
  }

  /**
   * display user firstname, lastname and username
   * @param user
   * @returns {string}
   */
  displayUser(user) {
    return `${user.profile.first_name} ${user.profile.last_name} (${user.username})`;
  }

  /**
   * Returns true if the source of the settings is from a config file instead of DB and the user has modified a field.
   * @returns {boolean}
   */
  shouldShowSourceWarningMessage() {
    const context = this.props.adminUserDirectoryContext;
    return context?.getCurrentSettings()?.source !== "db" && context?.hasSettingsChanges();
  }

  /**
   * get the connection type
   */
  get connectionType() {
    return [
      {value: "plain", label: "ldap://"},
      {value: "ssl", label: "ldaps:// (ssl)"},
      {value: "tls", label: "ldaps:// (tls)"},
    ];
  }

  /**
   * get the supported authentication method
   */
  get supportedAuthenticationMethod() {
    return [
      {value: "basic", label: this.props.t("Basic")},
      {value: "sasl", label: "SASL"},
    ];
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const settings = this.props.adminUserDirectoryContext.getSettings();
    const errors = this.props.adminUserDirectoryContext.getErrors();
    const isSubmitted = this.props.adminUserDirectoryContext.isSubmitted();
    const hadDisabledSettings = this.props.adminUserDirectoryContext.hadDisabledSettings();
    return (
      <div className="row">
        <div className="ldap-settings col7 main-column">
          <h3>
            <span className="input toggle-switch form-element">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="userDirectoryToggle"
                onChange={this.handleInputChange} checked={settings.userDirectoryToggle} disabled={this.hasAllInputDisabled()}
                id="userDirectoryToggle"/>
              <label htmlFor="userDirectoryToggle"><Trans>Users Directory</Trans></label>
            </span>
          </h3>
          {!this.isUserDirectoryChecked() &&
            <>
              {hadDisabledSettings &&
                <div>
                  <div className="message warning">
                    <Trans>The configuration has been disabled has it needs to be checked to make it correct before using it.</Trans>
                  </div>
                </div>
              }
              {!hadDisabledSettings &&
                <p className="description">
                  <Trans>No Users Directory is configured. Enable it to synchronise your users and groups with passbolt.</Trans>
                </p>
              }
            </>
          }
          {this.isUserDirectoryChecked() &&
           <>
             {this.shouldShowSourceWarningMessage() &&
              <div className="warning message">
                <Trans><b>Warning:</b> These are the settings provided by a configuration file. If you save it, will ignore the settings on file and use the ones from the database.</Trans>
              </div>
             }
             <p className="description">
               <Trans>A Users Directory is configured. The users and groups of passbolt will synchronize with it.</Trans>
             </p>
             <div className={`accordion section-general ${settings.openCredentials ? "" : "closed"}`}>
               <h4 className="accordion-header">
                 <button type="button" className="link no-border" onClick={this.handleCredentialTitleClicked}>
                   {settings.openCredentials && <Icon name="caret-down"/>}
                   {!settings.openCredentials && <Icon name="caret-right"/>}
                   <Trans>Credentials</Trans>
                 </button>
               </h4>
               <div className="accordion-content">
                 <div className="radiolist required">
                   <label><Trans>Directory type</Trans></label>
                   <div className="input radio ad openldap form-element ">
                     <div className="input radio">
                       <input type="radio" value="ad" onChange={this.handleInputChange} name="directoryType"
                         checked={this.isActiveDirectoryChecked()} id="directoryTypeAd"
                         disabled={this.hasAllInputDisabled()}/>
                       <label htmlFor="directoryTypeAd"><Trans>Active Directory</Trans></label>
                     </div>
                     <div className="input radio">
                       <input type="radio" value="openldap" onChange={this.handleInputChange} name="directoryType"
                         checked={this.isOpenLdapChecked()} id="directoryTypeOpenLdap"
                         disabled={this.hasAllInputDisabled()}/>
                       <label htmlFor="directoryTypeOpenLdap"><Trans>Open Ldap</Trans></label>
                     </div>
                   </div>
                 </div>
                 <div className={`input text required ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Server url</Trans></label>
                   <div className={`input text singleline connection_info ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''} ${this.state.hasFieldFocus ? "no-focus" : ""}`}>
                     <input id="server-input" type="text" aria-required={true} className="required host ad openldap form-element" name="host"
                       value={settings.host} onChange={this.handleInputChange}
                       placeholder={this.props.t("host")} disabled={this.hasAllInputDisabled()}/>
                     <div className="protocol" onBlur={this.handleFieldBlur} onFocus={this.handleFieldFocus}>
                       <Select className="inline" name="connectionType" items={this.connectionType} value={settings.connectionType} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                     </div>
                     <div className="port ad openldap">
                       <input id="port-input" type="number" aria-required={true} className="required in-field form-element" name="port"
                         value={settings.port} onChange={this.handleInputChange}
                         onBlur={this.handleFieldBlur} onFocus={this.handleFieldFocus}
                         disabled={this.hasAllInputDisabled()}/>
                     </div>
                   </div>
                   {errors.hostError && isSubmitted &&
                     <div id="server-input-feedback" className="error-message">{errors.hostError}</div>
                   }
                   {errors.portError && isSubmitted &&
                     <div id="port-input-feedback" className="error-message">{errors.portError}</div>
                   }
                 </div>
                 <div className={`select-wrapper input required ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Authentication method</Trans></label>
                   <Select items={this.supportedAuthenticationMethod}
                     id="authentication-type-select"
                     name="authenticationType"
                     value={settings.authenticationType}
                     onChange={this.handleInputChange}
                     disabled={this.hasAllInputDisabled()}
                   />
                 </div>
                 {settings.authenticationType === "basic" &&
                  <div className="singleline clearfix">
                    <div className={`input text first-field ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                      <label><Trans>Username</Trans></label>
                      <input id="username-input" type="text" className="fluid form-element" name="username"
                        value={settings.username} onChange={this.handleInputChange} placeholder={this.props.t("Username")}
                        disabled={this.hasAllInputDisabled()}/>
                    </div>
                    <div className={`input text last-field ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                      <label><Trans>Password</Trans></label>
                      <input id="password-input" className="fluid form-element" name="password"
                        value={settings.password} onChange={this.handleInputChange} placeholder={this.props.t("Password")} type="password"
                        disabled={this.hasAllInputDisabled()}/>
                    </div>
                  </div>
                 }
                 <div className={`input text required ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Domain</Trans></label>
                   <input id="domain-name-input" aria-required={true}  type="text" name="domain" value={settings.domain}
                     onChange={this.handleInputChange} className="required fluid form-element"
                     placeholder="domain.ext" disabled={this.hasAllInputDisabled()}/>
                   {errors.domainError && isSubmitted &&
                   <div id="domain-name-input-feedback" className="error-message">{errors.domainError}</div>
                   }
                 </div>
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Base DN</Trans></label>
                   <input id="base-dn-input" type="text" name="baseDn" value={settings.baseDn}
                     onChange={this.handleInputChange} className="fluid form-element" placeholder="OU=OrgUsers,DC=mydomain,DC=local"
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message">
                     <Trans>The base DN (default naming context) for the domain.</Trans> <Trans>If this is empty then it will be queried from the RootDSE.</Trans>
                   </div>
                 </div>
               </div>
             </div>
             <div
               className={`accordion section-directory-configuration ${settings.openDirectoryConfiguration ? "" : "closed"}`}>
               <h4 className="accordion-header">
                 <button type="button" className="link no-border" onClick={this.handleDirectoryConfigurationTitleClicked}>
                   {settings.openDirectoryConfiguration && <Icon name="caret-down"/>}
                   {!settings.openDirectoryConfiguration && <Icon name="caret-right"/>}
                   <Trans>Directory configuration</Trans>
                 </button>
               </h4>
               <div className="accordion-content">
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Group path</Trans></label>
                   <input id="group-path-input" type="text" aria-required={true} name="groupPath" value={settings.groupPath}
                     onChange={this.handleInputChange} className="required fluid form-element" placeholder={this.props.t("Group path")}
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message">
                     <Trans>Group path is used in addition to the base DN while searching groups.</Trans> <Trans>Leave empty if users and groups are in the same DN.</Trans>
                   </div>
                 </div>
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>User path</Trans></label>
                   <input id="user-path-input" type="text" aria-required={true} name="userPath" value={settings.userPath}
                     onChange={this.handleInputChange} className="required fluid form-element" placeholder={this.props.t("User path")}
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message"><Trans>User path is used in addition to base DN while searching users.</Trans></div>
                 </div>
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Group custom filters</Trans></label>
                   <input id="group-custom-filters-input" type="text" name="groupCustomFilters" value={settings.groupCustomFilters}
                     onChange={this.handleInputChange} className="required fluid form-element" placeholder={this.props.t("Group custom filters")}
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message">
                     <Trans>Group custom filters are used in addition to the base DN and group path while searching groups.</Trans> <Trans>Leave empty if no additional filter is required.</Trans>
                   </div>
                 </div>
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>User custom filters</Trans></label>
                   <input id="user-custom-filters-input" type="text" name="userCustomFilters" value={settings.userCustomFilters}
                     onChange={this.handleInputChange} className="required fluid form-element" placeholder={this.props.t("User custom filters")}
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message">
                     <Trans>User custom filters are used in addition to the base DN and user path while searching users.</Trans> <Trans>Leave empty if no additional filter is required.</Trans>
                   </div>
                 </div>
                 {this.isOpenLdapChecked() &&
                 <div>
                   <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                     <label><Trans>Group object class</Trans></label>
                     <input id="group-object-class-input" type="text" aria-required={true} name="groupObjectClass"
                       value={settings.groupObjectClass} onChange={this.handleInputChange} className="required fluid"
                       placeholder="GroupObjectClass" disabled={this.hasAllInputDisabled()}/>
                     <div className="help-message">
                       <Trans>For Openldap only. Defines which group object to use.</Trans> (<Trans>Default</Trans>: groupOfUniqueNames)
                     </div>
                   </div>
                   <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                     <label><Trans>User object class</Trans></label>
                     <input id="user-object-class-input" type="text" aria-required={true} name="userObjectClass"
                       value={settings.userObjectClass} onChange={this.handleInputChange} className="required fluid form-element"
                       placeholder="UserObjectClass" disabled={this.hasAllInputDisabled()}/>
                     <div className="help-message"><Trans>For Openldap only. Defines which user object to use.</Trans> (<Trans>Default</Trans>: inetOrgPerson)
                     </div>
                   </div>
                   <div className={`input text openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                     <label><Trans>Use email prefix / suffix?</Trans></label>
                     <div className="input toggle-switch openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="useEmailPrefix"
                         value={settings.useEmailPrefix} onChange={this.handleInputChange} id="use-email-prefix-suffix-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="use-email-prefix-suffix-toggle-button">
                         <Trans>Build email based on a prefix and suffix?</Trans>
                       </label>
                     </div>
                     <div className="help-message">
                       <Trans>Use this option when user entries do not include an email address by default</Trans>
                     </div>
                   </div>
                   {this.isUseEmailPrefixChecked() &&
                   <div className="singleline clearfix" id="use-email-prefix-suffix-options">
                     <div className={`input text first-field openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                       <label><Trans>Email prefix</Trans></label>
                       <input id="email-prefix-input" type="text" aria-required={true} name="emailPrefix" checked={settings.emailPrefix}
                         onChange={this.handleInputChange} className="required fluid form-element" placeholder={this.props.t("Username")}
                         disabled={this.hasAllInputDisabled()}/>
                       <div className="help-message">
                         <Trans>The attribute you would like to use for the first part of the email (usually username).</Trans>
                       </div>
                     </div>
                     <div className={`input text last-field openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>

                       <label><Trans>Email suffix</Trans></label>
                       <input id="email-suffix-input" type="text" aria-required={true} name="emailSuffix" value={settings.emailSuffix}
                         onChange={this.handleInputChange} className="required form-element"
                         placeholder={this.props.t("@your-domain.com")} disabled={this.hasAllInputDisabled()}/>
                       <div className="help-message">
                         <Trans>The domain name part of the email (@your-domain-name).</Trans>
                       </div>
                     </div>
                   </div>
                   }
                 </div>
                 }
               </div>
             </div>
             <div
               className={`accordion section-sync-options ${settings.openSynchronizationOptions ? "" : "closed"}`}>
               <h4 className="accordion-header">
                 <button type="button" className="link no-border" onClick={this.handleSynchronizationOptionsTitleClicked}>
                   {settings.openSynchronizationOptions && <Icon name="caret-down"/>}
                   {!settings.openSynchronizationOptions && <Icon name="caret-right"/>}
                   <Trans>Synchronization options</Trans>
                 </button>
               </h4>
               <div className="accordion-content">
                 <div className={`select-wrapper input required ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Default admin</Trans></label>
                   <Select items={this.getUsersAllowedToBeDefaultAdmin()}
                     id="default-user-select"
                     name="defaultAdmin"
                     value={settings.defaultAdmin}
                     onChange={this.handleInputChange}
                     disabled={this.hasAllInputDisabled()}
                     search={true}/>
                   <div className="help-message">
                     <Trans>The default admin user is the user that will perform the operations for the the directory.</Trans>
                   </div>
                 </div>
                 <div className={`select-wrapper input required ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Default group admin</Trans></label>
                   <Select items={this.getUsersAllowedToBeDefaultGroupAdmin()}
                     id="default-group-admin-user-select"
                     name="defaultGroupAdmin"
                     value={settings.defaultGroupAdmin}
                     onChange={this.handleInputChange}
                     disabled={this.hasAllInputDisabled()}
                     search={true}/>
                   <div className="help-message">
                     <Trans>The default group manager is the user that will be the group manager of newly created groups.</Trans>
                   </div>
                 </div>
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Groups parent group</Trans></label>
                   <input id="groups-parent-group-input" type="text" name="groupsParentGroup"
                     value={settings.groupsParentGroup} onChange={this.handleInputChange} className="fluid form-element" placeholder={this.props.t("Groups parent group")}
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message">
                     <Trans>Synchronize only the groups which are members of this group.</Trans>
                   </div>
                 </div>
                 <div className={`input text ad openldap ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Users parent group</Trans></label>
                   <input id="users-parent-group-input" type="text" name="usersParentGroup"
                     value={settings.usersParentGroup} onChange={this.handleInputChange} className="fluid form-element" placeholder={this.props.t("Users parent group")}
                     disabled={this.hasAllInputDisabled()}/>
                   <div className="help-message">
                     <Trans>Synchronize only the users which are members of this group.</Trans>
                   </div>
                 </div>
                 {this.isActiveDirectoryChecked() &&
                 <div className={`input text clearfix ad ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                   <label><Trans>Enabled users only</Trans></label>
                   <div className="input toggle-switch ad form-element">
                     <input type="checkbox" className="toggle-switch-checkbox checkbox" name="enabledUsersOnly"
                       checked={settings.enabledUsersOnly} onChange={this.handleInputChange} id="enabled-users-only-toggle-button"
                       disabled={this.hasAllInputDisabled()}/>
                     <label className="text" htmlFor="enabled-users-only-toggle-button"><Trans>Only synchronize enabled users (AD)</Trans></label>
                   </div>
                 </div>
                 }
                 <div className="input text clearfix ad openldap">
                   <label><Trans>Sync operations</Trans></label>
                   <div className="col6">
                     <div className="input toggle-switch ad openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="createUsers"
                         checked={settings.createUsers} onChange={this.handleInputChange} id="sync-users-create-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="sync-users-create-toggle-button"><Trans>Create users</Trans></label>
                     </div>
                     <div className="input toggle-switch ad openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="deleteUsers"
                         checked={settings.deleteUsers} onChange={this.handleInputChange} id="sync-users-delete-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="sync-users-delete-toggle-button"><Trans>Delete users</Trans></label>
                     </div>
                     <div className="input toggle-switch ad openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="updateUsers"
                         checked={settings.updateUsers} onChange={this.handleInputChange} id="sync-users-update-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="sync-users-update-toggle-button"><Trans>Update users</Trans></label>
                     </div>
                   </div>
                   <div className="col6 last">
                     <div className="input toggle-switch ad openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="createGroups"
                         checked={settings.createGroups} onChange={this.handleInputChange} id="sync-groups-create-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="sync-groups-create-toggle-button"><Trans>Create groups</Trans></label>
                     </div>
                     <div className="input toggle-switch ad openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="deleteGroups"
                         checked={settings.deleteGroups} onChange={this.handleInputChange} id="sync-groups-delete-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="sync-groups-delete-toggle-button"><Trans>Delete groups</Trans></label>
                     </div>
                     <div className="input toggle-switch ad openldap form-element">
                       <input type="checkbox" className="toggle-switch-checkbox checkbox" name="updateGroups"
                         checked={settings.updateGroups} onChange={this.handleInputChange} id="sync-groups-update-toggle-button"
                         disabled={this.hasAllInputDisabled()}/>
                       <label className="text" htmlFor="sync-groups-update-toggle-button"><Trans>Update groups</Trans></label>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </>
          }
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>Check out our ldap configuration guide.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/ldap" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserDirectoryAdministration.propTypes = {
  adminUserDirectoryContext: PropTypes.object, // The user directory workspace context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  t: PropTypes.func, // The translation function
};

export default withAdminUserDirectory(withAdministrationWorkspace(withTranslation('common')(DisplayUserDirectoryAdministration)));


