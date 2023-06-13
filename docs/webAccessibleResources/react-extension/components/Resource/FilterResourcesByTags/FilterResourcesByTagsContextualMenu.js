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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import {filterByTagsOptions} from "./FilterResourcesByTagsList";
import {Trans, withTranslation} from "react-i18next";

class FilterResourcesByTagsContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFilterClickEvent = this.handleFilterClickEvent.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  /**
   * Handle click on the filter type menu option.
   * @param {string} filterType
   */
  handleFilterClickEvent(filterType) {
    this.props.onFilterSelected(filterType);
    this.handleHide();
  }

  /**
   * Handle hide contextual menu
   */
  handleHide() {
    if (typeof this.props.onBeforeHide === 'function') {
      this.props.onBeforeHide();
    }
    this.props.hide();
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.handleHide}
        left={this.props.left}
        top={this.props.top}
        className={this.props.className}>
        <li key="option-filter-all-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button type="button" className="link no-border" id="all-tag" onClick={() => this.handleFilterClickEvent(filterByTagsOptions.all)}><span><Trans>All tags</Trans></span></button>
              </div>
            </div>
          </div>
        </li>
        <li key="option-filter-personal-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button type="button" className="link no-border" id="personal-tag" onClick={() => this.handleFilterClickEvent(filterByTagsOptions.personal)}><span><Trans>My tags</Trans></span></button>
              </div>
            </div>
          </div>
        </li>
        <li key="option-filter-share-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button type="button" className="link no-border" id="shared-tag" onClick={() => this.handleFilterClickEvent(filterByTagsOptions.shared)}><span><Trans>Shared tags</Trans></span></button>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

FilterResourcesByTagsContextualMenu.propTypes = {
  onFilterSelected: PropTypes.func,
  left: PropTypes.number, // left position in px of the menu
  hide: PropTypes.func, // Hide the contextual menu
  onBeforeHide: PropTypes.func, // On before hide callBack
  top: PropTypes.number, // top position in px of the menu
  className: PropTypes.string, // Class name to add
};

export default withTranslation("common")(FilterResourcesByTagsContextualMenu);
