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
 * @since         5.14.0
 */

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withPasskey } from "../../../contexts/Authentication/PasskeyContext";
import { createSafePortal } from "../../../../shared/utils/portals";

/**
 * Administration screen (CE) for the passkey login organization toggle. Turning it off hides the
 * passkey login button and the profile passkey screen for everyone, without deleting any enrolled
 * credential — turning it back on restores everything.
 */
class DisplayPasskeyAdministration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: props.passkeyContext.isOrgEnabled(), processing: false, message: null, error: null };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleToggle(event) {
    this.setState({ enabled: event.target.checked, message: null, error: null });
  }

  async handleSave() {
    if (this.state.processing) {
      return;
    }
    this.setState({ processing: true, message: null, error: null });
    try {
      await this.props.passkeyContext.setOrgEnabled(this.state.enabled);
      this.setState({ processing: false, message: this.props.t("The passkey login settings were saved.") });
    } catch (error) {
      this.setState({ processing: false, error: error?.message || this.props.t("Could not save the settings.") });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="passkey-settings main-column">
          <div className="main-content">
            <h3 className="title">
              <Trans>Passkey login</Trans>
            </h3>
            <p className="description">
              <Trans>Let users enrol a passkey to sign in without typing their passphrase.</Trans>{" "}
              <Trans>
                Turning this off hides the passkey login button and the profile passkey screen; enrolled passkeys are
                kept and restored when you turn it back on.
              </Trans>
            </p>
            <span className="input toggle-switch form-element ready">
              <input
                id="passkey-org-enabled"
                type="checkbox"
                className="toggle-switch-checkbox checkbox"
                name="enabled"
                checked={this.state.enabled}
                onChange={this.handleToggle}
                disabled={this.state.processing}
              />
              <label htmlFor="passkey-org-enabled">
                <Trans>Enable passkey login for the organization</Trans>
              </label>
            </span>
            {this.state.message && (
              <div className="message success">
                <p>{this.state.message}</p>
              </div>
            )}
            {this.state.error && <p className="error-message">{this.state.error}</p>}
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            type="button"
            className={`button primary form ${this.state.processing ? "processing" : ""}`}
            id="save-settings"
            onClick={this.handleSave}
            disabled={this.state.processing}
          >
            <span>
              <Trans>Save settings</Trans>
            </span>
          </button>
        </div>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3>
              <Trans>What is passkey login?</Trans>
            </h3>
            <p>
              <Trans>Passkey login lets a user sign in with a passkey instead of typing their passphrase.</Trans>{" "}
              <Trans>The passphrase keeps working as a fallback.</Trans>
            </p>
          </div>,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

DisplayPasskeyAdministration.propTypes = {
  passkeyContext: PropTypes.object, // The passkey context (organization toggle)
  t: PropTypes.func, // The translation function
};

export default withPasskey(withTranslation("common")(DisplayPasskeyAdministration));
