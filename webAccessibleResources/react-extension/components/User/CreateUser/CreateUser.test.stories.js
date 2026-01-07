import CreateUser from "./CreateUser";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultProps } from "./CreateUser.test.data";

export default {
  title: "Components/User/CreateUser",
  component: CreateUser,
};

export const Initial = {
  args: {
    context: defaultAppContext(),
    ...defaultProps(),
  },
};

export const Loading = {
  args: {
    context: defaultAppContext(),
    roles: null,
  },
};
