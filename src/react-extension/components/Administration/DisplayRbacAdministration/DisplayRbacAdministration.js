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
 * @since         3.11.2
 */
import React from "react";
import PropTypes from "prop-types";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import Select from "../../Common/Select/Select";
import DisplayAdministrationInternationalisationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationInternationalisationActions/DisplayAdministrationInternationalisationActions";
import {withAdminInternationalization} from "../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext";
import {FormConfig} from "./Rbac.data"
import RbacItem from "./RbacItem"
// import RBacMeService from "../../../../shared/services/api/rbac/rbacMeService"

/**
 * This component allows to display the internationalisation for the administration
 */
class DisplayRbacAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.rbacItems = {}; // Will store all the rbacItems so that we can parse them and retrieve their value.
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationInternationalisationActions);
    this.props.adminInternationalizationContext.findLocale();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminInternationalizationContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    console.log('value', event.target);
    console.log(this.rbacItems);
   // this.props.adminInternationalizationContext.setLocale(event.target.value);
  }
  /**
   * Get the supported locales
   * @returns {array}
   */
  get supportedLocales() {
    if (this.props.context.siteSettings.supportedLocales) {
      return this.props.context.siteSettings.supportedLocales.map(supportedLocale => ({value: supportedLocale.locale, label: supportedLocale.label}));
    }
    return [];
  }

  get supportedRbac() {
    return FormConfig;
  }

  get rbacFormConfig() {
    return FormConfig;
  }

  renderHeader(item) {
    let childItems = "";
    if (item.items) {
      childItems = this.renderItems(item.items);
    }

    return (
      <>
        <div className={`flex-container inner level-${item.level}`}>
            <div className="flex-item first border-right">
              <span><Icon name="caret-down" baseline={true}/>&nbsp;&nbsp;{item.name}</span>
            </div>
          <div className="flex-item border-right">
            &nbsp;
          </div>
          <div className="flex-item">
            &nbsp;
          </div>
        </div>
        {childItems}
      </>
    )
  }

  renderItems(items) {
    const self = this;
    const listItems = items.map(item => {
      return self.renderItem(item);
    });

    return listItems;
  }

  renderItem(item) {
    if (item.type === "header") {
      return this.renderHeader(item);
    }
    if (item.type === "ui_action") {
      const UiActionItem = <RbacItem rbacItem={item} />;
      this.rbacItems[item.slug] = UiActionItem;
      return <RbacItem rbacItem={item} onChange={this.handleInputChange}/>;
    }
  }

  renderForm(formData) {
    const self = this;
    const form = self.renderItems(formData);

    return(
      <form className="form">
        <div className="flex-container outer">
          <div className="flex-container inner header">
            <div className="flex-item first border-right">
              <label>
                <Trans>UI Permissions</Trans>
              </label>
            </div>
            <div className="flex-item border-right centered">
              <label>
                <Trans>Admin</Trans>
              </label>
            </div>
            <div className="flex-item centered">
              <label>
                <Trans>User</Trans>
              </label>
            </div>
          </div>
          {form}
        </div>
      </form>
    );
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const rbacForm = this.renderForm(FormConfig);

    return (
      <div className="row">
        <div className="rbac-settings col7 main-column">
          <h3><Trans>Role-Based Access Control</Trans></h3>
          <p><Trans>In this section you can define access controls for each user role.</Trans></p>
          {rbacForm}
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

DisplayRbacAdministration.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminInternationalizationContext: PropTypes.object, // The administration internationalization context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminInternationalization(withAdministrationWorkspace(withTranslation('common')(DisplayRbacAdministration))));
