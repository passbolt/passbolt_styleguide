import {defaultAppContext} from "./PasswordEditDialog.test.data";
import EditResource from "./EditResource";
import {EditResourcePageTemplate} from "./EditResource.test.page";


/**
 * EditResource stories
 */
export default {
  title: 'Passbolt/Resource/EditResource',
  component: EditResource
};


const Template = () => EditResourcePageTemplate(defaultAppContext(), {});

export const Initial = Template.bind({});
