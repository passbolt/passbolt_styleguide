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
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import sanitizeUrl, { urlProtocols } from "../../../react-extension/lib/Sanitize/sanitizeUrl";
import { resourceLinkAuthorizedProtocols } from "../../../react-extension/contexts/ResourceWorkspaceContext";
import CaretDownSVG from "../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import GoSVG from "../../../img/svg/go.svg";

/**
 * The URIs section of the resource view page
 */
class ResourceViewPageUris extends React.Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      isOpenAdditionalUris: false, // Is the additional URIs accordion open
    };
    this.handleGoToUrlClick = this.handleGoToUrlClick.bind(this);
    this.handleClickAdditionalUrisSection = this.handleClickAdditionalUrisSection.bind(this);
  }

  /**
   * The primary URI of the resource.
   * @returns {string|undefined}
   */
  get primaryUri() {
    return this.props.uris[0];
  }

  /**
   * The additional URIs of the resource.
   * @returns {Array<string>}
   */
  get additionalUris() {
    return this.props.uris.slice(1);
  }

  /**
   * Sanitize a resource URI, the result is false when the URI is not safe to open.
   * @param {string} uri The URI
   * @returns {string|boolean}
   */
  sanitizeResourceUrl(uri) {
    return sanitizeUrl(uri, {
      whiteListedProtocols: resourceLinkAuthorizedProtocols,
      defaultProtocol: urlProtocols.HTTPS,
    });
  }

  /**
   * Handle the click on the primary URI action. An unsafe URI is not opened.
   * @param {Event} event The click event
   */
  handleGoToUrlClick(event) {
    if (!this.sanitizeResourceUrl(this.primaryUri)) {
      event.preventDefault();
    }
    this.props.onGoToUrl(event);
  }

  /**
   * Handle the click on the additional URIs accordion header.
   */
  handleClickAdditionalUrisSection() {
    this.setState({ isOpenAdditionalUris: !this.state.isOpenAdditionalUris });
  }

  /**
   * Render the primary URI row.
   * @returns {JSX}
   */
  renderUriRow() {
    const primaryUri = this.primaryUri;
    const safePrimaryUri = this.sanitizeResourceUrl(primaryUri);
    return (
      <li className="property">
        <div className="information">
          <span className="property-name">URI</span>
          {primaryUri && safePrimaryUri && (
            <a href={safePrimaryUri} role="button" className="property-value" target="_blank" rel="noopener noreferrer">
              {primaryUri}
            </a>
          )}
          {primaryUri && !safePrimaryUri && <span className="property-value">{primaryUri}</span>}
          {!primaryUri && (
            <span className="property-value empty">
              <Trans>no url provided</Trans>
            </span>
          )}
        </div>
        <a
          href={`${safePrimaryUri ? safePrimaryUri : "#"}`}
          role="button"
          className={`button button-transparent property-action ${!safePrimaryUri ? "disabled" : ""}`}
          onClick={this.handleGoToUrlClick}
          target="_blank"
          rel="noopener noreferrer"
          title={this.props.t("open in a new tab")}
        >
          <GoSVG />
          <span className="visually-hidden">
            <Trans>Open in new window</Trans>
          </span>
        </a>
      </li>
    );
  }

  /**
   * Render the additional URIs accordion row.
   * @returns {JSX}
   */
  renderAdditionalUrisRow() {
    return (
      <li className="property">
        <div className="information">
          <div className="accordion">
            <div className="accordion-header additional-uris" onClick={this.handleClickAdditionalUrisSection}>
              <button type="button" className="link no-border property-name">
                {this.state.isOpenAdditionalUris ? (
                  <CaretDownSVG className="caret-down" />
                ) : (
                  <CaretRightSVG className="caret-right" />
                )}
                <span>
                  <Trans>Additional URIs</Trans>
                </span>
              </button>
            </div>
            {this.state.isOpenAdditionalUris && (
              <div className="accordion-content">
                <div className="list-uris">
                  {this.additionalUris.map((uri, index) => {
                    const safeUri = this.sanitizeResourceUrl(uri);
                    if (safeUri) {
                      return (
                        <a
                          href={safeUri}
                          className="property-value"
                          key={index}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="ellipsis">{uri}</span>
                        </a>
                      );
                    }
                    return (
                      <span className="property-value" key={index}>
                        {uri}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        {this.renderUriRow()}
        {this.additionalUris.length > 0 && this.renderAdditionalUrisRow()}
      </>
    );
  }
}

ResourceViewPageUris.defaultProps = {
  uris: [],
  onGoToUrl: () => {},
};

ResourceViewPageUris.propTypes = {
  uris: PropTypes.arrayOf(PropTypes.string), // The resource URIs, the primary one first
  onGoToUrl: PropTypes.func, // Called when the user clicks the primary URI action, receives the click event
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(ResourceViewPageUris);
