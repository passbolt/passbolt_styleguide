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
import { MemoryRouter, Route } from "react-router-dom";
import ResourceEditPage from "./ResourceEditPage";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { defaultAdministratorRbacContext } from "../../../shared/context/Rbac/RbacContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {
  defaultResourceDto,
  resourceWithReadPermissionDto,
} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultResourceMetadataDto } from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import { TEST_RESOURCE_TYPE_V5_DEFAULT } from "../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import { minimalDefaultSecretDataV5DefaultDto } from "../../../shared/models/entity/secretData/secretDataV5DefaultEntity.test.data";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import { defaultPrepareResourceContext } from "../../contexts/PrepareResourceContext.test.data";
import { defaultPasswordExpirySettingsContext } from "../../../react-extension/contexts/PasswordExpirySettingsContext.test.data";
import { defaultPasswordPoliciesContext } from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import { defaultPasswordPoliciesDto } from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import { SecretGenerator } from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {
  personalResourcePermissionsDtos,
  sharedResourcePermissionsDtos,
} from "../../../shared/services/resourceEdit/resourceEditService.test.data";

const STRONG_PASSWORD = "Q7#vR2!mZp9$Lx4@Wd8^";

/**
 * Build the props and the storage for the tests
 * @param {object} options
 * @returns {object}
 */
function buildProps({ resource, secret, detached = false, activeSessionDto = {}, shared = false } = {}) {
  resource =
    resource ||
    defaultResourceDto({
      resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
      metadata: defaultResourceMetadataDto({ resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT }),
    });
  const storage = new MockStorage();
  storage.local.set({ resources: [resource] });
  const context = defaultAppContext({ storage, detached, setWindowBlurBehaviour: jest.fn() });
  const secretDto = secret || minimalDefaultSecretDataV5DefaultDto({ password: "old-password", description: "a note" });
  context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => structuredClone(secretDto));
  context.port.addRequestListener("passbolt.resources.update", () => resource);
  context.port.addRequestListener("passbolt.keyring.sync", () => {});
  const permissions = (shared ? sharedResourcePermissionsDtos : personalResourcePermissionsDtos)(resource.id);
  context.port.addRequestListener("passbolt.permissions.find-aco-permissions-for-display", () =>
    structuredClone(permissions),
  );
  context.port.addRequestListener("passbolt.clipboard.copy-temporarily", () => {});
  context.port.addRequestListener("passbolt.quickaccess.open-edit-resource-in-detached-mode", () => {});

  return {
    resource,
    props: {
      context,
      resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
      rbacContext: defaultAdministratorRbacContext(),
      activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto(activeSessionDto)),
      prepareResourceContext: defaultPrepareResourceContext({ settings: defaultPasswordPoliciesDto() }),
      passwordExpiryContext: defaultPasswordExpirySettingsContext({ getSettings: () => null }),
      passwordPoliciesContext: defaultPasswordPoliciesContext({
        loadPolicies: jest.fn(() => defaultPasswordPoliciesDto({ external_dictionary_check: false })),
      }),
    },
  };
}

/**
 * Render the page
 * @param {object} props
 * @param {string} resourceId
 * @returns {Promise<{container: HTMLElement, history: object}>}
 */
async function renderPage(props, resourceId) {
  let routeProps;
  let rendered;
  await act(async () => {
    rendered = render(
      <MockTranslationProvider>
        <MemoryRouter
          initialEntries={["/", `/webAccessibleResources/quickaccess/resources/edit/${resourceId}`]}
          initialIndex={1}
        >
          <Route
            path="/webAccessibleResources/quickaccess/resources/edit/:id"
            render={(routerProps) => {
              routeProps = routerProps;
              return <ResourceEditPage {...props} {...routerProps} />;
            }}
          />
          <Route
            path="/webAccessibleResources/quickaccess/resources/view/:id"
            render={(routerProps) => {
              routeProps = routerProps;
              return <div className="view-page" />;
            }}
          />
        </MemoryRouter>
      </MockTranslationProvider>,
    );
  });
  // Let the secret decryption resolve.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return { container: rendered.container, getHistory: () => routeProps.history };
}

