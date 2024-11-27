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

import React, {Children} from "react";
import PropTypes from "prop-types";
import DropdownItem from "./DropdownItem";


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
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      dropdownOpen: false, // dropdown open or not
    };
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.dropdownRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleDropdownMenuClickEvent = this.handleDropdownMenuClickEvent.bind(this);
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent, {capture: true});
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent, {capture: true});
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent, {capture: true});
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.handleCloseDropdown();
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.dropdownRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseDropdown();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right click on an element of the menu
    if (this.dropdownRef.current.contains(event.target)) {
      return;
    }
    this.handleCloseDropdown();
  }

  /**
   * Handle create click event
   */
  handleDropdownMenuClickEvent() {
    const dropdownOpen = !this.state.dropdownOpen;
    this.setState({dropdownOpen});
  }

  /**
   * Removes dropdown items
   */
  handleCloseDropdown() {
    this.setState({dropdownOpen: false});
  }

  logs(DropdownItem) {
    DropdownItem.props.onClose = this.handleCloseDropdown;
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="dropdown" ref={this.dropdownRef}>
        <button type="button" className={`${this.props.className} ${this.state.dropdownOpen ? "open" : ""}`} disabled={this.props.disabled} onClick={this.handleDropdownMenuClickEvent}>
          {this.props.content}
        </button>
        {this.state.dropdownOpen &&
          <ul className={`dropdown-content menu visible ${this.props.direction}`}>
            {
              Children.map(this.props.children, child => React.cloneElement(child, {onClose: this.handleCloseDropdown}))
            }
          </ul>
        }
      </div>
    );
  }
}

DropdownButton.defaultProps = {
  disabled: false,
  direction: "right",
  className: "button-dropdown"
};

DropdownButton.propTypes = {
  content: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  direction: PropTypes.string,
  children: PropTypes.arrayOf(DropdownItem).isRequired
};

export default DropdownButton;
