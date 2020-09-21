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
 * @since         2.14.0
 */

import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import MockPort from "../../../test/mock/MockPort";
import TagDeleteDialog from "./TagDeleteDialog";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
  jest.resetModules();
});

const getAppContext = function (appContext) {
  const port = new MockPort();
  const defaultAppContext = {port};
  return Object.assign(defaultAppContext, appContext || {});
};

const getDummyTag = () => {
  return {
    tag: {
      id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
      slug: "tardis",
      is_shared: false
    },
    onClose: jest.fn()
  };
}

const renderTagDeleteDialog = function (appContext, props) {
  appContext = getAppContext(appContext);

  return render(
    <AppContext.Provider value={appContext}>
      <TagDeleteDialog debug tag={props.tag} onClose={props.onClose}/>
    </AppContext.Provider>
  );
};

describe("TagEditDialog", () => {
  it("matches the styleguide.", () => {
    const props = getDummyTag();
    const {container} = renderTagDeleteDialog(null, props);

    // Dialog title exists and correct
    const dialogTitle = container.querySelector(".dialog-header h2 span");
    expect(dialogTitle).not.toBeNull();
    expect(dialogTitle.textContent).toBe("Delete tag?");

    // Close button exists
    const closeButton = container.querySelector(".dialog-close");
    expect(closeButton).not.toBeNull();
    
    // Save button exists
    const saveButton = container.querySelector(".submit-wrapper [type=\"submit\"]");
    expect(saveButton).not.toBeNull();

    // Cancel button exists
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    expect(cancelButton).not.toBeNull();
  });

  it("calls onClose props when clicking on the close button.", () => {
    const props = getDummyTag();
    const {container} = renderTagDeleteDialog(null, props);

    const leftClick = {button: 0};
    const dialogCloseIcon = container.querySelector(".dialog-close");
    fireEvent.click(dialogCloseIcon, leftClick);
    expect(props.onClose).toBeCalled();
  });

  it("calls onClose props when clicking on the cancel button.", () => {
    const props = getDummyTag();
    const {container} = renderTagDeleteDialog(null, props);

    const leftClick = {button: 0};
    const cancelButton = container.querySelector(".submit-wrapper .cancel");
    fireEvent.click(cancelButton, leftClick);
    expect(props.onClose).toBeCalled();
  });

  it("requests the addon to delete a tag when clicking on the submit button.", async() => {
    const context = getAppContext();
    const props = getDummyTag();
    const {container} = renderTagDeleteDialog(context, props);

    // Mock the request function to make it the expected result
    jest.spyOn(context.port, 'request').mockImplementationOnce(jest.fn());
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

    // Submit and assert
    const submitButton = container.querySelector("input[type=\"submit\"]");
    fireEvent.click(submitButton, {button: 0});


    // API calls are made on submit, wait they are resolved.
    await waitFor(() => {
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.delete", "8e3874ae-4b40-590b-968a-418f704b9d9a");
      expect(props.onClose).toBeCalled();
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });
  });
});
