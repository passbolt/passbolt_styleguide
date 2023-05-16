/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";


export function defaultProps() {
  return {
    context: defaultAppContext(),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: () => jest.fn(),
      displayError: jest.fn()
    }
  };
}


export const defaultLocale = "en-UK";
