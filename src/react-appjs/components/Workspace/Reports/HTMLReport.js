/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

class HTMLReport extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.bindElements();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      loading: true
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props

    // If url changes, we force the loading state.
    if(oldProps.url !== newProps.url) {
      this.setState({ "loading": true })
    }
  }

  bindElements() {
    this.onIframeLoaded = this.onIframeLoaded.bind(this);
    this.onIframeError = this.onIframeError.bind(this);
    this.ReportLoading = this.ReportLoading.bind(this);
    this.ReportIframe = this.ReportIframe.bind(this);
  }

  onIframeLoaded() {
   this.setState({'loading' : false});
  }

  /**
   * On error.
   * TODO: iframes don't return onError for a 404, 500, etc... another way to do it would be to first fetch the content
   * from the server and check the answer. But it's heavier.
   */
  onIframeError() {
    console.error('error while loading iframe');
  }

  ReportLoading() {
    return (
      <div className="report-page">
        <div className="report-loading">
          <div className="spinner" />
          <p>Report is loading</p>
        </div>
      </div>
    );
  }

  ReportIframe() {
    // If no url provided, return an empty div.
    // loading state will basically remain active.
    if (!this.props.url) {
      return <div />;
    }

    return <iframe id="report-iframe" src={this.props.url} width="100%" onLoad={this.onIframeLoaded} onError={this.onIframeError} />;
  }

  render() {
    return (
      <div className="report-wrapper">
        {this.state.loading &&
          <this.ReportLoading />
        }
        <this.ReportIframe className={this.state.loading ? "hidden" : ""} />
      </div>
    );
  }
}

HTMLReport.propTypes = {
  url: PropTypes.string,
};

export default HTMLReport;