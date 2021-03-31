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
import UserAvatar from "../../Avatar/UserAvatar";
import GroupAvatar from "../../Avatar/GroupAvatar";

class AutocompleteItem extends Component {
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
   * @return {void}
   */
  bindCallbacks() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Get the item title
   * @returns {string}
   */
  getTitle() {
    if (this.props.user) {
      return `${this.props.user.profile.first_name} ${this.props.user.profile.last_name} (${this.props.user.username})`;
    } else {
      return `${this.props.group.name}`;
    }
  }

  /**
   * Get the item subtitle
   * @returns {string}
   */
  getSubtitle() {
    if (this.props.user) {
      const longId = this.props.user.gpgkey.fingerprint.substr(this.props.user.gpgkey.fingerprint.length - 16);
      return longId.replace(/(.{4})/g, "$1 ");
    } else {
      if (this.props.group.user_count > 1) {
        return `${this.props.group.user_count} group members`;
      } else {
        return `One group member`;
      }
    }
  }

  /**
   * Get the autocomplete item classname
   * @returns {string}
   */
  getClassName() {
    if (this.props.selected) {
      return 'row selected';
    }
    return 'row';
  }

  /**
   * Handle click on an autocomplete item
   */
  handleClick() {
    this.props.onClick(this.props.id);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <li id="autocomplete-item">
        <div className={this.getClassName()}>
          <div className="main-cell-wrapper">
            <div className="main-cell ">
              <a role="button" onClick={this.handleClick}>
                {this.props.user &&
                <UserAvatar user={this.props.user} baseUrl={this.props.baseUrl}/>
                }
                {this.props.group &&
                <GroupAvatar group={this.props.group} baseUrl={this.props.baseUrl}/>
                }
                <div className="user">
                  <span className="name">{this.getTitle()}</span>
                  <span className="details">{this.getSubtitle()}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

AutocompleteItem.propTypes = {
  baseUrl: PropTypes.string,
  id: PropTypes.number,
  user: PropTypes.object,
  group: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export default AutocompleteItem;
