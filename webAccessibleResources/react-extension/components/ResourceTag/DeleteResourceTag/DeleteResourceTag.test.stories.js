import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DeleteResourceTag from "./DeleteResourceTag";
import {defaultAppContext, tagToDelete} from "./DeleteResourceTag.test.data";


export default {
  title: 'Components/ResourceTag/DeleteResourceTag',
  component: DeleteResourceTag
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteResourceTag {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};


export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext({
    tagToDelete: tagToDelete("apache")
  })
};

export const WithLongTagName = Template.bind({});
WithLongTagName.args = {
  context: defaultAppContext({
    tagToDelete: tagToDelete("tagname".repeat(10))
  })
};

Initial.argTypes = {
  context: {
    control: {
      type: 'object'
    }
  },
  onClose: () => {}
};
