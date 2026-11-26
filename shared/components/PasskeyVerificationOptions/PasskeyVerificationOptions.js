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
 * @since         5.18.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import { PASSKEY_VERIFICATION_NON_STRICT, PASSKEY_VERIFICATION_STRICT } from "../../constants/passkey.const";

/**
 * The two passkey verification preferences, as a radio list.
 */
class PasskeyVerificationOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle a radio change.
   * @param {ReactEvent} event The change event.
   */
  handleInputChange(event) {
    this.props.onChange(event.target.value);
  }

  /**
   * Render one option.
   * @param {string} value The preference value.
   * @param {JSX.Element} name The option name.
   * @param {JSX.Element} info The option explanation.
   * @returns {JSX.Element}
   */
  renderOption(value, name, info) {
    const isChecked = this.props.value === value;
    const id = `passkey-verification-${value}`;
    return (
      <div className={`input radio ${isChecked ? "checked" : ""} ${this.props.disabled ? "disabled" : ""}`}>
        <input
          type="radio"
          value={value}
          onChange={this.handleInputChange}
          name="passkeyVerification"
          checked={isChecked}
          id={id}
          disabled={this.props.disabled}
        />
        <label htmlFor={id}>
          <span className="name">{name}</span>
          <span className="info">{info}</span>
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="radiolist-alt">
        {this.renderOption(
          PASSKEY_VERIFICATION_STRICT,
          <Trans>Verify each time (recommended)</Trans>,
          <Trans>
            Enter your Passbolt passphrase each time a site requires verification, even if Passbolt remembers it.
          </Trans>,
        )}
        {this.renderOption(
          PASSKEY_VERIFICATION_NON_STRICT,
          <Trans>Use my unlocked Passbolt session</Trans>,
          <Trans>
            Skip the extra check while your session can access the passkey. Someone with access to your unlocked session
            could use it too.
          </Trans>,
        )}
      </div>
    );
  }
}

PasskeyVerificationOptions.propTypes = {
  value: PropTypes.oneOf([PASSKEY_VERIFICATION_STRICT, PASSKEY_VERIFICATION_NON_STRICT]), // The selected preference
  onChange: PropTypes.func.isRequired, // Called with the selected preference
  disabled: PropTypes.bool, // Whether the options are disabled
};

export default PasskeyVerificationOptions;
