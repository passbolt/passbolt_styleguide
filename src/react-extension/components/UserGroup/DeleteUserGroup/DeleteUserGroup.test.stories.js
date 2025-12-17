import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DeleteUserGroup from "./DeleteUserGroup";
import { defaultAppContext, mockGroup } from "./DeleteUserGroup.test.data";

export default {
  title: "Components/UserGroup/DeleteUserGroup",
  component: DeleteUserGroup,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <Story {...args} />
      </AppContext.Provider>
    ),
  ],
};

export const Initial = {
  args: {
    context: defaultAppContext(),
    onClose: () => {},
  },
};

export const LongGroupName = {
  args: {
    context: defaultAppContext({
      deleteGroupDialogProps: {
        group: mockGroup({ name: "repeat".repeat(10) }),
      },
    }),
    onClose: () => {},
  },
};
