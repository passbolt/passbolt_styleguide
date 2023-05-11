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
 * @since         3.9.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {v4 as uuidv4} from "uuid";
import DomainUtil from "../../../lib/Domain/DomainUtil";
import MapObject from '../../../lib/Map/MapObject';
import DisplayAdministrationSelfRegistrationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSelfRegistrationActions/DisplayAdministrationSelfRegistrationActions";
import {withAdminSelfRegistration} from "../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import useDynamicRefs from "../../../lib/Map/DynamicRef";
import {withDialog} from "../../../contexts/DialogContext";
import SelfRegistrationDomainsViewModel from "../../../../shared/models/selfRegistration/SelfRegistrationDomainsViewModel";
import debounce from "debounce-promise";

/**
 * This component allows to display the Self registration for the administration
 */
class DisplaySelfRegistrationAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.dynamicRefs = useDynamicRefs();
    this.checkForPublicDomainDebounce = debounce(this.checkForWarnings, 300);
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSelfRegistrationActions);
    await this.findSettings();
  }

  /**
   * componentDidUpdate
   * Invoked immediately after state or props is updated.
   * It is used to focus on a field if needed or to show the advanced settings panel if needed.
   */
  componentDidUpdate() {
    this.shouldFocusOnError();
    this.shouldCheckWarnings();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminSelfRegistrationContext.clearContext();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // toggle state
      isEnabled: false,
      warnings: new Map()
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleToggleClicked = this.handleToggleClicked.bind(this);
    this.handleAddRowClick = this.handleAddRowClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
  }

  /**
   * return the current user
   */
  get currentUser() {
    return this.props.context.loggedInUser;
  }

  /**
   * return the allowed domains
   */
  get allowedDomains() {
    return this.props.adminSelfRegistrationContext.getAllowedDomains();
  }


  /**
   * Bind callbacks methods
   */
  async findSettings() {
    await this.props.adminSelfRegistrationContext.findSettings();
    this.setState({isEnabled: this.allowedDomains.size > 0});
    await this.checkForWarnings();
    await this.validateForm();
  }

  /**
   * We check for warnings and errors into the form
   */
  async checkForWarnings(callback = () => {}) {
    this.setState({warnings: new Map()}, async() => {
      this.allowedDomains.forEach((value, key) => this.checkDomainIsProfessional(key, value));
      callback();
    });
  }
  /**
   * setup settings for the first time
   */
  async setupSettings() {
    // When disable we remove domains from UI, so if the use enable again we should populate existing setting to UI again
    this.props.adminSelfRegistrationContext.setDomains(new SelfRegistrationDomainsViewModel(this.props.adminSelfRegistrationContext.getCurrentSettings()));
    await this.checkForWarnings();

    if (this.allowedDomains.size === 0) {
      const domain = DomainUtil.extractDomainFromEmail(this.currentUser?.username);
      DomainUtil.checkDomainValidity(domain);
      this.populateUserDomain(domain);
    }
  }

  /**
   * set focus to the first input error
   */
  shouldFocusOnError() {
    const onFocus = this.props.adminSelfRegistrationContext.shouldFocus();
    const [error] = this.props.adminSelfRegistrationContext.getErrors().keys();
    if (error && onFocus) {
      const inputRef = this.dynamicRefs.getRef(error);
      inputRef.current.focus();
      this.props.adminSelfRegistrationContext.setFocus(false);
    }
  }


  /**
   * in case of saved settings we should check warnings again
   */
  async shouldCheckWarnings() {
    const isSaved = this.props.adminSelfRegistrationContext.isSaved();
    if (isSaved) {
      this.props.adminSelfRegistrationContext.setSaved(false);
      await this.checkForWarnings();
    }
  }

  /**
   * Check domain and populate it if it is a professional
   * @param {string} domain
   */
  populateUserDomain(domain) {
    const row = DomainUtil.isProfessional(domain) ? domain : "";
    this.addRow(row);
  }

  /**
   * Check domain and populate it if is a professional domain
   * @param {string} domain
   */
  addRow(value = "") {
    const uuid = uuidv4();
    this.props.adminSelfRegistrationContext.setAllowedDomains(uuid, value, () => {
      const inputRef = this.dynamicRefs.getRef(uuid);
      inputRef?.current.focus();
    });
  }

  /**
   * Remove a domain row
   * @param {string} key
   */
  handleDeleteRow(key) {
    if (this.canDelete()) {
      const domains = this.allowedDomains;
      domains.delete(key);
      this.props.adminSelfRegistrationContext.setDomains({allowedDomains: domains});
      this.validateForm();
      this.checkForWarnings();
    }
  }

  /**
   * Check if inputs has warnings
   */
  hasWarnings() {
    return this.state.warnings.size > 0;
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminSelfRegistrationContext.isProcessing();
  }

  /**
   * Handle the click on the self registration title
   * @param {UserDirectory} userDirectory state
   */
  handleToggleClicked() {
    this.setState({isEnabled: !this.state.isEnabled}, () => {
      if (this.state.isEnabled) {
        this.setupSettings();
      } else {
        this.props.adminSelfRegistrationContext.setDomains({allowedDomains: new Map()});
        this.props.adminSelfRegistrationContext.setErrors(new Map());
      }
    });
  }

  /**
   * Handle the click on the add button
   */
  handleAddRowClick() {
    this.addRow();
  }

  /**
   * check if domain is a professional one
   */
  checkDomainIsProfessional(uuid, value) {
    this.setState(prevState => {
      const warnings = MapObject.clone(prevState.warnings);
      if (!DomainUtil.isProfessional(value)) {
        warnings.set(uuid, "This is not a safe professional domain");
      } else {
        warnings.delete(uuid);
      }
      return {warnings};
    });
  }

  /**
   * Handle input change
   * @param event
   */
  handleInputChange(event) {
    const value = event.target.value;
    const uuid = event.target.name;
    this.props.adminSelfRegistrationContext.setAllowedDomains(uuid, value, () => this.validateForm());
    this.checkForPublicDomainDebounce();
  }

  /**
   * validate the form
   * @returns {void}
   */
  async validateForm() {
    await this.props.adminSelfRegistrationContext.validateForm();
  }

  /**
   * we cannot delete a row if we have only one domaine
   * @returns {boolean}
   */
  canDelete() {
    return this.allowedDomains.size > 1;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isSubmitted = this.props.adminSelfRegistrationContext.isSubmitted();
    const errors = this.props.adminSelfRegistrationContext.getErrors();

    return (
      <div className="row">
        <div className="self-registration col7 main-column">
          <h3>
            <span className="input toggle-switch form-element">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="settings-toggle"
                onChange={this.handleToggleClicked} checked={this.state.isEnabled} disabled={this.hasAllInputDisabled()}
                id="settings-toggle"/>
              <label htmlFor="settings-toggle"><Trans>Self Registration</Trans></label>
            </span>
          </h3>
          {this.props.adminSelfRegistrationContext.hasSettingsChanges() &&
            <div className="warning message" id="self-registration-setting-overridden-banner">
              <p>
                <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
              </p>
            </div>
          }
          {!this.state.isEnabled &&
            <p className="description" id="disabled-description">
              <Trans>User self registration is disabled.</Trans> <Trans>Only administrators can invite users to register.</Trans>
            </p>
          }
          {this.state.isEnabled && <>
            <div id="self-registration-subtitle" className={`input ${this.hasWarnings() && "warning"} ${isSubmitted && errors.size > 0 && "error"}`}>
              <label id="enabled-label">
                <Trans>Email domain safe list</Trans>
              </label>
            </div>
            <p className="description" id="enabled-description">
              <Trans>All the users with an email address ending with the domain in the safe list are allowed to register on passbolt.</Trans>
            </p>
            {
              MapObject.iterators(this.allowedDomains).map(key => (
                <div key={key} className="input">
                  <div className="domain-row">
                    <input type="text" className="full-width" onChange={this.handleInputChange} id={`input-${key}`} name={key} value={this.allowedDomains.get(key)}
                      disabled={!this.hasAllInputDisabled} ref={this.dynamicRefs.setRef(key)} placeholder={this.props.t("domain")} />
                    <button type="button" disabled={!this.canDelete()} className="button-icon" id={`delete-${key}`} onClick={() => this.handleDeleteRow(key)}><Icon name="trash"/></button>
                  </div>
                  {this.hasWarnings() && this.state.warnings.get(key) &&
                   <div id="domain-name-input-feedback" className="warning-message"><Trans>{this.state.warnings.get(key)}</Trans></div>
                  }
                  {(errors.get(key) && isSubmitted) &&
                  <div className="error-message"><Trans>{errors.get(key)}</Trans></div>
                  }
                </div>
              ))
            }
            <div className="domain-add">
              <button type="button" onClick={this.handleAddRowClick}>
                <Icon name="add"/>
                <span><Trans>Add</Trans></span>
              </button>
            </div>
          </>}
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>What is user self registration?</Trans></h3>
            <p><Trans>User self registration enables users with an email from a whitelisted domain to create their passbolt account without prior admin invitation.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/self-registration" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplaySelfRegistrationAdministration.propTypes = {
  dialogContext: PropTypes.any, // The dialog context
  context: PropTypes.any, // The application context
  adminSelfRegistrationContext: PropTypes.object, // The user directory workspace context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withAdminSelfRegistration(withAdministrationWorkspace(withTranslation('common')(DisplaySelfRegistrationAdministration)))));
