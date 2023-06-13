
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.1.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {UserSettingsContextState, withUserSettings} from "../../../contexts/UserSettingsContext";
import DisplayChangePassphraseIntroduction from "./DisplayChangePassphraseIntroduction";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import ConfirmPassphrase from "./ConfirmPassphrase";
import DownloadRecoveryKit from "./DownloadRecoveryKit";
import EnterNewPassphrase from "./EnterNewPassphrase";

/**
 * The component orchestrates the setup authentication process
 */
class ChangeUserPassphrase extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.initializePassphrase();
  }

  /**
   * Initialize the authentication setup process
   */
  initializePassphrase() {
    this.userSettingsContext.onIntroductionPassphraseRequested();
  }

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
        return <DisplayChangePassphraseIntroduction/>;
      case UserSettingsContextState.PASSPHRASE_TO_PROVIDE_REQUESTED:
        return <ConfirmPassphrase/>;
      case UserSettingsContextState.PASSPHRASE_TO_PROVIDE_CHECKED:
        return <EnterNewPassphrase/>;
      case UserSettingsContextState.PASSPHRASE_UPDATED:
        return <DownloadRecoveryKit/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

ChangeUserPassphrase.propTypes = {
  userSettingsContext: PropTypes.object // The user settings context
};
export default withUserSettings(ChangeUserPassphrase);
