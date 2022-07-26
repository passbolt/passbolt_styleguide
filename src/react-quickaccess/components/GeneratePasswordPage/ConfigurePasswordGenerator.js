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
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      configuration: JSON.parse(JSON.stringify(this.props.configuration))
    };
  }

  /**
   * Returns the current values of length option
   * @return {{default: number, min: number, max: number}}
   */
  get length() {
    const {default_options} = this.state.configuration;
    return {
      default: default_options.length,
      min: default_options.min_length,
      max: default_options.max_length,
    };
  }

  /**
   * Returns the current masks
   */
  get masks() {
    return this.state.configuration.masks;
  }

  /**
   * Returns true if the options exclude-look-alike-characters is true
   */
  get isExcludeLookAlikeCharacters() {
    return this.state.configuration.default_options.look_alike;
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
    const configuration = {...this.state.configuration};
    configuration.default_options.length = value;

    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Whenever a mask has been toggled on/off
   * @param maskName The name of a mask
   * @param event Dom Click event
   */
  handleMaskToggled(maskName, event) {
    // Avoid side effect
    event.preventDefault();
    const configuration = {...this.state.configuration};
    configuration.masks = configuration.masks.map(mask => {
      if (mask.name === maskName && !mask.required) {
        return {...mask, active: !mask.active};
      } else {
        return mask;
      }
    });
    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Whenever the exclude-look-alike-character option has been toggled on/off
   */
  handleExcludeLookAlikeCharactersToggled() {
    const configuration = {...this.state.configuration};
    configuration.default_options.look_alike = !configuration.default_options.look_alike;
    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      <>
        <div>
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
              onChange={this.handleLengthChanged}/>
            <input
              id="configure-password-generator-form-length"
              type="number"
              min={this.length.min}
              max={this.length.max}
              value={this.length.default}
              onChange={this.handleLengthChanged}/>
          </div>
        </div>

        <div className="select-button">
          <label htmlFor="configure-password-generator-form-masks">
            <Trans>Character Types</Trans>
          </label>
          <div className="button-group">
            {
              this.masks.map(mask => (
                <button
                  key={mask.name}
                  className={`button button-toggle ${(mask.active ? 'selected' : '')}`}
                  onClick={event => this.handleMaskToggled(mask.name, event)}>
                  {mask.label}
                </button>
              ))
            }
          </div>
        </div>

        <div>
          <div className="input checkbox">
            <input
              id="configure-password-generator-form-exclude-look-alike"
              type="checkbox"
              name="exclude-look-alike"
              checked={this.isExcludeLookAlikeCharacters}
              onChange={this.handleExcludeLookAlikeCharactersToggled}/>
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
  configuration: PropTypes.object, // The current generator options configuration
  onChanged: PropTypes.func, // Called whenever the generator configuration changed
};

export default withTranslation("common")(ConfigurePasswordGenerator);
