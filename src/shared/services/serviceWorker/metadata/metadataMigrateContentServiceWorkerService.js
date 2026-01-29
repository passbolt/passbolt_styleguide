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
 * @since         4.12.0
 */
import PassboltResponsePaginationHeaderEntity from "../../../models/entity/apiService/PassboltResponsePaginationHeaderEntity";

export const METADATA_FIND_MIGRATION_COUNT_DETAILS_EVENT = "passbolt.metadata.find-metadata-migrate-resources-details";
export const METADATA_MIGRATE_RESOURCES_EVENT = "passbolt.metadata.migrate-resources-metadata";

class MetadataMigrateContentServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the metadata migration count details.
   * @param {boolean} [sharedContentOnly=true]
   * @returns {Promise<PassboltResponsePaginationHeaderEntity>}
   */
  async findCountMetadataMigrateResources(sharedContentOnly = false) {
    const metadataCountDetails = await this.port.request(
      METADATA_FIND_MIGRATION_COUNT_DETAILS_EVENT,
      sharedContentOnly,
    );
    return new PassboltResponsePaginationHeaderEntity(metadataCountDetails);
  }

  /**
   * Run the migration process on the service worker.
   * @param {object} migrateMetdataDto
   * @param {PassboltResponsePaginationHeaderEntity} paginationDetails
   * @return {Promise<void>}
   */
  async migrate(migrateMetdataDto, paginationDetails) {
    await this.port.request(METADATA_MIGRATE_RESOURCES_EVENT, migrateMetdataDto, paginationDetails);
  }
}

export default MetadataMigrateContentServiceWorkerService;
