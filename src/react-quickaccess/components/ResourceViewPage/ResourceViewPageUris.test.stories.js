import React from "react";
import ResourceViewPageUris from "./ResourceViewPageUris";
import { defaultProps, multipleUrisProps, noUriProps, unsafeUriProps } from "./ResourceViewPageUris.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageUris",
  component: ResourceViewPageUris,
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

export const SingleUri = {
  args: defaultProps(),
};

export const MultipleUris = {
  args: multipleUrisProps(),
};

export const UnsafeUri = {
  args: unsafeUriProps(),
};

export const NoUri = {
  args: noUriProps(),
};
