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


/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockRbacSettings = {
  "providers": [
    "totp",
    "yubikey",
    "duo"
  ],
  "yubikey": {
    "clientId": "80412",
    "secretKey": "pas6lyijz2AIhX3D9eLIYAxv63lt@"
  },
  "duo": {
    "hostName": "api-123456af.duosecurity.com",
    "integrationKey": "PAGI605APMFKP8YSME6T",
    "secretKey": "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"
  }
};

/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockRbacFormConfiguration = [
  {
    "name":""
  }
];


export const defaultLocale = "en-UK";
