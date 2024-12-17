/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */
import React, {Component, memo} from "react";
import PropTypes from "prop-types";

/**
 * This component represents a table cell button
 */
class CellCheckbox extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Initialize the bindCallback
   */
  bindCallbacks() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * handle click
   * @param event
   */
  handleClick(event) {
    event.stopPropagation();
    this.props.onClick(event, this.value);
  }

  /**
   * Get the value
   * @return {Object}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="input checkbox">
        <input type="checkbox" className="for-grid" id={`checkbox_multiple_select_checkbox_${this.value.id}`} checked={this.props.checked} readOnly={true} onClick={this.handleClick}/>
      </div>
    );
  }
}

CellCheckbox.propTypes = {
  value: PropTypes.object.isRequired, // The value to display
  checked: PropTypes.bool.isRequired, // The checked value
  onClick: PropTypes.func, // The onClick event function
};

export default memo(CellCheckbox);
