import {
  defaultPasswordPoliciesContext
} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";
import {defaultWorkflowContext} from "../../../contexts/WorkflowContext.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_STRING
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => {
  const resource = defaultResourceDto();

  return {
    context: defaultUserAppContext({
      resources: [resource],
    }),
    resourceId: resource.id,
    onClose: jest.fn(),
    dialogContext: defaultDialogContext(),
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    passwordPoliciesContext: defaultPasswordPoliciesContext(props?.passwordPoliciesContext),
    workflowContext: defaultWorkflowContext(),
    ...props
  };
};

export const defaultPropsLegacyResource = (props = {}) => {
  const resource = defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING});
  const context = defaultUserAppContext({resources: [resource]});
  return defaultProps({context, resourceId: resource.id, ...props});
};
