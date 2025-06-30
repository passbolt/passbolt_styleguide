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
 * @since         5.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {resourceLinkAuthorizedProtocols, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import sanitizeUrl, {urlProtocols} from "../../../lib/Sanitize/sanitizeUrl";

/**
 * This component display the uris of a resource
 */
class DisplayResourceDetailsURIs extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: false,
    };
  }

  /**
   * Bind callback methods to the component instance
   * @returns {void}
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Get the main uri
   * @return {string}
   */
  get mainUri() {
    return this.resource?.metadata.uris?.[0];
  }

  /**
   * Getter for additional URIs.
   * @returns {Array} An array of additional URIs, excluding the first one.
   */
  get additionalUris() {
    return this.resource?.metadata.uris?.slice(1) || [];
  }

  /**
   * Handle when the user clicks the accordion title to toggle open/closed state
   * @returns {void}
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * the resource safe uri
   * @param {string} uri
   * @return {string}
   */
  safeUri(uri) {
    return sanitizeUrl(
      uri, {
        whiteListedProtocols: resourceLinkAuthorizedProtocols,
        defaultProtocol: urlProtocols.HTTPS
      });
  }
  /**
   * Handles the click event to navigate to the resource URI.
   * @param {string} uri - The URI of the resource to navigate to.
   * @return {void}
   */
  handleGoToResourceUriClick(uri) {
    this.props.resourceWorkspaceContext.onGoToResourceUriRequested(uri);
  }


  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="detailed-information accordion sidebar-section uris">
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClickEvent} className="link no-border section-opener">
              <span className="accordion-title">
                <Trans>URIs</Trans>
              </span>
              {this.state.open && <CaretDownSVG />
              }
              {!this.state.open && <CaretRightSVG />
              }
            </button>
          </h4>
        </div>
        {this.state.open && <div className="accordion-content">
          <div className="information-label">
            <span className="main-uri label"><Trans>Main Uri</Trans></span>
            {
              this.additionalUris.length > 0 &&
                                <span className="addictional-uris label"><Trans>Additional URIs</Trans></span>
            }
          </div>
          <div className="information-value">
            <span className="main-uri value">
              {this.safeUri(this.mainUri) &&
                                    <button type="button" className="link no-border" onClick={() => this.handleGoToResourceUriClick(this.mainUri)}>
                                      <span>{this.mainUri}</span></button>
              }
            </span>
            {
              this.additionalUris.length > 0 && <span className="additional-uris value">
                {this.additionalUris.map((uri, index) => (
                  this.safeUri(uri) &&
                                        <button key={uri + index} type="button" className="link no-border" onClick={() => this.handleGoToResourceUriClick(uri)}>
                                          <span>{uri}</span></button>
                ))}
              </span>
            }
          </div>
        </div>
        }
      </div>
    );
  }
}

DisplayResourceDetailsURIs.propTypes = {
  resourceWorkspaceContext: PropTypes.any, // The resource
  t: PropTypes.func, // The translation function
};

export default withResourceWorkspace(withTranslation('common')(DisplayResourceDetailsURIs));
