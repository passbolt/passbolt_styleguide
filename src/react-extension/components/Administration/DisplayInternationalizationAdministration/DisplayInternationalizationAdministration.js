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
import {withActionFeedback} from "../../../../react-extension/contexts/ActionFeedbackContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import Select from "../../Common/Select/Select";

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
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      loading: true, // component is loading or not
      processing: false, // component is processing or not

      locale: "" // The default app locale
    };
  }

  async componentDidMount() {
    this.setState({locale: this.props.context.siteSettings.locale});
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleMustSave(prevProps.administrationWorkspaceContext.must.save);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle the must save change
   * @param previousMustSaveSettings Previous must save settings
   */
  async handleMustSave(previousMustSaveSettings) {
    const hasMustSaveChanged = this.props.administrationWorkspaceContext.must.save !== previousMustSaveSettings;
    if (hasMustSaveChanged && this.props.administrationWorkspaceContext.must.save) {
      await this.handleFormSubmit();
      this.props.administrationWorkspaceContext.onResetActionsSettings();
    }
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
    this.handleEnabledSaveButton();
  }

  /**
   * Handle enabled the save button
   */
  handleEnabledSaveButton() {
    if (!this.props.administrationWorkspaceContext.can.save) {
      this.props.administrationWorkspaceContext.onSaveEnabled();
    }
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      try {
        await this.props.administrationWorkspaceContext.onSaveLocaleRequested(this.state.locale);
        await this.handleSaveSuccess();
      } catch (error) {
        await this.handleSaveError(error);
      }
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    this.props.context.onRefreshLocaleRequested(this.state.locale);
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The internationalization settings were updated."));
    this.setState({processing: false});
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  async handleError(error) {
    await this.props.actionFeedbackContext.displayError(error.message);
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
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
    return (
      <div className="row">
        <div className="internationalisation-settings col7 main-column">
          <h3><Trans>Internationalisation</Trans></h3>
          <form className="form">
            <div className="select-wrapper input">
              <label htmlFor="app-locale-input"><Trans>Language</Trans></label>
              <Select className="medium" id="locale-input" name="locale" items={this.supportedLocales} value={this.state.locale} onChange={this.handleInputChange}/>
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
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withAdministrationWorkspace(withTranslation('common')(DisplayInternationalizationAdministration))));
