import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";


export default {
  title: 'Passbolt/Common/Icon'
};

const iconsNames = [
  'add',
  'ban',
  'camera',
  'caret-right',
  'caret-down',
  'caret-up',
  'chevron-left',
  'chevron-right',
  'close',
  'close-circle',
  'cog',
  'copy-to-clipboard',
  'download',
  'edit',
  'envelope',
  'eye-open',
  'eye-close',
  'external-link',
  'folder',
  'folder-shared',
  'heart',
  'heart-o',
  'heartbeat',
  'info-circle',
  'key',
  'link',
  'lock',
  'lock-open',
  'magic-wand',
  'plus-circle',
  'plus-square',
  'filter',
  'life-ring',
  'plug',
  'printer',
  'refresh',
  'question-circle',
  'search',
  'share',
  'star',
  'save',
  'trash',
  'upload',
  'upload-a',
  'user',
  'users',
  'warning'
];

const Template = () =>
  <React.Fragment>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, 10%)"}}>
      {iconsNames.map(iconName =>
        <div key={iconName} style={{marginTop: "1rem"}}>
          <div style={{fontSize: "1rem", marginBottom: "1rem"}}>{iconName}</div>
          <Icon name={iconName} big={true} />
        </div>)}
    </div>
  </React.Fragment>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.parameters = {
  css: "api_main"
};