const changeInput = async (element, value) => {
  await act(async () => {
    fireEvent.change(element, { target: { value } });
  });
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

describe("ResourceEditPage", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    // The generator relies on the browser crypto API which is not available in the test environment.
    jest.spyOn(SecretGenerator, "generate").mockImplementation(() => STRONG_PASSWORD);
  });

  it("As LU, I can see the resource values in the edit form", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);

    expect(container.querySelector("#name").value).toBe(resource.metadata.name);
    expect(container.querySelector("#uri").value).toBe(resource.metadata.uris[0]);
    expect(container.querySelector("#username").value).toBe(resource.metadata.username);
    expect(container.querySelector("#password").value).toBe("old-password");
    // The current password panel only shows up when the password changes.
    expect(container.querySelector("#current-password")).toBeNull();
  });

  it("As LU, I can generate a new password and still see and copy the current password", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);

    await act(async () => {
      fireEvent.click(container.querySelector(".password-generate"));
    });
    const newPassword = container.querySelector("#password").value;
    expect(newPassword).not.toBe("old-password");
    expect(newPassword.length).toBeGreaterThan(0);
    expect(container.querySelector("#current-password").value).toBe("old-password");

    jest.spyOn(props.context.port, "request");
    await act(async () => {
      fireEvent.click(container.querySelector(".copy-current-password"));
    });
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "old-password");
  });

  it("As LU, I can save a new password, and keep both passwords at hand until I am done", async () => {
    const { props, resource } = buildProps();
    const { container, getHistory } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");

    await changeInput(container.querySelector("#password"), STRONG_PASSWORD);
    await submit(container);

    const updateCall = props.context.port.request.mock.calls.find(([name]) => name === "passbolt.resources.update");
    expect(updateCall).toBeDefined();
    expect(updateCall[1].id).toBe(resource.id);
    expect(updateCall[2].password).toBe(STRONG_PASSWORD);
    // The note is kept.
    expect(updateCall[2].description).toBe("a note");

    expect(container.querySelector(".resource-edit-saved")).not.toBeNull();
    expect(container.querySelector("#current-password").value).toBe("old-password");
    expect(container.querySelector("#new-password").value).toBe(STRONG_PASSWORD);

    await act(async () => {
      fireEvent.click(container.querySelector(".submit-wrapper button"));
    });
    expect(getHistory().location.pathname).toBe(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`);
  });

  it("As LU, saving without changing the secret does not re-encrypt it and goes back to the resource", async () => {
    const { props, resource } = buildProps();
    const { container, getHistory } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");

    await changeInput(container.querySelector("#name"), "Renamed");
    await submit(container);

    const updateCall = props.context.port.request.mock.calls.find(([name]) => name === "passbolt.resources.update");
    expect(updateCall[1].metadata.name).toBe("Renamed");
    expect(updateCall[2]).toBeNull();
    expect(updateCall[1].personal).toBe(true);
    expect(getHistory().location.pathname).toBe(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`);
  });

  it("As LU, I have to confirm before saving a very weak password", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");
    const isUpdateRequested = () =>
      props.context.port.request.mock.calls.some(([name]) => name === "passbolt.resources.update");

    await changeInput(container.querySelector("#password"), "a");
    await submit(container);
    expect(container.querySelector(".warning-message")).not.toBeNull();
    expect(isUpdateRequested()).toBe(false);

    await submit(container);
    expect(isUpdateRequested()).toBe(true);
  });

  it("As LU, I cannot save a resource without a name", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");

    await changeInput(container.querySelector("#name"), "  ");
    await submit(container);
    expect(container.querySelector(".input.error #name")).not.toBeNull();
    expect(props.context.port.request).not.toHaveBeenCalledWith(
      "passbolt.resources.update",
      expect.anything(),
      expect.anything(),
    );
  });

  it("As a read-only user, I am redirected to the resource view", async () => {
    const resource = resourceWithReadPermissionDto();
    const { props } = buildProps({ resource });
    const { getHistory } = await renderPage(props, resource.id);
    expect(getHistory().location.pathname).toBe(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`);
  });

  it("As LU, I can open the edit form in a separate window", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");

    await act(async () => {
      fireEvent.click(container.querySelector(".open-detached"));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(props.context.port.request).toHaveBeenCalledWith(
      "passbolt.quickaccess.open-edit-resource-in-detached-mode",
      resource.id,
      props.context.openerTabId,
    );
    expect(container.querySelector(".error-message")?.textContent).toBeUndefined();
    expect(props.context.closeWindow).toHaveBeenCalled();
  });

  it("As LU in a separate window, the window does not close when I switch to the website", async () => {
    const { props, resource } = buildProps({ detached: true });
    const { container } = await renderPage(props, resource.id);
    expect(props.context.setWindowBlurBehaviour).toHaveBeenCalledWith(false);
    expect(container.querySelector(".open-detached")).toBeNull();
  });

  it("As LU, I have to confirm who will receive the new password of a shared resource", async () => {
    const { props, resource } = buildProps({ shared: true });
    const { container } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");

    await changeInput(container.querySelector("#password"), STRONG_PASSWORD);
    await submit(container);

    const isUpdateRequested = () =>
      props.context.port.request.mock.calls.some(([name]) => name === "passbolt.resources.update");
    expect(isUpdateRequested()).toBe(false);
    const recipients = container.querySelectorAll(".recipients-confirmation li");
    expect(recipients).toHaveLength(2);
    expect(container.querySelector(".submit-wrapper button").textContent).toBe("Confirm and save");

    await submit(container);
    expect(isUpdateRequested()).toBe(true);
    expect(container.querySelector(".resource-edit-saved")).not.toBeNull();
  });

  it("As LU in the toolbar popup, I cannot copy the new password before it is saved", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);
    // The unchanged password can be copied.
    expect(container.querySelector("button.copy-new-password").disabled).toBe(false);

    await act(async () => {
      fireEvent.click(container.querySelector(".password-generate"));
    });
    expect(container.querySelector("button.copy-new-password").disabled).toBe(true);
  });

  it("As LU in a separate window, I can copy the new password before it is saved", async () => {
    const { props, resource } = buildProps({ detached: true });
    const { container } = await renderPage(props, resource.id);

    await act(async () => {
      fireEvent.click(container.querySelector(".password-generate"));
    });
    expect(container.querySelector("button.copy-new-password").disabled).toBe(false);
  });

  it("As LU, I cannot move the form to a separate window once I changed something", async () => {
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);
    jest.spyOn(props.context.port, "request");

    await changeInput(container.querySelector("#name"), "Renamed");
    await act(async () => {
      fireEvent.click(container.querySelector(".open-detached"));
    });
    expect(container.querySelector(".open-detached").classList.contains("disabled")).toBe(true);
    expect(props.context.port.request).not.toHaveBeenCalledWith(
      "passbolt.quickaccess.open-edit-resource-in-detached-mode",
      expect.anything(),
      expect.anything(),
    );
  });

  it("As LU on Safari, I cannot move the form to a separate window", async () => {
    jest
      .spyOn(window.navigator, "userAgent", "get")
      .mockReturnValue(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      );
    const { props, resource } = buildProps();
    const { container } = await renderPage(props, resource.id);
    expect(container.querySelector(".open-detached")).toBeNull();
  });

  it("As LU refusing to trust the metadata key, I go back without an error", async () => {
    const { props, resource } = buildProps();
    const error = new Error("untrusted");
    error.name = "UntrustedMetadataKeyError";
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => Promise.reject(error));
    jest.spyOn(console, "error").mockImplementation(() => {});
    const { container, getHistory } = await renderPage(props, resource.id);
    expect(getHistory().location.pathname).toBe("/");
    expect(container.querySelector(".error-message")).toBeNull();
  });
});
