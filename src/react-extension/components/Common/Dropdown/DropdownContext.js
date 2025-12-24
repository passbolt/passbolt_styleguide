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
import React, { Component } from "react";
import PropTypes from "prop-types";

export const DropdownContext = React.createContext({
  dropdownOpen: false, // The dropdown boolean property
  onOpen: () => {}, // Whenever dropdown open
  onClose: () => {}, // Whenever dropdown close
});

/**
 * This component represents a Dropdown Context
 */
export default class DropdownContextProvider extends Component {
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
      onClose: this.handleCloseDropdown.bind(this),
      onOpen: this.handleOpenDropdown.bind(this),
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
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClickEvent, { capture: true });
    document.addEventListener("contextmenu", this.handleDocumentContextualMenuEvent, { capture: true });
    document.addEventListener("dragstart", this.handleDocumentDragStartEvent, { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClickEvent, { capture: true });
    document.removeEventListener("contextmenu", this.handleDocumentContextualMenuEvent, { capture: true });
    document.removeEventListener("dragstart", this.handleDocumentDragStartEvent, { capture: true });
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
   * Removes dropdown items
   */
  handleCloseDropdown() {
    this.setState({ dropdownOpen: false });
  }

  /**
   * Removes dropdown items
   */
  handleOpenDropdown() {
    const dropdownOpen = !this.state.dropdownOpen;
    this.setState({ dropdownOpen });
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <DropdownContext.Provider value={this.state}>
        <div className="dropdown" ref={this.dropdownRef}>
          {this.props.children}
        </div>
      </DropdownContext.Provider>
    );
  }
}

DropdownContextProvider.propTypes = {
  children: PropTypes.any, // The children
};

/**
 * Dropdown Context Consumer HOC
 * @param WrappedComponent
 */
export function withDropdown(WrappedComponent) {
  return class withDropdown extends React.Component {
    render() {
      return (
        <DropdownContext.Consumer>
          {(dropdownContext) => <WrappedComponent dropdownContext={dropdownContext} {...this.props} />}
        </DropdownContext.Consumer>
      );
    }
  };
}
