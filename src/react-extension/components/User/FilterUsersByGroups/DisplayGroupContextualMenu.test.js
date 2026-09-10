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
 * @since         5.16.0
 */

import DisplayGroupContextualMenuPage from "./DisplayGroupContextualMenu.test.page";
import { defaultAppContext, defaultProps } from "./DisplayGroupContextualMenu.test.data";
import GroupServiceWorkerService from "../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import DeleteUserGroup from "../../UserGroup/DeleteUserGroup/DeleteUserGroup";
import DeleteUserGroupWithConflicts from "../../UserGroup/DeleteUserGroup/DeleteUserGroupWithConflicts";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { v4 as uuidv4 } from "uuid";

describe("DisplayGroupContextualMenu", () => {
  let page, context, props;

  beforeEach(() => {
    context = defaultAppContext();
    props = defaultProps();
    page = new DisplayGroupContextualMenuPage(context, props);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("opens the delete group dialog when the group can be deleted without transfer", async () => {
    expect.assertions(4);
    jest.spyOn(GroupServiceWorkerService.prototype, "deleteDryRun").mockResolvedValue(undefined);

    await page.displayGroupContextualMenu.clickDelete();

    expect(GroupServiceWorkerService.prototype.deleteDryRun).toHaveBeenCalledWith(props.group.id);
    expect(context.setContext).toHaveBeenCalledWith({ deleteGroupDialogProps: { group: props.group } });
    expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteUserGroup);
    expect(props.hide).toHaveBeenCalled();
  });

  it("opens the delete group with conflicts dialog when ownership must be transferred", async () => {
    expect.assertions(3);
    const error = new Error("Need transfer");
    error.name = "DeleteDryRunError";
    error.errors = { resources: { sole_owner: [{ id: uuidv4() }] } };
    jest.spyOn(GroupServiceWorkerService.prototype, "deleteDryRun").mockRejectedValue(error);

    await page.displayGroupContextualMenu.clickDelete();

    expect(context.setContext).toHaveBeenCalledWith({
      deleteGroupWithConflictsDialogProps: { group: props.group, errors: error.errors },
    });
    expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteUserGroupWithConflicts);
    expect(props.hide).toHaveBeenCalled();
  });

  it("opens the error dialog when the dry run fails for another reason", async () => {
    expect.assertions(3);
    const error = new Error("Something went wrong!");
    jest.spyOn(GroupServiceWorkerService.prototype, "deleteDryRun").mockRejectedValue(error);

    await page.displayGroupContextualMenu.clickDelete();

    expect(context.setContext).not.toHaveBeenCalled();
    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error });
    expect(props.hide).toHaveBeenCalled();
  });
});
