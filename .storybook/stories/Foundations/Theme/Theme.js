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
 * @since         3.7.0
 */
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";

export const DESCRIPTIONS = {
  "default-background": "The default background color",
  "default-border": "The default border color",
  "default-text-color": "The default text color",
  "text-info-color": "The text info color",
  "text-light-color": "The text with a lighter color from the default",
  "text-lighter-color": "The text with a lighter color from the light color",
  "text-lightest-color": "The text with the lightest color",
  "text-focus-color": "The text focus color",
  "text-warning-color": "The text warning color",
  "text-error-color": "The text error color",
  "text-secret-hover-color": "The text secret hover color",
  "text-error-api-color": "The text error api color",
  "text-notification-color": "The text notification color",
  "header-main-menu-background": "The header main menu background color to navigate in different workspace",
  "header-main-menu-text-color": "The header main menu text color",
  "header-main-menu-hover-text-color": "The header main menu text hover color",
  "header-workspace-background": "The header workspace background color with the logo, the search bar and user avatar",
  "footer-background": "The footer background color",
  "authentication-background": "The authentication background (login, setup, recover)",
  "authentication-title-text-color": "The authentication title text color",
  "attention-required-border": "The attention required border color",
  "quickaccess-header-background": "The quickaccess header background color",
  "quickaccess-footer-background": "The quickaccess footer background color",
  "quickaccess-back-link-background": "The quickaccess back linkck background color",
  "quickaccess-list-title-background": "The quickaccess list title background color",
  "quickaccess-list-title-hover-background": "The quickaccess list title hover background color",
  "quickaccess-list-title-active-background": "The quickaccess list title active background color",
  "quickaccess-border": "The quickaccess border color",
  "inform-menu-hover-background": "The inform menu hover background color",
  "inform-menu-active-background": "The inform menu active background color",
  "inform-menu-border": "The inform menu border color",
  "dialog-background": "The dialog background",
  "dialog-overlay-background": "The dialog overlay background",
  "dialog-border": "The dialog border color",
  "dialog-box-shadow-color": "The dialog box shadow color",
  "dialog-divider-border": "The dialog divider border color",
  "dialog-permission-updated-background": "The dialog permission updated background color",
  "dialog-permission-border": "The dialog permission border",
  "dialog-folder-move-selected-background": "The dialog folder move selected background",
  "dialog-folder-move-border": "The dialog folder move border",
  "dialog-folder-move-selected-border": "The dialog folder move selected border",
  "dialog-delete-conflict-title-background": "The dialog delete conflict title background color",
  "button-background": "The button background color",
  "button-active-background": "The button active background color",
  "button-border": "The button border color",
  "button-focus-border": "The button focus border color",
  "button-icon-background": "The button icon background color",
  "button-icon-active-background": "The button icon background color",
  "button-icon-border": "The button icon border color",
  "button-primary-background": "The button primary background color",
  "button-primary-border": "The button primary border color",
  "button-primary-color": "The button primary text color",
  "button-warning-background": "The button warning background color",
  "button-warning-border": "The button warning border color",
  "button-warning-color": "The button warning text color",
  "button-transparent-background": "The button transparent background color",
  "button-transparent-border": "The button transparent border color",
  "link-highlight-background": "The link highlight background color",
  "link-border": "The link border color",
  "link-hover-border": "The link hover border color",
  "tooltip-background": "The tooltip background color",
  "tooltip-text-color": "The tooltip text color",
  "input-background": "The input background color",
  "input-disabled-background": "The input disabled background color",
  "input-infield-background": "The input in field background color",
  "input-border": "The input border color",
  "input-infield-border": "The input in field border color",
  "input-focus-border": "The input focus border color",
  "input-checkbox-background": "The input checkbox background color",
  "input-checkbox-disabled-background": "The input checkbox disabled background color",
  "input-checkbox-disabled-image-background": "The input checkbox disabled image background color",
  "input-checkbox-border": "The input checkbox border color",
  "input-checkbox-disabled-border": "The input checkbox disabled border color",
  "input-checkbox-focus-border": "The input checkbox focus border color",
  "input-radio-background": "The input radio background color",
  "input-radio-dot-background": "The input radio dot background color",
  "input-radio-disabled-background": "The input radio disabled background color",
  "input-radio-dot-disabled-background": "The input radio dot disabled background color",
  "input-radio-border": "The input radio border color",
  "input-radio-disabled-border": "The input radio disabled border color",
  "input-radio-focus-border": "The input radio focus border color",
  "input-radio-list-background": "The input radio list background color",
  "input-radio-list-border": "The input radio list border color",
  "input-radio-list-hover-border": "The input radio list hover border color",
  "input-radio-list-focus-border": "The input radio list focus border color",
  "input-toggle-background": "The input toggle background color",
  "input-toggle-focus-background": "The input toggle focus background color",
  "input-toggle-dot-background": "The input toggle dot background color",
  "input-toggle-checked-background": "The input toggle checked background color",
  "input-toggle-focus-border": "The input toggle focus border color",
  "select-background": "The select background color",
  "select-setup-extension-background": "The select setup extension background color",
  "select-hover-background": "The select hover background color",
  "select-focus-background": "The select focus background color",
  "select-focus-text-color": "The select focus text color",
  "select-border": "The select border color",
  "select-focus-border": "The select focus border color",
  "input-range-background": "The input range background color",
  "input-range-dot-background": "The input range dot background color",
  "input-range-dot-border": "The input range dot border color",
  "complexity-text-color": "The complexity text color",
  "complexity-bar-default-background": "The complexity bar default background color",
  "complexity-bar-gradient": "The complexity bar gradient background color",
  "hint-success-color": "The hint success color",
  "hint-warning-color": "The hint warning color",
  "hint-error-color": "The hint error color",
  "drag-background": "The drag item background color",
  "drag-number-background": "The drag number of item background color",
  "drag-text-color": "The drag item text color",
  "announcement-background": "The announcement background color",
  "announcement-text-color": "The announcement text color",
  "chips-text-color": "The chips text color",
  "chips-beta-background": "The chips beta background color",
  "chips-new-background": "The chips new background color",
  "autocomplete-background": "The autocomplete background color",
  "autocomplete-hover-background": "The autocomplete hover background color",
  "autocomplete-selected-background": "The autocomplete selected background color",
  "autocomplete-border": "The autocomplete border color",
  "progress-bar-default-background": "The progress bar default background color",
  "progress-bar-background": "The progress bar background color",
  "workspace-left-background": "The workspace left background color",
  "workspace-middle-background": "The workspace middle background color",
  "workspace-title-border": "The workspace title border color",
  "workspace-left-menu-hover-background": "The workspace left menu hover background color",
  "workspace-left-menu-focus-border": "The workspace left menu focus border color",
  "workspace-left-menu-focus-background": "The workspace left menu focus background color",
  "workspace-left-menu-focus-text-color": "The workspace left menu focus text color",
  "dropdown-background": "The dropdown background color",
  "dropdown-profile-background": "The dropdown profile background color",
  "dropdown-focus-background": "The dropdown focus background color",
  "dropdown-focus-text-color": "The dropdown focus text color",
  "dropdown-item-hover-background": "The dropdown item hover background color",
  "tableview-background": "The tableview background color",
  "tableview-even-background": "The tableview even background color",
  "tableview-hover-background": "The tableview hover item background color",
  "tableview-selected-background": "The tableview selected item background color",
  "tableview-header-background": "The tableview header background color",
  "tableview-shadow-color": "The tableview shadow color",
  "breadcrumb-background": "The breadcrumb background color",
  "info-panel-background": "The information panel background color",
  "info-panel-border": "The information panel border color",
  "info-panel-header-icon-background": "The information panel header icon fill color",
  "info-panel-header-icon-color": "The information panel header icon stroke color",
  "info-panel-header-subtitle-text-color": "The information panel header subtitle text color",
  "info-panel-section-header-background": "The information panel section header background color",
  "info-panel-section-content-background": "The information panel section content background color",
  "info-panel-section-notice-background": "The information panel section notice background color",
  "info-panel-section-border": "The information panel section border color",
  "comment-background": "The comment background",
  "tag-text-color": "The tag text color",
  "tag-border": "The tag border color",
  "tag-background": "The tag background color",
  "tag-hover-text-color": "The tag hover text color",
  "tag-hover-border": "The tag hover border color",
  "tag-hover-background": "The tag hover background color",
  "tag-editor-focus-border": "The tag editor focus border",
  "notice-background": "The notice background color",
  "table-background": "The table background color",
  "table-warning-background": "The table warning background color",
  "table-error-background": "The table error background color",
  "table-border": "The table border color",
  "table-row-even-background": "The table row even background color",
  "tab-selected-background": "The tab selected background color",
  "tab-unselected-background": "The tab unselected background color",
  "tab-border": "The tab border color",
  "mfa-background": "The mfa background color",
  "mfa-border": "The mfa border color",
  "mfa-provider-border": "The mfa provider border",
  "mfa-hint-trusted-device-color": "The mfa hint trusted device color",
  "feedback-card-border": "The feedback card border color",
  "account-recovery-card-background": "The account recovery card background color",
  "usercard-created-background": "The user card created background color",
  "usercard-updated-background": "The user card updated background color",
  "usercard-removed-background": "The user card removed background color",
  "message-error-text-color": "The message error text color",
  "message-error-background": "The message error background color",
  "message-success-text-color": "The message success text color",
  "message-success-background": "The message success background color",
  "message-notice-text-color": "The message notice text color",
  "message-notice-background": "The message notice background color",
  "message-warning-text-color": "The message warning text color",
  "message-warning-background": "The message warning background color",
  "message-link-border": "The message link border",
  "icon-color": "The icon stroke color",
  "icon-background-color": "The icon fill color",
  "icon-primary-color": "The icon primary stroke color",
  "icon-primary-background-color": "The icon primary fill color",
  "icon-warning-color": "The icon warning stroke color",
  "icon-warning-background-color": "The icon warning fill color",
  "icon-favorite-color": "The icon favorite stroke color",
  "icon-unfavorite-color": "The icon favorite fill color",
  "icon-exclamation-required-color": "The icon exclamation required background color",
  "icon-exclamation-default-color": "The icon exclamation required default background color",
  "icon-exclamation-color": "The icon exclamation color",
  "icon-spinner-color": "The icon spinner color",
  "icon-spinner-background": "The icon spinner background color",
  "icon-spinner-primary-color": "The icon spinner primary color",
  "icon-spinner-primary-background": "The icon spinner primary background color",
  "icon-spinner-warning-color": "The icon spinner warning color",
  "icon-spinner-warning-background": "The icon spinner warning background color",
  "icon-failed-color": "The icon failed stroke color",
  "icon-success-color": "The icon success stroke color",
  "shadow-focus-color": "The box shadow focus color",
  "shadow-drag-color": "The box shadow drag item color",
};

