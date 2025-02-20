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
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";

class GroupAvatar extends Component {
  /**
   * Get image alternative text
   * @returns {string}
   */
  getAltText() {
    return this.props.t('Avatar of the {{group_name}} group.', {group_name: this.props.group?.name});
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    return (
      <div className="avatar user-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" aria-labelledby="svg-title">
          <title id="svg-title">{this.getAltText()}</title>
          <circle fill="#939598" cx="21" cy="21" r="21"/>
          <path fill="white" d="m36.59,24.69h-9.55c-.94,0-1.84.23-2.66.64h2.68c2.32,0,4.49.9,6.13,2.54,1.54,1.54,2.42,3.56,2.52,5.72,1.94-2.26,3.35-4.97,4.09-7.94-.94-.63-2.05-.96-3.21-.96Zm-9.65,1.84h-12.33c-2.01,0-3.89.78-5.31,2.2-1.42,1.42-2.2,3.3-2.2,5.31v.44c3.53,3.64,8.45,5.91,13.9,5.91s9.96-2.08,13.45-5.45v-.89c0-2.01-.78-3.89-2.2-5.31-1.42-1.42-3.3-2.2-5.31-2.2Zm1.02-6.02c1.03.91,2.38,1.48,3.86,1.48,3.21,0,5.81-2.61,5.81-5.81s-2.61-5.81-5.81-5.81c-1.24,0-2.39.39-3.33,1.06.66,1.23,1.04,2.63,1.04,4.12,0,1.85-.58,3.56-1.56,4.97Zm-7.19,2.53c4.14,0,7.51-3.37,7.51-7.51s-3.37-7.51-7.51-7.51-7.51,3.37-7.51,7.51,3.37,7.51,7.51,7.51Z"/>
          <path fill="white" d="m32.25,28.73c-1.42-1.42-3.3-2.2-5.31-2.2h-12.33c-2.01,0-3.89.78-5.31,2.2-1.42,1.42-2.2,3.3-2.2,5.31v.44c3.53,3.64,8.45,5.91,13.9,5.91s9.96-2.08,13.45-5.45v-.89c0-2.01-.78-3.89-2.2-5.31Zm-11.48-5.69c4.14,0,7.51-3.37,7.51-7.51s-3.37-7.51-7.51-7.51-7.51,3.37-7.51,7.51,3.37,7.51,7.51,7.51Zm-6.28,2.29h2.14c-.13-.19-.28-.37-.44-.54-.79-.79-1.85-1.23-2.97-1.23h-6.9c-1.12,0-2.18.44-2.97,1.23-.44.44-.76.97-.97,1.54.71,2.49,1.91,4.78,3.49,6.75.21-1.97,1.07-3.8,2.49-5.21,1.63-1.64,3.81-2.54,6.13-2.54Zm-4.72-3.72c1.4,0,2.64-.7,3.41-1.76-.73-1.27-1.15-2.74-1.15-4.31,0-.53.06-1.05.15-1.56-.68-.48-1.51-.77-2.41-.77-2.32,0-4.2,1.88-4.2,4.2s1.88,4.2,4.2,4.2Z"/>
        </svg>
      </div>
    );
  }
}

GroupAvatar.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func,
};

export default withTranslation('common')(GroupAvatar);
