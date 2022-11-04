/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import React from "react";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import MockFetch from "../../../test/mock/MockFetch";
import SendTestMailDialog from "./SendTestMailDialog";
import {defaultProps} from "./SendTestMailDialog.test.data";
import AdminSmtpSettingsContextProvider from "../../../contexts/AdminSmtpSettingsContext";
import {defaultDebugResponse} from "./SendTestMailDialog.test.data";

export default {
  title: 'Components/Administration/SendTestMailDialog',
  component: SendTestMailDialog
};

let currentStory = null;
const mockFetch = new MockFetch();
mockFetch.addPostFetchRequest(/smtp\/email\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-sendtestmaildialog--email-send-success': {
      return mockApiResponse(defaultDebugResponse());
    }
    case 'components-administration-sendtestmaildialog--email-send-error': {
      const response = {
        header: {
          message: "Something went wrong!"
        },
        body: defaultDebugResponse(),
      };
      return new Response(JSON.stringify(response), {status: 400});
    }
  }
  throw new Error("Unsupported story");
});


const Template = args =>
  <AdminSmtpSettingsContextProvider {...args}>
    <SendTestMailDialog {...args}/>;
  </AdminSmtpSettingsContextProvider>;

const decorators = [
  (Story, context) => {
    currentStory = context.id;
    return <Story/>;
  }
];

export const EmailSendSuccess = Template.bind({});
EmailSendSuccess.args = defaultProps();
EmailSendSuccess.decorators = decorators;

export const EmailSendError = Template.bind({});
EmailSendError.args = defaultProps();
EmailSendError.decorators = decorators;
