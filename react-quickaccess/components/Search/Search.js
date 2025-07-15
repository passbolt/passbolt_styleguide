import React from "react";
import PropTypes from "prop-types";
import {withTranslation, Trans} from "react-i18next";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import SearchSVG from "../../../img/svg/search.svg";
import CloseSVG from "../../../img/svg/close.svg";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.createReferences();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.focus();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.searchInputRef = React.createRef();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  focus() {
    const canFocus = document.activeElement === document.body || document.activeElement === null;
    if (canFocus) {
      this.searchInputRef.current.focus();
    }
  }

  handleInputChange(event) {
    this.props.context.updateSearch(event.target.value);
  }

  /**
   * Handle clearing of search text
   */
  clearSearchInput() {
    this.props.context.updateSearch('');
    this.searchInputRef.current.focus();
  }

  render() {
    return (
      <div className="search-wrapper">
        <div className="input search required">
          <label className="visually-hidden"><Trans>Search</Trans></label>
          <input name="search" maxLength="50" type="search" placeholder={this.translate("Search")} autoComplete="off"
            ref={this.searchInputRef} onChange={this.handleInputChange} value={this.props.context.search} />
          <div className="search-button-wrapper">
            { this.props.context.search ?
              <button className="button button-transparent" name="clear-button" onClick={this.clearSearchInput}>
                <CloseSVG/>
                <span className="visuallyhidden"><Trans>Clear</Trans></span>
              </button>
              :
              <div className="search-icon">
                <SearchSVG/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common', {withRef: true})(Search));
