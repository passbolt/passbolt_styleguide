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
 * @since         4.O.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";
import DisplayAdministrationRbacActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationRbacsActions/DisplayAdministrationRbacActions";
import {withAdminRbac} from "../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext";
import DisplayRbacSection from "./DisplayRbacSection";
import DisplayRbacItem from "./DisplayRbacItem";
import Icon from "../../../../shared/components/Icons/Icon";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";

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
    // this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationRbacActions);
    this.props.adminRbacContext.loadSettings();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    // this.props.adminInternationalizationContext.clearContext();
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
              {this.props.adminRbacContext.rbacs &&
                <>
                  <DisplayRbacSection label={this.props.t('Resources')} level={1}>
                    <DisplayRbacSection label={this.props.t('Import/Export')} level={2}>
                      <DisplayRbacItem label={this.props.t('Can import')}
                        actionName={uiActions.RESOURCES_IMPORT} level={3}/>
                      <DisplayRbacItem label={this.props.t('Can export')}
                        actionName={uiActions.RESOURCES_EXPORT} level={3}/>
                    </DisplayRbacSection>
                    <DisplayRbacSection label={this.props.t('Password')} level={2}>
                      <DisplayRbacItem label={this.props.t('Can preview')}
                        actionName={uiActions.SECRETS_PREVIEW} level={3}/>
                      <DisplayRbacItem label={this.props.t('Can copy')}
                        actionName={uiActions.SECRETS_COPY} level={3}/>
                    </DisplayRbacSection>
                    <DisplayRbacSection label={this.props.t('Metadata')} level={2}>
                      <DisplayRbacItem label={this.props.t('Can see passwords activities')}
                        actionName={uiActions.RESOURCES_SEE_ACTIVITIES} level={3}/>
                      <DisplayRbacItem label={this.props.t('Can see passwords comments')}
                        actionName={uiActions.RESOURCES_SEE_COMMENTS} level={3}/>
                    </DisplayRbacSection>
                    <DisplayRbacSection label={this.props.t('Organization')} level={2}>
                      <DisplayRbacItem label={this.props.t('Can use folders')}
                        actionName={uiActions.FOLDERS_USE} level={3}/>
                      <DisplayRbacItem label={this.props.t('Can use tags')}
                        actionName={uiActions.TAGS_USE} level={3}/>
                    </DisplayRbacSection>
                    <DisplayRbacSection label={this.props.t('Sharing')} level={2}>
                      <DisplayRbacItem label={this.props.t('Can see with whom passwords are shared with')}
                        actionName={uiActions.SHARE_VIEW_LIST} level={3}/>
                    </DisplayRbacSection>
                  </DisplayRbacSection>
                  <DisplayRbacSection label={this.props.t('Users')} level={1}>
                    <DisplayRbacItem label={this.props.t('Can see users workspace')}
                      actionName={uiActions.USERS_VIEW_WORKSPACE} level={3}/>
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

DisplayRbacAdministration.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminRbacContext: PropTypes.object, // The administration rbac context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminRbac(withAdministrationWorkspace(withTranslation('common')(DisplayRbacAdministration))));
