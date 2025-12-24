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
 * @since         3.2.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withAdministrationWorkspace } from "../../../contexts/AdministrationWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import HeartSVG from "../../../../img/svg/heart.svg";
import Select from "../../Common/Select/Select";
import DisplayAdministrationInternationalisationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationInternationalisationActions/DisplayAdministrationInternationalisationActions";
import { withAdminInternationalization } from "../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext";
import { createSafePortal } from "../../../../shared/utils/portals";

/**
 * This component allows to display the internationalisation for the administration
 */
class DisplayInternationalizationAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.props.adminInternationalizationContext.findLocale();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminInternationalizationContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    this.props.adminInternationalizationContext.setLocale(event.target.value);
  }
  /**
   * Get the supported locales
   * @returns {array}
   */
  get supportedLocales() {
    if (this.props.context.siteSettings.supportedLocales) {
      return this.props.context.siteSettings.supportedLocales.map((supportedLocale) => ({
        value: supportedLocale.locale,
        label: supportedLocale.label,
      }));
    }
    return [];
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const lang = this.props.adminInternationalizationContext.getLocale();
    const hasWarnings =
      this.props.adminInternationalizationContext.getCurrentLocale() !== null &&
      this.props.adminInternationalizationContext.hasLocaleChanges();

    return (
      <div className="row">
        <div className="internationalisation-settings main-column">
          <div className="main-content">
            <h3 className="title">
              <Trans>Internationalisation</Trans>
            </h3>
            <form className="form">
              <div className="select-wrapper input">
                <label htmlFor="app-locale-input">
                  <Trans>Language</Trans>
                </label>
                <Select
                  id="locale-input"
                  name="locale"
                  items={this.supportedLocales}
                  value={lang}
                  onChange={this.handleInputChange}
                />
                <p>
                  <Trans>The default language of the organisation.</Trans>
                </p>
              </div>
            </form>
          </div>
          {hasWarnings && (
            <div className="warning message">
              <div>
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          )}
        </div>
        <DisplayAdministrationInternationalisationActions />
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3>
              <Trans>Want to contribute?</Trans>
            </h3>
            <p>
              <Trans>
                Your language is missing or you discovered an error in the translation, help us to improve passbolt.
              </Trans>
            </p>
            <a
              className="button"
              href="https://www.passbolt.com/docs/contribute/translation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HeartSVG />
              <span>
                <Trans>Contribute</Trans>
              </span>
            </a>
          </div>,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

DisplayInternationalizationAdministration.propTypes = {
  context: PropTypes.object, // The application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminInternationalizationContext: PropTypes.object, // The administration internationalization context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withAdminInternationalization(
    withAdministrationWorkspace(withTranslation("common")(DisplayInternationalizationAdministration)),
  ),
);
