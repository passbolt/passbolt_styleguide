/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

class GroupAvatar extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      error: false
    };
  }

  /**
   * Get the avatar url
   * @returns {string}
   */
  getAvatarUrl() {
    return `${this.props.baseUrl}/img/avatar/group_default.png`;
  }

  /**
   * Get image alternative text
   * @returns {string}
   */
  getAltText() {
    return `Avatar of the ${this.props.name} group.`;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    return (
      <div className="avatar user-avatar">
        <img src={this.getAvatarUrl()} alt={this.getAltText()}/>
      </div>
    );
  }
}

GroupAvatar.propTypes = {
  baseUrl: PropTypes.string,
  group: PropTypes.object,
  name: PropTypes.string,
};

export default GroupAvatar;
