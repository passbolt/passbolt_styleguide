/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.14.0
 */

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    history: {
      push: jest.fn()
    },
    resourceWorkspaceContext: {
      resourceFileImportResult: {
        created: {
          foldersCount: 5,
          resourcesCount: 10,
        },
        references: {
          folder: {
            id: "imported-123"
          }
        },
        errors: {
          resources: [{
            name: "resource1"
          },
          {
            name: "resource2"
          }],
          folders: [{
            name: "folder1"
          }]
        },
        warnings: {
          resources: [{
            name: "resource1"
          },
          {
            name: "resource2"
          }],
        }
      }
    }
  };
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultPropsWithNoError() {
  return {
    onClose: jest.fn(),
    history: {
      push: jest.fn()
    },
    resourceWorkspaceContext: {
      resourceFileImportResult: {
        created: {
          foldersCount: 5,
          resourcesCount: 10,
        },
        references: {
          tag: {
            slug: "tag"
          },
        }
      }
    }
  };
}
