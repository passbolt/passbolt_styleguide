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
 * @since         3.2.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import Select from "../../Common/Select/Select";
import DisplayAdministrationInternationalisationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationInternationalisationActions/DisplayAdministrationInternationalisationActions";
import {withAdminInternationalization} from "../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext";

/**
 * This component allows to display the internationalisation for the administration
 */
class DisplayInternationalizationAdministration extends React.Component {
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
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationInternationalisationActions);
    this.props.adminInternationalizationContext.findLocale();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminInternationalizationContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    this.props.adminInternationalizationContext.setLocale(event.target.value);
  }
  /**
   * Get the supported locales
   * @returns {array}
   */
  get supportedLocales() {
    if (this.props.context.siteSettings.supportedLocales) {
      return this.props.context.siteSettings.supportedLocales.map(supportedLocale => ({value: supportedLocale.locale, label: supportedLocale.label}));
    }
    return [];
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const lang = this.props.adminInternationalizationContext.getLocale();

    return (
      <div className="row">
        <div className="internationalisation-settings col7 main-column">
          <h3><Trans>Internationalisation</Trans></h3>
          <form className="form">
            <div className="select-wrapper input">
              <label htmlFor="app-locale-input"><Trans>Language</Trans></label>
              <Select className="medium" id="locale-input" name="locale" items={this.supportedLocales} value={lang} onChange={this.handleInputChange}/>
              <p><Trans>The default language of the organisation.</Trans></p>
            </div>
          </form>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Want to contribute?</Trans></h3>
            <p><Trans>Your language is missing or you discovered an error in the translation, help us to improve passbolt.</Trans></p>
            <a className="button" href="https://help.passbolt.com/contribute/translation" target="_blank" rel="noopener noreferrer">
              <Icon name="heart-o"/>
              <span><Trans>Contribute</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayInternationalizationAdministration.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminInternationalizationContext: PropTypes.object, // The administration internationalization context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminInternationalization(withAdministrationWorkspace(withTranslation('common')(DisplayInternationalizationAdministration))));
