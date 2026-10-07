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
 * The custom fields section of the resource view page
 */
class ResourceViewPageCustomFields extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.nodeRefs = {};
  }

  /**
   * Get the transition node ref of an icon, created on first use. Each row has its own icons.
   * @param {string} key The ref key, the field id and the icon
   * @returns {React.RefObject}
   */
  getNodeRef(key) {
    if (!this.nodeRefs[key]) {
      this.nodeRefs[key] = createRef();
    }
    return this.nodeRefs[key];
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
   * Render the row shown when the resource has no custom field.
   * @returns {JSX}
   */
  renderEmptyRow() {
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Custom fields</Trans>
          </span>
          <span className="property-value empty">
            <Trans>No custom fields</Trans>
          </span>
        </div>
      </li>
    );
  }

  /**
   * Render the row of a custom field.
   * @param {object} customField The custom field: its id, its key and its row state
   * @returns {JSX}
   */
  renderCustomFieldRow(customField) {
    const { canCopy, canPreview } = this.props;
    const { id, state } = customField;
    return (
      <li className="property" key={id}>
        <div className="information">
          {customField.metadata_key?.length > 0 ? (
            <span className="property-name">{customField.metadata_key}</span>
          ) : (
            <span className="property-name empty">
              <Trans>no key</Trans>
            </span>
          )}
          <div className="password-wrapper">
            <div
              className={`property-value secret secret-custom-fields ${state.revealed ? "" : "secret-copy"}`}
              title={state.revealed ? state.value : this.props.t("Click to copy")}
            >
              <HiddenPassword
                canClick={canCopy}
                preview={state.revealed ? state.value : null}
                onClick={state.onCopy}
                emptySecretSentence={this.props.t("There is no value")}
              />
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={state.onPreview}
                className="password-view inline button-transparent"
                disabled={state.decrypting}
              >
                {this.renderIcon(
                  this.getNodeRef(`${id}:preview-idle`),
                  !state.decrypting,
                  false,
                  state.revealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.getNodeRef(`${id}:preview-decrypting`), state.decrypting, true, <SpinnerSVG />)}
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
              className="button button-transparent property-action copy-custom-field"
              onClick={state.onCopy}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(
                this.getNodeRef(`${id}:copy-default`),
                state.copyStatus === COPY_STATUSES.DEFAULT,
                false,
                <CopySVG />,
              )}
              {this.renderIcon(
                this.getNodeRef(`${id}:copy-processing`),
                state.copyStatus === COPY_STATUSES.PROCESSING,
                true,
                <SpinnerSVG />,
              )}
              {this.renderIcon(
                this.getNodeRef(`${id}:copy-done`),
                state.copyStatus === COPY_STATUSES.DONE,
                true,
                <HealthCheckSuccessSvg />,
              )}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {state.showTimer && (
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
    const { customFields } = this.props;
    if (customFields.length === 0) {
      return this.renderEmptyRow();
    }
    return <>{customFields.map((customField) => this.renderCustomFieldRow(customField))}</>;
  }
}

ResourceViewPageCustomFields.defaultProps = {
  customFields: [],
};

ResourceViewPageCustomFields.propTypes = {
  customFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // The custom field id
      metadata_key: PropTypes.string, // The custom field key, from the resource metadata
      state: secretRowStatePropType.isRequired, // The row state given by the page
    }),
  ), // The custom fields, in the stored order
  canCopy: PropTypes.bool.isRequired, // Can the user copy the secret
  canPreview: PropTypes.bool.isRequired, // Can the user preview the secret
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPageCustomFields);
