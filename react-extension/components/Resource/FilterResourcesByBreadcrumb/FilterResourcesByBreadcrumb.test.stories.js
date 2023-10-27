import React from "react";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {MemoryRouter, Route} from "react-router-dom";
import FilterResourcesByBreadcrumb from "./FilterResourcesByBreadcrumb";


export default {
  title: 'Components/Resource/FilterResourcesByBreadcrumb',
  component: FilterResourcesByBreadcrumb
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <FilterResourcesByBreadcrumb {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;



export const AllFilter = Template.bind({});
AllFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.ALL},
    filteredResources: [{}, {}, {}]
  },
};

export const FolderFilter = Template.bind({});
FolderFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.FOLDER, payload: {folder: {name: 'My Folder'}}},
    filteredResources: [{}, {}]
  }
};


export const RootFolderFilter = Template.bind({});
RootFolderFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER},
    filteredResources: [{}, {}, {}, {}, {}]
  }
};

export const TagFilter = Template.bind({});
TagFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: {slug: '#charlie'}}},
    filteredResources: []
  }
};

export const GroupFilter = Template.bind({});
GroupFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.GROUP, payload: {group: {name: 'My super group'}}},
    filteredResources: [{}]
  }
};

export const ItemsIOwnFilter = Template.bind({});
ItemsIOwnFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN},
    filteredResources: [{}, {}, {}]
  }
};

export const FavoriteFilter = Template.bind({});
FavoriteFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.FAVORITE},
    filteredResources: [{}, {}, {}, {}]
  }
};

export const ShareWithMeFilter = Template.bind({});
ShareWithMeFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME},
    filteredResources: [{}, {}, {}, {}, {}, {}]
  }
};

export const RecentlyModifiedFilter = Template.bind({});
RecentlyModifiedFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED},
    filteredResources: [{}, {}, {}]
  }
};

export const ExpiredFilter = Template.bind({});
ExpiredFilter.args = {
  resourceWorkspaceContext: {
    filter: {type: ResourceWorkspaceFilterTypes.EXPIRED},
    filteredResources: [{}, {}, {}, {}, {}, {}]
  }
};
