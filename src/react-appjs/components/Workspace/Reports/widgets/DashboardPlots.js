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
import $ from 'jquery';
import ReactDOM from "react-dom";

class DashboardPlots extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.selectors = {
      'plot-container' : '.plot-container',
      'bar' : '.bar'
    };
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      loading: true,
    }
  }

  /**
   * ComponentDidMount
   */
  componentDidMount() {
    this.animatePlots();
  }

  /**
   * Animate plots.
   */
  animatePlots(){
    const el = ReactDOM.findDOMNode(this);
    $(this.selectors['plot-container'], $(el)).each((index, plot) => {
      const bar = $(this.selectors['bar'], plot);
      const percent = bar.data('percent');
      bar.css('width', '0%');
      bar.animate({width: percent + "%"}, 1000);
    });
  }

  /**
   * Render an individual plot.
   * @param props
   * @return {*}
   */
  plot (props) {
    return (
      <div className="plot-container">
        <div className="plot">
          <span className="label">{props.label}</span>
          <div className="bar-container">
            <div className="bar" data-percent={props.percent} style={{width: + props.percent + '%'}} />
          </div>
        </div>
        <div className="plot-value">{props.value}</div>
      </div>
    );
  }

  render() {
    return (
      <div className={"report-widget widget-dashboard-plots " + this.props.className}>
        <h2>{this.props.title}</h2>
        <div className="plots">
          {this.props.data.map((val, i) => {
            return <this.plot key={i} label={val.label} value={val.value} percent={val.percent || val.value} />
          })}
        </div>
      </div>
    );
  }
}

DashboardPlots.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  className: PropTypes.string
};

export default DashboardPlots;

