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
} from "./secretState";

/**
 * The custom fields section of the resource view page: one row per custom field, keyed by the custom field id.
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
   * Get the copy status of a row: the page status while the row is the one being copied, the default one otherwise.
   * @param {string} id The custom field id, the row key
   * @returns {string}
   */
  getCopyStatus(id) {
    return this.props.copyingSecret === id ? this.props.copyStatus : COPY_STATUSES.DEFAULT;
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
   * Render the row of a custom field. The page gives its plaintext only while it is revealed.
   * @param {object} customField The custom field: its id, its key and its value
   * @returns {JSX}
   */
  renderCustomFieldRow(customField) {
    const { decryptingSecret, copiedProperty, canCopy, canPreview } = this.props;
    const { id, value } = customField;
    const isRevealed = value !== null;
    const isDecrypting = decryptingSecret === id;
    const copyStatus = this.getCopyStatus(id);
    const isCopied = copiedProperty === id;
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
              className={`property-value secret secret-custom-fields ${isRevealed ? "" : "secret-copy"}`}
              title={isRevealed ? value : this.props.t("Click to copy")}
            >
              <HiddenPassword
                canClick={canCopy}
                preview={value}
                onClick={() => this.props.onCopy(id)}
                emptySecretSentence={this.props.t("There is no value")}
              />
            </div>
            {canPreview && (
              <button
                type="button"
                onClick={() => this.props.onPreview(id)}
                className="password-view inline button-transparent"
                disabled={isDecrypting}
              >
                {this.renderIcon(
                  this.getNodeRef(`${id}:preview-idle`),
                  !isDecrypting,
                  false,
                  isRevealed ? <EyeCloseSVG /> : <EyeOpenSVG />,
                )}
                {this.renderIcon(this.getNodeRef(`${id}:preview-decrypting`), isDecrypting, true, <SpinnerSVG />)}
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
              onClick={() => this.props.onCopy(id)}
              title={this.props.t("Copy to clipboard")}
            >
              {this.renderIcon(
                this.getNodeRef(`${id}:copy-default`),
                copyStatus === COPY_STATUSES.DEFAULT,
                false,
                <CopySVG />,
              )}
              {this.renderIcon(
                this.getNodeRef(`${id}:copy-processing`),
                copyStatus === COPY_STATUSES.PROCESSING,
                true,
                <SpinnerSVG />,
              )}
              {this.renderIcon(
                this.getNodeRef(`${id}:copy-done`),
                copyStatus === COPY_STATUSES.DONE,
                true,
                <HealthCheckSuccessSvg />,
              )}
              <span className="visually-hidden">
                <Trans>Copy to clipboard</Trans>
              </span>
            </a>
            {isCopied && (
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
      id: PropTypes.string.isRequired, // The custom field id, the key of its row
      metadata_key: PropTypes.string, // The custom field key, from the resource metadata
      value: PropTypes.string, // The plaintext while the custom field is revealed, null while it is masked
    }),
  ), // The custom fields, in the stored order
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

export default withTranslation("common")(ResourceViewPageCustomFields);
