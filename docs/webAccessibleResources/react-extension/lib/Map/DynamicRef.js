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
 * @since         3.9.0
 */

import * as React from "react";

/**
 * Dynamic ref is used to generate ref automaticly, like we can do with a hook.
 * Use this when we do not have the control of elements: like during a generation of inputs, buttons, ...
 */

const map = new Map();

/**
 * set a new ref to map
 */
function setRef(key) {
  if (typeof key !== "string") { return console.warn(`useDynamicRefs: Cannot set ref without key`); }
  const ref = React.createRef();
  map.set(key, ref);
  return ref;
}

/**
 * get input ref
 */
function getRef(key) {
  if (!key) { return console.warn(`useDynamicRefs: Cannot get ref without key`); }
  return map.get(key);
}

/**
 * return the dynamic object
 */
function useDynamicRefs() {
  return {getRef, setRef};
}

export default useDynamicRefs;
