import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import FilterResourcesByTags from "./FilterResourcesByTags";


export default {
  title: 'Components/Resource/FilterResourcesByTags',
  component: FilterResourcesByTags,
};

const defaultContext = {
  resources: [
    {
      tags: [
        {id: 1, slug: 'Apache'}
      ]
    },
    {
      tags: [
        {id: 2, slug: 'Charlie'},
        {id: 3, slug: 'Network'}
      ]
    }
  ]
};

const emptyTag = {
  resources: null
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel">
        <Route component={routerProps => <FilterResourcesByTags {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};


export const Initial = Template.bind({});
Initial.args = {
  context: defaultContext
};

export const Loading = Template.bind({});
Loading.args = {
  context: emptyTag
};
