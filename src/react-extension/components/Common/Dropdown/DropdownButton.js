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
import { withDropdown } from "./DropdownContext";

/**
 * This component acts as an anchor for the dropdown button.
 */
class DropdownButton extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDropdownMenuClickEvent = this.handleDropdownMenuClickEvent.bind(this);
  }

  /**
   * Handle create click event
   */
  handleDropdownMenuClickEvent() {
    this.props.dropdownContext.onOpen();
  }

  /**
   * Dropdown open
   * @returns {boolean}
   */
  get dropdownOpen() {
    return this.props.dropdownContext.dropdownOpen;
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <button
        type="button"
        className={`${this.props.className} ${this.dropdownOpen ? "open" : ""}`}
        disabled={this.props.disabled}
        onClick={this.handleDropdownMenuClickEvent}
      >
        {this.props.children}
      </button>
    );
  }
}

DropdownButton.defaultProps = {
  disabled: false,
  direction: "right",
  className: "button-dropdown",
};

DropdownButton.propTypes = {
  className: PropTypes.string, // The className property
  disabled: PropTypes.bool, // The disabled property
  direction: PropTypes.string, // The direction property
  dropdownContext: PropTypes.any, // The dropdown context
  children: PropTypes.any, // The children property
};

export default withDropdown(DropdownButton);
