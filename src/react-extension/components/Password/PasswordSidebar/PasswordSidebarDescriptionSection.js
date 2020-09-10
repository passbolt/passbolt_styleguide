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

/**
 * This component display the description section of a resource
 */
class PasswordSidebarDescriptionSection extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * check if there is a no description
   * @returns {boolean}
   */
  hasNoDescription() {
    return !this.props.description;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Description</a></h4>
        </div>
        <div className="accordion-content">
          {this.hasNoDescription() &&
          <em className="empty-content">There is no description yet, click here to add one</em>
          }
          {!this.hasNoDescription() &&
          <p className="description_content">{this.props.description}</p>
          }
        </div>
      </div>
    );
  }
}

PasswordSidebarDescriptionSection.propTypes = {
  description: PropTypes.string,
  id: PropTypes.string
};

export default PasswordSidebarDescriptionSection;
