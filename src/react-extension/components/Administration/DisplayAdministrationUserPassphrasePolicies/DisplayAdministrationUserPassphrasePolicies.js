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
 * @since         4.2.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withAdminUserPassphrasePolicies} from "../../../contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";
import DisplayAdministrationUserPassphrasePoliciesActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationUserPassphrasePoliciesActions/DisplayAdministrationUserPassphrasePoliciesActions";

class DisplayAdministrationUserPassphrasePolicies extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * On the component did mount, set the workspace action component and get the account recovery policy
   *
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationUserPassphrasePoliciesActions);
    await this.props.adminUserPassphrasePoliciesContext.findSettings();
  }

  /**
   * On the component will unmount.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="password-policies-settings col8 main-column">
          <h3 id="password-policies-settings-title"><Trans>User Passphrase Policies</Trans></h3>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>What is user passphrase policies?</Trans></h3>
            <p><Trans>For more information about the user passphrase policies, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/user-passphrase-policies" target="_blank" rel="noopener noreferrer">
              <Icon name="life-ring"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationUserPassphrasePolicies.propTypes = {
  context: PropTypes.object, // Application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminUserPassphrasePoliciesContext: PropTypes.object, // The admin password context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdministrationWorkspace(withAdminUserPassphrasePolicies(withTranslation('common')(DisplayAdministrationUserPassphrasePolicies))));
