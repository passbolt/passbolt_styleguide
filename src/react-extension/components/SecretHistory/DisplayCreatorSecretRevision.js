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
 * @since         5.7.0
 */
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import UserAvatar from "../Common/Avatar/UserAvatar";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import TooltipPortal from "../Common/Tooltip/TooltipPortal";
import TooltipMessageFingerprintLoading from "../Common/Tooltip/TooltipMessageFingerprintLoading";
import FingerprintSVG from "../../../img/svg/fingerprint.svg";
import Fingerprint from "../Common/Fingerprint/Fingerprint";
import { formatDateTimeAgo } from "../../../shared/utils/dateUtils";
import UserEntity, { USER_STATUS } from "../../../shared/models/entity/user/userEntity";
import SecretRevisionEntity from "../../../shared/models/entity/secretRevision/secretRevisionEntity";

class DisplayCreatorSecretRevision extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Ge the default state
   * @returns {*}
   */
  get defaultState() {
    return {
      tooltipFingerprintMessage: null, // tooltip fingerprint message
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSelectSecretRevision = this.handleSelectSecretRevision.bind(this);
  }

  /**
   * Handle the select secret revision
   * @param event
   */
  handleSelectSecretRevision(event) {
    event.preventDefault();
    if (this.props.onSelectSecretRevision) {
      this.props.onSelectSecretRevision(this.props.secretRevision.id);
    }
  }

  /**
   * Is resource secret revision selected
   * @return {boolean}
   */
  get isResourceSecretRevisionSelected() {
    return this.props.secretRevisionSelectedId === this.props.secretRevision.id;
  }

  /**
   * Handle whenever the user passes its mouse hover the tooltip.
   * @returns {Promise<JSX>}
   */
  async onTooltipFingerprintMouseHover(userId) {
    if (this.state.tooltipFingerprintMessage) {
      return;
    }
    let tooltipFingerprintMessage;
    try {
      const gpgkey = await this.props.context.port.request("passbolt.keyring.get-public-key-info-by-user", userId);
      tooltipFingerprintMessage = <Fingerprint fingerprint={gpgkey.fingerprint} />;
    } catch (error) {
      console.error(error);
      tooltipFingerprintMessage = <p>{error.message}</p>;
    }
    this.setState({ tooltipFingerprintMessage });
  }

  /**
   * Get the creator of the secret revision
   * Returns a default unknown user if creator is null
   * @returns {UserEntity}
   */
  get creator() {
    if (!this.props.secretRevision.creator) {
      return new UserEntity({
        username: "Unknown user",
        profile: {
          first_name: "Unknown",
          last_name: "user",
        },
        status: USER_STATUS.DELETED,
      });
    }
    return this.props.secretRevision.creator;
  }

  /**
   * Get the translate function
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
      <button
        type="button"
        className={`no-border ${this.isResourceSecretRevisionSelected ? "selected" : ""}`}
        disabled={this.props.disabled}
        onClick={this.handleSelectSecretRevision}
      >
        <div className="creator">
          <UserAvatar
            user={this.creator.toDto(UserEntity.ALL_CONTAIN_OPTIONS)}
            baseUrl={this.props.context.userSettings.getTrustedDomain()}
          />
          <div className="profile">
            <div className="name">
              <span className="ellipsis">{this.creator.getUserFormattedName(this.translate)}</span>
              {this.creator?.id && (
                <TooltipPortal
                  message={this.state.tooltipFingerprintMessage || <TooltipMessageFingerprintLoading />}
                  onMouseHover={() => this.onTooltipFingerprintMouseHover(this.creator?.id)}
                >
                  <FingerprintSVG />
                </TooltipPortal>
              )}
            </div>
            <div className="username ellipsis">{this.creator.username}</div>
          </div>
        </div>
        <div className="additional-information">
          {this.creator.status === USER_STATUS.SUSPENDED && (
            <div className="status suspended ellipsis">
              <Trans>Suspended</Trans>
            </div>
          )}
          {this.creator.status === USER_STATUS.DELETED && (
            <div className="status deleted ellipsis">
              <Trans>Deleted</Trans>
            </div>
          )}
          <div className="updated-date ellipsis">
            <span>Edited:</span>{" "}
            {formatDateTimeAgo(this.props.secretRevision.modified, this.translate, this.props.context.locale)}
          </div>
        </div>
      </button>
    );
  }
}

DisplayCreatorSecretRevision.defaultProps = {
  disabled: true,
};

DisplayCreatorSecretRevision.propTypes = {
  secretRevision: PropTypes.instanceOf(SecretRevisionEntity).isRequired, // The secret revision entity
  disabled: PropTypes.bool, // The disabled property
  secretRevisionSelectedId: PropTypes.string, // The secret revision selected id
  onSelectSecretRevision: PropTypes.func, // The on select secret revision callback
  context: PropTypes.object, // The app context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(DisplayCreatorSecretRevision));
