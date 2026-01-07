import React from "react";
import ShareDialog from "./ShareDialog";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { defaultAppContext, resources } from "./ShareDialog.test.data";
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
