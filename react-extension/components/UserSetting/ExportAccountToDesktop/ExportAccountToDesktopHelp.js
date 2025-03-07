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
import PropTypes from "prop-types";
import FileTextSVG from "../../../../img/svg/file_text.svg";

/**
 * This component displays the desktop account export help
 */
class ExportAccountToDesktopHelp extends React.Component {
  /**
   * Render the component
   */
  render() {
    return (
      <div className="sidebar-help-section">
        <h3><Trans>Get started in 5 easy steps</Trans></h3>
        <p><Trans>1. Click download the account kit.</Trans></p>
        <p><Trans>2. Install the application from the store.</Trans></p>
        <p><Trans>3. Open the application.</Trans></p>
        <p><Trans>4. Upload the account kit on the desktop app.</Trans></p>
        <p><Trans>5. And you are done!</Trans></p>
        <a className="button" href="https://www.passbolt.com/docs/user/quickstart/desktop/windows-app/" target="_blank" rel="noopener noreferrer">
          <FileTextSVG />
          <span><Trans>Read the documentation</Trans></span>
        </a>
      </div>
    );
  }
}

ExportAccountToDesktopHelp.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(ExportAccountToDesktopHelp);
