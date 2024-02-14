import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @return {{onClose: *, dialogContext: {open: *}, format: string, resourceWorkspaceContext: {resourcesToExport: {foldersIds: [{id: string}], resourcesIds: [{id: string},{id: string}]}, onResourcesToExport: *}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    dialogContext: {
      open: jest.fn()
    },
    format: "kdbx",
    resourceWorkspaceContext: {
      onResourcesToExport: jest.fn(),
      resourcesToExport: {
        foldersIds: [{id: "1"}],
        resourcesIds: [{id: "1"}, {id: "2"}]
      },
    }
  };
}
