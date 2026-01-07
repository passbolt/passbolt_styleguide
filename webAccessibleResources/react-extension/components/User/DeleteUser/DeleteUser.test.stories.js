import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DeleteUser from "./DeleteUser";
import { defaultAppContext, mockUser } from "./DeleteUser.test.data";

export default {
  title: "Components/User/DeleteUser",
  component: DeleteUser,
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

export const LongUsername = {
  args: {
    context: defaultAppContext({
      deleteUserDialogProps: {
        user: mockUser({ username: "repeat".repeat(10) }),
      },
    }),
    onClose: () => {},
  },
};
