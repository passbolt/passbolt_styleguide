/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */
import React from "react";

const SsoProviders = [
  {
    id: "azure",
    name: "Microsoft",
    icon: (<svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.3512 3.04762H3.92261V30.4762H31.3512V3.04762Z" fill="#F25022"/><path d="M31.3512 33.5238H3.92261V60.9524H31.3512V33.5238Z" fill="#00A4EF"/><path d="M61.8274 3.04762H34.3988V30.4762H61.8274V3.04762Z" fill="#7FBA00"/><path d="M61.8274 33.5238H34.3988V60.9524H61.8274V33.5238Z" fill="#FFB900"/></svg>),
    defaultConfig: {
      url: "https://login.microsoftonline.com",
      client_id: "",
      client_secret: "",
      tenant_id: "",
      client_secret_expiry: "",
      prompt: "login",
      email_claim: "email",
    }
  },
  {
    id: "google",
    name: "Google",
    icon: (<svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M63.9451 32.72C63.9451 30.6133 63.7584 28.6133 63.4384 26.6667H33.3051V38.6933H50.5584C49.7851 42.64 47.5184 45.9733 44.1584 48.24V56.24H54.4517C60.4784 50.6667 63.9451 42.4533 63.9451 32.72Z" fill="#4285F4"/><path d="M33.305 64C41.945 64 49.1717 61.12 54.4517 56.24L44.1583 48.24C41.2783 50.16 37.625 51.3333 33.305 51.3333C24.9583 51.3333 17.8917 45.7067 15.3583 38.1067H4.745V46.3467C9.99833 56.8 20.7983 64 33.305 64Z" fill="#34A853"/><path d="M15.3584 38.1067C14.6917 36.1867 14.3451 34.1333 14.3451 32C14.3451 29.8667 14.7184 27.8133 15.3584 25.8933V17.6533H4.74505C2.55838 21.9733 1.30505 26.8267 1.30505 32C1.30505 37.1733 2.55838 42.0267 4.74505 46.3467L15.3584 38.1067Z" fill="#FBBC05"/><path d="M33.305 12.6667C38.025 12.6667 42.2383 14.2933 45.5717 17.4667L54.6917 8.34667C49.1717 3.17334 41.945 0 33.305 0C20.7983 0 9.99833 7.20001 4.745 17.6533L15.3583 25.8933C17.8917 18.2933 24.9583 12.6667 33.305 12.6667Z" fill="#EA4335"/></svg>),
    defaultConfig: {
      client_id: "",
      client_secret: "",
    }
  },
];

export default SsoProviders;
