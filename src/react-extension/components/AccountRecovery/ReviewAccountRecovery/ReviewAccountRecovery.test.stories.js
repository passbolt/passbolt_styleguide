/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ReviewAccountRecovery from "./ReviewAccountRecovery";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {reviewAccountRecovery} from "./ReviewAccountRecovery.test.data";


export default {
  title: 'Passbolt/AccountRecovery/ReviewAccountRecovery',
  component: ReviewAccountRecovery
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ReviewAccountRecovery {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;

export const Initial = Template.bind({});
Initial.args = reviewAccountRecovery;
