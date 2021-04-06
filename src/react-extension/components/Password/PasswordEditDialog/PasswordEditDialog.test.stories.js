import {defaultAppContext} from "./PasswordEditDialog.test.data";
import PasswordEditDialog from "./PasswordEditDialog";
import {PasswordEditDialogPageTemplate} from "./PasswordEditDialog.test.page";


/**
 * PasswordEditDialog stories
 */
export default {
  title: 'Passbolt/Password/PasswordEditDialog',
  component: PasswordEditDialog
};


const Template = () => PasswordEditDialogPageTemplate(defaultAppContext(), {});

export const Initial = Template.bind({});
