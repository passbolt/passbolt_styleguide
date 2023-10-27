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
 * @since         4.4.0
 */
import React, {Component, memo} from "react";
import PropTypes from "prop-types";
import Icon from "../Icons/Icon";

/**
 * This component represents a table cell favorite
 */
class CellAttentionRequired extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const value = this.props.value;
    const isAttentionRequired = Boolean(value.expired);
    if (!isAttentionRequired) {
      return null;
    }

    const now = new Date();
    if (now <= new Date(value.expired)) {
      return null;
    }

    return (
      <Icon name="exclamation"/>
    );
  }
}

CellAttentionRequired.propTypes = {
  value: PropTypes.object.isRequired, // The value to display
};

export default memo(CellAttentionRequired);
