import React from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  withResourceTypesLocalStorage
} from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import CloseSVG from "../../../img/svg/close.svg";
import FavoriteSVG from "../../../img/svg/favorite.svg";
import OwnedByMeSVG from "../../../img/svg/owned_by_me.svg";
import ClockSVG from "../../../img/svg/clock.svg";
import ShareSVG from "../../../img/svg/share.svg";

class MoreFiltersPage extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.history.goBack();
  }

  /**
   * Has metadata types settings
   * @returns {boolean}
   */
  hasMetadataTypesSettings() {
    return Boolean(this.props.metadataTypeSettings);
  }

  /**
   * Can create password
   * @returns {boolean}
   */
  canCreatePassword() {
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" title={this.translate("Go back")} onClick={this.handleGoBackClick}>
            <CaretLeftSVG/>
            <span className="primary-action-title">
              <Trans>Filters</Trans>
            </span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <CloseSVG/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <div className="list-section">
          <ul className="list-items">
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/favorite"}>
                <FavoriteSVG/>
                <span className="filter-title"><Trans>Favorites</Trans></span>
                <CaretRightSVG/>
              </Link>
            </li>
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/owned-by-me"}>
                <OwnedByMeSVG/>
                <span className="filter-title"><Trans>Items I own</Trans></span>
                <CaretRightSVG/>
              </Link>
            </li>
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/recently-modified"}>
                <ClockSVG/>
                <span className="filter-title"><Trans>Recently modified</Trans></span>
                <CaretRightSVG/>
              </Link>
            </li>
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/shared-with-me"}>
                <ShareSVG/>
                <span className="filter-title"><Trans>Shared with me</Trans></span>
                <CaretRightSVG/>
              </Link>
            </li>
          </ul>
        </div>
        {this.hasMetadataTypesSettings() && this.canCreatePassword() &&
        <div className="submit-wrapper">
          <Link to="/webAccessibleResources/quickaccess/resources/create" id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
        }
      </div>
    );
  }
}

MoreFiltersPage.propTypes = {
  history: PropTypes.object,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  t: PropTypes.func, // The translation function
};

export default withRouter(withResourceTypesLocalStorage(withMetadataTypesSettingsLocalStorage(withTranslation('common')(MoreFiltersPage))));
