import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

export default {
  title: 'Foundations/Icon'
};

const iconsNames = [
  '2-columns',
  '3-dots-h',
  '3-dots-v',
  'add',
  'arrow-left',
  'arrow-right',
  'ascending',
  'ban',
  'broken-link',
  'calendar',
  'camera',
  'caret-down',
  'caret-right',
  'caret-left',
  'caret-up',
  'check',
  'clock',
  'close-circle',
  'close',
  'copy-to-clipboard',
  'descending',
  'document',
  'download-a',
  'download',
  'edit',
  'envelope',
  'exclamation',
  'expand',
  'external-link',
  'eye-close',
  'eye-open',
  'filter',
  'folder',
  'folders',
  'info-circle',
  'internal-link',
  'layout',
  'license',
  'life-ring',
  'link',
  'list',
  'log-out',
  'plus-circle',
  'plus-square',
  'power',
  'printer',
  'question-circle',
  'refresh-1',
  'refresh',
  'save',
  'search',
  'share',
  'star',
  'star-stroke',
  'switch',
  'theme-dark',
  'theme-light',
  'trash',
  'txt',
  'upload-a',
  'upload',
  'user',
  'users',
  'video',
  'warning',
  'chevron-left',
  'chevron-right',
  'cog',
  'contrast',
  'copy-to-clipboard-2',
  'home-1',
  'home',
  'key',
  'lock-open',
  'lock',
  'settings',
  'tag',
  '2-columns-narrow-right',
  '2+2-columns',
  '3+1-columns',
  'bug',
  'cloud',
  'columns-caret-left',
  'columns-caret-right',
  'columns-narrow-left',
  'columns',
  'dashboard-2',
  'dice',
  'face-ID',
  'fingerprint',
  'folder-root',
  'folder-shared',
  'heart-o',
  'heart',
  'heartbeat',
  'Pin',
  'plug',
  'server',
  'share-2',
  'spinner'
];

const Template = () =>
  <React.Fragment>
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, 10%)"}}>
      {iconsNames.map(iconName =>
        <div key={iconName} style={{marginTop: "1rem"}}>
          <div style={{fontSize: "1rem", marginBottom: "1rem"}}>{iconName}</div>
          <Icon name={iconName} />
        </div>)
      }
    </div>
    <div style={{marginTop: "5rem"}}>
      <div style={{display: "inline-block"}}>
        <div style={{fontSize: "1rem", marginRight: "20rem"}}>success</div>
        <Icon name="success" />
      </div>
      <div style={{display: "inline-block"}}>
        <div style={{fontSize: "1rem"}}>failed</div>
        <Icon name="failed" />
      </div>
    </div>
  </React.Fragment>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
