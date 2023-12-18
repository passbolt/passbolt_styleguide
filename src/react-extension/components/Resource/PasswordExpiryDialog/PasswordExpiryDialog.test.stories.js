import React from "react";
import PasswordExpiryDialog from "./PasswordExpiryDialog";

export default {
  title: 'Components/Dialogs/PasswordExpiryDialog',
  component: PasswordExpiryDialog
};

const Template = args =>
  <PasswordExpiryDialog {...args}/>;

export const Initial = Template.bind();
Initial.args = {
  resources: []
};
