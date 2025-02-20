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
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";

class DisplayRbacSection extends React.Component {
  /**
   * @inheritDoc
   */
  render() {
    return (
      <>
        <div className={`flex-container inner level-${this.props.level}`}>
          <div className="flex-item first border-right">
            <span><Icon name="caret-down" baseline={true}/>&nbsp;&nbsp;{this.props.label}</span>
          </div>
          <div className="flex-item border-right">
            &nbsp;
          </div>
          <div className="flex-item">
            &nbsp;
          </div>
        </div>
        {this.props.children}
      </>
    );
  }
}

DisplayRbacSection.propTypes = {
  label: PropTypes.string, // The section label.
  level: PropTypes.number, // The section level
  t: PropTypes.func, // The translation function
  children: PropTypes.any, // The component children
};

export default withTranslation('common')(DisplayRbacSection);
