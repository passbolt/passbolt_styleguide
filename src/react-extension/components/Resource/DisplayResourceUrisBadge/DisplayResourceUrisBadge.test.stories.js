import {defaultProps, propsWithLargeAmountOfUris} from "./DisplayResourceUrisBadge.test.data";
import DisplayResourceUrisBadge from "./DisplayResourceUrisBadge";
import React from "react";


export default {
  title: 'Components/Resource/DisplayResourceUrisBadge',
  component: DisplayResourceUrisBadge,
  decorators: [
    Story =>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Story/>
      </div>
  ],
};

export const Default = {
  args: defaultProps()
};

export const LongUris = {
  args: defaultProps({
    additionalUris: ["https://passbolt.com", "https://community.passbolt.com/t/passbolt-v5-1-0-api-release-cadidate-available/12929", "ssh://127.0.0.1:8080"],
  })
};

export const LargeAmountOfUris = {
  args: propsWithLargeAmountOfUris()
};
