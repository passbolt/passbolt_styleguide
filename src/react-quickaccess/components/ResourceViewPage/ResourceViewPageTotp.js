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
  TRANSITION_DURATION_IN_MS,
  secretRowStatePropType,
} from "./secretRowState";

/**
 * The TOTP section of the resource view page
 */
class ResourceViewPageTotp extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
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
   * Render the value: the running code when revealed, the copy sentence when masked. The TOTP never goes in a title.
   * @returns {JSX}
   */
  renderValue() {
    const { totp, canCopy } = this.props;
    if (totp.revealed) {
      return <Totp totp={totp.value} canClick={canCopy} onClick={totp.onCopy} />;
    }
    return (
      <button type="button" className="no-border" onClick={totp.onCopy} disabled={!canCopy}>
        <span>Copy TOTP to clipboard</span>
      </button>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { totp, canCopy, canPreview } = this.props;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>TOTP</Trans>
          </span>
          <div className="totp-wrapper">
            <div
              className={`property-value secret secret-totp ${totp.revealed ? "" : "secret-copy"}`}
              title={totp.revealed ? undefined : this.props.t("Click to copy")}
            >
              {this.renderValue()}
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={totp.onPreview}
                className="totp-view inline button-transparent"
                disabled={totp.decrypting}
              >
                {this.renderIcon(
                  this.previewIdleRef,
                  !totp.decrypting,
                  false,
                  totp.revealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.previewDecryptingRef, totp.decrypting, true, <SpinnerSVG />)}
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
              onClick={totp.onCopy}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(this.copyDefaultRef, totp.copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
              {this.renderIcon(
                this.copyProcessingRef,
                totp.copyStatus === COPY_STATUSES.PROCESSING,
                true,
                <SpinnerSVG />,
              )}
              {this.renderIcon(
                this.copyDoneRef,
                totp.copyStatus === COPY_STATUSES.DONE,
                true,
                <HealthCheckSuccessSvg />,
              )}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {totp.showTimer && (
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

ResourceViewPageTotp.propTypes = {
  totp: secretRowStatePropType.isRequired, // The TOTP row state given by the page, its value is the totp dto
  canCopy: PropTypes.bool.isRequired, // Can the user copy the secret
  canPreview: PropTypes.bool.isRequired, // Can the user preview the secret
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPageTotp);
