import MockPort from "../../../test/mock/MockPort";
import {
  defaultPasswordPoliciesContext
} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => {
  const port = new MockPort();
  port.addRequestListener("passbolt.secret.decrypt", () => ({password: "secret-decrypted"}));
  const resource = defaultResourceDto();

  return {
    context: defaultUserAppContext({
      port: port,
      passwordEditDialogProps: {
        id: resource.id
      },
      resources: [resource],
    }),
    onClose: jest.fn(),
    dialogContext: defaultDialogContext(),
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    passwordPoliciesContext: defaultPasswordPoliciesContext(props?.passwordPoliciesContext),
    ...props
  };
};
