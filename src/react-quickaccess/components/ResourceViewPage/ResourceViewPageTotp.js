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
import Totp from "../../../shared/components/Totp/Totp";
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
 * The TOTP section of the resource view page: the TOTP row.
 */
class ResourceViewPageTotp extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.previewIdleRef = createRef();
    this.previewDecryptingRef = createRef();
    this.previewRevealedRef = createRef();
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
   * Handle the click on the TOTP value or on its copy action.
   */
  handleCopyClick() {
    this.props.onCopy(SECRET_KEYS.TOTP);
  }

  /**
   * Handle the click on the TOTP preview action.
   */
  handlePreviewClick() {
    this.props.onPreview(SECRET_KEYS.TOTP);
  }

  /**
   * Is the TOTP revealed. The page gives the totp dto only while it is.
   * @returns {boolean}
   */
  get isRevealed() {
    return this.props.totp !== null;
  }

  /**
   * Is the TOTP row decrypting the secret.
   * @returns {boolean}
   */
  get isDecrypting() {
    return this.props.decryptingSecret === SECRET_KEYS.TOTP;
  }

  /**
   * The copy status of the TOTP row: the page status while the TOTP is the row being copied, the default one otherwise.
   * @returns {string}
   */
  get copyStatus() {
    return this.props.copyingSecret === SECRET_KEYS.TOTP ? this.props.copyStatus : COPY_STATUSES.DEFAULT;
  }

  /**
   * Is the TOTP the last copied property, the clipboard timer runs for it.
   * @returns {boolean}
   */
  get isCopied() {
    return this.props.copiedProperty === SECRET_KEYS.TOTP;
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
   * Render the value: the running code when revealed, the copy sentence when masked. The TOTP never goes in a title.
   * @returns {JSX}
   */
  renderValue() {
    const { totp, canCopy } = this.props;
    if (this.isRevealed) {
      return <Totp totp={totp} canClick={canCopy} onClick={this.handleCopyClick} />;
    }
    return (
      <button type="button" className="no-border" onClick={this.handleCopyClick} disabled={!canCopy}>
        <span>Copy TOTP to clipboard</span>
      </button>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { canCopy, canPreview } = this.props;
    const isRevealed = this.isRevealed;
    const isDecrypting = this.isDecrypting;
    const copyStatus = this.copyStatus;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>TOTP</Trans>
          </span>
          <div className="totp-wrapper">
            <div
              className={`property-value secret secret-totp ${isRevealed ? "" : "secret-copy"}`}
              title={this.props.t("Click to copy")}
            >
              {this.renderValue()}
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={this.handlePreviewClick}
                className="totp-view inline button-transparent"
                disabled={isDecrypting}
              >
                {this.renderIcon(this.previewIdleRef, !isDecrypting && !isRevealed, false, <EyeOpenSVG />)}
                {this.renderIcon(this.previewRevealedRef, !isDecrypting && isRevealed, false, <EyeCloseSVG />)}
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
              className="button button-transparent property-action copy-totp"
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
}

ResourceViewPageTotp.defaultProps = {
  totp: null,
};

ResourceViewPageTotp.propTypes = {
  totp: PropTypes.object, // The totp dto while the TOTP is revealed, null while it is masked
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

export default withTranslation("common")(ResourceViewPageTotp);
