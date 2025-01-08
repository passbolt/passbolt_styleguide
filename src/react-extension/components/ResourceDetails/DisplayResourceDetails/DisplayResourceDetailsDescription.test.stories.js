import React from "react";
import DisplayResourceDetailsDescription from "./DisplayResourceDetailsDescription";
import {defaultProps, resourceWithDescriptionMock} from "./DisplayResourceDetailsDescription.test.data";

/**
 * DisplayResourceDetailsDescription stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsDescription',
  component: DisplayResourceDetailsDescription,
  decorators: [
    (Story, {args}) => (
      <div className="page">
        <div className="app" style={{margin: "-1rem"}}>
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right" style={{display: "flex", justifyContent: "flex-end"}}>
                <div className="panel aside">
                  <div className="sidebar resource">
                    <div className="sidebar-content">
                      <Story {...args} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ]
};

export const Default = {
  args: defaultProps({resourceWorkspaceContext: {details: {resource: resourceWithDescriptionMock}}})
};
