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
 * @since         5.17.0
 */
import React from "react";
import PasskeyAuthenticatorIcon from "./PasskeyAuthenticatorIcon";
import { PASSKEY_AUTHENTICATOR_NAMES } from "../../models/passkey/aaguidNames.data";

export default {
  title: "Foundations/PasskeyAuthenticatorIcon",
  component: PasskeyAuthenticatorIcon,
};

export const Default = {
  args: {
    aaguid: "08987058-cadc-4b81-b6e1-30de50dcbe96",
  },
};

export const LightAndDark = {
  args: {
    aaguid: "fdb141b2-5d84-443e-8a35-4698c205a502",
  },
};

export const Unknown = {
  args: {},
};

export const AllAuthenticators = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(32rem, 1fr))", gap: "1.6rem" }}>
      {Object.entries(PASSKEY_AUTHENTICATOR_NAMES).map(([aaguid, name]) => (
        <div key={aaguid} style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <PasskeyAuthenticatorIcon aaguid={aaguid} />
          <div>
            <div>{name}</div>
            <div style={{ fontSize: "1.2rem", opacity: 0.7 }}>{aaguid}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

const SIZES = ["1.6rem", "2.4rem", "3.2rem", "4.8rem", "9.6rem"];

// Stroke-based icons, light/dark pairs and a fill-only control, checked across the sizes the icon is used at.
const SIZE_SAMPLES = [
  "9addb28c-b46f-4402-808f-019651441ff3", // KeePassPasskey, strokes
  "53e7a7a5-e75f-4d3d-9483-12fc779cdf23", // Password Depot, strokes
  "cc45f64e-52a2-451b-831a-4edd8022a202", // ToothPic Passkey Provider, strokes
  "891494da-2c90-4d31-a9cd-4eab0aed1309", // Sésame, strokes
  "da583154-ce16-4cdf-9fe6-1dba788c0998", // Hey Be Safe, strokes in a scaled group
  "5ca471bb-a56d-46ad-a496-67e70e9ed9fb", // Parcel, hairline outlines on fills
  "531126d6-e717-415c-9320-3d9aa6981239", // Dashlane, light and dark variants
  "f3809540-7f14-49c1-a8b3-8f813b225541", // Enpass, light and dark variants
  "08987058-cadc-4b81-b6e1-30de50dcbe96", // Windows Hello, fills only
];

export const Sizes = {
  render: () => (
    <table style={{ borderCollapse: "collapse" }}>
      <style>{".passkey-authenticator-icon.fill-parent { width: 100%; height: 100%; }"}</style>
      <thead>
        <tr>
          <th />
          {SIZES.map((size) => (
            <th key={size} style={{ padding: "0.8rem", fontWeight: "normal", opacity: 0.7 }}>
              {size}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZE_SAMPLES.map((aaguid) => (
          <tr key={aaguid}>
            <td style={{ padding: "0.8rem" }}>{PASSKEY_AUTHENTICATOR_NAMES[aaguid]}</td>
            {SIZES.map((size) => (
              <td key={size} style={{ padding: "0.8rem", verticalAlign: "middle" }}>
                <span style={{ display: "inline-block", width: size, height: size }}>
                  <PasskeyAuthenticatorIcon aaguid={aaguid} className="fill-parent" />
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
