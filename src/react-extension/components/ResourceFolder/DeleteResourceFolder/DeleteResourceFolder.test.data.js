import MockPort from "../../../test/mock/MockPort";
import { v4 as uuidv4 } from "uuid";

const folderId = uuidv4();

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    setContext: jest.fn(),
    folder: {
      id: folderId,
      name: "some name folder",
    },
    folders: [
      {
        id: folderId,
        name: "some name folder",
      },
    ],
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
    dialogContext: {
      open: jest.fn(),
    },
    onClose: jest.fn(),
  };
}
