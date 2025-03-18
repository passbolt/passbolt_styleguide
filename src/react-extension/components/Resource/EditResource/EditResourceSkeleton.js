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
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";

class EditResourceSkeleton extends Component {
  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <>
        <div className="left-sidebar">
          <div className="main-action-wrapper">
          </div>
          <div className="sidebar-content-sections">
          </div>
        </div>
        <form className="grid-and-footer" onSubmit={this.handleFormSubmit} noValidate>
          <div className="grid">
            <div className="resource-info skeleton">
              <div className="resource-icon">
              </div>
              <div className="information">
                <div className="input text">
                </div>
                <div className="breadcrumbs">
                  <div className="folder-name">
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-workspace skeleton">
            </div>
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={true}/>
            <FormSubmitButton value={this.props.t("Save")} disabled={true}/>
          </div>
        </form>
      </>
    );
  }
}

EditResourceSkeleton.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(EditResourceSkeleton);
