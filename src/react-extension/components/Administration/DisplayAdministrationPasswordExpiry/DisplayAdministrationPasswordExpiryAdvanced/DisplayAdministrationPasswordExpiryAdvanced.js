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
 * @since         4.5.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import { withAdminPasswordExpiry } from "../../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import { withActionFeedback } from "../../../../contexts/ActionFeedbackContext";
import { withDialog } from "../../../../contexts/DialogContext";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";

class DisplayAdministrationPasswordExpiryAdvanced extends React.PureComponent {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExpiryPeriodToggleClick = this.handleExpiryPeriodToggleClick.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const { type, checked, value, name } = event.target;
    const filedValue = type === "checkbox" ? checked : parseInt(value, 10);
    this.props.adminPasswordExpiryContext.setSettingsBulk({ [name]: filedValue });
  }

  /**
   * Handle the expiry period toggle click
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleExpiryPeriodToggleClick(event) {
    const value = event.target.checked;
    this.props.adminPasswordExpiryContext.setDefaultExpiryToggle(value);
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event
   */
  async handleFormSubmit(event) {
    // Avoid the form to be submitted natively by the browser and avoid a redirect to a broken page.
    event.preventDefault();

    this.props.adminPasswordExpiryContext.setSubmitted(true);

    if (this.props.adminPasswordExpiryContext.isProcessing() || !this.props.adminPasswordExpiryContext.validateData()) {
      return;
    }

    try {
      await this.props.adminPasswordExpiryContext.save();
      await this.handleSaveSuccess();
    } catch (error) {
      await this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The password expiry settings were updated."));
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   * @returns {Promise<void>}
   */
  async handleSaveError(error) {
    await this.props.actionFeedbackContext.displayError(error.message);
    this.props.dialogContext.open(NotifyError, { error });
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminPasswordExpiryContext.isProcessing();
  }

  /**
   * return the getSettings from context
   * @returns {object}
   */
  get settings() {
    return this.props.adminPasswordExpiryContext.getSettings();
  }

  /**
   * return the errors from the validation
   * @returns {object}
   */
  get errors() {
    const errors = this.props.adminPasswordExpiryContext.getErrors();
    return errors?.details;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const context = this.props.adminPasswordExpiryContext;
    const isSubmitted = context.isSubmitted();

    //empty string instead of null avoids a React error.
    const defaultExpiryPeriod = this.settings.default_expiry_period || "";
    const isDefaultExpiryPeriodToggleChecked = Boolean(this.settings?.default_expiry_period_toggle);

    return (
      <div id="password-expiry-form-advanced">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <h4 className="no-border" id="expiry-policies-subtitle">
            <Trans>Expiry Policies</Trans>
          </h4>
          <p id="expiry-policies-description">
            <Trans>In this section you can choose the default behaviour of password expiry policy for all users.</Trans>
          </p>
          <div className="togglelist-alt">
            <span
              id="default-expiry-period"
              className={`input toggle-switch form-element ${this.errors?.default_expiry_period && isSubmitted ? "has-error" : ""}`}
            >
              <input
                type="checkbox"
                className="toggle-switch-checkbox checkbox"
                name="defaultExpiryPeriodToggle"
                onChange={this.handleExpiryPeriodToggleClick}
                checked={isDefaultExpiryPeriodToggleChecked}
                disabled={this.hasAllInputDisabled()}
                id="default-expiry-period-toggle"
              />
              <label htmlFor="default-expiry-period-toggle">
                <span className="name">
                  <Trans>Default password expiry period</Trans>
                </span>
                <span className="info-input">
                  <Trans>
                    <span>When a user creates a resource, a default expiry date is set to </span>
                    <input
                      type="text"
                      className="toggle-input"
                      id="default-expiry-period-input"
                      name="default_expiry_period"
                      onChange={this.handleInputChange}
                      maxLength={3}
                      value={defaultExpiryPeriod}
                      disabled={this.hasAllInputDisabled() || !isDefaultExpiryPeriodToggleChecked}
                      placeholder="90"
                    />
                    <span>days</span>
                  </Trans>
                </span>
              </label>
            </span>
            {this.errors?.default_expiry_period && isSubmitted && (
              <div className="input">
                {!this.errors.default_expiry_period.required && (
                  <div className="default-expiry-period-gte error-message">
                    <Trans>The default password expiry period should be a number between 1 and 999 days.</Trans>
                  </div>
                )}
                {this.errors?.default_expiry_period.required && (
                  <div className="default-expiry-period-required  error-message">
                    <Trans>The default password expiry period should be a valid number.</Trans>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="togglelist-alt">
            <span className="input toggle-switch form-element" id="policy-override">
              <input
                type="checkbox"
                className="toggle-switch-checkbox checkbox"
                name="policy_override"
                onChange={this.handleInputChange}
                checked={this.settings.policy_override}
                disabled={this.hasAllInputDisabled()}
                id="policy-override-toggle"
              />
              <label htmlFor="policy-override-toggle">
                <span className="name">
                  <Trans>Policy Override</Trans>
                </span>
                <span className="info">
                  <Trans>Allow users to override the default policy.</Trans>
                </span>
              </label>
            </span>
          </div>
          <h4 className="no-border" id="automatic-workflow-subtitle">
            <Trans>Automatic workflows</Trans>
          </h4>
          <p id="automatic-workflow-description">
            <Trans>In this section you can choose automatic behaviours.</Trans>
          </p>
          <div className="togglelist-alt">
            <span className="input toggle-switch form-element" id="automatic-expiry">
              <input
                type="checkbox"
                className="toggle-switch-checkbox checkbox"
                name="automatic_expiry"
                onChange={this.handleInputChange}
                checked={this.settings.automatic_expiry}
                disabled={this.hasAllInputDisabled()}
                id="automatic-expiry-toggle"
              />
              <label htmlFor="automatic-expiry-toggle">
                <span className="name">
                  <Trans>Automatic Expiry</Trans>
                </span>
                <span className="info">
                  <Trans>
                    Password automatically expires when a user or group with a user who has accessed the password is
                    removed from the permission list.
                  </Trans>
                </span>
              </label>
            </span>
          </div>
          <div className="togglelist-alt">
            <span className="input toggle-switch form-element" id="automatic-update">
              <input
                type="checkbox"
                className="toggle-switch-checkbox checkbox"
                name="automatic_update"
                onChange={this.handleInputChange}
                checked={this.settings.automatic_update}
                disabled={this.hasAllInputDisabled()}
                id="automatic-update-toggle"
              />
              <label htmlFor="automatic-update-toggle">
                <span className="name">
                  <Trans>Automatic Update</Trans>
                </span>
                <span className="info">
                  {isDefaultExpiryPeriodToggleChecked ? (
                    <Trans>
                      Password expiry date is renewed based on the default password expiry period whenever a password is
                      updated.
                    </Trans>
                  ) : (
                    <Trans>Password is no longer marked as expired whenever the password is updated.</Trans>
                  )}
                </span>
              </label>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

DisplayAdministrationPasswordExpiryAdvanced.propTypes = {
  context: PropTypes.object, // Application context
  adminPasswordExpiryContext: PropTypes.object, // The admin password context context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withAdminPasswordExpiry(
    withActionFeedback(withDialog(withTranslation("common")(DisplayAdministrationPasswordExpiryAdvanced))),
  ),
);
