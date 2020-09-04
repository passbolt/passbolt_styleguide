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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";

class DisplayTagListContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.createRefs();
    this.bindCallbacks();
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.elementRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent);
  }

  /**
   * Destroy the menu
   */
  destroy() {
    this.props.onDestroy();
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the contextual menu
    if (this.elementRef.current.contains(event.target)) {
      return;
    }
    this.destroy();
  }

  /**
   * Handle click on the edit tag menu option.
   */
  handleEditClickEvent() {
    const tag = this.props.selectedTag;
    this.context.port.emit('passbolt.plugin.tags.open-edit-dialog', {tag});
    this.destroy();
  }

  /**
   * Handle click on the delete tag menu option.
   */
  handleDeleteClickEvent() {
    const tag = this.props.selectedTag;
    this.context.port.emit('passbolt.plugin.tags.open-delete-dialog', {tag});
    this.destroy();
  }

  /**
   * Get the contextual menu style.
   */
  getStyle() {
    return {
      position: "fixed",
      display: "block",
      left: this.props.left,
      top: this.props.top
    };
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <div ref={this.elementRef}>
        <ul className="contextual-menu" style={this.getStyle()}>
          <li key="option-edit-tag" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a id="edit-tag" onClick={this.handleEditClickEvent}><span>Edit Tag</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-delete-tag" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a id="delete-tag" onClick={this.handleDeleteClickEvent}><span>Delete Tag</span></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

DisplayTagListContextualMenu.contextType = AppContext;

DisplayTagListContextualMenu.propTypes = {
  left: PropTypes.number, // left position in px of the page
  onDestroy: PropTypes.func,
  top: PropTypes.number, // top position in px of the page
  selectedTag: PropTypes.object
};

export default DisplayTagListContextualMenu;
