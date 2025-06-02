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
 * @since         5.2.0
 */

import {defaultIconDto} from "../../models/entity/resource/metadata/iconEntity.test.data";
import {defaultResourceMetadataDto} from "../../models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {defaultResourceDto} from "../../models/entity/resource/resourceEntity.test.data";
import ResourceTypesCollection from "../../models/entity/resourceType/resourceTypesCollection";
import {resourceTypesCollectionDto} from "../../models/entity/resourceType/resourceTypesCollection.test.data";
import {COLOR_TRANSPARENT} from "../../models/entity/resource/metadata/IconEntity";

export const defaultProps = (data = {}) => ({
  resource: defaultResourceDto({
    metadata: defaultResourceMetadataDto({
      icon: defaultIconDto()
    })
  }),
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  ...data
});

export const resourceWithAppearance = (data = {}) => defaultProps({
  resource: defaultResourceDto({
    metadata: defaultResourceMetadataDto({
      icon: defaultIconDto()
    })
  }),
  ...data,
});

export const resourceWithClearAppearance = (data = {}) => defaultProps({
  resource: defaultResourceDto({
    metadata: defaultResourceMetadataDto({
      icon: defaultIconDto({
        background_color: "#FFFFFF",
        value: null,
      })
    })
  }),
  ...data,
});

export const resourceWithTransparentColor = (data = {}) => defaultProps({
  resource: defaultResourceDto({
    metadata: defaultResourceMetadataDto({
      icon: defaultIconDto({
        background_color: COLOR_TRANSPARENT,
        value: 0,
      })
    })
  }),
  ...data,
});
