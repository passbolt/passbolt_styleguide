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
 * @since         5.18.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import PermissionEntity from "../../../shared/models/entity/permission/permissionEntity";
import PermissionSnapshotEntity from "../../../shared/models/entity/permission/permissionSnapshotEntity";

/**
 * Get the display name of the recipient of a permission.
 * @param {PermissionEntity} permission
 * @param {PermissionSnapshotEntity} snapshot
 * @returns {string}
 */
export function getRecipientName(permission, snapshot) {
  if (permission.aro === PermissionEntity.ARO_GROUP) {
    return snapshot.groups.items.find((group) => group.id === permission.aroForeignKey)?.name || "";
  }
  const user = snapshot.users.items.find((user) => user.id === permission.aroForeignKey);
  return user?.profile?.name || user?.username || "";
}

/**
 * Lists the users and groups a shared resource secret is going to be encrypted for, so the user can confirm them before
 * saving a new password, as the vault does.
 */
function RecipientsConfirmation({ snapshot }) {
  const names = snapshot.permissions.items.map((permission) => getRecipientName(permission, snapshot)).filter(Boolean);
  return (
    <div className="recipients-confirmation warning-message">
      <Trans>This password is shared. The new password will be available to:</Trans>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

RecipientsConfirmation.propTypes = {
  snapshot: PropTypes.instanceOf(PermissionSnapshotEntity).isRequired,
};

export default RecipientsConfirmation;
