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
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../Avatar/UserAvatar";
import GroupAvatar from "../../Avatar/GroupAvatar";
import {isUserSuspended} from "../../../../../shared/utils/userUtils";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import TooltipPortal from "../../Tooltip/TooltipPortal";
import TooltipMessageFingerprintLoading from "../../Tooltip/TooltipMessageFingerprintLoading";
import Fingerprint from "../../Fingerprint/Fingerprint";
import FingerprintSVG from "../../../../../img/svg/fingerprint.svg";

class AutocompleteItem extends Component {
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
   * Returns the component default state
   */
  get defaultState() {
    return {
      tooltipFingerprintMessage: null,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleClick = this.handleClick.bind(this);
    this.onTooltipFingerprintMouseHover = this.onTooltipFingerprintMouseHover.bind(this);
  }

  /**
   * Get the item title
   * @returns {string}
   */
  getTitle() {
    if (this.props.user) {
      return `${this.props.user.profile.first_name} ${this.props.user.profile.last_name}`;
    } else {
      return `${this.props.group.name}`;
    }
  }

  /**
   * Get the item subtitle
   * @returns {string}
   */
  getSubtitle() {
    if (this.props.user) {
      return this.props.user.username;
    } else if (this.props.group) {
      return this.props.t("{{count}} group member", {count: this.props.group.user_count});
    }
    return "";
  }

  /**
   * Handle whenever the user passes its mouse hover the tooltip.
   * @returns {Promise<JSX>}
   */
  async onTooltipFingerprintMouseHover() {
    if (this.state.tooltipFingerprintMessage) {
      return;
    }

    const gpgkey = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.props.user.id);
    const tooltipFingerprintMessage = <Fingerprint fingerprint={gpgkey.fingerprint}/>;
    this.setState({tooltipFingerprintMessage});
  }

  /**
   * Get the autocomplete item classname
   * @returns {string}
   */
  getClassName() {
    if (this.props.selected) {
      return 'row selected';
    }
    return 'row';
  }

  /**
   * Handle click on an autocomplete item
   */
  handleClick() {
    this.props.onClick(this.props.id);
  }

  /**
   * Returns true if the disableUser feature is enabled and the user is suspended
   */
  get isCurrentUserSuspended() {
    return this.props.canShowUserAsSuspended && isUserSuspended(this.props.user);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <li className={`autocomplete-item ${this.isCurrentUserSuspended  ? "suspended" : ""}`}>
        <div className={this.getClassName()}>
          <div className="main-cell-wrapper">
            <div className="main-cell ">
              <button type="button" className="link no-border" onClick={this.handleClick}>
                {this.props.user &&
                <UserAvatar user={this.props.user} baseUrl={this.props.baseUrl}/>
                }
                {this.props.group &&
                <GroupAvatar group={this.props.group}/>
                }
                <div className="user">
                  <span className="user-fullname-container">
                    <span className="name ellipsis">{this.getTitle()}{this.isCurrentUserSuspended && <span className="suspended"> <Trans>(suspended)</Trans></span>}</span>
                    {this.props.user &&
                      <TooltipPortal
                        message={this.state.tooltipFingerprintMessage || <TooltipMessageFingerprintLoading />}
                        onMouseHover={this.onTooltipFingerprintMouseHover}>
                        <FingerprintSVG/>
                      </TooltipPortal>
                    }
                  </span>
                  <span className="details ellipsis">{this.getSubtitle()}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

AutocompleteItem.defaultProps = {
  canShowUserAsSuspended: false
};

AutocompleteItem.propTypes = {
  context: PropTypes.object,
  baseUrl: PropTypes.string,
  id: PropTypes.number,
  user: PropTypes.object,
  group: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  canShowUserAsSuspended: PropTypes.bool.isRequired, // is the feature disableUser enabled?
  t: PropTypes.func, // the translation function
};

export default withAppContext(withTranslation("common")(AutocompleteItem));
