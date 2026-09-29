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
 * @since         5.17.0
 */
import React from "react";
import PropTypes from "prop-types";
import PasskeySVG from "../../../img/svg/passkey.svg";
import { PASSKEY_AUTHENTICATOR_ICONS } from "../../models/passkey/aaguidIcons.data";
import { normalizePasskeyAaguid } from "../../utils/passkeyAuthenticator";

/**
 * Decorative icon of a passkey authenticator, resolved from its AAGUID.
 * Both theme variants are rendered; the theme stylesheet shows one of them.
 */
class PasskeyAuthenticatorIcon extends React.PureComponent {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const icons = PASSKEY_AUTHENTICATOR_ICONS[normalizePasskeyAaguid(this.props.aaguid)];
    const IconLight = icons?.iconLight ?? PasskeySVG;
    const IconDark = icons?.iconDark ?? PasskeySVG;
    return (
      <span className={`passkey-authenticator-icon ${this.props.className}`} aria-hidden="true">
        {IconLight === IconDark ? (
          <IconLight />
        ) : (
          <>
            <IconLight className="light" />
            <IconDark className="dark" />
          </>
        )}
      </span>
    );
  }
}

PasskeyAuthenticatorIcon.defaultProps = {
  className: "",
};

PasskeyAuthenticatorIcon.propTypes = {
  aaguid: PropTypes.string, // the authenticator AAGUID, the generic passkey icon is displayed when unknown
  className: PropTypes.string, // additional class names of the wrapper
};

export default PasskeyAuthenticatorIcon;
