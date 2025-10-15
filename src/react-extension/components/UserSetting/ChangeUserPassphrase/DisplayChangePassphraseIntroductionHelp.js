
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
 * @since         5.0.0
 */

import React from 'react';
import {Trans, withTranslation} from "react-i18next";

/**
 * This component displays the user profile information help
 */
class DisplayChangePassphraseIntroductionHelp extends React.Component {
  render() {
    return (
      <div className="sidebar-help-section">
        <h3><Trans>What is the role of the passphrase?</Trans></h3>
        <p><Trans>The passphrase is used to encrypt your secret key, which is required to decrypt your secrets, such as the passwords.</Trans></p>
        <p><Trans>Without the private key and the passphrase it is not possible to decrypt!</Trans></p>
        <a className="button" href="https://www.passbolt.com/docs/user/settings/browser/change-passphrase/" target="_blank" rel="noopener noreferrer">
          <span><Trans>Learn more</Trans></span>
        </a>
      </div>
    );
  }
}

export default withTranslation("common")(DisplayChangePassphraseIntroductionHelp);
