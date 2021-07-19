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

class DisplayInFormMenu extends React.Component {
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
    const isScrollable = this.props.children.length > 3;
    return (
      <div className={`in-form-menu ${isScrollable? 'in-form-menu--scrollable' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

DisplayInFormMenu.propTypes = {
  children: function (props, propName, componentName) {
  }
}

export default DisplayInFormMenu;