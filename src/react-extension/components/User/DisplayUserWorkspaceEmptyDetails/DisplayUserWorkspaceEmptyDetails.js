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
import {Trans, withTranslation} from "react-i18next";
import SelectUserSVG from "../../../../img/svg/select_user.svg";

class DisplayUserWorkspaceEmptyDetails extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="sidebar empty">
        <SelectUserSVG />
        <p><Trans>Select a user or a group to see the details.</Trans></p>
      </div>
    );
  }
}

export default withTranslation('common')(DisplayUserWorkspaceEmptyDetails);
