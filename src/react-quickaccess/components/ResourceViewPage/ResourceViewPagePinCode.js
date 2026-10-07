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
 * The PIN code section of the resource view page: the PIN code row.
 */
class ResourceViewPagePinCode extends React.Component {
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { pinCode, canCopy, canPreview } = this.props;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Pin code</Trans>
          </span>
          <div className="password-wrapper">
            <div
              className={`property-value secret secret-pin-code ${pinCode.revealed ? "" : "secret-copy"}`}
              title={pinCode.revealed ? pinCode.value : this.props.t("Click to copy")}
            >
              <HiddenPassword
                canClick={canCopy}
                preview={pinCode.revealed ? pinCode.value : null}
                onClick={pinCode.onCopy}
              />
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={pinCode.onPreview}
                className="password-view inline button-transparent"
                disabled={pinCode.decrypting}
              >
                {this.renderIcon(
                  this.previewIdleRef,
                  !pinCode.decrypting,
                  false,
                  pinCode.revealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.previewDecryptingRef, pinCode.decrypting, true, <SpinnerSVG />)}
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
              className="button button-transparent property-action copy-pin-code"
              onClick={pinCode.onCopy}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(this.copyDefaultRef, pinCode.copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
              {this.renderIcon(
                this.copyProcessingRef,
                pinCode.copyStatus === COPY_STATUSES.PROCESSING,
                true,
                <SpinnerSVG />,
              )}
              {this.renderIcon(
                this.copyDoneRef,
                pinCode.copyStatus === COPY_STATUSES.DONE,
                true,
                <HealthCheckSuccessSvg />,
              )}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {pinCode.showTimer && (
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

ResourceViewPagePinCode.propTypes = {
  pinCode: secretRowStatePropType.isRequired, // The PIN code row state given by the page
  canCopy: PropTypes.bool.isRequired, // Can the user copy the secret
  canPreview: PropTypes.bool.isRequired, // Can the user preview the secret
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPagePinCode);
