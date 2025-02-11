import {defaultProps} from "./EditResource.test.data";
import EditResource from "./EditResource";
import MockPort from "../../../test/mock/MockPort";

/**
 * EditResource stories
 */
export default {
  title: 'Components/Resource/EditResource',
  component: EditResource
};

const props = defaultProps();
const port = new MockPort();
port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({password: "secret-decrypted", description: "description"}));
props.context.port = port;
props.context.setContext = () => {};

export const Initial = {
  args: props
};
