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
  SECRET_KEYS,
  TRANSITION_DURATION_IN_MS,
} from "./secretState";

/**
 * The password section of the resource view page: the username row and the password row.
 */
class ResourceViewPagePassword extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
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
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
  }

  /**
   * Handle the click on the password value or on its copy action.
   */
  handleCopyClick() {
    this.props.onCopy(SECRET_KEYS.PASSWORD);
  }

  /**
   * Handle the click on the password preview action.
   */
  handlePreviewClick() {
    this.props.onPreview(SECRET_KEYS.PASSWORD);
  }

  /**
   * Is the password revealed. The page gives the plaintext only while it is.
   * @returns {boolean}
   */
  get isRevealed() {
    return this.props.password !== null;
  }

  /**
   * Is the password row decrypting the secret.
   * @returns {boolean}
   */
  get isDecrypting() {
    return this.props.decryptingSecret === SECRET_KEYS.PASSWORD;
  }

  /**
   * Is the password the last copied property, the clipboard timer runs for it.
   * @returns {boolean}
   */
  get isCopied() {
    return this.props.copiedProperty === SECRET_KEYS.PASSWORD;
  }

  /**
   * Get the copy status of a row: the page status while the row is the one being copied, the default one otherwise.
   * @param {string} key The row key
   * @returns {string}
   */
  getCopyStatus(key) {
    return this.props.copyingSecret === key ? this.props.copyStatus : COPY_STATUSES.DEFAULT;
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
    const { username, onCopyUsername } = this.props;
    const copyStatus = this.getCopyStatus(SECRET_KEYS.USERNAME);
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
          {this.renderIcon(this.usernameCopyDefaultRef, copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
          {this.renderIcon(
            this.usernameCopyProcessingRef,
            copyStatus === COPY_STATUSES.PROCESSING,
            true,
            <SpinnerSVG />,
          )}
          {this.renderIcon(
            this.usernameCopyDoneRef,
            copyStatus === COPY_STATUSES.DONE,
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
    const isRevealed = this.isRevealed;
    const isDecrypting = this.isDecrypting;
    const copyStatus = this.getCopyStatus(SECRET_KEYS.PASSWORD);
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Password</Trans>
          </span>
          <div className="password-wrapper">
            <div
              className={`property-value secret secret-password ${isRevealed ? "" : "secret-copy"}`}
              title={isRevealed ? password : this.props.t("Click to copy")}
            >
              <HiddenPassword canClick={canCopy} preview={password} onClick={this.handleCopyClick} />
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={this.handlePreviewClick}
                className="password-view inline button-transparent"
                disabled={isDecrypting}
              >
                {this.renderIcon(
                  this.previewIdleRef,
                  !isDecrypting,
                  false,
                  isRevealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.previewDecryptingRef, isDecrypting, true, <SpinnerSVG />)}
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
              onClick={this.handleCopyClick}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(this.copyDefaultRef, copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
              {this.renderIcon(this.copyProcessingRef, copyStatus === COPY_STATUSES.PROCESSING, true, <SpinnerSVG />)}
              {this.renderIcon(this.copyDoneRef, copyStatus === COPY_STATUSES.DONE, true, <HealthCheckSuccessSvg />)}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {this.isCopied && (
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

ResourceViewPagePassword.defaultProps = {
  password: null,
};

ResourceViewPagePassword.propTypes = {
  username: PropTypes.string, // The resource username, metadata in clear
  onCopyUsername: PropTypes.func.isRequired, // The username copy handler, receives the click event
  password: PropTypes.string, // The plaintext while the password is revealed, null while it is masked
  decryptingSecret: PropTypes.string, // The key of the row decrypting the secret, null when none
  copyingSecret: PropTypes.string, // The key of the row being copied, null when none
  copyStatus: PropTypes.oneOf(Object.values(COPY_STATUSES)), // The copy status of the row being copied, null when none
  copiedProperty: PropTypes.string, // The key of the last copied row, the clipboard timer runs for it, null when none
  onCopy: PropTypes.func.isRequired, // The copy handler, receives the row key
  onPreview: PropTypes.func.isRequired, // The preview toggle handler, receives the row key
  canCopy: PropTypes.bool.isRequired, // Can the user copy the secret
  canPreview: PropTypes.bool.isRequired, // Can the user preview the secret
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPagePassword);
