import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    context: defaultUserAppContext(),
    folderParentId: "some folder parent id",
    actionFeedbackContext: {
      displaySuccess: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    },
    history: {
      push: jest.fn()
    },
    onClose: jest.fn()
  };
}
