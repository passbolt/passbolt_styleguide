/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import AppContext from "./contexts/AppContext";
import AskInFormMenuDisplay from "./components/AskInFormMenuDisplay/AskInFormMenuDisplay";

/**
 * Entry point of the in-fprm call to action
 */
class ExtInFormCallToAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default stare
   */
  get defaultState() {
    return {
      port: this.props.port
    };
  }

  /**
   * Render the component
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="web-integration">
          <AskInFormMenuDisplay />
        </div>
      </AppContext.Provider>
    );
  }
}

ExtInFormCallToAction.propTypes = {
  port: PropTypes.object
};

export default ExtInFormCallToAction;
