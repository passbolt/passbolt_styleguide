/**
 * Default props
 * @returns {*}
 */

import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultPasswordPoliciesContext} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultPrepareResourceContext} from "../../contexts/PrepareResourceContext.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => ({
  context: defaultAppContext(),
  passwordPoliciesContext: defaultPasswordPoliciesContext(),
  prepareResourceContext: defaultPrepareResourceContext(),
  history: {
    push: jest.fn(),
    goBack: jest.fn()
  },
  ...props
});

/**
 * With last generated password props
 * @param {object} props The props to override
 * @return {object}
 */
export const withLastGeneratedPasswordProps = (props = {}) => defaultProps({
  prepareResourceContext: defaultPrepareResourceContext({
    lastGeneratedPassword: "aBcD10-é??????????",
  }),
  ...props
});
