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
import PropTypes from "prop-types";
import DropdownContextProvider from "./DropdownContext";

/**
 * This component acts as an anchor for the dropdown button.
 */
class Dropdown extends React.Component {
  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <DropdownContextProvider>{this.props.children}</DropdownContextProvider>;
  }
}

Dropdown.propTypes = {
  children: PropTypes.any.isRequired, // The children property
};

export default Dropdown;
