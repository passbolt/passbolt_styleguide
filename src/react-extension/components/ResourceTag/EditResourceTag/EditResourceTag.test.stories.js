/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */
import EditResourceTag from "./EditResourceTag";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import React from "react";
import {MemoryRouter} from "react-router-dom";


export default {
  title: 'Components/ResourceTag/EditResourceTag',
  component: EditResourceTag,
  decorators: [Story => (
    <MemoryRouter initialEntries={['/']}>
      <Story/>
    </MemoryRouter>
  )],
};

const tagToEdit = {
  id: 1,
  slug: "apache"
};




export const Initial = {
  args: {
    context: defaultUserAppContext({tagToEdit}),
    onClose: () => {}
  }
};
