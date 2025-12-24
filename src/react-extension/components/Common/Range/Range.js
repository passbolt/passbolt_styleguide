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
 * @since         v4.3.0
 */

import React from "react";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * Display of the Range component
 */
class Range extends React.PureComponent {
  /**
   * Range constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindHandlers();
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleRangeOptionClick = this.handleRangeOptionClick.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  /**
   * Handles click on range options
   * @param {number} value
   */
  handleRangeOptionClick(value) {
    if (!this.props.disabled) {
      this.props.onChange(this.props.id, value);
    }
  }

  /**
   * Handles input range change event
   * @param {ReactEvent} e
   */
  handleRangeChange(e) {
    const target = e.target;
    this.props.onChange(target.name, this.values[target.value].value);
  }

  /**
   * Returns the computed style to apply to an option based on its index
   * @param {number} index the index number in the list
   * @param {number} valueCount the size of the list
   * @returns {Object}
   */
  getComputedStyleForEntropyStep(index, valueCount) {
    const percentValue = index * (100 / (valueCount - 1));
    return {
      left: `${percentValue}%`,
    };
  }

  /**
   * Returns the index in the values list of the given value
   * @param {number} value
   * @returns {number}
   */
  getValueIndex(value) {
    return this.values.findIndex((v) => v.value === value);
  }

  /**
   * Returns the list of available values
   * @returns {Array<{label: string, value: number}>}
   */
  get values() {
    return [
      { label: "50 bits", value: 50 },
      { label: "64 bits", value: 64 },
      { label: "80 bits", value: 80 },
      { label: "96 bits", value: 96 },
      { label: "128 bits", value: 128 },
      { label: "160 bits", value: 160 },
      { label: "192 bits", value: 192 },
      { label: "224 bits", value: 224 },
    ];
  }

  render() {
    const values = this.values;
    const valueCount = values.length;
    const { id, value } = this.props;

    return (
      <div className="range-wrapper">
        <div className="range-labels">
          <label key="min">
            <Trans>Weak</Trans>
          </label>
          <label key="max">
            <Trans>Secure</Trans>
          </label>
        </div>
        <div className="range-input-wrapper">
          <input
            type="range"
            className="range-input"
            id={id}
            name={id}
            min={0}
            max={values.length - 1}
            value={this.getValueIndex(value)}
            list={`${this.props.id}-values`}
            onChange={this.handleRangeChange}
            required={true}
            disabled={this.props.disabled}
          />
          <ul className="range-options">
            {values.map((v, index) => (
              <li
                key={`li-${index}`}
                onClick={() => this.handleRangeOptionClick(v.value)}
                style={this.getComputedStyleForEntropyStep(index, valueCount)}
                className={`range-option ${value === v.value ? "range-option--active" : ""}`}
                disabled={this.props.disabled}
              >
                {v.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Range.propTypes = {
  value: PropTypes.number.isRequired, // the current value of the component
  id: PropTypes.string.isRequired, // The Range field id
  onChange: PropTypes.func, // the onChange value callback
  disabled: PropTypes.bool, // is the component disabled
};

export default withTranslation("common")(Range);
