
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
 * @since         5.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import {
  ResourceTypesLocalStorageContext
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {ResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import AddResourceDescription from "./AddResourceDescription";
/**
 * The Add resource description component represented as a page
 */
export default class AddResourceDescriptionPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <ResourceTypesLocalStorageContext.Provider value={{get: () => props.resourceTypes, resourceTypes: props.resourceTypes}}>
            <ResourceWorkspaceContext.Provider value={props.resourceWorkspaceContext}>
              <ResourcePasswordGeneratorContext.Provider value={props.resourcePasswordGeneratorContext}>
                <AddResourceDescription {...props} />
              </ResourcePasswordGeneratorContext.Provider>
            </ResourceWorkspaceContext.Provider>
          </ResourceTypesLocalStorageContext.Provider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }
  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".title");
  }
  /**
   * Returns the password input element
   */
  get description() {
    return this._page.container.querySelector('#resource-description');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Fill the input element with data and trigger the change event.
   * @param {HTMLElement} element - The input element to fill with data.
   * @param {string} data - The data to fill the input element with.
   */
  async fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
    await waitFor(() => { element.value === data; });
  }
}
