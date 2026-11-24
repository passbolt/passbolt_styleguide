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
 * @since         5.19.0
 */
import React, { createRef } from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import CopySVG from "../../../img/svg/copy.svg";
import HealthCheckSuccessSvg from "../../../img/svg/healthcheck_success.svg";
import { COPY_STATUSES, SECRET_KEYS, TRANSITION_DURATION_IN_MS } from "./secretState";

/**
 * The username row of the resource view page. The username is metadata in clear: no mask, no preview, a permanent copy.
 */
class ResourceViewPageUsername extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.copyDefaultRef = createRef();
    this.copyProcessingRef = createRef();
    this.copyDoneRef = createRef();
  }

  /**
   * Get the copy status of the row: the page status while the username is being copied, the default one otherwise.
   * @returns {string}
   */
  get copyStatus() {
    return this.props.copyingSecret === SECRET_KEYS.USERNAME ? this.props.copyStatus : COPY_STATUSES.DEFAULT;
  }

  /**
   * Render one icon of the copy action, faded in while its state is active.
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
    const { username, onCopy } = this.props;
    const copyStatus = this.copyStatus;
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">
            <Trans>Username</Trans>
          </span>
          {username && (
            <a href="#" role="button" className="property-value" onClick={onCopy}>
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
      </li>
    );
  }
}

ResourceViewPageUsername.propTypes = {
  username: PropTypes.string, // The resource username, metadata in clear
  onCopy: PropTypes.func.isRequired, // The username copy handler, receives the click event
  copyingSecret: PropTypes.string, // The key of the row being copied, null when none
  copyStatus: PropTypes.oneOf(Object.values(COPY_STATUSES)), // The copy status of the row being copied, null when none
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPageUsername);
