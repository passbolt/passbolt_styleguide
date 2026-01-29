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
import { withTranslation } from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";

class DisplayRbacSection extends React.Component {
  /**
   * Return a blank section
   * @return {React.JSX.Element}
   */
  blankColumnSectionForRoles() {
    const rows = [];
    for (let i = 0; i < this.props.rolesCount; i++) {
      rows.push(
        <div className="flex-item" key={i}>
          &nbsp;
        </div>,
      );
    }
    return <>{rows}</>;
  }
  /**
   * @inheritDoc
   */
  render() {
    return (
      <>
        <div className={`flex-container inner level-${this.props.level}`}>
          <div className="flex-item first">
            <span>
              <CaretDownSVG className="caret-down" />
              &nbsp;&nbsp;{this.props.label}
            </span>
          </div>
          {this.blankColumnSectionForRoles()}
        </div>
        {this.props.children}
      </>
    );
  }
}

DisplayRbacSection.defaultProps = {
  rolesCount: 0,
};

DisplayRbacSection.propTypes = {
  label: PropTypes.string, // The section label.
  level: PropTypes.number, // The section level
  rolesCount: PropTypes.number, // The number of roles
  t: PropTypes.func, // The translation function
  children: PropTypes.any, // The component children
};

export default withTranslation("common")(DisplayRbacSection);
