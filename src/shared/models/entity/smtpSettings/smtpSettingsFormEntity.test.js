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
 * @since         5.11.0
 */

import SmtpSettingsFormEntity from "./smtpSettingsFormEntity";
import {
  defaultSmtpSettingsFormEntityDto,
  noneAuthenticationFormDto,
  usernameAuthenticationFormDto,
  usernamePasswordAuthenticationFormDto,
  oauthFormDto,
  gmailFormDto,
} from "./smtpSettingsFormEntity.test.data";
import SmtpProviders from "../../../../react-extension/components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";

describe("SmtpSettingsFormEntity", () => {
  describe("createDefault", () => {
    it("should return a SmtpSettingsFormEntity with default empty values", () => {
      expect.assertions(13);
      const entity = SmtpSettingsFormEntity.createDefault();
      const formDto = entity.toFormDto();

      expect(entity).toBeInstanceOf(SmtpSettingsFormEntity);
      expect(formDto.host).toBe("");
      expect(formDto.port).toBe("");
      expect(formDto.tls).toBe(true);
      expect(formDto.client).toBe("");
      expect(formDto.sender_email).toBe("");
      expect(formDto.sender_name).toBe("Passbolt");
      expect(formDto.username).toBe("");
      expect(formDto.password).toBe("");
      expect(formDto.oauth_username).toBeNull();
      expect(formDto.tenant_id).toBeNull();
      expect(formDto.client_id).toBeNull();
      expect(formDto.client_secret).toBeNull();
    });
  });

  describe("constructor", () => {
    it("should construct from username+password authentication DTO", () => {
      expect.assertions(3);
      const dto = usernamePasswordAuthenticationFormDto();
      const entity = new SmtpSettingsFormEntity(dto);

      expect(entity._props.username).toBe(dto.username);
      expect(entity._props.password).toBe(dto.password);
      expect(entity._props.host).toBe(dto.host);
    });

    it("should construct from none authentication DTO", () => {
      expect.assertions(2);
      const dto = noneAuthenticationFormDto();
      const entity = new SmtpSettingsFormEntity(dto);

      expect(entity._props.username).toBeNull();
      expect(entity._props.password).toBeNull();
    });

    it("should construct from username-only authentication DTO", () => {
      expect.assertions(2);
      const dto = usernameAuthenticationFormDto();
      const entity = new SmtpSettingsFormEntity(dto);

      expect(entity._props.username).toBe(dto.username);
      expect(entity._props.password).toBeNull();
    });

    it("should construct from OAuth authentication DTO", () => {
      expect.assertions(4);
      const dto = oauthFormDto();
      const entity = new SmtpSettingsFormEntity(dto);

      expect(entity._props.client_id).toBe(dto.client_id);
      expect(entity._props.client_secret).toBe(dto.client_secret);
      expect(entity._props.tenant_id).toBe(dto.tenant_id);
      expect(entity._props.oauth_username).toBe(dto.oauth_username);
    });

    it("should construct with validate: false", () => {
      expect.assertions(1);
      const entity = new SmtpSettingsFormEntity({}, { validate: false });
      expect(entity).toBeTruthy();
    });
  });

  describe("toFormDto", () => {
    it("should return form-managed properties for username+password auth", () => {
      expect.assertions(10);
      const dto = usernamePasswordAuthenticationFormDto();
      const entity = new SmtpSettingsFormEntity(dto);
      const formDto = entity.toFormDto();

      expect(formDto.host).toBe(dto.host);
      expect(formDto.port).toBe(dto.port);
      expect(formDto.tls).toBe(dto.tls);
      expect(formDto.client).toBe("");
      expect(formDto.sender_name).toBe(dto.sender_name);
      expect(formDto.sender_email).toBe(dto.sender_email);
      expect(formDto.username).toBe(dto.username);
      expect(formDto.password).toBe(dto.password);
      expect(formDto.provider).toBe(dto.provider);
      expect(formDto.source).toBeNull();
    });

    it("should default client to empty string when null", () => {
      expect.assertions(1);
      const dto = defaultSmtpSettingsFormEntityDto({ client: null });
      const entity = new SmtpSettingsFormEntity(dto);
      const formDto = entity.toFormDto();

      expect(formDto.client).toBe("");
    });

    it("should return OAuth fields in form DTO", () => {
      expect.assertions(4);
      const dto = oauthFormDto();
      const entity = new SmtpSettingsFormEntity(dto);
      const formDto = entity.toFormDto();

      expect(formDto.oauth_username).toBe(dto.oauth_username);
      expect(formDto.tenant_id).toBe(dto.tenant_id);
      expect(formDto.client_id).toBe(dto.client_id);
      expect(formDto.client_secret).toBe(dto.client_secret);
    });

    it("should return null for username/password in none auth method", () => {
      expect.assertions(2);
      const dto = noneAuthenticationFormDto();
      const entity = new SmtpSettingsFormEntity(dto);
      const formDto = entity.toFormDto();

      expect(formDto.username).toBeNull();
      expect(formDto.password).toBeNull();
    });
  });

  describe("toApiDto", () => {
    it("should strip provider and normalize empty client to null", () => {
      expect.assertions(2);
      const dto = defaultSmtpSettingsFormEntityDto({ client: "" });
      const entity = new SmtpSettingsFormEntity(dto);
      const apiDto = entity.toApiDto();

      expect(apiDto.provider).toBeUndefined();
      expect(apiDto.client).toBeNull();
    });

    it("should keep non-empty client as-is", () => {
      expect.assertions(1);
      const dto = defaultSmtpSettingsFormEntityDto({ client: "passbolt.dev" });
      const entity = new SmtpSettingsFormEntity(dto);
      const apiDto = entity.toApiDto();

      expect(apiDto.client).toBe("passbolt.dev");
    });
  });

  describe("validate", () => {
    it("should return errors for missing required fields", () => {
      expect.assertions(4);
      const entity = new SmtpSettingsFormEntity(
        {
          host: "",
          port: 587,
          tls: true,
          sender_name: "",
          sender_email: "test@test.com",
        },
        { validate: false },
      );

      const errors = entity.validate();

      expect(errors).not.toBeNull();
      expect(errors.hasError("host")).toBe(true);
      expect(errors.hasError("sender_name")).toBe(true);
      expect(errors.hasError("sender_email")).toBe(false);
    });

    it("should return null when data is valid", () => {
      expect.assertions(1);
      const dto = defaultSmtpSettingsFormEntityDto();
      const entity = new SmtpSettingsFormEntity(dto);
      const errors = entity.validate();

      expect(errors).toBeNull();
    });

    it("should collect both schema errors and build rule errors simultaneously", () => {
      expect.assertions(3);
      const entity = new SmtpSettingsFormEntity(
        {
          host: "",
          port: 587,
          tls: true,
          sender_name: "Passbolt",
          sender_email: "not-an-email",
        },
        { validate: false },
      );

      const errors = entity.validate();

      expect(errors).not.toBeNull();
      expect(errors.hasError("host")).toBe(true);
      expect(errors.hasError("sender_email")).toBe(true);
    });

    it("should not strip extra properties from _props", () => {
      expect.assertions(2);
      const dto = defaultSmtpSettingsFormEntityDto({ source: "db", id: "some-id" });
      const entity = new SmtpSettingsFormEntity(dto, { validate: false });
      entity.validate();

      expect(entity._props.source).toBe("db");
      expect(entity._props.id).toBe("some-id");
    });
  });

  describe("validateBuildRules", () => {
    it("should validate client hostname when non-empty", () => {
      expect.assertions(2);
      const dto = defaultSmtpSettingsFormEntityDto({ client: "invalid:hostname:9090" });
      const entity = new SmtpSettingsFormEntity(dto, { validate: false });
      const errors = entity.validate();

      expect(errors).not.toBeNull();
      expect(errors.hasError("client")).toBe(true);
    });

    it("should validate sender_email format", () => {
      expect.assertions(2);
      const dto = defaultSmtpSettingsFormEntityDto({ sender_email: "not-an-email" });
      const entity = new SmtpSettingsFormEntity(dto, { validate: false });
      const errors = entity.validate();

      expect(errors).not.toBeNull();
      expect(errors.hasError("sender_email")).toBe(true);
    });

    it("should pass validation with empty client", () => {
      expect.assertions(1);
      const dto = defaultSmtpSettingsFormEntityDto({ client: "" });
      const entity = new SmtpSettingsFormEntity(dto);
      const errors = entity.validate();

      expect(errors).toBeNull();
    });
  });

  describe("marshall", () => {
    it("should convert a string port to an integer", () => {
      expect.assertions(1);
      const entity = new SmtpSettingsFormEntity(defaultSmtpSettingsFormEntityDto({ port: "587" }));

      expect(entity._props.port).toBe(587);
    });

    it("should leave an invalid string port as-is and produce a schema error", () => {
      expect.assertions(2);
      const entity = new SmtpSettingsFormEntity(defaultSmtpSettingsFormEntityDto({ port: "abc" }), { validate: false });
      const errors = entity.validate();

      expect(errors).not.toBeNull();
      expect(errors.hasError("port")).toBe(true);
    });
  });

  describe("set", () => {
    it("should update a field via set", () => {
      expect.assertions(1);
      const dto = defaultSmtpSettingsFormEntityDto();
      const entity = new SmtpSettingsFormEntity(dto);
      entity.set("host", "new-host.com", { validate: false });

      expect(entity._props.host).toBe("new-host.com");
    });
  });

  describe("hasDiffProps", () => {
    it("should detect changes between two entities", () => {
      expect.assertions(2);
      const dto = defaultSmtpSettingsFormEntityDto();
      const entity1 = new SmtpSettingsFormEntity(dto);
      const entity2 = new SmtpSettingsFormEntity(dto);

      expect(entity1.hasDiffProps(entity2)).toBe(false);

      entity2.set("host", "different-host.com", { validate: false });

      expect(entity1.hasDiffProps(entity2)).toBe(true);
    });
  });

  describe("detectProvider", () => {
    it("should detect Gmail provider", () => {
      expect.assertions(1);
      const dto = gmailFormDto();
      const entity = new SmtpSettingsFormEntity(dto);

      expect(entity.detectProvider(SmtpProviders)).toBe("google-mail");
    });

    it("should return 'other' for unknown host/port/tls combination", () => {
      expect.assertions(1);
      const dto = defaultSmtpSettingsFormEntityDto({
        host: "unknown.smtp.com",
        port: 9999,
        tls: true,
      });
      const entity = new SmtpSettingsFormEntity(dto);

      expect(entity.detectProvider(SmtpProviders)).toBe("other");
    });
  });

  describe("changeAuthenticationMethod", () => {
    it("should transition to none authentication", () => {
      expect.assertions(2);
      const entity = new SmtpSettingsFormEntity(usernamePasswordAuthenticationFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_NONE);

      expect(entity._props.username).toBeNull();
      expect(entity._props.password).toBeNull();
    });

    it("should transition to username-only authentication", () => {
      expect.assertions(2);
      const entity = new SmtpSettingsFormEntity(noneAuthenticationFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_USERNAME);

      expect(entity._props.username).toBe("");
      expect(entity._props.password).toBeNull();
    });

    it("should transition to username+password authentication", () => {
      expect.assertions(2);
      const entity = new SmtpSettingsFormEntity(noneAuthenticationFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_USERNAME_PASSWORD);

      expect(entity._props.username).toBe("");
      expect(entity._props.password).toBe("");
    });

    it("should preserve existing username when transitioning from username to username+password", () => {
      expect.assertions(2);
      const entity = new SmtpSettingsFormEntity(usernameAuthenticationFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_USERNAME_PASSWORD);

      expect(entity._props.username).toBe("user@example.com");
      expect(entity._props.password).toBe("");
    });

    it("should transition to OAuth authentication", () => {
      expect.assertions(6);
      const entity = new SmtpSettingsFormEntity(usernamePasswordAuthenticationFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_OAUTH);

      expect(entity._props.username).toBeNull();
      expect(entity._props.password).toBeNull();
      expect(entity._props.oauth_username).toBe("");
      expect(entity._props.tenant_id).toBe("");
      expect(entity._props.client_id).toBe("");
      expect(entity._props.client_secret).toBe("");
    });

    it("should transition from OAuth to username+password authentication", () => {
      expect.assertions(6);
      const entity = new SmtpSettingsFormEntity(oauthFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_USERNAME_PASSWORD);

      expect(entity._props.username).toBe("");
      expect(entity._props.password).toBe("");
      expect(entity._props.oauth_username).toBeNull();
      expect(entity._props.tenant_id).toBeNull();
      expect(entity._props.client_id).toBeNull();
      expect(entity._props.client_secret).toBeNull();
    });

    it("should transition from OAuth to none authentication", () => {
      expect.assertions(6);
      const entity = new SmtpSettingsFormEntity(oauthFormDto());
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_NONE);

      expect(entity._props.username).toBeNull();
      expect(entity._props.password).toBeNull();
      expect(entity._props.oauth_username).toBeNull();
      expect(entity._props.tenant_id).toBeNull();
      expect(entity._props.client_id).toBeNull();
      expect(entity._props.client_secret).toBeNull();
    });

    it("should preserve existing OAuth fields when transitioning within OAuth", () => {
      expect.assertions(4);
      const dto = oauthFormDto();
      const entity = new SmtpSettingsFormEntity(dto);
      entity.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_OAUTH);

      expect(entity._props.oauth_username).toBe(dto.oauth_username);
      expect(entity._props.tenant_id).toBe(dto.tenant_id);
      expect(entity._props.client_id).toBe(dto.client_id);
      expect(entity._props.client_secret).toBe(dto.client_secret);
    });
  });

  describe("applyProviderDefaults", () => {
    it("should merge provider default configuration", () => {
      expect.assertions(4);
      const entity = new SmtpSettingsFormEntity(defaultSmtpSettingsFormEntityDto());
      const gmailProvider = SmtpProviders.find((p) => p.id === "google-mail");
      entity.applyProviderDefaults(gmailProvider);

      expect(entity._props.host).toBe(gmailProvider.defaultConfiguration.host);
      expect(entity._props.port).toBe(gmailProvider.defaultConfiguration.port);
      expect(entity._props.tls).toBe(gmailProvider.defaultConfiguration.tls);
      expect(entity._props.provider).toBe("google-mail");
    });
  });

  describe("getAuthenticationMethod", () => {
    it("should return 'none' when username is null", () => {
      expect.assertions(1);
      const entity = new SmtpSettingsFormEntity(noneAuthenticationFormDto());
      expect(entity.getAuthenticationMethod()).toBe("none");
    });

    it("should return 'username' when password is null", () => {
      expect.assertions(1);
      const entity = new SmtpSettingsFormEntity(usernameAuthenticationFormDto());
      expect(entity.getAuthenticationMethod()).toBe("username");
    });

    it("should return 'username_password' when both are set", () => {
      expect.assertions(1);
      const entity = new SmtpSettingsFormEntity(usernamePasswordAuthenticationFormDto());
      expect(entity.getAuthenticationMethod()).toBe("username_password");
    });

    it("should return 'oauth' when client_id is set", () => {
      expect.assertions(1);
      const entity = new SmtpSettingsFormEntity(oauthFormDto());
      expect(entity.getAuthenticationMethod()).toBe("oauth");
    });
  });
});
