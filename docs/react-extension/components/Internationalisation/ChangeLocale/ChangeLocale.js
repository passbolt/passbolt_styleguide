/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Select from "../../Common/Select/Select";

/**
 * This component allows the user to change the locale
 */
class ChangeLocale extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.initLocale();
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleLocaleChange(prevProps.context.locale);
  }

  /**
   * Check if the locale has changed and update
   * @param previousLocale
   */
  async handleLocaleChange(previousLocale) {
    const hasLocaleChanged = this.props.context.locale !== previousLocale;
    if (hasLocaleChanged) {
      await this.setState({locale: this.props.context.locale});
    }
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      loading: true,
      locale: null,
      processing: false,
    };
  }

  /**
   * Returns true if actions can be performed
   */
  get areActionsAllowed() {
    return !this.state.processing;
  }

  /**
   * Bind  handlers
   */
  bindHandlers() {
    this.handleLocaleInputChange = this.handleLocaleInputChange.bind(this);
  }

  /**
   * Handle locale input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleLocaleInputChange(event) {
    const target = event.target;
    const locale = target.value;
    await this.updateLocale(locale);
  }

  /**
   * Update the locale.
   * @param {string} locale The locale identifier.
   */
  async updateLocale(locale) {
    await this.toggleProcessing();
    await this.props.context.onUpdateLocaleRequested(locale);
    await this.toggleProcessing();
  }

  /**
   * Get th locale
   */
  async initLocale() {
    await this.setState({locale: this.props.context.locale, loading: false});
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
   * If the component is loading
   * @returns {boolean}
   */
  isLoading() {
    return this.state.loading;
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
   */
  render() {
    return (
      <>
        {!this.isLoading() &&
        <div className="select-wrapper input">
          <Select id="user-locale-input" className="setup-extension" name="locale" value={this.state.locale}
            disabled={!this.areActionsAllowed} items={this.supportedLocales} onChange={this.handleLocaleInputChange}/>
        </div>
        }
      </>
    );
  }
}

ChangeLocale.propTypes = {
  context: PropTypes.any, // The application context
};

export default withAppContext(ChangeLocale);
