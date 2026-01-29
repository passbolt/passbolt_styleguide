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
 * @since         3.7.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import { Trans, withTranslation } from "react-i18next";
import Select from "../../Common/Select/Select";
import { isUserSuspended } from "../../../../shared/utils/userUtils";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";
import TooltipMessageGroupUserDetailsLoading from "../../Common/Tooltip/TooltipMessageGroupUserDetailsLoading";
import CloseSVG from "../../../../img/svg/close.svg";
import FingerprintSVG from "../../../../img/svg/fingerprint.svg";

/**
 * This component allows to edit an user group
 */
class EditUserGroupItem extends Component {
  /**
   * Default constructor
   * @param props The component props
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
   * Bind callbacks.
   */
  bindCallbacks() {
    this.onTooltipFingerprintMouseHover = this.onTooltipFingerprintMouseHover.bind(this);
  }

  /**
   * Get a user full name
   * @returns {string}
   */
  getUserFullname() {
    const user = this.props.groupUser.user;
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * Returns true if the feature flag disableUser is enabled and the given user is suspended.
   * @param {object} user
   * @returns {boolean}
   */
  isUserSuspended(user) {
    return this.props.context.siteSettings.canIUse("disableUser") && isUserSuspended(user);
  }

  /**
   * Get options for permission selection
   * @returns {[{label: *, value: boolean}]}
   */
  get isManagerSelectOptions() {
    return [
      { value: false, label: <Trans>Member</Trans> },
      { value: true, label: <Trans>Group manager</Trans> },
    ];
  }

  /**
   * Handle whenever the user passes its mouse hover the tooltip.
   * @returns {Promise<JSX>}
   */
  async onTooltipFingerprintMouseHover() {
    if (this.state.tooltipFingerprintMessage) {
      return;
    }

    const gpgkey = await this.props.context.port.request(
      "passbolt.keyring.get-public-key-info-by-user",
      this.props.groupUser.user.id,
    );
    const tooltipFingerprintMessage = (
      <div className="group-user-details-tooltip">
        <div className="email ellipsis">
          <strong>{this.props.groupUser.user.username}</strong>
        </div>
        <Fingerprint fingerprint={gpgkey.fingerprint} />
      </div>
    );
    this.setState({ tooltipFingerprintMessage });
  }

  /**
   * Render the component
   */
  render() {
    const isSuspended = this.isUserSuspended(this.props.groupUser.user);
    return (
      <li className={`row ${this.props.isMemberChanged ? "permission-updated" : ""} ${isSuspended ? "suspended" : ""}`}>
        <UserAvatar baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.groupUser.user} />
        <div className="aro">
          <div className="aro-name">
            <span className="ellipsis">
              {this.getUserFullname()}
              {isSuspended && (
                <span className="suspended">
                  {" "}
                  <Trans>(suspended)</Trans>
                </span>
              )}
            </span>
            <TooltipPortal
              message={this.state.tooltipFingerprintMessage || <TooltipMessageGroupUserDetailsLoading />}
              direction="auto"
              onMouseHover={this.onTooltipFingerprintMouseHover}
            >
              <FingerprintSVG />
            </TooltipPortal>
          </div>
          <div className="permission_changes">
            {this.props.isMemberAdded && (
              <span>
                <Trans>Will be added</Trans>
              </span>
            )}
            {this.props.isMemberChanged && !this.props.isMemberAdded && (
              <span>
                <Trans>Will be updated</Trans>
              </span>
            )}
            {!this.props.isMemberChanged && !this.props.isMemberAdded && (
              <span>
                <Trans>Unchanged</Trans>
              </span>
            )}
          </div>
        </div>

        <div className="rights">
          <Select
            className="permission inline"
            value={this.props.groupUser.is_admin}
            items={this.isManagerSelectOptions}
            onChange={(event) => this.props.onMemberRoleChange(event, this.props.groupUser)}
            disabled={!this.props.areActionsAllowed}
            direction="bottom"
          />
        </div>

        <div className="actions">
          <button
            type="button"
            title={this.props.t("Remove")}
            className="remove-item button inline button-transparent"
            disabled={!this.props.areActionsAllowed}
            onClick={(event) => this.props.onMemberRemoved(event, this.props.groupUser)}
          >
            <CloseSVG />
            <span className="visually-hidden">
              <Trans>Remove</Trans>
            </span>
          </button>
        </div>
      </li>
    );
  }
}

EditUserGroupItem.defaultProps = {
  isMemberChanged: false,
  isMemberAdded: false,
  areActionsAllowed: false,
  isLastItemDisplayed: false,
};

EditUserGroupItem.propTypes = {
  context: PropTypes.any, // The application context
  groupUser: PropTypes.object.isRequired,
  onMemberRoleChange: PropTypes.func.isRequired,
  onMemberRemoved: PropTypes.func.isRequired,
  isMemberChanged: PropTypes.bool,
  isMemberAdded: PropTypes.bool,
  areActionsAllowed: PropTypes.bool,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(EditUserGroupItem));
