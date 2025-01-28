
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
 * This component displays the user confirm passphrase information help
 */
class ConfirmPassphraseHelp extends React.Component {
  render() {
    return (
      <div className="sidebar-help-section">
        <h3><Trans>What if I forgot my passphrase?</Trans></h3>
        <p><Trans>Unfortunately you need your passphrase in order to continue. If you forgot it, please contact your administrator.</Trans></p>
        <a className="button" href="https://www.passbolt.com/docs/user/settings/browser/account-recovery-setup/" target="_blank" rel="noopener noreferrer">
          <span><Trans>Learn more</Trans></span>
        </a>
      </div>
    );
  }
}

export default withTranslation('common')(ConfirmPassphraseHelp);
