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
 * @since         3.3.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";

class ConfigurePassphraseGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.initEventHandlers();
  }

  getDefaultState(props) {
    return {
      configuration: JSON.parse(JSON.stringify(props.configuration)),
    };
  }

  initEventHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleWordCountChange = this.handleWordCountChange.bind(this);
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const configuration = {...this.state.configuration};
    configuration.default_options[name] = value;

    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Handle form word count input change.
   * @params {ReactEvent} The react event.
   */
  handleWordCountChange(event) {
    const configuration = {...this.state.configuration};
    configuration.default_options.word_count = event.target.value;

    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Returns the current number of words option
   * @return {{default: number, min: number, max: number}}
   */
  get numberOfWords() {
    const {default_options} = this.state.configuration;
    return {
      default: default_options.word_count,
      min: default_options.min_word,
      max: default_options.max_word,
    };
  }

  /**
   * Returns the current separator option
   * @returns {string}
   */
  get separator() {
    return this.state.configuration.default_options.separator;
  }

  /**
   * Returns the current word case option
   * @returns {string}
   */
  get wordCase() {
    return this.state.configuration.default_options.word_case;
  }

  /**
   * Get word case list
   * @returns {[{label: string, value: string},{label: string, value: string},{label: string, value: string}]}
   */
  get wordCaseList() {
    return [
      {value: "lowercase", label: this.translate("Lower case")},
      {value: "uppercase", label: this.translate("Upper case")},
      {value: "camelcase", label: this.translate("Camel case")}
    ];
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
      <>
        <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
          <label htmlFor="configure-passphrase-generator-form-word-count"><Trans>Number of words</Trans></label>
          <div className="slider">
            <input
              name="word_count"
              min={this.numberOfWords.min}
              max={this.numberOfWords.max}
              value={this.numberOfWords.default}
              type="range"
              onChange={this.handleInputChange}
              disabled={this.props.disabled}/>
            <input
              type="number"
              id="configure-passphrase-generator-form-word-count"
              name="word_count"
              min={this.numberOfWords.min} max={this.numberOfWords.max}
              value={this.numberOfWords.default}
              onChange={this.handleWordCountChange}
              disabled={this.props.disabled}/>
          </div>
        </div>
        <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
          <label htmlFor="configure-passphrase-generator-form-words-separator"><Trans>Words separator</Trans></label>
          <input type="text" id="configure-passphrase-generator-form-words-separator" name="separator" value={this.separator} onChange={this.handleInputChange}
            placeholder={this.translate("Type one or more characters")} disabled={this.props.disabled}/>
        </div>
        <div className={`select-wrapper input ${this.props.disabled ? 'disabled' : ''}`}>
          <label htmlFor="configure-passphrase-generator-form-words-case"><Trans>Words case</Trans></label>
          <Select id="configure-passphrase-generator-form-words-case" name="word_case" items={this.wordCaseList} value={this.wordCase} onChange={this.handleInputChange} disabled={this.props.disabled}/>
        </div>
      </>
    );
  }
}

ConfigurePassphraseGenerator.propTypes = {
  configuration: PropTypes.object, // The default generator configuration
  onChanged: PropTypes.func, // Called whenever the generator configuration changed
  disabled: PropTypes.bool, // The disabled attribute
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(ConfigurePassphraseGenerator);
