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
 * @since         4.5.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withActionFeedback } from "../../../../contexts/ActionFeedbackContext";
import { withAdministrationHealthcheck } from "../../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext";
import RefreshSVG from "../../../../../img/svg/refresh.svg";

/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationHealthcheckActions extends React.Component {
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
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isRefreshEnabled() {
    return (
      this.props.adminHealthcheckContext.isHealthcheckEndpointEnabled() &&
      !this.props.adminHealthcheckContext.isProcessing()
    );
  }

  /**
   * Handle the save action.
   * In case we have more than one domain and we have changes, we should display a confirmation dialog to inform the user
   * @return {Promise<void>}
   */
  async handleRefresh() {
    await this.props.adminHealthcheckContext.loadHealthcheckData();
    this.handleRefreshSuccess();
  }

  /**
   * Handle save operation success.
   */
  async handleRefreshSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(
      this.props.t("The healthcheck has been successfully refreshed"),
    );
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
            <ul>
              <li>
                <button
                  type="button"
                  disabled={!this.isRefreshEnabled()}
                  id="save-settings"
                  onClick={this.handleRefresh}
                >
                  <RefreshSVG />
                  <span>
                    <Trans>Refresh</Trans>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationHealthcheckActions.propTypes = {
  adminHealthcheckContext: PropTypes.object, // The healthcheck context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAdministrationHealthcheck(
  withActionFeedback(withTranslation("common")(DisplayAdministrationHealthcheckActions)),
);
