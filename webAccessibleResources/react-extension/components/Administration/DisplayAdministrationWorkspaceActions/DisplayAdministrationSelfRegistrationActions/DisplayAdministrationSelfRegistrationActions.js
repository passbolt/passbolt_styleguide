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
import Icon from "../../../../../shared/components/Icons/Icon";
import {withAdminSelfRegistration} from "../../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";

/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationSelfRegistrationActions extends React.Component {
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
    this.handleSave = this.handleSave.bind(this);
  }

  /**
   * return the allowed domains
   */
  get allowedDomains() {
    return this.props.adminSelfRegistrationContext.getAllowedDomains();
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    let isFirstUsageWithoutChanges = false;
    //Button should be disable in case of first usage without change
    if (!this.props.adminSelfRegistrationContext.getCurrentSettings()?.provider) {
      isFirstUsageWithoutChanges = !this.props.adminSelfRegistrationContext.hasSettingsChanges();
    }

    return !this.props.adminSelfRegistrationContext.isProcessing() && !isFirstUsageWithoutChanges;
  }

  /**
   * Handle the save action.
   * In case we have more than one domain and we have changes, we should display a confirmation dialog to inform the user
   * @return {Promise<void>}
   */
  async handleSave() {
    if (this.isSaveEnabled()) {
      this.props.adminSelfRegistrationContext.save();
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <div>
            <li>
              <button type="button" disabled={!this.isSaveEnabled()} id="save-settings" onClick={this.handleSave}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationSelfRegistrationActions.propTypes = {
  adminSelfRegistrationContext: PropTypes.object, // The email notification context
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(withAdminSelfRegistration(DisplayAdministrationSelfRegistrationActions));


