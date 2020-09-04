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

class TagFilterContextualMenu extends React.Component {
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
    this.handleFilterClickEvent = this.handleFilterClickEvent.bind(this);
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
   * Handle click on the filter type menu option.
   * @param {string} filterType
   */
  handleFilterClickEvent(filterType) {
    this.props.filterTagsType(filterType);
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
          <li key="option-filter-all-tag" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a id="all-tag" onClick={ () => this.handleFilterClickEvent("all")}><span>All tags</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-filter-personal-tag" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a id="personal-tag" onClick={ () => this.handleFilterClickEvent("personal")}><span>My tags</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-filter-share-tag" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a id="shared-tag" onClick={ () => this.handleFilterClickEvent("shared")}><span>Shared tags</span></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

TagFilterContextualMenu.propTypes = {
  left: PropTypes.number, // left position in px of the menu
  filterTagsType: PropTypes.func,
  onDestroy: PropTypes.func,
  top: PropTypes.number // top position in px of the menu
};

export default TagFilterContextualMenu;
