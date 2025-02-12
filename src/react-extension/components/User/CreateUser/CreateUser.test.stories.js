import CreateUser from "./CreateUser";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";


export default {
  title: 'Components/User/CreateUser',
  component: CreateUser
};




export const Initial = {
  args: {
    context: defaultAppContext()
  }
};
