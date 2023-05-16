/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Tab from "../../Common/Tab/Tab";
import Tabs from "../../Common/Tab/Tabs";
import ImportOrganizationKey from "./ImportOrganizationKey";
import GenerateOrganizationKey from "./GenerateOrganizationKey";

/**
 * This component allows to display the create recover account for the administration
 */
class SelectAccountRecoveryOrganizationKey extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      processing: false, // component is processing or not
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleApplyChanges = this.handleApplyChanges.bind(this);
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Handle apply button click.
   */
  handleApplyChanges(public_key, private_key) {
    this.handleCloseClick();
    this.props.handleUpdateOrganizationKey(public_key, private_key);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={this.props.t("Organization Recovery Key")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="organization-recover-key-dialog">
        <Tabs activeTabName='Import'>
          <Tab
            key='Import'
            name='Import'
            type='Import'>
            <ImportOrganizationKey
              {...this.props}
              onClose={this.handleCloseClick}
              onUpdateOrganizationKey={this.handleApplyChanges} />
          </Tab>
          <Tab
            key='Generate'
            name='Generate'
            type='Generate'>
            <GenerateOrganizationKey
              {...this.props}
              onClose={this.handleCloseClick}
              onUpdateOrganizationKey={this.handleApplyChanges} />
          </Tab>
        </Tabs>
      </DialogWrapper>
    );
  }
}

SelectAccountRecoveryOrganizationKey.propTypes = {
  handleUpdateOrganizationKey: PropTypes.func,
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(SelectAccountRecoveryOrganizationKey);
