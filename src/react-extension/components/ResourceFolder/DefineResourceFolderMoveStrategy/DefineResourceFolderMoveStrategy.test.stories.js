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
import DefineResourceFolderMoveStrategy from "./DefineResourceFolderMoveStrategy";
import MockPort from "../../../test/mock/MockPort";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";


export default {
  title: 'Components/ResourceFolder/DefineResourceFolderMoveStrategy',
  component: DefineResourceFolderMoveStrategy
};

const defaultContext = {
  folders: [
    {id: 1, name: "My folder"}
  ],
  folderMoveStrategyProps: {
    folders: [1]
  },
  port: new MockPort(),
  setContext: () => {}
};


export const Initial = {
  args: {
    context: defaultAppContext(defaultContext),
    onClose: () => {}
  }
};
