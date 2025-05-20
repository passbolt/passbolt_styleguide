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
 * @since         5.2.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";

class AddResourceAppearance extends Component {
  render() {
    return (
      <>
        <div className="title">
          <h2><Trans>Appearance</Trans></h2>
        </div>
      </>
    );
  }
}

AddResourceAppearance.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  disabled: PropTypes.bool, // The disabled property
  t: PropTypes.func, // The translation function
};

export default  withResourceTypesLocalStorage(withTranslation('common')(AddResourceAppearance));

