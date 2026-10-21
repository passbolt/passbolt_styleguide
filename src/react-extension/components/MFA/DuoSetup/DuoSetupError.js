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

import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import { DuoSetupErrors } from "../../../contexts/MFAContext";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";

export const DUO_DOCUMENTATION_URL = "https://www.passbolt.com/docs/admin/authentication/mfa/duo";

class DuoSetupError extends Component {
  /**
   * Returns the translated labels for each error code.
   * @returns {Object<string, {title: string, description: string}>}
   */
  get errorLabels() {
    return {
      [DuoSetupErrors.SUBSCRIBER_MISMATCH]: {
        title: this.translate("Sorry, Duo could not be enabled"),
        description: this.translate(
          "Your Duo username does not match your Passbolt username. Please contact your administrator to fix this issue.",
        ),
      },
      [DuoSetupErrors.SETUP_FAILED]: {
        title: this.translate("Duo could not be enabled"),
        description: this.translate("Could not verify your Duo authentication. Please try again."),
      },
    };
  }

  /**
   * Get the labels corresponding to the provided error code.
   * @returns {{ title: string, description: string }} The labels corresponding to the provided error code. Returns the default labels (SETUP_FAILED) if the error code is not found.
   */
  getLabels() {
    const errorLabels = this.errorLabels;
    return errorLabels[this.props.errorCode] ?? errorLabels[DuoSetupErrors.SETUP_FAILED];
  }

  /**
   * @returns {string} The title of the page
   */
  get title() {
    return this.getLabels().title;
  }

  /**
   * @returns {string} The description of the page
   */
  get description() {
    return this.getLabels().description;
  }

  /**
   * Returns the translation function.
   * @returns {function}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <>
        <div className="main-column mfa-configuration">
          <div className="main-content">
            <h3>{this.title}</h3>
            <div className="feedback-card">
              <AnimatedFeedback name="error" />
              <div className="additional-information">
                <p>
                  {this.description}{" "}
                  <a target="_blank" rel="noopener noreferrer" href={DUO_DOCUMENTATION_URL}>
                    <Trans>Learn more</Trans>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button className="button cancel secondary" onClick={this.props?.onCancel}>
            <Trans>Manage providers</Trans>
          </button>
          <button className="button primary form" type="button" onClick={this.props?.onTryAgain}>
            <span>
              <Trans>Retry</Trans>
            </span>
          </button>
        </div>
      </>
    );
  }
}

export default withTranslation("common")(DuoSetupError);
