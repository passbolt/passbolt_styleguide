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
 * @since         3.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import ChangeLocale from "./ChangeLocale";
import {ApiSetupContextState, withApiSetupContext} from "../../../contexts/ApiSetupContext";

/**
 * This component allows the user to change the locale for the authentication workflows.
 */
class ChangeApiSetupLocale extends Component {
  /**
   * The states for witch the language switch must be displayed.
   * @returns {array}
   */
  get statesToHideLocaleSwitch() {
    return [
      ApiSetupContextState.INITIAL_STATE,
    ];
  }

  /**
   * Must display the locale switch component.
   * @type {boolean}
   */
  get mustDisplayLocaleSwitch() {
    return !this.statesToHideLocaleSwitch.includes(this.props.apiSetupContext.state);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <>
        {this.mustDisplayLocaleSwitch && <ChangeLocale/>}
      </>
    );
  }
}

ChangeApiSetupLocale.propTypes = {
  apiSetupContext: PropTypes.any, // The application context
};

export default withApiSetupContext(ChangeApiSetupLocale);
