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

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(props?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };
  delete props.context; // Treated in the default
  return Object.assign(defaultProps, props);
}

export function propsWithMockSendTestEmail(data = {}) {
  const defaultData = {
    adminSmtpSettingsContext: {
      sendTestMailTo: jest.fn(),
    },
  };

  return defaultProps({
    ...defaultData,
    ...data
  });
}

/**
 * Returns a default debug message from the API
 * @param {object} data data to override
 * @returns {object}
 */
export function defaultDebugResponse(data = {}) {
  const debugMessage = `Email configuration
  -------------------------------------------------------------------------------
  Host: smtp.mandrillapp.com
  Port: 587
  Username: contact@passbolt.com
  Password: *********
  TLS: true
  Sending email from: test <test@passbolt.com>
  Sending email to: no-reply@passbolt.com
  -------------------------------------------------------------------------------
  Trace
  [220] smtp.mandrillapp.com ESMTP
  > EHLO localhost
  [250] relay-8.eu-west-1.relay-prod
  [250] PIPELINING
  [250] SIZE 26214400
  [250] STARTTLS
  [250] AUTH PLAIN LOGIN
  [250] ENHANCEDSTATUSCODES
  [250] 8BITMIME
  [250] CHUNKING
  > STARTTLS
  [220] 2.0.0 Ready to start TLS
  > EHLO localhost
  [250] relay-8.eu-west-1.relay-prod
  [250] PIPELINING
  [250] SIZE 26214400
  [250] AUTH PLAIN LOGIN
  [250] ENHANCEDSTATUSCODES
  [250] 8BITMIME
  [250] CHUNKING
  > AUTH PLAIN XXXXXXXXXXXXXXXXX
  [235] 2.7.0 Authentication successful
  > MAIL FROM:<test@passbolt.com>
  [250] 2.1.0 Ok
  > RCPT TO:<no-reply@passbolt.com>
  [250] 2.1.5 Ok
  > DATA
  [354] End data with <CR><LF>.<CR><LF>
  > From: test <test@passbolt.com>
  To: no-reply@passbolt.com
  Date: Tue, 26 Jul 2022 12:52:22 +0000
  Message-ID: <2304-03249-20394@debian-gnu-linux-10-vm>
  Subject: Passbolt test email
  MIME-Version: 1.0
  Content-Type: text/plain; charset=UTF-8
  Content-Transfer-Encoding: 8bit
  
  Congratulations!
  If you receive this email, it means that your passbolt smtp configuration is working fine.
  
  
  
  
  .
  [250] 2.0.0 Ok: queued as 6F5ED20581
  > QUIT
  The message has been successfully sent!`;
  const defaultData = {
    debug: [
      {
        message: debugMessage
      }
    ]
  };

  return {...defaultData, ...data};
}
