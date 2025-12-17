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
 * @since         5.4.0
 */

import MockPort from "../../../react-extension/test/mock/MockPort";
import { defaultCommentDto } from "../../../shared/models/entity/comment/commentEntity.test.data";
import { defaultCommentCollectionDto } from "../../../shared/models/entity/comment/commentEntityCollection.test.data";
import CommentsServiceWorkerService, {
  COMMENTS_CREATE,
  COMMENTS_DELETE,
  COMMENTS_FIND_ALL_BY_RESOURCE,
} from "./CommentsServiceWorkerService";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CommentsServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new CommentsServiceWorkerService(port);
  });

  describe("::create", () => {
    it("requests the service worker to create a comment", async () => {
      expect.assertions(2);
      const commentDto = defaultCommentDto();
      jest.spyOn(port, "request").mockReturnValue(commentDto);
      const payload = {
        foreign_key: uuidv4(),
        foreign_model: "Resource",
        content: "first comment",
        user_id: uuidv4(),
      };

      const resultComment = await service.create(payload);

      expect(port.request).toHaveBeenCalledWith(COMMENTS_CREATE, payload);
      expect(resultComment).toStrictEqual(commentDto);
    });
  });

  describe("::delete", () => {
    it("requests the service worker to delete a comment", async () => {
      expect.assertions(1);
      jest.spyOn(port, "request").mockReturnValue(() => {});
      const resourceId = uuidv4();
      await service.delete(resourceId);

      expect(port.request).toHaveBeenCalledWith(COMMENTS_DELETE, resourceId);
    });
  });

  describe("::findAllByResource", () => {
    it("requests the service worker to list all comments for the resource", async () => {
      expect.assertions(2);
      const commentsCollection = defaultCommentCollectionDto();
      jest.spyOn(port, "request").mockReturnValue(commentsCollection);
      const resourceId = uuidv4();
      const resultCommentsCollection = await service.findAllByResource(resourceId);

      expect(port.request).toHaveBeenCalledWith(COMMENTS_FIND_ALL_BY_RESOURCE, resourceId);
      expect(resultCommentsCollection).toStrictEqual(commentsCollection);
    });
  });
});
