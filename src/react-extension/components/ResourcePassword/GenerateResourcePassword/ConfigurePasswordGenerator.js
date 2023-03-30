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
 * @since         3.3.0
 */
import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class ConfigurePasswordGenerator extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Returns the current values of length option
   * @return {{default: number, min: number, max: number}}
   */
  get length() {
    const {default_options} = this.props.configuration;
    return {
      default: default_options.length,
      min: default_options.min_length,
      max: default_options.max_length,
    };
  }

  /**
   * Returns the current masks
   * @returns {Array<object>}
   */
  get masks() {
    return this.props.configuration.masks;
  }

  /**
   * Returns true if the options exclude-look-alike-characters is true
   * @returns {Boolean}
   */
  get isExcludeLookAlikeCharacters() {
    return this.props.configuration.default_options.look_alike;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleLengthChanged = this.handleLengthChanged.bind(this);
    this.handleMaskToggled = this.handleMaskToggled.bind(this);
    this.handleExcludeLookAlikeCharactersToggled = this.handleExcludeLookAlikeCharactersToggled.bind(this);
  }

  /**
   * Whenever the length option value has been changed
   */
  handleLengthChanged(event) {
    const value = event.target.value;
    const configuration = {...this.props.configuration};
    configuration.default_options.length = value;
    this.props.onConfigurationChanged(configuration);
  }

  /**
   * Whenever a mask has been toggled on/off
   * @param maskName The name of a mask
   * @param event Dom Click event
   */
  handleMaskToggled(maskName, event) {
    // Avoid side effect
    event.preventDefault();
    const configuration = {...this.props.configuration};
    configuration.masks = configuration.masks.map(mask => {
      if (mask.name === maskName && !mask.required) {
        mask.active = !mask.active;
      }
      return mask;
    });
    this.props.onConfigurationChanged(configuration);
  }

  /**
   * Whenever the exclude-look-alike-character option has been toggled on/off
   */
  handleExcludeLookAlikeCharactersToggled() {
    const configuration = {...this.props.configuration};
    configuration.default_options.look_alike = !configuration.default_options.look_alike;
    this.props.onConfigurationChanged(configuration);
  }

  /**
   * Render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      <>
        <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
          <label htmlFor="configure-password-generator-form-length">
            <Trans>Length</Trans>
          </label>
          <div className="slider">
            <input
              name="length"
              min={this.length.min}
              max={this.length.max}
              value={this.length.default}
              step="1"
              type="range"
              onChange={this.handleLengthChanged}
              disabled={this.props.disabled}/>
            <input
              id="configure-password-generator-form-length"
              type="number"
              min={this.length.min}
              max={this.length.max}
              value={this.length.default}
              onChange={this.handleLengthChanged}
              disabled={this.props.disabled}/>
          </div>
        </div>

        <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
          <label htmlFor="configure-password-generator-form-masks">
            <Trans>Character Types</Trans>
          </label>
          <div className="button-group button-group--nowrap">
            {
              this.masks.map(mask => (
                <button
                  key={mask.name}
                  type="button"
                  className={`button button-toggle ${(mask.active || mask.required ? 'selected' : '')}`}
                  onClick={event => this.handleMaskToggled(mask.name, event)} disabled={this.props.disabled}>
                  {mask.label}
                </button>
              ))
            }
          </div>
        </div>

        <div className="input checkbox">
          <input
            id="configure-password-generator-form-exclude-look-alike"
            type="checkbox"
            name="exclude-look-alike"
            checked={this.isExcludeLookAlikeCharacters}
            onChange={this.handleExcludeLookAlikeCharactersToggled}
            disabled={this.props.disabled}/>
          <label htmlFor="configure-password-generator-form-exclude-look-alike">
            <Trans>Exclude look-alike characters</Trans>
          </label>
        </div>

      </>
    );
  }
}

ConfigurePasswordGenerator.propTypes = {
  configuration: PropTypes.object, // The current generator options configuration
  onConfigurationChanged: PropTypes.func, // Called whenever the generator configuration changed
  disabled: PropTypes.bool, // The disabled attribute
};

export default withTranslation("common")(ConfigurePasswordGenerator);
