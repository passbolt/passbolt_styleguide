import React from "react";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {MemoryRouter, Route} from "react-router-dom";
import FilterResourcesByBreadcrumb from "./FilterResourcesByBreadcrumb";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";


export default {
  title: 'Components/Resource/FilterResourcesByBreadcrumb',
  component: FilterResourcesByBreadcrumb
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <FilterResourcesByBreadcrumb {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;



export const AllFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.ALL},
      filteredResources: [{}, {}, {}]
    },
  },
  render: Template
};

export const FolderFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.FOLDER, payload: {folder: {name: 'My Folder'}}},
      filteredResources: [{}, {}]
    },
    context: defaultAppContext({
      getHierarchyFolderCache: () => [{name: "Folder"}, {name: "subfolder"}]
    }),
  },
  render: Template
};

export const RootFolderFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER},
      filteredResources: [{}, {}, {}, {}, {}]
    },
  },
  render: Template
};

export const TagFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: {slug: '#charlie'}}},
      filteredResources: []
    },
  },
  render: Template
};

export const GroupFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.GROUP, payload: {group: {name: 'My super group'}}},
      filteredResources: [{}]
    }
  },
  render: Template
};

export const ItemsIOwnFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN},
      filteredResources: [{}, {}, {}]
    }
  },
  render: Template
};

export const FavoriteFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.FAVORITE},
      filteredResources: [{}, {}, {}, {}]
    }
  },
  render: Template
};

export const ShareWithMeFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME},
      filteredResources: [{}, {}, {}, {}, {}, {}]
    }
  },
  render: Template
};

export const RecentlyModifiedFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED},
      filteredResources: [{}, {}, {}]
    }
  },
  render: Template
};

export const ExpiredFilter = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.EXPIRED},
      filteredResources: [{}, {}, {}, {}, {}, {}]
    }
  },
  render: Template
};

export const FilterWithNullResources = {
  args: {
    resourceWorkspaceContext: {
      filter: {type: ResourceWorkspaceFilterTypes.ALL},
      filteredResources: null
    },
  },
  render: Template
};