class  Theme extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.currentCategory = ""; // The current category of the colors
  }

  /**
   * Returns the default set of colors text
   */
  textColor(color) {
    const rgb = this.getColorRgba(color);
    const l = ((rgb.red * 299) + (rgb.green * 587) + (rgb.blue * 114)) / 1000;
    return l > 125 ? rgb.alpha < .5 ? '' : '#000000' : rgb.alpha < .5 ? '' : '#ffffff';
  }

  /**
   * Get the rgba color
   * @param color
   * @returns {{red: string, green: string, blue: string, alpha: string}|*}
   */
  getColorRgba(color) {
    if (this.isHex(color)) {
      return this.hexToRgba(color);
    } else if (this.isRgba(color)) {
      const rgba = color.substring(5, color.length - 1).split(",");
      return {red: rgba[0], green: rgba[1], blue: rgba[2], alpha: rgba[3]};
    } else if (this.isHsla(color)) {
      return this.hslaToRgba(color);
    }
  }

  /**
   * Is a hexadecimal color
   * @param color
   * @returns {*}
   */
  isHex(color) {
    return color.match(/^#(?:[A-Fa-f0-9]{3}){1,2}$/g);
  }

  /**
   * Is a Rgba color
   * @param color
   * @returns {*}
   */
  isRgba(color) {
    return color.match(/^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)?\s*[)]$/g);
  }

  /**
   * is hsla color
   * @param color
   * @returns {*}
   */
  isHsla(color) {
    return color.match(/^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)?\s*[)]$/g);
  }

  /**
   * hex to rgba
   * @param color
   * @returns {{red: number, green: number, blue: number, alpha: number}}
   */
  hexToRgba(color) {
    const c = color.substr(1).match(/(\S{2})/g);
    const r = parseInt(c[0], 16);
    const g = parseInt(c[1], 16);
    const b = parseInt(c[2], 16);
    return {red: r, green: g, blue: b, alpha: 1};
  }

  /**
   * hsla to rgba
   * @param color
   * @returns {{red: number, green: number, blue: number, alpha: number}}
   */
  hslaToRgba(color) {
    const hsla = color.substring(5, color.length - 1).split(",");
    const h = hsla[0];
    const s = hsla[1].substring(0, hsla[1].length - 1) / 100;
    const l = hsla[2].substring(0, hsla[2].length - 1) / 100;
    const a = hsla[3];

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let red = 0;
    let green = 0;
    let blue = 0;

    switch (h) {
      case h < 60:
        red = c;
        green = x;
        break;
      case h < 120:
        red = x;
        green = c;
        break;
      case h < 180:
        green = c;
        blue = x;
        break;
      case h < 240:
        green = x;
        blue = c;
        break;
      case h < 300:
        red = x;
        blue = c;
        break;
      case h <= 360:
        red = c;
        blue = x;
        break;
    }

    red = Math.round((red + m) * 255);
    green = Math.round((green + m) * 255);
    blue = Math.round((blue + m) * 255);
    return {red, green, blue, alpha: parseFloat(a)};
  }

  /**
   * Unflatten the theme props
   * @returns {{}}
   */
  unflattenTheme() {
    return Object.keys(this.props.theme).reduce((res, propertyName) => {
      propertyName.split('.').reduce(
        (acc, e, i, keys) =>
          acc[e] ||
          (acc[e] = isNaN(Number(keys[i + 1]))
            ? keys.length - 1 === i
              ? this.props.theme[propertyName]
              : {}
            : []),
        res
      );
      return res;
    }, {});
  }

  /**
   * is gradient
   * @param colorVariableName
   * @returns {boolean}
   */
  isGradient(colorVariableName) {
    return colorVariableName.includes("gradient");
  }

  /**
   * Get linear gradient from array of colors
   * @param colors
   * @returns {string}
   */
  getLinearGradientFromColorsArray(colors) {
    let linearGradient = "linear-gradient(to right";
    colors.forEach(color => linearGradient = linearGradient.concat(`, ${color.background}`));
    return linearGradient.concat(')');
  }


  /**
   * Get the description
   * @param colorVariableName
   * @returns {*}
   */
  getDescription(colorVariableName) {
    return DESCRIPTIONS[colorVariableName];
  }

  /**
   * Is a new category
   * @param colorVariableName
   * @returns {boolean}
   */
  isNewCategory(colorVariableName) {
    const category = this.getCategory(colorVariableName);
    if (this.currentCategory !== category) {
      this.currentCategory = category;
      return true;
    }
    return false;
  }

  /**
   * Get the category
   * @param colorVariableName
   * @returns {string}
   */
  getCategory(colorVariableName) {
    return colorVariableName.substring(0, colorVariableName.indexOf('-'));
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
    const theme = this.unflattenTheme();

    return (
      <div style={{display: "flex", flexWrap: "wrap", paddingBottom: "1rem"}}>
        <h1 style={{width: "100%"}}>Theme color variables</h1>
        {Object.entries(theme).map(([colorVariableName, value]) =>
          <>
            {this.isNewCategory(colorVariableName) &&
              <div style={{width: "100%", fontWeight: "bold", border: "1px solid", marginTop: "1.6rem", padding: "1rem"}}>Category: <span style={{textTransform: "uppercase"}}>{this.getCategory(colorVariableName)}</span></div>
            }
            <div key={colorVariableName} style={{display: "flex", alignItems: "center", width: "100%", marginTop: ".5rem"}}>
              <div style={{flex: "0 0 30rem"}}>{colorVariableName} :</div>
              {!this.isGradient(colorVariableName) &&
                <div style={{flex: "0 0 30rem", background: `${value}`, padding: '1rem', textAlign: "center"}}>
                  <span style={{color: `${this.textColor(value)}`}}>{value}</span>
                </div>
              }
              {this.isGradient(colorVariableName) &&
                <div style={{flex: "0 0 32rem", display: "flex", flexDirection: "column", textAlign: "center"}}>
                  <div style={{flex: 1, display: "flex"}}>
                    {value.map((color, index) =>
                      <div key={index} style={{flex: "1", background: `${color.background}`, padding: '.5rem', textAlign: "center"}}>
                        <span style={{color: `${this.textColor(color.background)}`}}>{color.background}</span>
                      </div>
                    )}
                  </div>
                  <div style={{padding: '.5rem', background: this.getLinearGradientFromColorsArray(value)}}/>
                </div>
              }
              <div style={{flex: "1", marginLeft: "1rem"}}>Description: {this.getDescription(colorVariableName)}</div>
            </div>
          </>
        )}
      </div>
    );
  }
}

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(Theme);
