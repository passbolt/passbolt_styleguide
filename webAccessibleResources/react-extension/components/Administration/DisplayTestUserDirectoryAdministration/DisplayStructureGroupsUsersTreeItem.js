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

class DisplayStructureGroupsUsersTreeItem extends React.Component {
  /**
   * has children
   * @returns {boolean}
   */
  hasChildren() {
    return this.props.node.group.groups.length > 0;
  }

  /**
   * display user firstname and lastname
   * @param user
   */
  displayUserName(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  get node() {
    return this.props.node;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ul key={this.node.id}>
        {this.node.type === 'group' &&
        <li className="group">
          {this.node.group.name}
          <ul>
            {Object.values(this.node.group.users).map(node =>
              <li className="user" key={node.id}>
                {node.errors &&
                <span className="error">{node.directory_name}</span>
                }
                {!node.errors &&
                <span>{this.displayUserName(node.user)} <em>({node.user.username})</em></span>
                }
              </li>
            )
            }
            {Object.values(this.node.group.groups).map(node => <DisplayStructureGroupsUsersTreeItem
              key={`tree-${node.id}`}
              node={node}
            />)}
          </ul>
        </li>
        }
        {this.node.type === 'user' &&
        <li className="user">
          {this.node.errors &&
          <span className="error">{this.node.directory_name}</span>
          }
          {!this.node.errors &&
          <span>{this.displayUserName(this.node.user)} <em>({this.node.user.username})</em></span>
          }
        </li>
        }
      </ul>
    );
  }
}

DisplayStructureGroupsUsersTreeItem.propTypes = {
  node: PropTypes.object,
};

export default DisplayStructureGroupsUsersTreeItem;
