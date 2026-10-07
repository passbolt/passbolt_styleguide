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
 * @since         5.18.0
 */
import React, { createRef } from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";
import { Trans, withTranslation } from "react-i18next";
import HiddenPassword from "../../../shared/components/Password/HiddenPassword";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import CopySVG from "../../../img/svg/copy.svg";
import HealthCheckSuccessSvg from "../../../img/svg/healthcheck_success.svg";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";
import TimerSVG from "../../../img/svg/timer.svg";
import {
  CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND,
  COPY_STATUSES,
  TRANSITION_DURATION_IN_MS,
  secretRowStatePropType,
} from "./secretRowState";

/**
 * The password section of the resource view page
 */
class ResourceViewPagePassword extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.usernameCopyDefaultRef = createRef();
    this.usernameCopyProcessingRef = createRef();
    this.usernameCopyDoneRef = createRef();
    this.previewIdleRef = createRef();
    this.previewDecryptingRef = createRef();
    this.copyDefaultRef = createRef();
    this.copyProcessingRef = createRef();
    this.copyDoneRef = createRef();
  }

  /**
   * Render one icon of an action, faded in while its state is active.
   * @param {React.RefObject} nodeRef The transition node ref
   * @param {boolean} isActive Is the icon state active
   * @param {boolean} appear Should the icon fade in when it appears
   * @param {React.ReactNode} icon The icon
   * @returns {JSX}
   */
  renderIcon(nodeRef, isActive, appear, icon) {
    return (
      <Transition in={isActive} appear={appear} timeout={TRANSITION_DURATION_IN_MS} nodeRef={nodeRef}>
        {(status) => (
          <span ref={nodeRef} className={`transition fade-${status} ${isActive ? "" : "visually-hidden"}`}>
            {icon}
          </span>
        )}
      </Transition>
    );
  }

  /**
   * Render the username row. The username is metadata in clear: no mask, no preview, a permanent copy.
   * @returns {JSX}
   */
  renderUsernameRow() {
    const { username, usernameCopyStatus, onCopyUsername } = this.props;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Username</Trans>
          </span>
          {username && (
            <a href="#" role="button" className="property-value" onClick={onCopyUsername}>
              {username}
            </a>
          )}
          {!username && (
            <span className="property-value empty">
              <Trans>no username provided</Trans>
            </span>
          )}
        </div>
        <a
          role="button"
          className={`button button-transparent property-action ${!username ? "disabled" : ""}`}
          onClick={onCopyUsername}
          title={this.props.t("Copy to clipboard")}
        >
          {this.renderIcon(
            this.usernameCopyDefaultRef,
            usernameCopyStatus === COPY_STATUSES.DEFAULT,
            false,
            <CopySVG />,
          )}
          {this.renderIcon(
            this.usernameCopyProcessingRef,
            usernameCopyStatus === COPY_STATUSES.PROCESSING,
            true,
            <SpinnerSVG />,
          )}
          {this.renderIcon(
            this.usernameCopyDoneRef,
            usernameCopyStatus === COPY_STATUSES.DONE,
            true,
            <HealthCheckSuccessSvg />,
          )}
          <span className="visually-hidden">
            <Trans>Copy to clipboard</Trans>
          </span>
        </a>
      </li>
    );
  }

  /**
   * Render the password row.
   * @returns {JSX}
   */
  renderPasswordRow() {
    const { password, canCopy, canPreview } = this.props;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Password</Trans>
          </span>
          <div className="password-wrapper">
            <div
              className={`property-value secret secret-password ${password.revealed ? "" : "secret-copy"}`}
              title={password.revealed ? password.value : this.props.t("Click to copy")}
            >
              <HiddenPassword
                canClick={canCopy}
                preview={password.revealed ? password.value : null}
                onClick={password.onCopy}
              />
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={password.onPreview}
                className="password-view inline button-transparent"
                disabled={password.decrypting}
              >
                {this.renderIcon(
                  this.previewIdleRef,
                  !password.decrypting,
                  false,
                  password.revealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.previewDecryptingRef, password.decrypting, true, <SpinnerSVG />)}
                <span className="visually-hidden">
                  <Trans>View</Trans>
                </span>
              </button>
            )}
          </div>
        </div>
        {canCopy && (
          <>
            <a
              role="button"
              className="button button-transparent property-action copy-password"
              onClick={password.onCopy}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(this.copyDefaultRef, password.copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
              {this.renderIcon(
                this.copyProcessingRef,
                password.copyStatus === COPY_STATUSES.PROCESSING,
                true,
                <SpinnerSVG />,
              )}
              {this.renderIcon(
                this.copyDoneRef,
                password.copyStatus === COPY_STATUSES.DONE,
                true,
                <HealthCheckSuccessSvg />,
              )}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {password.showTimer && (
              <TimerSVG
                style={{
                  "--timer-duration": `${CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND}s`,
                }}
              />
            )}
          </>
        )}
      </li>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        {this.renderUsernameRow()}
        {this.renderPasswordRow()}
      </>
    );
  }
}

ResourceViewPagePassword.propTypes = {
  username: PropTypes.string, // The resource username, metadata in clear
  usernameCopyStatus: PropTypes.oneOf(Object.values(COPY_STATUSES)).isRequired, // The copy status of the username action
  onCopyUsername: PropTypes.func.isRequired, // The username copy handler, receives the click event
  password: secretRowStatePropType.isRequired, // The password row state given by the page
  canCopy: PropTypes.bool.isRequired, // Can the user copy the secret
  canPreview: PropTypes.bool.isRequired, // Can the user preview the secret
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPagePassword);
