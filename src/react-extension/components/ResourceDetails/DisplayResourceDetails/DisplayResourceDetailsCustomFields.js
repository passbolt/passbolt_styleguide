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
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import HiddenPassword from "../../../../shared/components/Password/HiddenPassword";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import EyeCloseSVG from "../../../../img/svg/eye_close.svg";
import EyeOpenSVG from "../../../../img/svg/eye_open.svg";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import SpinnerSVG from "../../../../img/svg/spinner.svg";

/**
 * This component display the custom fields section of a resource
 */
class DisplayResourceDetailsCustomFields extends React.Component {
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
   * @returns {object}
   */
  getDefaultState() {
    return {
      open: false,
      secrets: [],
      secretPreviewed: null,
      isSecretsDecrypting: false,
      showAll: false
    };
  }

  /**
   * Bind callback methods to the component instance
   * @returns {void}
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleSecretClickEvent = this.handleSecretClickEvent.bind(this);
    this.handleShowAllEvent = this.handleShowAllEvent.bind(this);
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
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
   * Check if a secret is currently being previewed
   * @param {string} id - The ID of the secret to check
   * @returns {boolean} True if the secret is previewed or show all is active
   */
  isPreviewed(id) {
    return this.state.secretPreviewed === id || this.state.showAll;
  }

  /**
   * Get the decrypted secret value for a given ID
   * @param {string} id - The ID of the secret to retrieve
   * @returns {string|number|boolean} The secret value or undefined if not found
   */
  getSecretValue(id) {
    return this.state.secrets.find(secret => secret.id === id)?.secretValue;
  }

  /**
   * Handle preview secret button click event
   * @param {string} id - The ID of the secret to preview/hide
   * @returns {Promise<void>}
   * @todo Implement secret decryption logic in the next ticket
   */
  async handleSecretClickEvent(id) {
    if (!id) {
      if (this.state.secretPreviewed === id) {
        this.setState({secretPreviewed: null});
      } else {
        this.setState({secretPreviewed: id});
      }
    }
  }

  /**
   * Handle show/hide all secrets button click event
   * @returns {Promise<void>}
   */
  async handleShowAllEvent() {
    await this.handleSecretClickEvent();
    this.setState({showAll: !this.state.showAll, secretPreviewed: null});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canCopySecret = this.props.rbacContext.canIUseUiAction(uiActions.SECRETS_COPY);
    const canPreviewSecret = this.props.context.siteSettings?.canIUse("previewPassword");

    return (
      <div className="detailed-information accordion sidebar-section custom-fields">
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClickEvent} className="link no-border section-opener">
              <span className="accordion-title">
                <Trans>Custom fields</Trans>
              </span>
              {this.state.open && <CaretDownSVG />
              }
              {!this.state.open && <CaretRightSVG />
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
                        <div className="accordion-content">
                          <div className="fields">
                            <div className="information-label">
                              {
                                this.resource.metadata.customFields.map(customField => (
                                  <span key={customField.id} className={`${customField.metadataKey} label`}>
                                    {customField.metadataKey}
                                  </span>
                                ))
                              }
                            </div>
                            <div className="information-value">
                              {
                                this.resource.metadata.customFields.map(customField => {
                                  const isPreviewed = this.isPreviewed(customField.id);

                                  return (
                                    <span
                                      key={customField.id}
                                      className={`${customField.metadataKey} field-secret-value`}
                                    >
                                      <div className={`secret secret-custom-fields ${canPreviewSecret ? "secret-with-preview" : ""} ${isPreviewed ? "" : "secret-copy"}`}
                                        title={isPreviewed ? this.getSecretValue(customField.id) : "secret"}>
                                        <HiddenPassword
                                          canClick={canCopySecret}
                                          preview={isPreviewed ? this.getSecretValue(customField.id) : ""}
                                          onClick={() => this.handleSecretClickEvent(customField.id)}
                                        />
                                      </div>
                                      {canPreviewSecret && (
                                        <button
                                          type="button"
                                          onClick={() => this.handleSecretClickEvent(customField.id)}
                                          className="password-view inline button-transparent"
                                        >
                                          {isPreviewed ? <EyeCloseSVG /> : <EyeOpenSVG />}
                                        </button>
                                      )}
                                    </span>
                                  );
                                })
                              }
                            </div>
                          </div>
                          {!this.state.showAll ?
                            <button type="button" disabled={this.state.isSecretDecrypting} onClick={this.handleShowAllEvent}>
                              <EyeOpenSVG /><Trans>Show all</Trans>{this.state.secrets.length > 0 && <SpinnerSVG />}
                            </button>
                            :
                            <button type="button" disabled={this.state.isSecretDecrypting} onClick={this.handleShowAllEvent}>
                              <EyeCloseSVG /><Trans>Hide all</Trans>
                            </button>
                          }
                        </div>
        }

      </div>
    );
  }
}

DisplayResourceDetailsCustomFields.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resourceWorkspaceContext: PropTypes.any, // The resource
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withRbac(withTranslation('common')(DisplayResourceDetailsCustomFields))));
