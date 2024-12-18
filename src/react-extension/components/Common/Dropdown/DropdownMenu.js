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
import {withDropdown} from "./DropdownContext";


/**
 * This component acts as a dropdown item.
 */
class DropdownMenu extends React.Component {
  /**
   * Dropdown must show menu
   */
  get dropdownMenuMustShow() {
    return this.props.dropdownContext.dropdownOpen;
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      this.dropdownMenuMustShow &&
          <ul className={`dropdown-content menu visible ${this.props.className} ${this.props.direction}`}>
            {this.props.children}
          </ul>
    );
  }
}

DropdownMenu.defaultProps = {
  direction: "right",
};

DropdownMenu.propTypes = {
  direction: PropTypes.string, // The direction property
  className: PropTypes.string, // The className property
  dropdownContext: PropTypes.any, // The dropdown context
  children: PropTypes.any // The children property
};

export default withDropdown(DropdownMenu);
