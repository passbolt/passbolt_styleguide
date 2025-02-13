/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAdminSso} from "../../../../contexts/AdminSsoContext";

/**
 * This component is a container of multiple actions applicable on setting
 */
class DisplayAdministrationWorkspaceActions extends React.Component {
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
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  /**
   * Handles the click event for the "Save settings" button.
   * @returns {Promise<void>}
   */
  async handleSaveClick() {
    const ssoContext = this.props.adminSsoContext;
    if (ssoContext.canDeleteSettings()) {
      ssoContext.showDeleteConfirmationDialog();
      return;
    }

    if (ssoContext.validateData(true)) {
      await ssoContext.saveAndTestConfiguration();
    }
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    return Boolean(this.props.adminSsoContext.ssoConfig?.provider) || this.props.adminSsoContext.canDeleteSettings();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="actions-wrapper">
        <button type="button" className="button primary form" disabled={!this.isSaveEnabled()} onClick={this.handleSaveClick}>
          <span><Trans>Save</Trans></span>
        </button>
      </div>
    );
  }
}

DisplayAdministrationWorkspaceActions.propTypes = {
  adminSsoContext: PropTypes.object, // The admin sso context
};

export default withAdminSso(withTranslation("common")(DisplayAdministrationWorkspaceActions));
