import {defaultProps} from "./EditResource.test.data";
import EditResource from "./EditResource";
import MockPort from "../../../test/mock/MockPort";
import React from "react";

/**
 * EditResource stories
 */
export default {
  title: 'Components/Resource/EditResource',
  component: EditResource,
  decorators: [(Story, {args}) =>
    <div style={{margin: "-1rem"}}>
      <Story {...args}/>
    </div>
  ],
};

const props = defaultProps();
const port = new MockPort();
port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({password: "secret-decrypted", description: "description"}));
props.context.port = port;
props.context.setContext = () => {};

export const Initial = {
  args: props
};
