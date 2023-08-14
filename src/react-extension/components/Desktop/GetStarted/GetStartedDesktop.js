/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import React from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

class GetStartedDesktop extends React.Component {
  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="get-started-desktop">
        <h1><Trans>Get started !</Trans></h1>
        <p>
          <Trans>You need to upload an account kit to start using the desktop app. </Trans> <br/>
          <Trans>Please follow these instructions:</Trans>
        </p>
        <p><span className="step">1</span>Authenticate on your browser extension</p>
        <p><span className="step">2</span>Go to your profile</p>
        <p><span className="step">3</span>Go to the Desktop app setup section</p>
        <p><span className="step">4</span>Download the account kit</p>
        <div className="form-actions">
          <button
            type="submit"
            className="button primary big full-width">
            <Trans>Start</Trans>
          </button>
        </div>
      </div>
    );
  }
}

GetStartedDesktop.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(GetStartedDesktop);
