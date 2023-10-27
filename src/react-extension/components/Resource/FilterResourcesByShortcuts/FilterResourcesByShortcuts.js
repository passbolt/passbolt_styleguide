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
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";

/**
 * This component allows to select shortcut filters applied on resources
 */
class FilterResourcesByShortcuts extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.bindHandlers();
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleAllItemsClick = this.handleAllItemsClick.bind(this);
    this.handleItemsIOwnClick = this.handleItemsIOwnClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSharedWithMeClick = this.handleSharedWithMeClick.bind(this);
    this.handleRecentlyModifiedClick = this.handleRecentlyModifiedClick.bind(this);
    this.handleResourcesExpiredClick = this.handleResourcesExpiredClick.bind(this);
  }

  componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
  }

  /**
   * Returns true if the All Items shortcut is currently selected
   */
  get isAllItemsSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ALL;
  }

  /**
   * Returns true if the All Items shortcut is currently selected
   */
  get isItemsIOwnSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ITEMS_I_OWN;
  }

  /**
   * Returns true if the Favorite shortcut is currently selected
   */
  get isFavoriteSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.FAVORITE;
  }

  /**
   * Returns true if the Shared With Me shortcut is currently selected
   */
  get isSharedWithMeSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.SHARED_WITH_ME;
  }

  /**
   * Returns true if the Recently modified shortcut is currently selected
   */
  get isRecentlyModifiedSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED;
  }

  /**
   * Returns true if the Expired shortcut is currently selected
   */
  get isResourcesExpiredSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.EXPIRED;
  }

  /**
   * Whenever the shortcut "All items" has been selected
   */
  handleAllItemsClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.ALL};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the shortcut "Recently modified" has been selected
   */
  handleRecentlyModifiedClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the shortcut "Favorite" has been selected
   */
  handleFavoriteClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.FAVORITE};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the shortcut "Items I own" has been selected
   */
  handleItemsIOwnClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the shortcut "Shared with me" has been selected
   */
  handleSharedWithMeClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the shortcut "Expired" has been selected
   */
  handleResourcesExpiredClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.EXPIRED};
    this.props.history.push({pathname: '/app/passwords/filter/expired', state: {filter}});
  }

  render() {
    return (
      <div className="navigation-secondary navigation-shortcuts">
        <ul >
          <li>
            <div className={`row ${this.isAllItemsSelected ? "selected" : ""}`} onClick={this.handleAllItemsClick}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border">
                    <span><Trans>All items</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={`row ${this.isFavoriteSelected ? "selected" : ""}`} onClick={this.handleFavoriteClick}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border">
                    <span><Trans>Favorites</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={`row ${this.isRecentlyModifiedSelected ? "selected" : ""}`} onClick={this.handleRecentlyModifiedClick}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border">
                    <span><Trans>Recently modified</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={`row ${this.isSharedWithMeSelected ? "selected" : ""}`} onClick={this.handleSharedWithMeClick}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border">
                    <span><Trans>Shared with me</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={`row ${this.isItemsIOwnSelected ? "selected" : ""}`} onClick={this.handleItemsIOwnClick}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button type="button" className="link no-border">
                    <span><Trans>Owned by me</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          {this.props.passwordExpiryContext.isFeatureEnabled() &&
            <li>
              <div className={`row ${this.isResourcesExpiredSelected ? "selected" : ""}`} onClick={this.handleResourcesExpiredClick}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button type="button" className="link no-border">
                      <span><Trans>Expired</Trans></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    );
  }
}

FilterResourcesByShortcuts.propTypes = {
  context: PropTypes.object, // the application context
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  passwordExpiryContext: PropTypes.object, // the password expiry context
};

export default withRouter(withAppContext(withResourceWorkspace(withPasswordExpiry(withTranslation("common")(FilterResourcesByShortcuts)))));
