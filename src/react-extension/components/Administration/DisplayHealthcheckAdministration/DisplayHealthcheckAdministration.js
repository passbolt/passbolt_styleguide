/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { withAdministrationHealthcheck } from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext";
import { withAdministrationWorkspace } from "../../../contexts/AdministrationWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import DisplayAdministrationHealthcheckActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationHealthcheckActions/DisplayAdministrationHealthcheckActions";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import { createSafePortal } from "../../../../shared/utils/portals";
import HealthcheckSuccessSVG from "../../../../img/svg/healthcheck_success.svg";
import HealthcheckErrorSVG from "../../../../img/svg/healthcheck_error.svg";
import HealthcheckInfoSVG from "../../../../img/svg/healthcheck_info.svg";
import TriangleAlertSVG from "../../../../img/svg/triangle_alert.svg";
import FileTextSVG from "../../../../img/svg/file_text.svg";

/**
 * How each status is drawn. A status missing from this map falls back to the neutral info badge,
 * so a vocabulary the API extends costs nothing here.
 * @type {Object}
 */
const STATUS_RENDERING = {
  pass: { modifier: "healthcheck-badge--success", icon: HealthcheckSuccessSVG },
  error: { modifier: "healthcheck-badge--error", icon: HealthcheckErrorSVG },
  warning: { modifier: "healthcheck-badge--warning", icon: TriangleAlertSVG },
  info: { modifier: "healthcheck-badge--info", icon: HealthcheckInfoSVG },
};

/**
 * Displays the API healthcheck, whatever the API reports.
 *
 * Every row is drawn from status and message alone, so a healthcheck added on the API shows up
 * here with no change to this file. A branch on a given check or domain defeats that.
 */
class DisplayHealthcheckAdministration extends Component {
  /**
   * Invoked immediately after component is mounted.
   * Sets the administration workspace action and loads healthcheck data.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(
      DisplayAdministrationHealthcheckActions,
    );
    await this.props.adminHealthcheckContext.loadHealthcheckData();
  }

  /**
   * Invoked immediately before component is unmounted.
   * Resets the administration workspace action and clears the healthcheck context.
   * @returns {void}
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminHealthcheckContext.clearContext();
  }

  /**
   * Returns the checks to render.
   * @returns {HealthcheckChecksCollection|null}
   */
  get healthcheckChecks() {
    return this.props.adminHealthcheckContext.healthcheckData;
  }

  /**
   * Returns true when there is nothing to render yet.
   * @returns {boolean}
   */
  get isLoading() {
    return !this.healthcheckChecks || this.props.adminHealthcheckContext.isProcessing();
  }

  /**
   * Returns how the given status should be drawn, falling back to the neutral badge.
   * @param {string} status
   * @returns {Object}
   */
  getStatusRendering(status) {
    return STATUS_RENDERING[status] ?? STATUS_RENDERING.info;
  }

  /**
   * Renders one check row.
   * @param {HealthcheckCheckEntity} check
   * @param {string} domainKey
   * @param {number} checkIndex
   * @returns {JSX.Element}
   */
  renderCheck(check, domainKey, checkIndex) {
    // The position is a fallback, for the day a check reaches the browser with no key.
    const checkKey = check.key ?? `${domainKey}-check-${checkIndex}`;
    const { modifier, icon: StatusIcon } = this.getStatusRendering(check.status);

    return (
      <div key={checkKey} className="healthcheck-check">
        <div className="healthcheck-check-row">
          <span className={`healthcheck-badge ${modifier}`}>
            <StatusIcon />
          </span>
          <span className="healthcheck-check-message">{check.message}</span>
        </div>
      </div>
    );
  }

  /**
   * Renders one domain and its checks.
   * @param {{key: string, title: string, checks: array<HealthcheckCheckEntity>}} domain
   * @returns {JSX.Element}
   */
  renderDomain(domain) {
    const domainKey = domain.key;

    return (
      <div key={domainKey} className="healthcheck-domain">
        <h4>{domain.title}</h4>
        <div className="healthcheck-domain-section">
          {domain.checks.map((check, checkIndex) => this.renderCheck(check, domainKey, checkIndex))}
        </div>
      </div>
    );
  }

  /**
   * Renders the whole healthcheck, or the spinner and empty states around it.
   * @returns {JSX.Element}
   */
  renderHealthcheck() {
    if (this.isLoading) {
      return <SpinnerSVG />;
    }

    const domains = this.healthcheckChecks.groupByDomain();
    if (domains.length === 0) {
      return (
        <div className="healthcheck-empty">
          <Trans>No healthcheck was returned by the server.</Trans>
        </div>
      );
    }

    return domains.map((domain) => this.renderDomain(domain));
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    const isEndpointEnabled = this.props.adminHealthcheckContext.isHealthcheckEndpointEnabled();

    return (
      <div className="row">
        <div className="healthcheck-settings main-column">
          <div className="main-content">
            <h3>
              <Trans>Passbolt API Status</Trans>
            </h3>
            {isEndpointEnabled ? (
              this.renderHealthcheck()
            ) : (
              <div className="healthcheck-endpoint-disabled">
                <Trans>The health check API endpoint has been disabled in the server configuration.</Trans>
              </div>
            )}
          </div>
          {createSafePortal(
            <>
              <div className="sidebar-help-section">
                <h3>
                  <Trans>What is this page?</Trans>
                </h3>
                <p>
                  <Trans>
                    This page is available to help administrators diagnose if something is wrong with a passbolt
                    installation and help keeping it secure.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The color is really important here so it&apos;s easier for you to spot what&apos;s not running as
                    expected
                  </Trans>
                </p>
                <div className="healthcheck-color-legends">
                  <div className="healthcheck-success">
                    <HealthcheckSuccessSVG /> <Trans>Everything is running as expected.</Trans>
                  </div>
                  <div className="healthcheck-warning">
                    <TriangleAlertSVG />{" "}
                    <Trans>
                      Something inside your configuration is not what we recommend, but you can skip it if it has been
                      done on purpose.
                    </Trans>
                  </div>
                  <div className="healthcheck-fail">
                    <HealthcheckErrorSVG />{" "}
                    <Trans>There is an error with the current configuration, you might want to resolve it.</Trans>
                  </div>
                  <div className="healthcheck-info">
                    <HealthcheckInfoSVG /> <Trans>This is just an information shared, no action is required.</Trans>
                  </div>
                </div>
              </div>
              <div className="sidebar-help-section">
                <h3>
                  <Trans>Something wrong?</Trans>
                </h3>
                <p>
                  <Trans>
                    Hang in there! Depending your installation, you might need to check the documentation in order to
                    run the healthcheck from the CLI
                  </Trans>
                </p>
                <a
                  className="button"
                  href="https://www.passbolt.com/docs/admin/server-maintenance/passbolt-api-status/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileTextSVG />
                  <span>
                    <Trans>Read the documentation</Trans>
                  </span>
                </a>
              </div>
            </>,
            document.getElementById("administration-help-panel"),
          )}
        </div>
      </div>
    );
  }
}

DisplayHealthcheckAdministration.propTypes = {
  adminHealthcheckContext: PropTypes.any, // The healthcheck context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  t: PropTypes.func, // translation function
};

export default withAdministrationWorkspace(
  withAdministrationHealthcheck(withTranslation("common")(DisplayHealthcheckAdministration)),
);
