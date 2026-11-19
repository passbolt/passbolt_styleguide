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
import React, { act } from "react";
import { fireEvent, render } from "@testing-library/react";
import UpdateResource, { findUpdateCandidates } from "./UpdateResource";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {
  defaultResourceDto,
  resourceStandaloneTotpDto,
  resourceWithReadPermissionDto,
} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultResourceMetadataDto } from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import { TEST_RESOURCE_TYPE_V5_DEFAULT } from "../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import { minimalDefaultSecretDataV5DefaultDto } from "../../../shared/models/entity/secretData/secretDataV5DefaultEntity.test.data";
import { defaultPasswordExpirySettingsContext } from "../../../react-extension/contexts/PasswordExpirySettingsContext.test.data";
import {
  personalResourcePermissionsDtos,
  sharedResourcePermissionsDtos,
} from "../../../shared/services/resourceEdit/resourceEditService.test.data";

const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());

const resource = (metadata = {}, data = {}) =>
  defaultResourceDto({
    resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
    metadata: defaultResourceMetadataDto({ resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT, ...metadata }),
    ...data,
  });

describe("findUpdateCandidates", () => {
  it("matches the resources of the website having the same username", () => {
    const match = resource({ uris: ["https://www.example.com/login"], username: "Ada@Example.com" });
    const otherUser = resource({ uris: ["https://www.example.com"], username: "grace@example.com" });
    const otherSite = resource({ uris: ["https://passbolt.com"], username: "ada@example.com" });
    const candidates = findUpdateCandidates([match, otherUser, otherSite], resourceTypes, {
      uri: "https://www.example.com/account/password",
      username: "ada@example.com",
    });
    expect(candidates).toEqual([match]);
  });

  it("matches every resource of the website when no username has been submitted", () => {
    const a = resource({ uris: ["https://www.example.com"], username: "ada" });
    const b = resource({ uris: ["https://www.example.com"], username: "grace" });
    expect(findUpdateCandidates([a, b], resourceTypes, { uri: "https://www.example.com", username: "" })).toEqual([
      a,
      b,
    ]);
  });

  it("ignores the resources the user cannot update or without password", () => {
    const readOnly = resourceWithReadPermissionDto({
      resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
      metadata: defaultResourceMetadataDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        uris: ["https://www.example.com"],
      }),
    });
    const totp = resourceStandaloneTotpDto();
    totp.metadata.uris = ["https://www.example.com"];
    expect(
      findUpdateCandidates([readOnly, totp], resourceTypes, { uri: "https://www.example.com", username: "" }),
    ).toEqual([]);
  });

  it("returns nothing without uri", () => {
    expect(findUpdateCandidates([resource()], resourceTypes, { uri: "", username: "" })).toEqual([]);
  });
});

describe("UpdateResource", () => {
  const renderComponent = async (props) => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockTranslationProvider>
          <UpdateResource {...props} />
        </MockTranslationProvider>,
      );
    });
    return rendered.container;
  };

  const buildProps = (candidates, secret, { shared = false } = {}) => {
    const context = defaultAppContext();
    context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => structuredClone(secret));
    context.port.addRequestListener("passbolt.resources.update", () => ({}));
    context.port.addRequestListener("passbolt.keyring.sync", () => {});
    const permissionsByResource = {};
    context.port.addRequestListener("passbolt.permissions.find-aco-permissions-for-display", (resourceId) => {
      permissionsByResource[resourceId] =
        permissionsByResource[resourceId] ||
        (shared ? sharedResourcePermissionsDtos : personalResourcePermissionsDtos)(resourceId);
      return structuredClone(permissionsByResource[resourceId]);
    });
    return {
      context,
      resourceTypes,
      passwordExpiryContext: defaultPasswordExpirySettingsContext({ getSettings: () => null, findSettings: jest.fn() }),
      candidates,
      password: "new-password",
      username: "ada",
      onSaveAsNew: jest.fn(),
      onClose: jest.fn(),
    };
  };

  const submit = async (container) => {
    await act(async () => {
      fireEvent.submit(container.querySelector("form"));
    });
    // Let the chained service worker requests (keyring, permissions, update) resolve.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
  };

  it("updates the selected resource with the new password and keeps the rest of the secret", async () => {
    const candidate = resource({ uris: ["https://www.example.com"], username: "ada" });
    const props = buildProps(
      [candidate],
      minimalDefaultSecretDataV5DefaultDto({ password: "old", description: "note" }),
    );
    jest.spyOn(props.context.port, "request");
    const container = await renderComponent(props);

    await submit(container);

    const updateCall = props.context.port.request.mock.calls.find(([name]) => name === "passbolt.resources.update");
    expect(updateCall[1].id).toBe(candidate.id);
    expect(updateCall[2].password).toBe("new-password");
    expect(updateCall[2].description).toBe("note");
    expect(props.onClose).toHaveBeenCalled();
  });

  it("lets the user choose which resource to update when several match", async () => {
    const a = resource({ name: "A", username: "ada" });
    const b = resource({ name: "B", username: "ada" });
    const props = buildProps([a, b], minimalDefaultSecretDataV5DefaultDto({ password: "old" }));
    jest.spyOn(props.context.port, "request");
    const container = await renderComponent(props);

    await act(async () => {
      fireEvent.change(container.querySelector("select#resource"), { target: { value: b.id } });
    });
    await submit(container);

    const updateCall = props.context.port.request.mock.calls.find(([name]) => name === "passbolt.resources.update");
    expect(updateCall[1].id).toBe(b.id);
  });

  it("does not update the resource if the password did not change", async () => {
    const candidate = resource();
    const props = buildProps([candidate], minimalDefaultSecretDataV5DefaultDto({ password: "new-password" }));
    jest.spyOn(props.context.port, "request");
    const container = await renderComponent(props);

    await submit(container);

    expect(props.context.port.request).not.toHaveBeenCalledWith(
      "passbolt.resources.update",
      expect.anything(),
      expect.anything(),
    );
    expect(props.onClose).toHaveBeenCalled();
  });

  it("lets the user save the credentials as a new resource instead", async () => {
    const props = buildProps([resource()], minimalDefaultSecretDataV5DefaultDto({ password: "old" }));
    const container = await renderComponent(props);
    await act(async () => {
      fireEvent.click(container.querySelector(".save-as-new"));
    });
    expect(props.onSaveAsNew).toHaveBeenCalled();
  });

  it("asks to confirm who will receive the new password of a shared resource", async () => {
    const candidate = resource({ uris: ["https://www.example.com"], username: "ada" });
    const props = buildProps([candidate], minimalDefaultSecretDataV5DefaultDto({ password: "old" }), { shared: true });
    jest.spyOn(props.context.port, "request");
    const container = await renderComponent(props);

    await submit(container);
    const isUpdateRequested = () =>
      props.context.port.request.mock.calls.some(([name]) => name === "passbolt.resources.update");
    expect(isUpdateRequested()).toBe(false);
    expect(container.querySelectorAll(".recipients-confirmation li")).toHaveLength(2);
    expect(props.onClose).not.toHaveBeenCalled();

    await submit(container);
    expect(isUpdateRequested()).toBe(true);
    expect(props.onClose).toHaveBeenCalled();
  });
});
