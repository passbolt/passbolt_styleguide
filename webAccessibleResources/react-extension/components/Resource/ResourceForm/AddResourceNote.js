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

class AddResourceNote extends Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
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
          <h2><Trans>Note</Trans></h2>
        </div>
        <div className="content">
          <div className="note-fields">
            <div className="input textarea">
              <label htmlFor="resource-note">
                <Trans>Content</Trans>
              </label>
              <textarea id="resource-note" name="secret.description" maxLength="10000" placeholder={this.translate("Add a note")} onChange={this.handleInputChange} value={this.props.resource?.secret?.description}>
              </textarea>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AddResourceNote.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(AddResourceNote);

