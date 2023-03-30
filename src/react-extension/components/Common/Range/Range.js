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
 * @since         hackaton
 */

import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from "prop-types";


/**
 * Display of the Range component
 */
class Range extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.bindCallback();
  }
  /*
   * Component did mount
   */
  componentDidMount() { }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = parseInt(event.target.value, 10);
    this.setState({ value });
  }

  render() {
    const { id, title, values, labels, required } = this.props;
    const { value } = this.state;

    const RangeLabels = [
      <label key="min">
        {labels && labels.start ? labels.start : values[0].value}
      </label>,
      <label key="max">
        {labels && labels.end ? labels.end : values[values.length - 1].value}
      </label>
    ];

    return (
      <div className="range-wrapper">
        {title && (
          <h2 className={[
            "range-title",
            required && "range-title--required"
          ].join(' ')}>{title}
          </h2>
        )}
        <div className="range-labels">
          {RangeLabels}
        </div>
        <div className="range-input-wrapper">
          <input
            type="range"
            className="range-input"
            id={id}
            name={id}
            min={0}
            max={values.length - 1}
            value={value}
            list="values"
            onChange={this.handleChange}
            required={required}
          />

          <datalist id="values" className="range-options">
            {values.map((v, index) => (
              <option
                key={`option-${index}`}
                value={index}
                label={v.label}
                onClick={this.handleChange}
                style={{ left: `${index * (100 / (values.length - 1))}%` }}
                className={[
                  "range-option",
                  value === index && "range-option--active"
                ].filter(Boolean).join(' ')}
              />
            ))}
          </datalist>
        </div>
      </div>
    );
  }
}


Range.propTypes = {
  id: PropTypes.string, // The Range field id
  title: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired, // The item list of the select field  onChange: PropTypes.func, // The on change event callback
  labels: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  required: PropTypes.bool,
};

export default withTranslation("common")(Range);
