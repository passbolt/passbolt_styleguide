import React from "react";
import ResourceViewPageUris from "./ResourceViewPageUris";
import { defaultProps, multipleUrisProps, noUriProps, unsafeUriProps } from "./ResourceViewPageUris.test.data";

export default {
  title: "Components/QuickAccess/ResourceViewPageUris",
  component: ResourceViewPageUris,
};

const Template = (args) => (
  <div className="container quickaccess">
    <div className="resource item-browse">
      <ul className="properties">
        <ResourceViewPageUris {...args} />
      </ul>
    </div>
  </div>
);

const parameters = {
  css: "ext_quickaccess",
};

export const SingleUri = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const MultipleUris = {
  render: Template,
  args: multipleUrisProps(),
  parameters: parameters,
};

export const UnsafeUri = {
  render: Template,
  args: unsafeUriProps(),
  parameters: parameters,
};

export const NoUri = {
  render: Template,
  args: noUriProps(),
  parameters: parameters,
};
