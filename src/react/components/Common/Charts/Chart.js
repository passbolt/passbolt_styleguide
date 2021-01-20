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
import ReactDOM from "react-dom";
import Area from "../../../lib/reports/widgets/area";
import Gauge from "../../../lib/reports/widgets/gauge";

class Chart extends Component {
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    // @todo Do not use findDOMNode. It doesn’t work with function components and is deprecated in StrictMode. See https://reactjs.org/docs/react-dom.html#finddomnode  react/no-find-dom-node
    // eslint-disable-next-line
    const el = ReactDOM.findDOMNode(this);
    if (this.props.type === "area") {
      const chart = new Area(this.props.data);
      chart.render(el);
    } else if (this.props.type === "gauge") {
      const chart = new Gauge(this.props.data);
      chart.render(el);
    }
  }

  /**
   * Get the chart classname
   * @returns {string}
   */
  getClassName() {
    return `chart chart-${this.props.type}`;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className={this.getClassName()}/>
    );
  }
}

Chart.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
};

export default Chart;
