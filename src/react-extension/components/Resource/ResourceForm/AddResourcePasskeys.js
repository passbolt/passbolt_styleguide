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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DeleteSVG from "../../../../img/svg/delete.svg";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";

/**
 * Passkeys section of the resource edit/create form. Passkeys are added by the WebAuthn provider
 * ceremony (a third-party site calling navigator.credentials.create), not typed in here, so this
 * section lists the passkeys stored in the resource secret read-only and lets the user remove them.
 * Removal asks for the master passphrase and is a soft delete (recoverable for 30 days) so a passkey
 * cannot be dropped casually.
 */
class AddResourcePasskeys extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  /**
   * @returns {function}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * All passkeys in the secret (including soft-deleted ones).
   * @returns {Array}
   */
  get allPasskeys() {
    return this.props.resource?.secret?.passkeys || [];
  }

  /**
   * The passkeys shown to the user (soft-deleted ones are hidden).
   * @returns {Array}
   */
  get passkeys() {
    return this.allPasskeys.filter((passkey) => !passkey.deleted_at);
  }

  /**
   * Confirm the master passphrase, then soft-delete the passkey (set deleted_at). Kept in the secret
   * so it can be recovered; it is purged for good 30 days later when the secret is next written.
   * @param {object} passkey
   */
  async handleDeleteClick(passkey) {
    try {
      // Always prompts — a passkey cannot be removed without the master passphrase.
      await this.props.context.port.request("passbolt.fido2-passkey.confirm-passphrase");
    } catch {
      return; // cancelled or wrong passphrase
    }
    const index = this.allPasskeys.findIndex(
      (item) =>
        (passkey.credential_id && item.credential_id === passkey.credential_id) ||
        (passkey.id && item.id === passkey.id),
    );
    if (index < 0) {
      return;
    }
    this.props.onChange?.({
      target: {
        name: `secret.passkeys.${index}.deleted_at`,
        value: new Date().toISOString(),
      },
    });
  }

  /**
   * A readable label for a passkey.
   * @param {object} passkey
   * @returns {string}
   */
  passkeyLabel(passkey) {
    return passkey.user_name || passkey.label || passkey.rp_id || this.translate("Passbolt Passkey");
  }

  /**
   * The relying party + creation date shown under a passkey.
   * @param {object} passkey
   * @returns {string}
   */
  passkeyMeta(passkey) {
    const parts = [];
    if (passkey.rp_id) {
      parts.push(passkey.rp_id);
    }
    if (passkey.created) {
      parts.push(new Date(passkey.created).toLocaleDateString());
    }
    return parts.join(" · ");
  }

  render() {
    const passkeys = this.passkeys;
    return (
      <>
        <div className="title">
          <h2>
            <Trans>Passkeys</Trans>
          </h2>
        </div>
        <div className="content">
          <div className="passkeys-fields">
            {passkeys.length === 0 && (
              <p className="description">
                <Trans>There is no passkey in this item.</Trans>
              </p>
            )}
            {passkeys.map((passkey) => (
              <div key={passkey.id || passkey.credential_id} className="input text">
                <label>{this.passkeyLabel(passkey)}</label>
                <div className="additional-uri-wrapper">
                  <input type="text" readOnly={true} autoComplete="off" value={this.passkeyMeta(passkey)} />
                  <button
                    type="button"
                    className="button-icon"
                    disabled={this.props.disabled}
                    onClick={() => this.handleDeleteClick(passkey)}
                    title={this.translate("Remove this passkey")}
                  >
                    <DeleteSVG />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="message notice">
          <p className="text">
            <strong>
              <Trans>Information</Trans>:
            </strong>{" "}
            <Trans>Passkeys are added from the websites you sign in to; they cannot be created here.</Trans>{" "}
            <Trans>Removing a passkey asks for your passphrase and can be undone for 30 days.</Trans>
          </p>
        </div>
      </>
    );
  }
}

AddResourcePasskeys.propTypes = {
  context: PropTypes.any, // The application context (port)
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, // The resource setter
  t: PropTypes.func, // The translation function
  disabled: PropTypes.bool, // The disabled property
};

export default withAppContext(withTranslation("common")(AddResourcePasskeys));
