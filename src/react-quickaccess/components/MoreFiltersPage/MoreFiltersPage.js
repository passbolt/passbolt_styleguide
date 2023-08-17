import React from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";

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

  render() {
    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" title={this.translate("Go back")} onClick={this.handleGoBackClick}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title">
              <Trans>Filters</Trans>
            </span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <div className="list-section">
          <ul className="list-items">
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/favorite"}>
                <Icon name="star-stroke"/>
                <span className="filter-title"><Trans>Favorites</Trans></span>
                <Icon name="chevron-right"/>
              </Link>
            </li>
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/owned-by-me"}>
                <Icon name="user"/>
                <span className="filter-title"><Trans>Items I own</Trans></span>
                <Icon name="chevron-right"/>
              </Link>
            </li>
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/recently-modified"}>
                <Icon name="clock"/>
                <span className="filter-title"><Trans>Recently modified</Trans></span>
                <Icon name="chevron-right"/>
              </Link>
            </li>
            <li className="filter-entry">
              <Link to={"/webAccessibleResources/quickaccess/resources/shared-with-me"}>
                <Icon name="share"/>
                <span className="filter-title"><Trans>Shared with me</Trans></span>
                <Icon name="chevron-right"/>
              </Link>
            </li>
          </ul>
        </div>
        <div className="submit-wrapper">
          <Link to="/webAccessibleResources/quickaccess/resources/create" id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
      </div>
    );
  }
}

MoreFiltersPage.propTypes = {
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withRouter(withTranslation('common')(MoreFiltersPage));
