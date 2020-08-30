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
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Breadcrumbs extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    let index = 0;
    return (
      <div className="breadcrumbs">
        <ul className="menu">
          {(this.props.items && this.props.items.map(item => {
            index++;
            return (
              <li key={index}>
                {item.link && item.name &&
                <Link to={item.link}>{item.name}</Link>
                }
                {item.url && item.name &&
                <a href={item.url}>{item.name}</a>
                }
                {!item.url && !item.link && item.name &&
                <a href="#">{item.name}</a>
                }
              </li>
            );
          }))}
        </ul>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.array
};

export default Breadcrumbs;

