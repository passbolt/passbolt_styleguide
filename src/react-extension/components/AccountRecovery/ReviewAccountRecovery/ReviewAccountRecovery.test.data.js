export const reviewAccountRecovery = {
  context: {
    locale: 'en-GB',
    userSettings: {
      getTrustedDomain: () => (new URL(window.location.href)).origin
    }
  },
  accountRecoveryRequest: {
    user: {
      id: "54c6278e-f824-5fda-91ff-3e946b18d994",
      profile: {
        first_name: "Betty"
      },
      gpgkey: {
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332e"
      }
    },
    created: "2021-05-25T09:08:34.123"
  },
  onClose: () => {},
};
