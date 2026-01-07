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
 * @since         5.8.0
 */

/**
 * Default context props for testing
 */
export const defaultContext = {
  userSettings: {
    getTrustedDomain: () => "https://passbolt.test",
  },
};

/**
 * Default user workspace context props
 */
export const defaultUserWorkspaceContext = {
  selectedUsers: [],
};

/**
 * Mock user with full profile and avatar
 */
export const mockUserFullProfile = {
  id: "user-id-1",
  username: "john.doe@passbolt.com",
  profile: {
    first_name: "John",
    last_name: "Doe",
    avatar: {
      url: {
        medium: "https://passbolt.test/avatar/medium.jpg",
        small: "https://passbolt.test/avatar/small.jpg",
      },
    },
  },
};

/**
 * Mock user with no profile
 */
export const mockUserNoProfile = {
  id: "user-id-2",
  username: "jane.smith@passbolt.com",
};

/**
 * Mock user with null profile
 */
export const mockUserNullProfile = {
  id: "user-id-3",
  username: "bob.jones@passbolt.com",
  profile: null,
};

/**
 * Mock user with only first name
 */
export const mockUserFirstNameOnly = {
  id: "user-id-4",
  username: "alice@passbolt.com",
  profile: {
    first_name: "Alice",
    last_name: "",
    avatar: null,
  },
};

/**
 * Mock user with only last name
 */
export const mockUserLastNameOnly = {
  id: "user-id-5",
  username: "johnson@passbolt.com",
  profile: {
    first_name: "",
    last_name: "Johnson",
    avatar: null,
  },
};

/**
 * Mock user with undefined profile fields
 */
export const mockUserUndefinedFields = {
  id: "user-id-6",
  username: "charlie@passbolt.com",
  profile: {
    first_name: undefined,
    last_name: undefined,
  },
};

/**
 * Mock user with avatar url.small only
 */
export const mockUserAvatarSmallOnly = {
  id: "user-id-7",
  username: "diana@passbolt.com",
  profile: {
    first_name: "Diana",
    last_name: "Prince",
    avatar: {
      url: {
        small: "https://passbolt.test/avatar/small.jpg",
      },
    },
  },
};

/**
 * Mock user with direct string avatar URL
 */
export const mockUserAvatarString = {
  id: "user-id-8",
  username: "eve@passbolt.com",
  profile: {
    first_name: "Eve",
    last_name: "Adams",
    avatar: "https://passbolt.test/avatar/direct.jpg",
  },
};

/**
 * Mock user with null avatar
 */
export const mockUserNullAvatar = {
  id: "user-id-9",
  username: "frank@passbolt.com",
  profile: {
    first_name: "Frank",
    last_name: "Castle",
    avatar: null,
  },
};

/**
 * Mock user with empty avatar url object
 */
export const mockUserEmptyAvatarUrl = {
  id: "user-id-10",
  username: "grace@passbolt.com",
  profile: {
    first_name: "Grace",
    last_name: "Hopper",
    avatar: {
      url: {},
    },
  },
};

/**
 * Create a mock user with custom overrides
 * @param {Object} overrides - Properties to override in the default user object
 * @returns {Object} Mock user object
 */
export const createMockUser = (overrides = {}) => ({
  id: "user-id-default",
  username: "default@passbolt.com",
  profile: {
    first_name: "Default",
    last_name: "User",
    avatar: {
      url: {
        medium: "https://passbolt.test/avatar/medium.jpg",
        small: "https://passbolt.test/avatar/small.jpg",
      },
    },
  },
  ...overrides,
});

/**
 * Create an array of mock users
 * @param {number} count - Number of users to create
 * @returns {Array} Array of mock user objects
 */
export const createMockUsers = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `user-id-${i}`,
    username: `user${i}@passbolt.com`,
    profile: {
      first_name: `FirstName${i}`,
      last_name: `LastName${i}`,
      avatar: {
        url: {
          medium: `https://passbolt.test/avatar/user${i}-medium.jpg`,
          small: `https://passbolt.test/avatar/user${i}-small.jpg`,
        },
      },
    },
  }));

/**
 * Custom context with different domain
 */
export const customContext = {
  userSettings: {
    getTrustedDomain: () => "https://custom.domain.test",
  },
};
