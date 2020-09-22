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
        this.bindHandlers()
    }

    /**
     * Bind the component handlers
     */
    bindHandlers() {
        this.handleAllItemsClick = this.handleAllItemsClick.bind(this);
        this.handleRecentlyModifiedClick = this.handleRecentlyModifiedClick.bind(this);
    }

    /**
     * Returns true if the All Items shortcut is currently selected
     */
    get isAllItemsSelected() {
        return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ALL;
    }

    /**
     * Returns true if the Recently Modified shortcut is currently selected
     */
    get isRecentlyModifiedSelected() {
        return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED;
    }

    /**
     * Whenever the shortcut "All items" has been selected
     */
    handleAllItemsClick() {
        const filter = {type: ResourceWorkspaceFilterTypes.ALL}
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }

    /**
     * Whenever the shortcut "Recently modified" has been selected
     */
    handleRecentlyModifiedClick() {
        const filter = {type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED}
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }


    render() {
        return (
            <div className="navigation first shortcuts">
                <ul >
                    <li>
                        <div className={"row " + (this.isAllItemsSelected ? "selected" : "") }>
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a onClick={this.handleAllItemsClick}>
                                        <span>All items</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a href="#"><span>Favorites</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={"row " + (this.isRecentlyModifiedSelected ? "selected" : "") }>
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a onClick={this.handleRecentlyModifiedClick}>
                                        <span>Recently Modified</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a href="#"><span>Shared with me</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a href="#"><span>Owned by me</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

FilterResourcesByShortcuts.propTypes = {
    history: PropTypes.object,
    resourceWorkspaceContext: PropTypes.object
}

export default withRouter(withResourceWorkspace(FilterResourcesByShortcuts));
