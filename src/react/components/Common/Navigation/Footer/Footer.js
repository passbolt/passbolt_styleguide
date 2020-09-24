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

class Footer extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <footer>
        <div className="footer">
          <ul className="footer-links">
            <li><a href="https://www.passbolt.com/licence">Terms</a></li>
            <li><a href="https://www.passbolt.com/privacy">Privacy</a></li>
            <li><a href="https://www.passbolt.com/credits">Credits</a></li>
            <li>
              <a href="https://www.passbolt.com/credits" className="tooltip-left" data-tooltip="v.0.1.0 / v.0.2.0"><i className="fa fa-heart-o"></i></a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default Footer;
