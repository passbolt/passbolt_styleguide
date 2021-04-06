import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    resources,
    folders,
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    dialogContext: {
      open: jest.fn()
    },
    resourceWorkspaceContext: {
      onResourcesToExport: jest.fn(),
      resourcesToExport: {
        foldersIds: [{id: "1"}],
        resourcesIds: [{id: "1"}, {id: "2"}]
      }
    }
  };
}

export const folders = [
  {
    id: "1",
    name: "folder"
  }
];

export const resources = [
  {
    id: "1",
    name: "resource1"
  },
  {
    id: "2",
    name: "resource2"
  },
];
