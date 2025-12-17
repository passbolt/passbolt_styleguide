import EditUserProfile from "./EditUserProfile";
import { defaultContext } from "../../User/DeleteUser/DeleteUserWithConflicts.test.data";

export default {
  title: "Components/UserSetting/EditUserProfile",
  component: EditUserProfile,
};

export const Initial = {
  args: {
    context: defaultContext(),
    onClose: () => {},
  },
};
