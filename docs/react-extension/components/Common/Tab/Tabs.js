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
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";

/**
 * Tabs component to handle the display of selected tab
 */
class Tabs extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallback();
  }

  /**
   * Default state
   * @param props Component props
   */
  getDefaultState(props) {
    return {
      activeTabName: props.activeTabName
    };
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  /**
   * Toggle currently active tab
   * @param tabItem The item which represents the tab
   */
  handleTabClick(tabItem) {
    this.setState({activeTabName: tabItem.name});
    if (typeof tabItem.onClick == 'function') {
      tabItem.onClick();
    }
  }

  render() {
    return (
      <div className="tabs">
        <ul className="tabs-nav tabs-nav--bordered">
          {
            this.props.children.map(({key, props}) =>
              <Tab
                key={key}
                name={props.name}
                onClick={ () => this.handleTabClick(props)}
                isActive={props.name === this.state.activeTabName}
              />)
          }
        </ul>
        <div className="tabs-active-content">
          {this.props.children.find(tab => tab.props.name === this.state.activeTabName).props.children}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeTabName: PropTypes.string, // The active tab name
  children: PropTypes.any // The different tab components
};

export default Tabs;

