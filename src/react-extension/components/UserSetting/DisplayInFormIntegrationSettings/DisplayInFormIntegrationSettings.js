/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.7.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withLoading } from "../../../contexts/LoadingContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { withDialog } from "../../../contexts/DialogContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { Trans, withTranslation } from "react-i18next";

/**
 * This component lets the user enable or disable the in-form integration (call-to-action icon,
 * in-form menu and auto-save) for themselves, independently of the organization setting.
 */
class DisplayInFormIntegrationSettings extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      isInFormMenuEnabled: true, // Whether the in-form menu is enabled for the current user
      processing: false, // Whether a change is being saved
    };
  }

  /**
   * Whenever the component is mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleInFormMenuToggle = this.handleInFormMenuToggle.bind(this);
  }

  /**
   * Populates the component with the current user settings.
   * @returns {Promise<void>}
   */
  async populate() {
    this.props.loadingContext.add();
    try {
      const settings = await this.props.context.port.request("passbolt.in-form-integration-settings.get");
      this.setState({ isInFormMenuEnabled: settings?.isInFormMenuEnabled !== false });
    } catch (error) {
      this.props.dialogContext.open(NotifyError, { error });
    } finally {
      this.props.loadingContext.remove();
    }
  }

  /**
   * Whenever the user toggles the in-form menu setting.
   * @param {Event} event the change event
   * @returns {Promise<void>}
   */
  async handleInFormMenuToggle(event) {
    const isInFormMenuEnabled = event.target.checked;
    this.setState({ isInFormMenuEnabled, processing: true });
    try {
      await this.props.context.port.request("passbolt.in-form-integration-settings.set", { isInFormMenuEnabled });
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The setting has been updated successfully"));
    } catch (error) {
      // revert the optimistic update on failure
      this.setState({ isInFormMenuEnabled: !isInFormMenuEnabled });
      this.props.dialogContext.open(NotifyError, { error });
    } finally {
      this.setState({ processing: false });
    }
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="main-column in-form-integration-settings">
        <div className="main-content">
          <h3>
            <Trans>Autofill</Trans>
          </h3>
          <p>
            <Trans>
              The in-form menu lets passbolt suggest, autofill and save credentials directly on the web pages you visit.
              When disabled, the call-to-action icon and the in-form menu no longer appear on web pages; you can still
              use passbolt from this extension.
            </Trans>
          </p>
          <div className="input toggle-switch form-element">
            <input
              id="isInFormMenuEnabled"
              type="checkbox"
              className="toggle-switch-checkbox checkbox"
              name="isInFormMenuEnabled"
              checked={this.state.isInFormMenuEnabled}
              onChange={this.handleInFormMenuToggle}
              disabled={this.state.processing}
            />
            <label htmlFor="isInFormMenuEnabled">
              <Trans>Show the in-form menu on web pages</Trans>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

DisplayInFormIntegrationSettings.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  loadingContext: PropTypes.object, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withActionFeedback(withDialog(withLoading(withTranslation("common")(DisplayInFormIntegrationSettings)))),
);
