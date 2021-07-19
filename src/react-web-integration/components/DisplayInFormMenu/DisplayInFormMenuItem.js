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
 * @since         3.4.0
 */

import React from "react";
import PropTypes from "prop-types";

class DisplayInFormMenuItem extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <a className="in-form-menu-item">
        <div className="in-form-menu-item-icon">
          {this.props.icon}
        </div>
        <div className="in-form-menu-item-content">
          <div className="in-form-menu-item-content-header">
            <strong>
              {this.props.title}
            </strong>
          </div>
          <div className="in-form-menu-item-content-subheader">
            {this.props.subtitle}
          </div>
          <div className="in-form-menu-item-content-description">
            {this.props.description}
          </div>
        </div>
      </a>
    );
  }
}

DisplayInFormMenuItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
  description: PropTypes.string,
  icon: PropTypes.any
}

export default DisplayInFormMenuItem;
