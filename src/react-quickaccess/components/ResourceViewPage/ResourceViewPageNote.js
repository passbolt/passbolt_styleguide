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
 * The note section of the resource view page.
 */
class ResourceViewPageNote extends React.Component {
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
   * Render the value: the note block when revealed, the obfuscated placeholder when hidden.
   * The note never goes in a title and never gets the copy mask, which would hide its placeholder.
   * @returns {JSX}
   */
  renderValue() {
    const { note, canCopy } = this.props;
    if (note.revealed) {
      return <div className="note-previewed">{note.value}</div>;
    }
    return (
      <button type="button" className="no-border encrypted-description" onClick={note.onCopy} disabled={!canCopy}>
        Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you
        cry.
      </button>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { note, canCopy, canPreview } = this.props;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Notes</Trans>
          </span>
          <div className="password-wrapper">
            <div
              className="property-value secret secret-note"
              title={note.revealed ? undefined : this.props.t("Click to copy")}
            >
              {this.renderValue()}
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={note.onPreview}
                className="password-view inline button-transparent"
                disabled={note.decrypting}
              >
                {this.renderIcon(
                  this.previewIdleRef,
                  !note.decrypting,
                  false,
                  note.revealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.previewDecryptingRef, note.decrypting, true, <SpinnerSVG />)}
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
              className="button button-transparent property-action copy-note"
              onClick={note.onCopy}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(this.copyDefaultRef, note.copyStatus === COPY_STATUSES.DEFAULT, false, <CopySVG />)}
              {this.renderIcon(
                this.copyProcessingRef,
                note.copyStatus === COPY_STATUSES.PROCESSING,
                true,
                <SpinnerSVG />,
              )}
              {this.renderIcon(
                this.copyDoneRef,
                note.copyStatus === COPY_STATUSES.DONE,
                true,
                <HealthCheckSuccessSvg />,
              )}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {note.showTimer && (
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

ResourceViewPageNote.propTypes = {
  note: secretRowStatePropType.isRequired, // The note row state given by the page
  canCopy: PropTypes.bool.isRequired, // Can the user copy the secret
  canPreview: PropTypes.bool.isRequired, // Can the user preview the secret
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPageNote);
