
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
 * @since         2.11.0
 */


import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import React from "react";
import PasswordSidebarCommentSection from "./PasswordSidebarCommentSection";
import AddCommentPageObject from "./AddComment.test.page.object";

/**
 * The PasswordSidebarCommentSection component represented as a page
 */
export default class PasswordSidebarCommentSectionPage {

    /**
     * Default constructor
     * @param appContext An app context
     * @param props Props to attach
     */
    constructor(appContext, props) {
        this._page = render(
            <AppContext.Provider value={appContext}>
                <PasswordSidebarCommentSection {...props}/>
            </AppContext.Provider>
        );
        this.setupPageObjects();
    }

    /**
     * Set up the objects of the page
     */
    setupPageObjects() {
        this._addComment = new AddCommentPageObject(this._page.container);
        this._titleHeader = new TitleHeaderPageObject(this._page.container);
        this._addIcon = new AddIconPageObject(this._page.container);
    }

    /**
     * Return the page object of the title header
     * @returns {{select: select}}
     */
    get title() {
        return this._titleHeader;
    }

    /**
     * Return the page object of add icon element
     */
    get addIcon() {
        return this._addIcon;
    }

    /**
     * Returns the page object of add comment component
     */
    get addComment() {
        return this._addComment;
    }

}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {

    /**
     * Default constructor
     * @param container The container which includes the AddComment Component
     */
    constructor(container) {
        this._container = container;
    }

    /**
     * Returns the clickable area of the header
     */
    get hyperlink() {
        return this._container.querySelector(".accordion-header h4 a");
    }

    /** Click on the title */
    async click()  {
        const leftClick = {button: 0};
        fireEvent.click(this.hyperlink, leftClick);
        await waitFor( () => {} );
    }

}


/**
 * Page object for the AddIcon element
 */
class AddIconPageObject {

    /**
     * Default constructor
     * @param container The container which includes the AddComment Component
     */
    constructor(container) {
        this._container = container;
    }

    /**
     * Returns the icon element
     */
    get icon() {
        return  this._container.querySelector('.section-action');
    }

    /**
     * Returns true if the page object exists in the DOM
     * @returns {boolean}
     */
    exists() {
      return this.icon !== null;
    }

    /**
     * Click on the page object
     */
    async click() {
        this.icon.focus();
        const leftClick = {button: 0};
        fireEvent.click(this.icon, leftClick);
        await waitFor( () => {} );
    }

}





