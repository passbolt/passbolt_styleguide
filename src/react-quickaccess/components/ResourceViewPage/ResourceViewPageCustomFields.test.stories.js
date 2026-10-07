import React from "react";
import ResourceViewPageCustomFields from "./ResourceViewPageCustomFields";
import { defaultProps, emptyCustomFieldsProps, mixedStatesProps } from "./ResourceViewPageCustomFields.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageCustomFields",
  component: ResourceViewPageCustomFields,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <ResourceViewPageCustomFields {...args} />
      </ul>
    </div>
  </div>
);

const parameters = {
  css: "ext_quickaccess",
};

export const Masked = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const MixedStates = {
  render: Template,
  args: mixedStatesProps(),
  parameters: parameters,
};

export const NoCustomFields = {
  render: Template,
  args: emptyCustomFieldsProps(),
  parameters: parameters,
};

export const NoRights = {
  render: Template,
  args: defaultProps({ canCopy: false, canPreview: false }),
  parameters: parameters,
};
