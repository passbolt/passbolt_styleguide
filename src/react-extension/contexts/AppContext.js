import React from "react";

export default React.createContext({
  user: null,
  users: null,
  roles: null,
  rememberMeOptions: {},
  resources: null,
  resource: null,
  shareResources: null,
  selectedResources: null,
  selectedUser: null,
  folders: null,
  resourceCommentId: null,
  mustRefreshComments: false,
  siteSettings: null,
  userSettings: null,
});
