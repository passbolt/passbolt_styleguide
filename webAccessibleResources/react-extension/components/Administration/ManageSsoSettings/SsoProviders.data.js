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
    icon: (
      <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.3512 3.04762H3.92261V30.4762H31.3512V3.04762Z" fill="#F25022" />
        <path d="M31.3512 33.5238H3.92261V60.9524H31.3512V33.5238Z" fill="#00A4EF" />
        <path d="M61.8274 3.04762H34.3988V30.4762H61.8274V3.04762Z" fill="#7FBA00" />
        <path d="M61.8274 33.5238H34.3988V60.9524H61.8274V33.5238Z" fill="#FFB900" />
      </svg>
    ),
    defaultConfig: {
      url: "https://login.microsoftonline.com",
      client_id: "",
      client_secret: "",
      tenant_id: "",
      client_secret_expiry: "",
      prompt: "login",
      email_claim: "email",
      login_hint: true,
    },
  },
  {
    id: "google",
    name: "Google",
    icon: (
      <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M63.9451 32.72C63.9451 30.6133 63.7584 28.6133 63.4384 26.6667H33.3051V38.6933H50.5584C49.7851 42.64 47.5184 45.9733 44.1584 48.24V56.24H54.4517C60.4784 50.6667 63.9451 42.4533 63.9451 32.72Z"
          fill="#4285F4"
        />
        <path
          d="M33.305 64C41.945 64 49.1717 61.12 54.4517 56.24L44.1583 48.24C41.2783 50.16 37.625 51.3333 33.305 51.3333C24.9583 51.3333 17.8917 45.7067 15.3583 38.1067H4.745V46.3467C9.99833 56.8 20.7983 64 33.305 64Z"
          fill="#34A853"
        />
        <path
          d="M15.3584 38.1067C14.6917 36.1867 14.3451 34.1333 14.3451 32C14.3451 29.8667 14.7184 27.8133 15.3584 25.8933V17.6533H4.74505C2.55838 21.9733 1.30505 26.8267 1.30505 32C1.30505 37.1733 2.55838 42.0267 4.74505 46.3467L15.3584 38.1067Z"
          fill="#FBBC05"
        />
        <path
          d="M33.305 12.6667C38.025 12.6667 42.2383 14.2933 45.5717 17.4667L54.6917 8.34667C49.1717 3.17334 41.945 0 33.305 0C20.7983 0 9.99833 7.20001 4.745 17.6533L15.3583 25.8933C17.8917 18.2933 24.9583 12.6667 33.305 12.6667Z"
          fill="#EA4335"
        />
      </svg>
    ),
    defaultConfig: {
      client_id: "",
      client_secret: "",
    },
  },
  {
    id: "oauth2",
    name: "OpenID",
    hiddenIfDisabled: true,
    disabledForRecover: true,
    icon: (
      <svg width="65" height="60" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64.2468 34.9929L62.9089 21.0968L57.9256 23.9083C53.2914 21.0968 47.3581 19.1061 40.7332 18.3046V24.4577C44.5336 25.117 47.9462 26.3321 50.7513 27.9544L45.5031 30.9146L64.2533 34.9929H64.2468Z"
          fill="#B3B3B3"
        />
        <path
          d="M9.94184 38.8774C9.94184 32.0069 17.4264 26.2222 27.632 24.4577V18.2981C12.023 20.1854 0.246826 28.6783 0.246826 38.8774C0.246826 49.0766 12.8891 58.1769 29.3319 59.6312V53.5557C18.2666 52.166 9.94184 46.1228 9.94184 38.8774Z"
          fill="#B3B3B3"
        />
        <path d="M29.332 5.09999V59.6377L39.027 55.0746V0.362366L29.332 5.09999Z" fill="#F8931E" />
      </svg>
    ),
    defaultConfig: {
      url: "",
      openid_configuration_path: "",
      scope: "openid email profile",
      client_id: "",
      client_secret: "",
    },
  },
  {
    id: "adfs",
    name: "AD FS",
    hiddenIfDisabled: true,
    disabledForRecover: true,
    icon: (
      <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64.5443 48.7454V62.166C64.5443 63.7378 64.0607 64.0602 62.5695 63.8184C52.5746 62.3272 42.4587 60.957 32.3831 59.5464C30.5695 59.3046 29.9247 58.6597 29.9247 56.6849C30.0859 49.5514 30.0053 42.3776 29.9247 35.1635C29.9247 33.5917 30.4083 33.1081 31.9801 33.1081C42.2975 33.1887 52.4536 33.1887 62.5695 33.1887C64.2219 33.1887 64.6249 33.8335 64.6249 35.3247C64.4637 39.8386 64.5443 44.2718 64.5443 48.7454Z"
          fill="#00AAF2"
        />
        <path
          d="M47.416 30.6093C42.3379 30.6093 37.2598 30.5287 32.1817 30.6093C30.6099 30.6093 29.9651 30.2869 29.9651 28.4733C30.0457 21.1786 30.0457 14.0048 29.9651 6.79069C29.9651 5.38011 30.4487 4.89648 31.7787 4.65467C42.1767 3.16349 52.5747 1.7126 62.9726 0.140816C64.7862 -0.100997 64.4638 1.10807 64.4638 2.11563C64.4638 8.56399 64.5444 15.1333 64.4638 21.5816C64.4638 23.9595 64.3832 26.3373 64.4638 28.7151C64.5444 30.2063 63.9802 30.6093 62.5696 30.6093C57.5721 30.5287 52.4941 30.6093 47.416 30.6093Z"
          fill="#00AAF2"
        />
        <path
          d="M13.8038 33.3096H25.1691C26.3782 33.3096 26.9021 33.7126 26.9021 34.962V57.37C26.9021 58.6597 26.3378 58.7806 25.1691 58.6597C17.6326 57.5312 10.096 56.4431 2.59981 55.3952C1.10863 55.1534 0.625 54.6698 0.625 53.098C0.705605 47.1332 0.705605 41.1685 0.625 35.0829C0.625 33.5917 1.02802 33.1887 2.51921 33.1887C6.34792 33.3096 10.0154 33.3096 13.8038 33.3096Z"
          fill="#00AAF2"
        />
        <path
          d="M13.8038 30.6093H2.59977C1.18919 30.6093 0.705566 30.1257 0.705566 28.6345C0.786171 22.7504 0.786171 16.8663 0.705566 10.9418C0.705566 9.53126 1.10859 9.04763 2.59977 8.80582C10.1363 7.83856 17.6728 6.7504 25.169 5.54133C26.902 5.29952 27.0633 5.86375 27.0633 7.27433V28.7151C27.0633 30.2869 26.4184 30.5287 25.0078 30.5287C21.2597 30.5287 17.4713 30.6093 13.8038 30.6093Z"
          fill="#00AAF2"
        />
      </svg>
    ),
    defaultConfig: {
      url: "",
      openid_configuration_path: "",
      scope: "openid email profile",
      client_id: "",
      client_secret: "",
    },
  },
];

export default SsoProviders;
