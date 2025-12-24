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
 * @since         3.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

/**
 * This component display the description section of a resource
 */
class DisplayResourceDetailsDescription extends React.Component {
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
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /*
   * =============================================================
   *  Getter helpers
   * =============================================================
   */
  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({ open });
  }

  /*
   * =============================================================
   *  Display helpers
   * =============================================================
   */
  /**
   * @returns {boolean}
   */
  hasNoDescription() {
    return !this.resource.metadata.description || this.resource.metadata.description?.length === 0;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="detailed-description accordion sidebar-section">
        <div className="accordion-header">
          <h4>
            <button type="button" onClick={this.handleTitleClickEvent} className="link no-border section-opener">
              <span className="accordion-title">
                <Trans>Description</Trans>
              </span>
              {this.state.open && <CaretDownSVG />}
              {!this.state.open && <CaretRightSVG />}
            </button>
          </h4>
        </div>
        {this.state.open && (
          <div className="accordion-content">
            {this.hasNoDescription() && (
              <p className="description-content">
                <span className="empty-content">
                  <Trans>There is no description.</Trans>
                </span>
              </p>
            )}
            {!this.hasNoDescription() && <p className="description-content">{this.resource.metadata.description}</p>}
          </div>
        )}
      </div>
    );
  }
}

DisplayResourceDetailsDescription.propTypes = {
  resourceWorkspaceContext: PropTypes.any, // The resource
  t: PropTypes.func, // The translation function
};

export default withResourceWorkspace(withTranslation("common")(DisplayResourceDetailsDescription));
