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

import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {waitFor} from "@testing-library/dom";
import DisplayActionFeedbacks from "./DisplayActionFeedbacks";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayActionFeedbacks component represented as a page
 */
export default class DisplayActionFeedbacksPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayActionFeedbacks {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the container of the index-th feedback
   * @param index The rank of the feedback
   */
  feedback(index) {
    return this._page.container.querySelectorAll('.notification')[index - 1];
  }

  /**
   * Returns the displayed message of the index-th action feedback
   * @param index
   */
  message(index) {
    return this._page.container.querySelectorAll('.message .content')[index - 1].textContent;
  }

  /**
   * Persist the index-th feedback by mousing over it
   * @param index The rank of the feedback
   */
  async persist(index) {
    fireEvent.mouseOver(this.feedback(index));
    await waitFor(() => {});
  }

  /**
   * Close the index-th feedback
   * @param index The rank of the feedback
   */
  async close(index) {
    const closeAction = this.feedback(index).querySelector('.message');
    const leftClick = {button: 0};
    fireEvent.click(closeAction, leftClick);
    await waitFor(() => {});
  }

  /**
   * Copy the index-th feedback
   * @param index The rank of the feedback
   */
  async copy(index) {
    const copyAction = this.feedback(index).querySelector('.action.copy');
    const leftClick = {button: 0};
    fireEvent.click(copyAction, leftClick);
    await waitFor(() => {});
  }
}
