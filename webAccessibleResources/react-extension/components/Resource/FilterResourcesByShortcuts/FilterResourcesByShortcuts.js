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
import HomeSVG from "../../../../img/svg/home.svg";

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
  }

  /**
   * Returns true if the Home shortcut is currently selected
   */
  get isAllItemsSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ALL;
  }
  /**
   * Whenever the shortcut "Home" has been selected
   */
  handleAllItemsClick() {
    const filter = {type: ResourceWorkspaceFilterTypes.ALL};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
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
                    <HomeSVG />
                    <span><Trans>Home</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

FilterResourcesByShortcuts.propTypes = {
  context: PropTypes.object, // the application context
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
};

export default withRouter(withAppContext(withResourceWorkspace(withTranslation("common")(FilterResourcesByShortcuts))));
