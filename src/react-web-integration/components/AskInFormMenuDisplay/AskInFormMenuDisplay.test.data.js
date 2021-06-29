/**
 * Context with an unanthenticated user
 * @type {{port: {request: (function(): {isAuthenticated: boolean, isMfaRequired: boolean})}}}
 */
export const contextWithUnauthenticatedUser = {
  port: {
    request: () => {
      return {isAuthenticated: false, isMfaRequired: false}
    }
  }
};

/**
 * Context with an authenticated user
 * @type {{port: {request: (function(): {isAuthenticated: boolean, isMfaRequired: boolean})}}}
 */
export const contextWithAuthenticatedUser = {
  port: {
    request: () => {
      return {isAuthenticated: true, isMfaRequired: false}
    }
  }
};