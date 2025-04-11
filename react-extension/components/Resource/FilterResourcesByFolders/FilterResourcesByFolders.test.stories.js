import React from "react";
import {MemoryRouter} from "react-router-dom";
import FilterResourcesByFolders from "./FilterResourcesByFolders";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {DragContext} from "../../../contexts/DragContext";
import {ContextualMenuContext} from "../../../contexts/ContextualMenuContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import {defaultAppContext, defaultProps} from "./FilterResourcesByFolders.test.data";


export default {
  title: 'Components/Resource/FilterResourcesByFolders',
  component: FilterResourcesByFolders,
  decorators: [
    (Story, {args}) =>
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={args.context}>
          <ContextualMenuContext.Provider value={args.contextualMenuContext}>
            <ResourceWorkspaceContext.Provider value={args.resourceWorkspaceContext}>
              <DragContext.Provider value={args.dragContext}>
                <Story {...args}/>
              </DragContext.Provider>
            </ResourceWorkspaceContext.Provider>
          </ContextualMenuContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
  ],
};

export const Default = {
  args: {
    context: defaultAppContext(),
    ...defaultProps()
  }
};
