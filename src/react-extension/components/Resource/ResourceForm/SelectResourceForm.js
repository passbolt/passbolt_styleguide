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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import AddSVG from "../../../../img/svg/add.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownItem from "../../Common/Dropdown/DropdownMenuItem";
import KeySVG from "../../../../img/svg/key.svg";
import TotpSVG from "../../../../img/svg/totp.svg";
import NotesSVG from "../../../../img/svg/notes.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import AlignLeftSVG from "../../../../img/svg/align_left.svg";

class SelectResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      displaySecrets: true,
      displayMetadata: true,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleDisplaySecretsClick = this.handleDisplaySecretsClick.bind(this);
    this.handleDisplayMetadataClick = this.handleDisplayMetadataClick.bind(this);
  }

  /**
   * Handles the click on the display secrets button.
   */
  handleDisplaySecretsClick() {
    this.setState({displaySecrets: !this.state.displaySecrets});
  }

  /**
   * Handles the click on the display metadata button.
   */
  handleDisplayMetadataClick() {
    this.setState({displayMetadata: !this.state.displayMetadata});
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <div className="left-sidebar">
        <div className="main-action-wrapper">
          <Dropdown>
            <DropdownButton className="add-secret">
              <AddSVG/>
              <Trans>Add secret</Trans>
              <CaretDownSVG/>
            </DropdownButton>
            <DropdownMenu className="menu-create-primary">
              <DropdownItem>
                <button id="password_action" type="button" className="no-border">
                  <KeySVG/>
                  <span><Trans>Password</Trans></span>
                </button>
              </DropdownItem>
              <DropdownItem>
                <button id="totp_action" type="button" className="no-border">
                  <TotpSVG/>
                  <span><Trans>TOTP</Trans></span>
                </button>
              </DropdownItem>
              <DropdownItem>
                <button id="note_action" type="button" className="no-border">
                  <NotesSVG/>
                  <span><Trans>Note</Trans></span>
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="sidebar-content-sections">
          <button type="button" className="section-header no-border" onClick={this.handleDisplaySecretsClick}>
            {this.state.displaySecrets
              ? <CaretDownSVG className="caret-down"/>
              : <CaretRightSVG className="caret-right"/>
            }
            <span><Trans>Secrets</Trans></span>
          </button>
          {this.state.displaySecrets &&
            <>
              <button type="button" className="section-content no-border selected">
                <KeySVG/>
                <span><Trans>Passwords</Trans></span>
              </button>
              <button type="button" className="section-content no-border">
                <TotpSVG/>
                <span><Trans>TOTP</Trans></span>
              </button>
              <button type="button" className="section-content no-border">
                <NotesSVG/>
                <span><Trans>Note</Trans></span>
              </button>
            </>
          }
          <button type="button" className="section-header no-border" onClick={this.handleDisplayMetadataClick}>
            {this.state.displayMetadata
              ? <CaretDownSVG className="caret-down"/>
              : <CaretRightSVG className="caret-right"/>
            }
            <span><Trans>Metadata</Trans></span>
          </button>
          {this.state.displayMetadata &&
            <>
              <button type="button" className="section-content no-border">
                <AlignLeftSVG/>
                <span><Trans>Description</Trans></span>
              </button>
            </>
          }
        </div>
      </div>
    );
  }
}

SelectResourceForm.propTypes = {
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(SelectResourceForm);

