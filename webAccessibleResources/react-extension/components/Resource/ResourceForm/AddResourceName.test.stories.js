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

import "../../../../shared/components/Icons/ResourceIcon.test.init";
import React from "react";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import AddResourceName from "./AddResourceName";
import { defaultResourceDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import { defaultResourceFormDto } from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypeV5DefaultDto,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

export default {
  title: "Components/Resource/AddResourceName",
  component: AddResourceName,
  decorators: [
    (Story, { args }) => (
      <div style={{ margin: "-1rem" }}>
        <DialogWrapper title="Create a resource" className="create-resource">
          <div className="left-sidebar">
            <div className="main-action-wrapper"></div>
            <div className="sidebar-content-sections"></div>
          </div>
          <div className="grid-and-footer">
            <div className="grid">
              <Story {...args} />
              <div className="create-workspace">
                <div className="content"></div>
              </div>
            </div>
            <div className="submit-wrapper"></div>
          </div>
        </DialogWrapper>
      </div>
    ),
  ],
};

export const Default = {
  args: {
    resource: defaultResourceDto(),
    resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    context: defaultAppContext({
      getHierarchyFolderCache: () => [],
    }),
  },
};

export const DefaultVersion5 = {
  args: {
    resource: defaultResourceFormDto(),
    resourceType: new ResourceTypeEntity(resourceTypeV5DefaultDto()),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    context: defaultAppContext({
      getHierarchyFolderCache: () => [],
    }),
  },
};

export const SubFolder = {
  args: {
    resource: defaultResourceDto(),
    resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    context: defaultAppContext({
      getHierarchyFolderCache: () => [{ name: "Folder" }, { name: "subfolder" }],
    }),
  },
};
