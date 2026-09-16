import React from "react";
import ShareDialog from "./ShareDialog";
import AppContext from "../../../shared/context/AppContext/AppContext";
import {
  controlledModeWithGroupProps,
  defaultAppContext,
  mixedOwnershipMoveProps,
  propsWithStressPermissions,
  resources,
} from "./ShareDialog.test.data";
import { v4 as uuidv4 } from "uuid";
import mockStorage from "../../../../test/mocks/mockStorage";
import mockPort from "../../../../test/mocks/mockPort";

export default {
  title: "Components/Share/ShareDialog",
  component: ShareDialog,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <Story {...args} />
      </AppContext.Provider>
    ),
  ],
};

const storage = mockStorage();
const port = mockPort(storage);
port.addRequestListener("passbolt.resources.find-all-by-ids-for-display-permissions", () => resources);

const context = defaultAppContext({
  port: port,
});

export const Initial = {
  args: {
    context: context,
    onClose: () => {},
  },
};

export const Loading = {
  args: {
    context: { ...context, port: {} },
  },
};

// Controlled mode: seeded from initial collections (no port fetch). The "Developer" group can be
// expanded to reveal its members rendered as GroupUserPermissionItem rows.
export const ControlledModeWithExpandableGroup = {
  args: {
    context: defaultAppContext({ port: mockPort(mockStorage()) }),
    ...controlledModeWithGroupProps({ onClose: () => {}, onConfirm: () => {} }),
  },
};

// A move of a batch the operator owns only part of: the only way to reach this state, and the
// visual reference for the attention triangle, its warning-tinted tooltip and the footer banner.
export const MoveModeMixedOwnership = {
  args: {
    context: defaultAppContext({ port: mockPort(mockStorage()) }),
    ...mixedOwnershipMoveProps(uuidv4(), { onClose: () => {}, onConfirm: () => {} }),
  },
};

export const StressWithLargePermissionsList = {
  args: propsWithStressPermissions(),
};
