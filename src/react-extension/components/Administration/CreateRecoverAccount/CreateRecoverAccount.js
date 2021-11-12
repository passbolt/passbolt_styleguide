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
 * @since         3.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Tab from "../../Common/Tab/Tab";
import Tabs from "../../Common/Tab/Tabs";
import ImportOrganisationKey from "./ImportOrganisationKey";
import GenerateOrganisationKey from "./GenerateOrganisationKey";

/**
 * This component allows to display the create recover account for the administration
 */
class CreateRecoverAccount extends React.Component {
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
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={this.translate("Organisation Recovery Key")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="organisation-recover-key-dialog">
        <Tabs activeTabName='Import'>
          <Tab
            key='Import'
            name='Import'
            type='Import'>
            <ImportOrganisationKey
              onClose={this.handleCloseClick}/>
          </Tab>
          <Tab
            key='Generate'
            name='Generate'
            type='Generate'>
            <GenerateOrganisationKey
              onClose={this.handleCloseClick}/>
          </Tab>
        </Tabs>
      </DialogWrapper>
    );
  }
}

CreateRecoverAccount.propTypes = {
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(CreateRecoverAccount);
