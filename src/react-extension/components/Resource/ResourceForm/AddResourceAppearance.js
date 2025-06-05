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
 * @since         5.2.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {getContrastedColor} from "../../../../shared/utils/color";
import {KEEPASS_ICON_LIST} from "./keepassIconList.data";
import {ICON_TYPE_KEEPASS_ICON_SET, COLOR_TRANSPARENT} from "../../../../shared/models/entity/resource/metadata/IconEntity";

const COLOR_LIST = [
  "#DFDFDF",
  "#888888",
  "#575757",
  "#9C6A55",
  "#E64626",
  "#F07438",
  "#F5AA48",
  "#FFE144",
  "#B1D86A",
  "#3D9B5E",
  "#A0DAE3",
  "#4A75DF",
  "#AC8CFB",
  "#E88BA8",
];

class AddResourceAppearance extends Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSelectColor = this.handleSelectColor.bind(this);
    this.handleSelectIcon = this.handleSelectIcon.bind(this);
    this.switchToDefaultColor = this.switchToDefaultColor.bind(this);
    this.switchToDefaultIcon = this.switchToDefaultIcon.bind(this);
  }

  /**
   * Handle click default color toggle
   */
  switchToDefaultColor() {
    this.handleSelectColor(null);
  }

  /**
   * Handle click default icon toggle
   */
  switchToDefaultIcon() {
    this.handleSelectIcon(null);
  }

  /**
   * Handle click on color picker item
   * @param {string} color
   */
  handleSelectColor(color) {
    const event = {
      target: {
        name: "metadata.icon.background_color",
        value: color,
      },
    };
    this.props.onChange?.(event);
  }

  /**
   * Handle click on icon picker item
   * @param {number} index
   */
  handleSelectIcon(index) {
    this.props.onChange?.({
      target: {
        name: "metadata.icon.value",
        value: index,
      },
    });
    this.props.onChange?.({
      target: {
        name: "metadata.icon.type",
        value: ICON_TYPE_KEEPASS_ICON_SET,
      },
    });
  }

  /**
   * Returns true if the given color is selected.
   * @param {string} color
   * @returns {boolean}
   */
  isColorSelected(color) {
    return color.toLowerCase() === this.props.resource?.metadata?.icon?.background_color?.toLowerCase();
  }

  /**
   * Returns true if the given icon is selected.
   * @param {number} index
   * @returns {boolean}
   */
  isIconSelected(index) {
    return index === this.props.resource?.metadata?.icon?.value;
  }

  /**
   * Returns true if the default color is selected.
   * @returns {boolean}
   */
  isDefaultColorSelected() {
    return !this.props.resource?.metadata?.icon?.background_color;
  }

  /**
   * Returns true if the default icon is selected.
   * @returns {boolean}
   */
  isDefaultIconSelected() {
    return typeof(this.props.resource?.metadata?.icon?.value) !== "number";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="appearance-workspace">
        <div className="appearance-form">
          <div className="title">
            <h2><Trans>Appearance</Trans></h2>
          </div>
          <div className="content">
            <div className="color-section">
              <h3><Trans>Color</Trans></h3>
              <span className="input toggle-switch form-element">
                <label htmlFor="default-color">
                  <input
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                    name="defaultColor"
                    onChange={this.switchToDefaultColor}
                    checked={this.isDefaultColorSelected()}
                    disabled={Boolean(this.props.disabled)}
                    id="default-color"/>
                  <Trans>Default color</Trans></label>
              </span>
              <div className="color-picker">
                {COLOR_LIST.map(color =>
                  <span
                    key={color}
                    className="color-picker-item"
                    style={{backgroundColor: color}}
                    onClick={() => this.handleSelectColor(color)}
                  >
                    {this.isColorSelected(color) &&
                      <svg viewBox="0 0 25 24" fill="none" className="checked">
                        <path d="M18.5967 7.875L10.3467 16.125L6.59668 12.375" stroke={getContrastedColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  </span>
                )}
                <span
                  key={COLOR_TRANSPARENT}
                  className="color-picker-item transparent"
                  onClick={() => this.handleSelectColor(COLOR_TRANSPARENT)}
                >
                  {this.isColorSelected(COLOR_TRANSPARENT) &&
                    <svg viewBox="0 0 25 24" fill="none" className="checked">
                      <path d="M18.5967 7.875L10.3467 16.125L6.59668 12.375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <g clipPath="url(#strike-clip)">
                      <path d="M0 0L36 36" stroke="#D40101" strokeWidth="2"/>
                    </g>
                    <defs>
                      <clipPath id="strike-clip">
                        <rect x="0" width="36" height="36" rx="18"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            </div>
            <div className="icons-section">
              <h3><Trans>Icons</Trans></h3>
              <span className="input toggle-switch form-element">
                <label htmlFor="default-icon">
                  <input
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                    name="defaultIcon"
                    onChange={this.switchToDefaultIcon}
                    checked={this.isDefaultIconSelected()}
                    disabled={Boolean(this.props.disabled)}
                    id="default-icon"/>
                  <Trans>Default icon</Trans></label>
              </span>
              <div className="icon-picker">
                {KEEPASS_ICON_LIST.map((icon, index) =>
                  <span
                    key={index}
                    className={`icon-picker-item ${this.isIconSelected(index) ? "selected" : ""}`}
                    onClick={() => this.handleSelectIcon(index)}
                  >
                    {icon}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddResourceAppearance.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  disabled: PropTypes.bool, // The disabled property
  t: PropTypes.func, // The translation function
};

export default  withResourceTypesLocalStorage(withTranslation('common')(AddResourceAppearance));

