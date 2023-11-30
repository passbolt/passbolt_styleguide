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
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import {withAdminPasswordExpiry} from "../../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";

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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExpiryPeriodToggleClick = this.handleExpiryPeriodToggleClick.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : parseInt(target.value, 10);
    const name = target.name;
    this.props.adminPasswordExpiryContext.setSettingsBulk({[name]: value});
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

    //undefined instead of null avoids a React error.
    const defaultExpiryPeriod = this.settings.default_expiry_period || undefined;
    const isDefaultExpiryPeriodToggleChecked = Boolean(this.settings?.default_expiry_period_toggle);

    return (
      <div id="password-expiry-form-advanced">
        <form className="form">
          <h4 className="no-border" id="expiry-policies-subtitle"><Trans>Expiry Policies</Trans></h4>
          <p id="expiry-policies-description">
            <Trans>In this section you can choose the default behaviour of password expiry policy for all users.</Trans>
          </p>
          <div className="togglelist-alt">
            <span id="default-expiry-period" className={`input toggle-switch form-element ${this.errors?.default_expiry_period && isSubmitted ?  "has-error" : ""}`}>
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="defaultExpiryPeriodToggle"
                onChange={this.handleExpiryPeriodToggleClick}
                checked={isDefaultExpiryPeriodToggleChecked}
                disabled={this.hasAllInputDisabled()}
                id="default-expiry-period-toggle"/>
              <label htmlFor="defaultExpiryPeriodToggle">
                <span className="name"><Trans>Default password expiry period</Trans></span>
                <span className="info-input">
                  <Trans>
                    <span>When a user creates a resource, a default expiry date is set for </span>
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
                    <span>days</span></Trans>
                </span>
              </label>
            </span>
            {
              this.errors?.default_expiry_period && isSubmitted &&
              <div className="input">
                {
                  !this.errors.default_expiry_period.required && <div className="default-expiry-period-gte error-message"><Trans>The default password expiry period should be a number between 1 and 999 days.</Trans></div>
                }
                {
                  this.errors?.default_expiry_period.required && <div className="default-expiry-period-required  error-message"><Trans>The default password expiry period is required.</Trans></div>
                }
              </div>
            }
          </div>
          <div className="togglelist-alt">
            <span className="input toggle-switch form-element" id="policy-override">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="policy_override"
                onChange={this.handleInputChange} checked={this.settings.policy_override} disabled={this.hasAllInputDisabled()}
                id="policy-override-toggle"/>
              <label htmlFor="policy_override">
                <span className="name"><Trans>Policy Override</Trans></span>
                <span className="info">
                  <Trans>Allow users to override the default policy.</Trans>
                </span>
              </label>
            </span>
          </div>
          <h4 className="no-border" id="automatic-workflow-subtitle"><Trans>Automatic workflows</Trans></h4>
          <p id="automatic-workflow-description">
            <Trans>In this section you can choose automatic behaviours.</Trans>
          </p>
          <div className="togglelist-alt">
            <span className="input toggle-switch form-element" id="automatic-expiry">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="automatic_expiry"
                onChange={this.handleInputChange} checked={this.settings.automatic_expiry} disabled={this.hasAllInputDisabled()}
                id="automatic-expiry-toggle"/>
              <label htmlFor="automatic_expiry">
                <span className="name"><Trans>Automatic Expiry</Trans></span>
                <span className="info">
                  <Trans>Password automatically expires when a user or a group is removed from the permission list.</Trans>
                </span>
              </label>
            </span>
          </div>
          <div className="togglelist-alt">
            <span className="input toggle-switch form-element" id="automatic-update">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="automatic_update"
                onChange={this.handleInputChange} checked={this.settings.automatic_update} disabled={this.hasAllInputDisabled()}
                id="automatic-update-toggle"/>
              <label htmlFor="automatic_update">
                <span className="name"><Trans>Automatic Update</Trans></span>
                <span className="info">
                  <Trans>When users change their passwords, the expiry date is increased by number of days set in the default password expiry period.</Trans>
                </span>
              </label>
            </span>
          </div>
          <h4 className="no-border" id="expiry-notification-subtitle"><Trans>Expiry notifications</Trans></h4>
          <p id="expiry-notification-description">
            <Trans>In this section you can choose when a notification is sent before an expiry date.</Trans>
          </p>
          <div className="input-alt" id="expiry-notification">
            <div className="content">
              <span>A notification sent</span>
              <input
                type="text"
                id="expiry-notification-input"
                className="toggle-input"
                name="expiry_notification"
                onChange={this.handleInputChange}
                min="1"
                maxLength={3}
                disabled={this.hasAllInputDisabled()}
                value={this.settings.expiry_notification}/>
              <span>days before the expiry date</span>
            </div>
            {
              this.errors?.expiry_notification && isSubmitted &&
            <div className="input">
              {
                !this.errors?.expiry_notification.type && <div className="expiry-notification-gte  error-message"><Trans>The expiration notification should be a number between 1 and 999 days.</Trans></div>
              }
              {
                this.errors?.expiry_notification.type && <div className="expiry-notification-required  error-message"><Trans>The expiration notification is required.</Trans></div>
              }
            </div>
            }
          </div>
        </form>
      </div>
    );
  }
}

DisplayAdministrationPasswordExpiryAdvanced.propTypes = {
  context: PropTypes.object, // Application context
  adminPasswordExpiryContext: PropTypes.object, // The admin password context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminPasswordExpiry(withTranslation('common')(DisplayAdministrationPasswordExpiryAdvanced)));
