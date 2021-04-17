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
 * @since         3.0.0
 */
import React, {Component} from "react";
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
          {(this.props.items && this.props.items.map(breadcrumb => {
            index++;
            return <li className="ellipsis" key={index}>{breadcrumb}</li>;
          }))}
        </ul>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.array, // Array of breadcrumb [{name, onClick}, ..]
};

export default Breadcrumbs;
