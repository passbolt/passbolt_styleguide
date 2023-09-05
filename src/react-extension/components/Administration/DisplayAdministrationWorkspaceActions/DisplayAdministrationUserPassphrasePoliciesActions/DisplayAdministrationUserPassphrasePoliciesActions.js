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
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../../shared/components/Icons/Icon";
import {withActionFeedback} from '../../../../contexts/ActionFeedbackContext';
import {withAdminUserPassphrasePolicies} from "../../../../contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";

/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationUserPassphrasePoliciesActions extends React.Component {
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
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  get isActionEnabled() {
    return true;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isDisabled = !this.isActionEnabled;
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <ul>
            <li>
              <button type="button" disabled={isDisabled} id="save-settings" onClick={this.handleSave}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayAdministrationUserPassphrasePoliciesActions.propTypes = {
  adminUserPassphrasePoliciesContext: PropTypes.object, // The password policy context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAdminUserPassphrasePolicies(withActionFeedback(withTranslation("common")(DisplayAdministrationUserPassphrasePoliciesActions)));
