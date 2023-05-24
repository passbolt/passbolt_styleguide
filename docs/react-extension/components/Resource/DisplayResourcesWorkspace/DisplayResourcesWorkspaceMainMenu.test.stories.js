import React from "react";
import DisplayResourcesWorkspaceMainMenu from "./DisplayResourcesWorkspaceMainMenu";
import {
  defaultAppContext,
  defaultAppContextProEdition, defaultPropsFolderNotOwned,
  defaultPropsFolderOwned
} from "./DisplayResourcesWorkspaceMainMenu.test.data";

/**
 * DisplayResourcesWorkspaceMainMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesWorkspaceMainMenu',
  component: DisplayResourcesWorkspaceMainMenu
};

const Template = ({...args}) =>
  <div className="header third">
    <div className="col1 main-action-wrapper">
      <DisplayResourcesWorkspaceMainMenu {...args}/>
    </div>
  </div>;

const props = defaultPropsFolderOwned();
props.context = defaultAppContextProEdition();

export const ProEditionFolderOwned = Template.bind({});
ProEditionFolderOwned.args = {...props};

const propsFolderNotOwned = defaultPropsFolderNotOwned();
propsFolderNotOwned.context = defaultAppContextProEdition();
export const ProEditionFolderNotOwned = Template.bind({});
ProEditionFolderNotOwned.args = {...propsFolderNotOwned};

props.context = defaultAppContext({siteSettings: {canIUse: () => false}, setContext: () => {}});
export const CeEdition = Template.bind({});
CeEdition.args = {...props};
