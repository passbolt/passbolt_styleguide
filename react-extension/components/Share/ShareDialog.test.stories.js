import React from "react";
import ShareDialog from "./ShareDialog";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { controlledModeWithGroupProps, defaultAppContext, resources } from "./ShareDialog.test.data";
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
  shareDialogProps: {
    resourcesIds: resources.map((resource) => resource.id),
  },
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
