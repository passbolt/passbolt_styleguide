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

const portsData = {
  "25": {
    port: 25,
    tls: false
  },
  "2525": {
    port: 2525,
    tls: false
  },
  "587": {
    port: 587,
    tls: true
  },
  "588": {
    port: 588,
    tls: true
  },
  "465": {
    port: 465,
    tls: true
  }
};

/**
 * Generates SMTP configurations with the cardinal of the endpoints and ports.
 * @param {Array<string>} endpointList
 * @param {Array<int>} portList
 * @returns
 */
function generateConfiguration(endpointList, portList) {
  const configurations = [];
  for (let i = 0; i < endpointList.length; i++) {
    const endpoint = endpointList[i];
    for (let j = 0; j < portList.length; j++) {
      const portData = portsData[portList[j].toString()];
      configurations.push({
        host: endpoint,
        ...portData
      });
    }
  }
  return configurations;
}

/**
 * Generator of AWS SES SMTP endpoints.
 * @returns {Array<object>} All the available AWS SES SMTP endpoints
 */
function getAllAwsEnpoint() {
  const awsRegion = [
    "us-east-2", "us-east-1",
    "us-west-1", "us-west-2",
    "ap-south-1",
    "ap-northeast-3", "ap-northeast-2", "ap-northeast-1",
    "ap-southeast-1", "ap-southeast-2",
    "ca-central-1",
    "eu-central-1",
    "eu-west-1", "eu-west-2", "eu-west-3",
    "sa-east-1",
    "us-gov-west-1"
  ];

  const endpoints = [];
  awsRegion.forEach(region => {
    endpoints.push(`email-smtp.${region}.amazonaws.com`);
  });

  return endpoints;
}

/**
 * Returns a configuration that matches the given host and port from the list.
 * @param {SmtpProvider} providerConfiguration
 * @param {int} port the target port to find
 * @param {string|udnefined} host (optional) the target host to find
 * @returns {StmpSettings}
 */
function getConfiguration(smtpProvider, port, host) {
  return smtpProvider.availableConfigurations.find(config => (!host || config.host === host) && config.port === port);
}

const AwsSes =  {
  id: "aws-ses",
  name: "AWS SES",
  icon: "aws-ses.svg",
  help_page: "https://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html",
  availableConfigurations: generateConfiguration(getAllAwsEnpoint(), [25, 2525, 587])
};
AwsSes.defaultConfiguration = getConfiguration(AwsSes, 587, "email-smtp.eu-central-1.amazonaws.com");

const ElasticEmail = {
  id: "elastic-email",
  name: "ElasticEmail",
  icon: "elastic-email.svg",
  help_page: "https://help.elasticemail.com/en/articles/4803409-smtp-settings",
  availableConfigurations: generateConfiguration(
    ["smtp.elasticemail.com", "smtp25.elasticemail.com"],
    [25, 2525, 587]
  )
};
ElasticEmail.defaultConfiguration = getConfiguration(ElasticEmail, 587, "smtp.elasticemail.com");

const GoogleWorkspace = {
  id: "google-workspace",
  name: "Google Workspace",
  icon: "gmail.svg",
  help_page: "https://support.google.com/a/answer/2956491",
  availableConfigurations: generateConfiguration(["smtp-relay.gmail.com"], [25, 587])
};
GoogleWorkspace.defaultConfiguration = getConfiguration(GoogleWorkspace, 587);

const GoogleMail = {
  id: "google-mail",
  name: "Google Mail",
  icon: "gmail.svg",
  help_page: "https://support.google.com/a/answer/2956491",
  availableConfigurations: generateConfiguration(["smtp.gmail.com"], [587])
};
GoogleMail.defaultConfiguration = getConfiguration(GoogleMail, 587);

const MailGun = {
  id: "mailgun",
  name: "MailGun",
  icon: "mailgun.svg",
  help_page: "https://documentation.mailgun.com/en/latest/quickstart-sending.html",
  availableConfigurations: generateConfiguration(["smtp.mailgun.com"], [587])
};
MailGun.defaultConfiguration = MailGun.availableConfigurations[0];

const Mailjet = {
  id: "mailjet",
  name: "Mailjet",
  icon: "mailjet.svg",
  help_page: "https://dev.mailjet.com/smtp-relay/configuration/",
  availableConfigurations: generateConfiguration(["in-v3.mailjet.com"], [25, 2525, 587, 588])
};
Mailjet.defaultConfiguration = getConfiguration(Mailjet, 587);

const Mandrill = {
  id: "mandrill",
  name: "Mandrill",
  icon: "mandrill.svg",
  help_page: "https://mailchimp.com/developer/transactional/docs/smtp-integration/",
  availableConfigurations: generateConfiguration(["smtp.mandrillapp.com"], [25, 2525, 587])
};
Mandrill.defaultConfiguration = getConfiguration(Mandrill, 587);

const Sendgrid = {
  id: "sendgrid",
  name: "Sendgrid",
  icon: "sendgrid.svg",
  help_page: "https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api",
  availableConfigurations: generateConfiguration(["smtp.sendgrid.com"], [25, 2525, 587])
};
Sendgrid.defaultConfiguration = getConfiguration(Sendgrid, 587);

const Sendinblue = {
  id: "sendinblue",
  name: "Sendinblue",
  icon: "sendinblue.svg",
  help_page: "https://help.sendinblue.com/hc/en-us/articles/209462765",
  availableConfigurations: generateConfiguration(["smtp-relay.sendinblue.com"], [25, 587])
};
Sendinblue.defaultConfiguration = getConfiguration(Sendinblue, 587);

const Zoho = {
  id: "zoho",
  name: "Zoho",
  icon: "zoho.svg",
  help_page: "https://www.zoho.com/mail/help/zoho-smtp.html",
  availableConfigurations: generateConfiguration(["smtp.zoho.eu", "smtppro.zoho.eu"], [587])
};
Zoho.defaultConfiguration = getConfiguration(Zoho, 587, "smtp.zoho.eu");

const Other = {
  id: "other",
  name: "Other",
  icon: null,
  availableConfigurations: [],
  defaultConfiguration: {
    host: "",
    port: "",
    tls: true
  }
};

const SmtpProviders = [
  AwsSes,
  ElasticEmail,
  GoogleMail,
  GoogleWorkspace,
  MailGun,
  Mailjet,
  Mandrill,
  Sendgrid,
  Sendinblue,
  Zoho,
  Other
];

export default SmtpProviders;
