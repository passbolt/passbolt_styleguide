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
 * @since         5.0.0
 */

import React from "react";
import PropTypes from "prop-types";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import ShareSVG from "../../../../img/svg/share.svg";
import CloseSVG from "../../../../img/svg/close.svg";
import FilterSVG from "../../../../img/svg/filter.svg";
import VenetianMaskSVG from "../../../../img/svg/venetian_mask.svg";
import CalendarClockSVG from "../../../../img/svg/calendar_clock.svg";
import FavoriteSVG from "../../../../img/svg/favorite.svg";
import OwnedByMeSVG from "../../../../img/svg/owned_by_me.svg";
import {withRouter} from "react-router-dom";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";

/**
 * This component allows to filter resources
 */
class DisplayResourcesWorkspaceFilters extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleItemsIOwnClick = this.handleItemsIOwnClick.bind(this);
    this.handlePrivateClick = this.handlePrivateClick.bind(this);
    this.handleSharedWithMeClick = this.handleSharedWithMeClick.bind(this);
    this.handleResourcesExpiredClick = this.handleResourcesExpiredClick.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
  }

  /**
   * Is all items filter
   * @returns {boolean}
   */
  get isAllItemsFilterToDisplay() {
    const filterType = this.props.resourceWorkspaceContext.filter.type;
    return filterType === ResourceWorkspaceFilterTypes.NONE ||
      filterType === ResourceWorkspaceFilterTypes.ALL ||
      filterType === ResourceWorkspaceFilterTypes.FOLDER ||
      filterType === ResourceWorkspaceFilterTypes.ROOT_FOLDER ||
      filterType === ResourceWorkspaceFilterTypes.TAG ||
      filterType === ResourceWorkspaceFilterTypes.GROUP ||
      filterType === ResourceWorkspaceFilterTypes.TEXT ||
      filterType === ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED;
  }

  /**
   * Get selected filter to display
   * @returns {Element}
   */
  get displaySelectedFilter() {
    switch (this.props.resourceWorkspaceContext.filter.type) {
      case ResourceWorkspaceFilterTypes.FAVORITE:
        return <>
          <FavoriteSVG className="star"/>
          <span><Trans>Starred</Trans></span>
        </>;
      case ResourceWorkspaceFilterTypes.SHARED_WITH_ME:
        return <>
          <ShareSVG/>
          <span><Trans>Shared with me</Trans></span>
        </>;
      case ResourceWorkspaceFilterTypes.EXPIRED:
        return <>
          <CalendarClockSVG/>
          <span><Trans>Expired</Trans></span>
        </>;
      case ResourceWorkspaceFilterTypes.ITEMS_I_OWN:
        return <>
          <OwnedByMeSVG/>
          <span><Trans>Items I own</Trans></span>
        </>;
      case ResourceWorkspaceFilterTypes.PRIVATE:
        return <>
          <VenetianMaskSVG/>
          <span><Trans>Private</Trans></span>
        </>;
      default:
        return <>
        </>;
    }
  }

  /**
   * Whenever the filter "Favorite" has been selected
   */
  handleFavoriteClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.FAVORITE};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the filter "Items I own" has been selected
   */
  handleItemsIOwnClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the filter "Private" has been selected
   */
  handlePrivateClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.PRIVATE};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the filter "Shared with me" has been selected
   */
  handleSharedWithMeClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the filter "Expired" has been selected
   */
  handleResourcesExpiredClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.EXPIRED};
    this.props.history.push({pathname: '/app/passwords/filter/expired', state: {filter}});
  }

  /**
   * Whenever a filter has been removed go back to all items filter
   */
  handleRemoveFilterClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.ALL};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="actions-filter" ref={this.props.actionsFilterRef}>
        {this.isAllItemsFilterToDisplay &&
          <Dropdown>
            <DropdownButton>
              <FilterSVG/>
              <span><Trans>All items</Trans></span>
              <CaretDownSVG/>
            </DropdownButton>
            <DropdownMenu>
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.handleFavoriteClick}>
                  <FavoriteSVG className="star"/>
                  <span><Trans>Starred</Trans></span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.handleSharedWithMeClick}>
                  <ShareSVG/>
                  <span><Trans>Shared with me</Trans></span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.handleItemsIOwnClick}>
                  <OwnedByMeSVG/>
                  <span><Trans>Items I own</Trans></span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.handlePrivateClick}>
                  <VenetianMaskSVG/>
                  <span><Trans>Private</Trans></span>
                </button>
              </DropdownMenuItem>
              {this.props.passwordExpiryContext.isFeatureEnabled() &&
                <DropdownMenuItem>
                  <button type="button" className="no-border" onClick={this.handleResourcesExpiredClick}>
                    <CalendarClockSVG/>
                    <span><Trans>Expired</Trans></span>
                  </button>
                </DropdownMenuItem>
              }
            </DropdownMenu>
          </Dropdown>
        }
        {!this.isAllItemsFilterToDisplay &&
        <div className="button button-action-filtered">
          {this.displaySelectedFilter}
          <span className="divider">
            <button type="button" className="button-transparent" onClick={this.handleRemoveFilterClick}>
              <CloseSVG className="close"/>
            </button>
          </span>
        </div>
        }
      </div>
    );
  }
}

DisplayResourcesWorkspaceFilters.propTypes = {
  actionsFilterRef: PropTypes.object, // The forwarded ref of the filters buttons container
  passwordExpiryContext: PropTypes.object, // the password expiry context
  history: PropTypes.object, // The history property
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
  t: PropTypes.func, // The translation function
};

export default withRouter(withPasswordExpiry(withResourceWorkspace(withTranslation('common')(DisplayResourcesWorkspaceFilters))));
