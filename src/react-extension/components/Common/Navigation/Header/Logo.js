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
import SVGLogo from '../../../../../img/svg/logo.svg';

class Logo extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="top-bar-left">
        <div className="logo-svg no-img" title="Passbolt logo">
          <SVGLogo width="100%" height="2.5rem"/>
          <h1><span>Passbolt</span></h1>
        </div>
      </div>
    );
  }
}

export default Logo;
