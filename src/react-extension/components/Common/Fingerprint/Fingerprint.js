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
 * @since         4.9.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Fingerprint extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="fingerprint">
        <div className="fingerprint-line">{this.props.fingerprint?.substring(0, 20)?.replace(/.{4}/g, "$& ")}</div>
        <div className="fingerprint-line">{this.props.fingerprint?.substring(20)?.replace(/.{4}/g, "$& ")}</div>
      </div>
    );
  }
}

Fingerprint.propTypes = {
  fingerprint: PropTypes.string.isRequired,
};

export default Fingerprint;
