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
 * @since         5.13.0
 */

import React from "react";
import { render } from "@testing-library/react";
import HandlePermissionWorkflow, { PERMISSION_WORKFLOW_OPERATION } from "./HandlePermissionWorkflow";
import ResourceCreationFlow from "./flows/ResourceCreationFlow";
import ResourceEditFlow from "./flows/ResourceEditFlow";

jest.mock("./flows/ResourceCreationFlow", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("./flows/ResourceEditFlow", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("HandlePermissionWorkflow (dispatcher)", () => {
  it("As LU starting a create-resource workflow I should see the resource-creation flow rendered with the same props", () => {
    expect.assertions(1);
    const onStop = jest.fn();
    render(
      <HandlePermissionWorkflow
        operation={PERMISSION_WORKFLOW_OPERATION.CREATE_RESOURCE}
        folderParentId="some-folder-id"
        onStop={onStop}
      />,
    );

    expect(ResourceCreationFlow).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: PERMISSION_WORKFLOW_OPERATION.CREATE_RESOURCE,
        folderParentId: "some-folder-id",
        onStop,
      }),
      expect.anything(),
    );
  });

  it("As LU starting an edit-resource workflow I should see the resource-edition flow rendered with the same props", () => {
    expect.assertions(1);
    const onStop = jest.fn();
    const resource = { id: "some-resource-id" };
    render(
      <HandlePermissionWorkflow
        operation={PERMISSION_WORKFLOW_OPERATION.EDIT_RESOURCE}
        resource={resource}
        onStop={onStop}
      />,
    );

    expect(ResourceEditFlow).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: PERMISSION_WORKFLOW_OPERATION.EDIT_RESOURCE,
        resource,
        onStop,
      }),
      expect.anything(),
    );
  });

  it("As a developer starting an unsupported operation I should see an explicit error so the typo doesn't fail silently", () => {
    expect.assertions(1);
    // Silence React's console.error noise from the thrown render error.
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<HandlePermissionWorkflow operation="not-a-real-operation" />)).toThrow(
      /unsupported operation/,
    );
    consoleError.mockRestore();
  });
});
