import React from "react";
import ResourceViewPageCustomFields from "./ResourceViewPageCustomFields";
import { defaultProps, emptyCustomFieldsProps, mixedStatesProps } from "./ResourceViewPageCustomFields.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageCustomFields",
  component: ResourceViewPageCustomFields,
  decorators: [
    (Story, { args }) => (
      <div className="container quickaccess">
        <div className="resource item-browse">
          <ul className="properties">
            <Story {...args} />
          </ul>
        </div>
      </div>
    ),
  ],
  parameters: {
    css: "ext_quickaccess",
  },
};

export const Masked = {
  args: defaultProps(),
};

export const MixedStates = {
  args: mixedStatesProps(),
};

export const NoCustomFields = {
  args: emptyCustomFieldsProps(),
};

export const NoRights = {
  args: defaultProps({ canCopy: false, canPreview: false }),
};
