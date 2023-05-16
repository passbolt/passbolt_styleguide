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
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../../shared/components/Icons/Icon";
import {withActionFeedback} from "../../../../contexts/ActionFeedbackContext";
import SubscriptionActionService from '../../../../../shared/services/actions/subscription/SubscriptionActionService';
import {withAdminSubscription} from "../../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";
import {withDialog} from "../../../../contexts/DialogContext";



/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationSubscriptionActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.subscriptionActionService = SubscriptionActionService.getInstance(this.props);
  }
  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditSubscriptionClick = this.handleEditSubscriptionClick.bind(this);
  }

  /**
   * Open dialog for subscription edition
   */
  handleEditSubscriptionClick() {
    this.subscriptionActionService.editSubscription();
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
              <button type="button" onClick={this.handleEditSubscriptionClick}>
                <Icon name="edit"/>
                <span><Trans>Update key</Trans></span>
              </button>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationSubscriptionActions.propTypes = {
  context: PropTypes.object, // Application context
  dialogContext: PropTypes.object, // The dialog notification context
  adminSubscriptionContext: PropTypes.object, // The email notification context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withDialog(withAdminSubscription(withTranslation("common")(DisplayAdministrationSubscriptionActions))));

