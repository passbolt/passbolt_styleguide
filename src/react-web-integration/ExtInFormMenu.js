/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import AppContext from "../shared/context/AppContext/AppContext";
import DisplayInFormMenu from "./components/DisplayInFormMenu/DisplayInFormMenu";
import TranslationProvider from "../shared/components/Internationalisation/TranslationProvider";
import PasswordPoliciesContext from "../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import ResourceTypesLocalStorageContextProvider from "../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import MetadataTypesSettingsLocalStorageContextProvider from "../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import AccountEntity from "../shared/models/entity/account/accountEntity";

/**
 * Entry point of the in-form menu
 */
class ExtInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initLocale();
    this.getAccount();
  }

  /**
   * Returns the default stare
   */
  get defaultState() {
    return {
      locale: "en-UK",
      port: this.props.port,
      storage: this.props.storage,
      account: null,
    };
  }

  /**
   * Init the locale
   * @returns {Promise<void>}
   */
  async initLocale() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Get the account
   * @returns {Promise<void>}
   */
  async getAccount() {
    const accountDto = await this.props.port.request("passbolt.account.get");
    const account = new AccountEntity(accountDto);
    this.setState({account});
  }

  /**
   * Render the component
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json" locale={this.state.locale}>
          <ResourceTypesLocalStorageContextProvider>
            <MetadataTypesSettingsLocalStorageContextProvider>
              <PasswordPoliciesContext>
                <div className="web-integration">
                  <DisplayInFormMenu/>
                </div>
              </PasswordPoliciesContext>
            </MetadataTypesSettingsLocalStorageContextProvider>
          </ResourceTypesLocalStorageContextProvider>
        </TranslationProvider>
      </AppContext.Provider>
    );
  }
}

ExtInForm.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object
};

export default ExtInForm;
