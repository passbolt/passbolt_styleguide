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
        this.handleItemsIOwnClick = this.handleItemsIOwnClick.bind(this);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
        this.handleSharedWithMeClick = this.handleSharedWithMeClick.bind(this);
    }

    /**
     * Returns true if the All Items shortcut is currently selected
     */
    get isAllItemsSelected() {
        return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ALL;
    }

    /**
     * Returns true if the All Items shortcut is currently selected
     */
    get isItemsIOwnSelected() {
        return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ITEMS_I_OWN;
    }

    /**
     * Returns true if the Favorite shortcut is currently selected
     */
    get isFavoriteSelected() {
        return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.FAVORITE;
    }

    /**
     * Returns true if the Shared With Me shortcut is currently selected
     */
    get isSharedWithMeSelected() {
        return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.SHARED_WITH_ME;
    }

    /**
     * Whenever the shortcut "All items" has been selected
     */
    handleAllItemsClick() {
        const filter = {type: ResourceWorkspaceFilterTypes.ALL}
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }

    /**
     * Whenever the shortcut "Favorite" has been selected
     */
    handleFavoriteClick() {
        const filter = {type: ResourceWorkspaceFilterTypes.FAVORITE}
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }


    /**
     * Whenever the shortcut "Items I own" has been selected
     */
    handleItemsIOwnClick() {
        console.log('click')
        const filter = {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN}
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }


    /**
     * Whenever the shortcut "Shared with me" has been selected
     */
    handleSharedWithMeClick() {
        const filter = {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME}
        this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }


    render() {
        return (
            <div className="navigation first shortcuts">
                <ul >
                    <li>
                        <div className={`row ${this.isAllItemsSelected ? "selected" : ""}`}>
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
                        <div className={`row ${this.isFavoriteSelected ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a onClick={this.handleFavoriteClick}>
                                        <span>Favorites</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a href="#"><span>Recents</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={`row ${this.isSharedWithMeSelected ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a onClick={this.handleSharedWithMeClick}>
                                        <span>Shared with me</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={`row ${this.isItemsIOwnSelected ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                                <div className="main-cell">
                                    <a onClick={this.handleItemsIOwnClick}>
                                        <span>Owned by me</span>
                                    </a>
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
