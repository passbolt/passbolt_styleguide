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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class AddResourceDescription extends Component {
  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <>
        <div className="title">
          <h2><Trans>Description</Trans></h2>
        </div>
        <div className="content">
          <div className="description-fields">
            <div className="input textarea">
              <label htmlFor="resource-description">
                <Trans>Content</Trans>
              </label>
              <textarea id="resource-description" name="description" maxLength="10000" placeholder={this.translate("Add a description")}>
              </textarea>
            </div>
          </div>
        </div>

      </>
    );
  }
}

AddResourceDescription.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(AddResourceDescription);

