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

import React from "react";
import { Trans, withTranslation } from "react-i18next";

/**
 * This component displays the user choose passphrase information help
 */
class EnterNewPassphraseHelp extends React.Component {
  render() {
    return (
      <div className="sidebar-help-section">
        <h3>
          <Trans>Tips for choosing a good passphrase</Trans>
        </h3>
        <p>
          <Trans>
            Make sure your passphrase is hard to guess but also that is long enough. For example you can use your
            favorite lyric from a song, grab the first couple of characters from the words in your favorite line.
          </Trans>
        </p>
      </div>
    );
  }
}

export default withTranslation("common")(EnterNewPassphraseHelp);
