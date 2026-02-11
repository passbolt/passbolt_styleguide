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
 * @since         6.0.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import { defaultTagDto } from "../../../models/entity/tag/tagEntity.test.data";
import { defaultResourceDto } from "../../../models/entity/resource/resourceEntity.test.data";
import TagsServiceWorkerService, {
  FIND_ALL_TAGS,
  UPDATE_TAG,
  DELETE_TAG,
  UPDATE_RESOURCE_TAGS,
  ADD_TAG_TO_RESOURCES,
} from "./TagsServiceWorkerService";

describe("TagsServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new TagsServiceWorkerService(port);
  });

  describe("::findAll", () => {
    it("requests the service worker for all tags", async () => {
      expect.assertions(2);

      const dtos = [defaultTagDto(), defaultTagDto()];
      const mockFindAll = jest.fn().mockResolvedValue(dtos);
      port.addRequestListener(FIND_ALL_TAGS, mockFindAll);

      const result = await service.findAll();
      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(dtos);
    });
  });

  describe("::update", () => {
    it("requests the service worker to update a tag", async () => {
      expect.assertions(3);

      const tagDto = defaultTagDto();
      const mockUpdate = jest.fn().mockResolvedValue(tagDto);
      port.addRequestListener(UPDATE_TAG, mockUpdate);

      const result = await service.update(tagDto);

      expect(mockUpdate).toHaveBeenCalledTimes(1);
      // Can't use `toHaveBeenCalledWith` because MockPort forces an additional argument
      expect(mockUpdate.mock.calls[0][0]).toEqual(tagDto);
      expect(result).toEqual(tagDto);
    });
  });

  describe("::delete", () => {
    it("requests the service worker to delete a tag", async () => {
      expect.assertions(2);

      const tagId = defaultTagDto().id;
      const mockDelete = jest.fn().mockResolvedValue();
      port.addRequestListener(DELETE_TAG, mockDelete);

      await service.delete(tagId);
      expect(mockDelete).toHaveBeenCalledTimes(1);
      // Can't use `toHaveBeenCalledWith` because MockPort forces an additional argument
      expect(mockDelete.mock.calls[0][0]).toEqual(tagId);
    });
  });

  describe("::updateResourceTags", () => {
    it("requests the service worker to update resource tags", async () => {
      expect.assertions(3);

      const resourceDto = defaultResourceDto();
      const tags = [defaultTagDto(), defaultTagDto()];
      const mockUpdateResourceTags = jest.fn().mockResolvedValue(resourceDto);
      port.addRequestListener(UPDATE_RESOURCE_TAGS, mockUpdateResourceTags);

      const result = await service.updateResourceTags(resourceDto.id, tags);

      expect(mockUpdateResourceTags).toHaveBeenCalledTimes(1);
      // Can't use `toHaveBeenCalledWith` because MockPort forces an additional argument
      expect(mockUpdateResourceTags.mock.calls[0][0]).toEqual(resourceDto.id);
      expect(result).toEqual(resourceDto);
    });
  });

  describe("::addResourcesTag", () => {
    it("requests the service worker to add a tag to resources", async () => {
      expect.assertions(3);

      const resourcesDtos = [defaultResourceDto(), defaultResourceDto()];
      const resources = resourcesDtos.map((resource) => resource.id);
      const tag = defaultTagDto();
      const mockAddResourcesTag = jest.fn().mockResolvedValue(resourcesDtos);
      port.addRequestListener(ADD_TAG_TO_RESOURCES, mockAddResourcesTag);

      const result = await service.addResourcesTag(resources, tag);

      expect(mockAddResourcesTag).toHaveBeenCalledTimes(1);
      // Can't use `toHaveBeenCalledWith` because MockPort forces an additional argument
      expect(mockAddResourcesTag.mock.calls[0][0]).toEqual({ resources, tag });
      expect(result).toEqual(resourcesDtos);
    });
  });
});
