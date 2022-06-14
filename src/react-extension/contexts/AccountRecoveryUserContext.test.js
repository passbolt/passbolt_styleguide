/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import {renderIntoDocument} from 'react-dom/test-utils';
import {AccountRecoveryUserContextProvider} from "./AccountRecoveryUserContext";
import {defaultOrganizationAccountRecoveryPolicy, defaultProps} from "./AccountRecoveryUserContext.test.data";

describe("AccountRecoveryUser Context", () => {
  const organizationAccountRecoveryPolicy = defaultOrganizationAccountRecoveryPolicy();

  it('should called the given accountRecoveryUserService and be able to give back the data to the context consumers', async() => {
    const props = defaultProps({
      context: {
        loggedInUser: {
          account_recovery_user_setting: {
            status: "rejected"
          }
        }
      }
    });

    //Using renderIntoDocument allows us to call the component methods and the component to have a working (react) state
    const component = renderIntoDocument(<AccountRecoveryUserContextProvider {...props}/>);
    await component.loadAccountRecoveryPolicy();

    expect.assertions(6);
    expect(props.accountRecoveryUserService.getOrganizationAccountRecoverySettings).toHaveBeenCalled();
    expect(component.getRequestor()).toStrictEqual(organizationAccountRecoveryPolicy.creator);
    expect(component.getRequestedDate()).toBe(organizationAccountRecoveryPolicy.modified);
    expect(component.getPolicy()).toBe(organizationAccountRecoveryPolicy.policy);
    expect(component.getOrganizationPolicy()).toStrictEqual(organizationAccountRecoveryPolicy);
    expect(component.isAccountRecoveryChoiceRequired()).toBe(false);
  });

  it('should assume the account recovery user settings status is "pending" by default when the data is not set on the logged in user', async() => {
    const props = defaultProps();

    //Using renderIntoDocument allows us to call the component methods and the component to have a working (react) state
    const component = renderIntoDocument(<AccountRecoveryUserContextProvider {...props}/>);
    await component.loadAccountRecoveryPolicy();

    expect.assertions(2);
    expect(component.getUserAccountRecoverySubscriptionStatus()).toBe("pending");
    expect(component.isAccountRecoveryChoiceRequired()).toBe(true);
  });
});
