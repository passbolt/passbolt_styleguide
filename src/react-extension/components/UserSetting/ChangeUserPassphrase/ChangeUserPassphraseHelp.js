
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

import React, {Component} from "react";
import PropTypes from "prop-types";
import {UserSettingsContextState, withUserSettings} from "../../../contexts/UserSettingsContext";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import DisplayChangePassphraseIntroductionHelp from "./DisplayChangePassphraseIntroductionHelp";
import ConfirmPassphraseHelp from "./ConfirmPassphraseHelp";
import EnterNewPassphraseHelp from "./EnterNewPassphraseHelp";

/**
 * The component orchestrates the setup authentication process
 */
class ChangeUserPassphraseHelp extends Component {
  /**
   * Get user settings context
   * @returns {Object}
   */
  get userSettingsContext() {
    return this.props.userSettingsContext;
  }

  /**
   * Render the component
   */
  render() {
    switch (this.userSettingsContext.state)  {
      case UserSettingsContextState.PASSPHRASE_INTRODUCTION:
        return <DisplayChangePassphraseIntroductionHelp/>;
      case UserSettingsContextState.PASSPHRASE_TO_PROVIDE_REQUESTED:
        return <ConfirmPassphraseHelp/>;
      case UserSettingsContextState.PASSPHRASE_TO_PROVIDE_CHECKED:
        return <EnterNewPassphraseHelp/>;
      case UserSettingsContextState.PASSPHRASE_UPDATED:
        return <DisplayChangePassphraseIntroductionHelp/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

ChangeUserPassphraseHelp.propTypes = {
  userSettingsContext: PropTypes.object, // The user settings context
};
export default withUserSettings(ChangeUserPassphraseHelp);
