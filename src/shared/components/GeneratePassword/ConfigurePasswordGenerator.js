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
import { Trans, withTranslation } from "react-i18next";
import { MASKS } from "../../lib/SecretGenerator/SecretGeneratorComplexity";

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
    const configuration = { ...this.props.configuration };
    configuration.length = value;
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
    const configuration = { ...this.props.configuration };
    configuration[maskName] = !configuration[maskName];
    this.props.onConfigurationChanged(configuration);
  }

  /**
   * Whenever the exclude-look-alike-character option has been toggled on/off
   */
  handleExcludeLookAlikeCharactersToggled() {
    const configuration = { ...this.props.configuration };
    configuration.exclude_look_alike_chars = !configuration.exclude_look_alike_chars;
    this.props.onConfigurationChanged(configuration);
  }

  /**
   * Render the component
   * @return {JSX.Element}
   */
  render() {
    const config = this.props.configuration;
    const maskNames = Object.entries(MASKS);
    return (
      <>
        <div className={`password-generator-length input text ${this.props.disabled ? "disabled" : ""}`}>
          <label htmlFor="configure-password-generator-form-length">
            <Trans>Length</Trans>
          </label>
          <div className="slider">
            <input
              name="length"
              min={config.min_length}
              max={config.max_length}
              value={config.length}
              step="1"
              type="range"
              onChange={this.handleLengthChanged}
              disabled={this.props.disabled}
            />
            <input
              id="configure-password-generator-form-length"
              type="number"
              min={config.min_length}
              max={config.max_length}
              value={config.length}
              onChange={this.handleLengthChanged}
              disabled={this.props.disabled}
            />
          </div>
        </div>

        <div className={`input text ${this.props.disabled ? "disabled" : ""} select-button`}>
          <label htmlFor="configure-password-generator-form-masks">
            <Trans>Character Types</Trans>
          </label>
          <div className="button-group button-group--nowrap">
            {maskNames.map(([maskName]) => (
              <button
                key={maskName}
                type="button"
                className={`button button-toggle ${config[maskName] ? "selected" : ""}`}
                onClick={(event) => this.handleMaskToggled(maskName, event)}
                disabled={this.props.disabled}
              >
                {MASKS[maskName].label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="input checkbox">
            <input
              id="configure-password-generator-form-exclude-look-alike"
              type="checkbox"
              name="exclude-look-alike"
              checked={config.exclude_look_alike_chars}
              onChange={this.handleExcludeLookAlikeCharactersToggled}
              disabled={this.props.disabled}
            />
            <label htmlFor="configure-password-generator-form-exclude-look-alike">
              <Trans>Exclude look-alike characters</Trans>
            </label>
          </div>
        </div>
      </>
    );
  }
}

ConfigurePasswordGenerator.propTypes = {
  configuration: PropTypes.object.isRequired, // The current generator options configuration
  onConfigurationChanged: PropTypes.func.isRequired, // Called whenever the generator configuration changed
  disabled: PropTypes.bool, // The disabled attribute
};

export default withTranslation("common")(ConfigurePasswordGenerator);
