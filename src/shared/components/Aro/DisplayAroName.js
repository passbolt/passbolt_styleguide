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
 * @since         5.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import {getUserFormattedName} from "../../utils/userUtils";
import {getGroupFormattedName} from "../../utils/groupUtils";

/**
 * The component display variations.
 * @type {Object}
 */
export const DisplayAroNameVariations = {
  USER: 'User',
  GROUP: 'Group',
};

class DisplayAroName extends React.PureComponent {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    if (!this.props.displayAs && !this.props.user && !this.props.group) {
      return <>{this.props.t("Unknown permission grantee")}</>;
    }

    const shouldDisplayAsUser = this.props.displayAs === DisplayAroNameVariations.USER || this.props.user;

    return (<>{shouldDisplayAsUser
      ? getUserFormattedName(this.props.user, this.props.t, {withUsername: this.props.withUsername})
      : getGroupFormattedName(this.props.group, this.props.t)
    }</>);
  }
}

DisplayAroName.defaultProps = {
  displayAs: null,
  withUsername: false,
};

DisplayAroName.propTypes = {
  user: PropTypes.object, // the user whose name has to be displayed
  group: PropTypes.object, // the group whose name has to be displayed
  displayAs: PropTypes.oneOf([
    DisplayAroNameVariations.USER,
    DisplayAroNameVariations.GROUP,
  ]), // Defines how the form should be displayed and behaves
  withUsername: PropTypes.bool, // should the user name be displayed with its username
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(DisplayAroName);
