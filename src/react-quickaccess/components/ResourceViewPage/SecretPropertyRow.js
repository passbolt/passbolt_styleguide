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
import Totp from "../../../shared/components/Totp/Totp";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import CopySVG from "../../../img/svg/copy.svg";
import HealthCheckSuccessSvg from "../../../img/svg/healthcheck_success.svg";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";
import TimerSVG from "../../../img/svg/timer.svg";

/**
 * The delay after which the clipboard content copied temporarily is flushed, in seconds.
 * @type {number}
 */
export const CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND = 30;

/**
 * The kinds of secret a row can display.
 * @type {object}
 */
export const SECRET_PROPERTY_ROW_TYPES = {
  PASSWORD: "password",
  TOTP: "totp",
  PIN_CODE: "pin_code",
  NOTE: "note",
  CUSTOM_FIELD: "custom_field",
};

/**
 * The copy action statuses.
 * @type {object}
 */
export const COPY_STATUSES = {
  DEFAULT: "default",
  PROCESSING: "processing",
  DONE: "done",
};

/**
 * The css classes of each kind of row. The class names are the ones the stylesheet and the tests rely on.
 * @type {object}
 */
const ROW_CONFIG = {
  [SECRET_PROPERTY_ROW_TYPES.PASSWORD]: {
    secretClass: "secret-password",
    wrapperClass: "password-wrapper",
    viewClass: "password-view",
    copyClass: "copy-password",
    hasCopyMask: true,
  },
  [SECRET_PROPERTY_ROW_TYPES.TOTP]: {
    secretClass: "secret-totp",
    wrapperClass: "totp-wrapper",
    viewClass: "totp-view",
    copyClass: "copy-totp",
    hasCopyMask: true,
  },
  [SECRET_PROPERTY_ROW_TYPES.PIN_CODE]: {
    secretClass: "secret-pin-code",
    wrapperClass: "password-wrapper",
    viewClass: "password-view",
    copyClass: "copy-pin-code",
    hasCopyMask: true,
  },
  [SECRET_PROPERTY_ROW_TYPES.NOTE]: {
    secretClass: "secret-note",
    wrapperClass: "password-wrapper",
    viewClass: "password-view",
    copyClass: "copy-note",
    // The note displays its own placeholder, the obfuscation mask of the stylesheet would hide it.
    hasCopyMask: false,
  },
  [SECRET_PROPERTY_ROW_TYPES.CUSTOM_FIELD]: {
    secretClass: "secret-custom-fields",
    wrapperClass: "password-wrapper",
    viewClass: "password-view",
    copyClass: "copy-custom-field",
    hasCopyMask: true,
  },
};

/**
 * The duration of the icons fade transition, in ms.
 * @type {number}
 */
const TRANSITION_DURATION_IN_MS = 500;

/**
 * A secret row of the quick access resource view page: a label, a masked or revealed value, a preview action and a
 * copy action. The row holds no secret state: the page gives it the value only while the row is revealed.
 */
class SecretPropertyRow extends React.Component {
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
   * Get the css configuration of the row.
   * @returns {object}
   */
  get config() {
    return ROW_CONFIG[this.props.type];
  }

  /**
   * Get the title of the value. The note and the TOTP never expose their value in a title.
   * @returns {string|undefined}
   */
  get title() {
    if (!this.props.revealed) {
      return this.props.t("Click to copy");
    }
    const isTitleless =
      this.props.type === SECRET_PROPERTY_ROW_TYPES.NOTE || this.props.type === SECRET_PROPERTY_ROW_TYPES.TOTP;
    return isTitleless ? undefined : this.props.value;
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
   * Render the value, masked or revealed, according to the kind of row.
   * @returns {JSX}
   */
  renderValue() {
    const { type, revealed, value, canCopy, onCopy } = this.props;

    if (type === SECRET_PROPERTY_ROW_TYPES.TOTP) {
      return revealed ? (
        <Totp totp={value} canClick={canCopy} onClick={onCopy} />
      ) : (
        <button type="button" className="no-border" onClick={onCopy} disabled={!canCopy}>
          <span>Copy TOTP to clipboard</span>
        </button>
      );
    }

    if (type === SECRET_PROPERTY_ROW_TYPES.NOTE) {
      return revealed ? (
        <div className="note-previewed">{value}</div>
      ) : (
        <button type="button" className="no-border encrypted-description" onClick={onCopy} disabled={!canCopy}>
          Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you
          cry.
        </button>
      );
    }

    return (
      <HiddenPassword
        canClick={canCopy}
        preview={revealed ? value : null}
        onClick={onCopy}
        emptySecretSentence={this.props.emptySecretSentence}
      />
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { label, revealed, decrypting, copyStatus, showTimer, canCopy, canPreview, onCopy, onPreview } = this.props;
    const config = this.config;
    const isMasked = !revealed && config.hasCopyMask;

    return (
      <li className="property">
        <div className="information">
          {label ? (
            <span className="property-name">{label}</span>
          ) : (
            <span className="property-name empty">
              <Trans>no key</Trans>
            </span>
          )}
          <div className={config.wrapperClass}>
            <div
              className={`property-value secret ${config.secretClass} ${isMasked ? "secret-copy" : ""}`}
              title={this.title}
            >
              {this.renderValue()}
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={onPreview}
                className={`${config.viewClass} inline button-transparent`}
                disabled={decrypting}
              >
                {this.renderIcon(this.previewIdleRef, !decrypting, false, revealed ? <EyeCloseSVG /> : <EyeOpenSVG />)}
                {this.renderIcon(this.previewDecryptingRef, decrypting, true, <SpinnerSVG />)}
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
              className={`button button-transparent property-action ${config.copyClass}`}
              onClick={onCopy}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(this.copyDefaultRef, copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
              {this.renderIcon(this.copyProcessingRef, copyStatus === COPY_STATUSES.PROCESSING, true, <SpinnerSVG />)}
              {this.renderIcon(this.copyDoneRef, copyStatus === COPY_STATUSES.DONE, true, <HealthCheckSuccessSvg />)}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {showTimer && (
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

SecretPropertyRow.defaultProps = {
  revealed: false,
  value: null,
  decrypting: false,
  copyStatus: COPY_STATUSES.DEFAULT,
  showTimer: false,
  canCopy: true,
  canPreview: true,
};

SecretPropertyRow.propTypes = {
  type: PropTypes.oneOf(Object.values(SECRET_PROPERTY_ROW_TYPES)).isRequired, // The kind of secret displayed, drives the css classes and the value rendering
  label: PropTypes.node, // The property name, "no key" when empty
  revealed: PropTypes.bool, // Is the value revealed
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // The plaintext value, given only while revealed (the totp dto for a totp row)
  emptySecretSentence: PropTypes.node, // The sentence displayed when the revealed value is empty
  decrypting: PropTypes.bool, // Is the secret decrypting for this row
  copyStatus: PropTypes.oneOf(Object.values(COPY_STATUSES)), // The copy action status
  showTimer: PropTypes.bool, // Display the clipboard flush timer next to the copy action
  canCopy: PropTypes.bool, // Can the user copy the value
  canPreview: PropTypes.bool, // Can the user preview the value
  onCopy: PropTypes.func, // The copy handler
  onPreview: PropTypes.func, // The preview toggle handler
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(SecretPropertyRow);
