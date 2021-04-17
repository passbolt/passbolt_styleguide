
/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn()
  };
}

export const mockTestSettingsReportBody = {
  "users": [
    {
      "type": "user",
      "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
      "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "976999d8-c52f-449b-b8d4-cc5455a2d71b",
      "directory_name": "CN=Guest,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "e2c5478c-b599-482d-b096-38d3e5574224",
      "directory_name": "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "2b899164-f9cf-4b6c-9260-4331b501ca28",
      "directory_name": "CN=diego,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-09T18:48:37+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "a989a46e-0692-4380-830d-f10914b44dc6",
      "directory_name": "CN=krbtgt,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "dcbf6b7d-2db0-40fb-8c9d-639d44952f9c",
      "directory_name": "CN=remy,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-04T08:25:24+00:00",
      "directory_modified": "2020-11-02T16:19:42+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "55872084-ed6f-4e96-b401-479dd86ca357",
      "directory_name": "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T03:56:42+00:00",
      "directory_modified": "2018-07-09T03:56:42+00:00",
      "user": {
        "username": "ada@passbolt.com",
        "profile": {
          "first_name": "Ada",
          "last_name": "Lovelalce"
        }
      }
    },
    {
      "type": "user",
      "id": "aa4204c8-e474-4df3-a7cb-d4a754b03c0c",
      "directory_name": "CN=Betty Holberton,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T03:57:38+00:00",
      "directory_modified": "2018-07-09T03:57:38+00:00",
      "user": {
        "username": "betty@passbolt.com",
        "profile": {
          "first_name": "Betty",
          "last_name": "Holberton"
        }
      }
    },
    {
      "type": "user",
      "id": "40bc8f0a-bb48-4365-83f7-0b864cd623c5",
      "directory_name": "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T03:58:15+00:00",
      "directory_modified": "2018-07-09T03:58:15+00:00",
      "user": {
        "username": "zoe@passbolt.com",
        "profile": {
          "first_name": "Zoe",
          "last_name": "Logos"
        }
      }
    },
    {
      "type": "user",
      "id": "16789f75-2cf7-4755-9bd9-634d1ff42240",
      "directory_name": "CN=Sofia Kovalevskaya,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T03:58:58+00:00",
      "directory_modified": "2018-07-09T03:58:58+00:00",
      "user": {
        "username": "sofia@passbolt.com",
        "profile": {
          "first_name": "Sofia",
          "last_name": "Kovalevskaya"
        }
      }
    },
    {
      "type": "user",
      "id": "adcd8b68-0b08-4f4e-a8c1-0b564dab79a3",
      "directory_name": "CN=FR$,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2020-03-10T16:58:45+00:00",
      "directory_modified": "2020-03-10T16:58:45+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "f8b5860e-8280-4bdc-9ec9-de7e49810084",
      "directory_name": "CN=maxence zanardo,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2020-09-03T15:48:04+00:00",
      "directory_modified": "2020-09-03T15:48:04+00:00",
      "user": {
        "username": "max@passbolt.com",
        "profile": {
          "first_name": "maxence",
          "last_name": "zanardo"
        }
      }
    }
  ],
  "groups": [
    {
      "type": "group",
      "id": "844c0a72-6155-43e0-8dce-30989b7dd3b8",
      "directory_name": "CN=Administrators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-04T08:25:24+00:00",
      "group": {
        "name": "Administrators",
        "members": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
          "CN=diego,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local"
        ],
        "users": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=diego,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "ef614508-e52e-4589-88b9-a50d07838193",
      "directory_name": "CN=Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Users",
        "members": [
          "CN=Domain Users,CN=Users,DC=passbolt,DC=local",
          "CN=S-1-5-11,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local",
          "CN=S-1-5-4,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Domain Users,CN=Users,DC=passbolt,DC=local"
        ],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "01abd98c-d36e-4588-a64b-69aa6a3bcf8e",
      "directory_name": "CN=Guests,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Guests",
        "members": [
          "CN=Domain Guests,CN=Users,DC=passbolt,DC=local",
          "CN=Guest,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Domain Guests,CN=Users,DC=passbolt,DC=local"
        ],
        "users": [
          "CN=Guest,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "19915e94-cedc-4ede-8d6b-7638b52d69b9",
      "directory_name": "CN=Print Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Print Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "0e916fe7-9b05-476a-9ad5-58bd76daa304",
      "directory_name": "CN=Backup Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Backup Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "fd392e68-fbea-417e-9417-c25050719490",
      "directory_name": "CN=Replicator,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Replicator",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "87f0436a-ee24-48b1-b2c9-27fc65b1aeda",
      "directory_name": "CN=Remote Desktop Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-04T07:55:04+00:00",
      "group": {
        "name": "Remote Desktop Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "525baf41-b1dd-4b4c-a93b-2fdc0965ec7d",
      "directory_name": "CN=Network Configuration Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Network Configuration Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "f7ff7c7e-cb17-4e8f-bf71-3abd98931c2b",
      "directory_name": "CN=Performance Monitor Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Performance Monitor Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "2ce88fc8-e4f4-4150-8db2-3c81d7d7432a",
      "directory_name": "CN=Performance Log Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Performance Log Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "eb49096a-a5fb-4d6a-97ca-d54a89799177",
      "directory_name": "CN=Distributed COM Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Distributed COM Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "15b327df-2ab3-4d39-bc08-2451a95dae4c",
      "directory_name": "CN=IIS_IUSRS,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "IIS_IUSRS",
        "members": [
          "CN=S-1-5-17,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "56e4588b-4480-4a57-8e63-38ab11dbb87e",
      "directory_name": "CN=Cryptographic Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Cryptographic Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "242de46c-e2d7-4764-9454-1ee282446fd9",
      "directory_name": "CN=Event Log Readers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Event Log Readers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "d2379f57-1c78-4110-8d44-abe26acb6c72",
      "directory_name": "CN=Certificate Service DCOM Access,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:37:20+00:00",
      "group": {
        "name": "Certificate Service DCOM Access",
        "members": [
          "CN=S-1-5-11,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "5f41884e-c323-4c40-b2ac-4b95bf0509a2",
      "directory_name": "CN=RDS Remote Access Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "RDS Remote Access Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "4af953f5-62f7-4aca-9931-94fe877d56e2",
      "directory_name": "CN=RDS Endpoint Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "RDS Endpoint Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "4936a20a-2ba9-4cd4-8a4d-5e903f2838a2",
      "directory_name": "CN=RDS Management Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "RDS Management Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "ac68732a-3352-442e-9dfa-a307d79b186f",
      "directory_name": "CN=Hyper-V Administrators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Hyper-V Administrators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "97daeb3c-5f90-422f-9996-400af20730eb",
      "directory_name": "CN=Access Control Assistance Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Access Control Assistance Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "61182d57-f383-42cd-b274-12cd1d7e1571",
      "directory_name": "CN=Remote Management Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Remote Management Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "28da6122-e8d9-4d45-88a6-74c07fbc8aa8",
      "directory_name": "CN=System Managed Accounts Group,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "System Managed Accounts Group",
        "members": [
          "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "644c936c-7754-4add-9db4-a8dc6da20869",
      "directory_name": "CN=Storage Replica Administrators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Storage Replica Administrators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "c83384ce-8f91-42ad-a144-e3707f76f6a1",
      "directory_name": "CN=Domain Computers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Domain Computers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "372158d7-18fd-4d12-b48f-9826b9c6266e",
      "directory_name": "CN=Domain Controllers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Domain Controllers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "ee0fe752-cf1f-4812-a7bb-fe423ff7a5d4",
      "directory_name": "CN=Schema Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2020-03-10T16:52:29+00:00",
      "group": {
        "name": "Schema Admins",
        "members": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "27627310-5ebe-41dd-b71b-027669870b17",
      "directory_name": "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2020-03-10T16:49:41+00:00",
      "group": {
        "name": "Enterprise Admins",
        "members": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "9fbb3fe8-4142-454f-8bc6-05e9d831037f",
      "directory_name": "CN=Cert Publishers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:37:21+00:00",
      "group": {
        "name": "Cert Publishers",
        "members": [
          "CN=INSTANCE-1,OU=Domain Controllers,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "21e1d71d-3f94-4187-8242-84dc572864f7",
      "directory_name": "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-04T07:28:02+00:00",
      "group": {
        "name": "Domain Admins",
        "members": [
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "b479ad3d-dfa9-49f5-a328-1d5bf01d7672",
      "directory_name": "CN=Domain Users,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Domain Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "31a48559-3ea6-4919-9ac9-e9e61df39bde",
      "directory_name": "CN=Domain Guests,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Domain Guests",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "c3b91053-ed22-4f66-8aaa-8eb729a24e6c",
      "directory_name": "CN=Group Policy Creator Owners,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Group Policy Creator Owners",
        "members": [
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "8505a9be-e109-443c-827c-08cb3895cc09",
      "directory_name": "CN=RAS and IAS Servers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "RAS and IAS Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "e3d870e8-06f5-42f6-8d47-d44cb75f2bcb",
      "directory_name": "CN=Server Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Server Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "1e876c6f-930f-4b09-b137-c8cfe898423f",
      "directory_name": "CN=Account Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Account Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "dfa41147-e8c7-4fb1-906d-8ab61410b754",
      "directory_name": "CN=Pre-Windows 2000 Compatible Access,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:37:21+00:00",
      "group": {
        "name": "Pre-Windows 2000 Compatible Access",
        "members": [
          "CN=INSTANCE-1,OU=Domain Controllers,DC=passbolt,DC=local",
          "CN=S-1-5-11,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "4afb1c84-98d3-4994-8bcb-eedfb2ec3d65",
      "directory_name": "CN=Incoming Forest Trust Builders,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Incoming Forest Trust Builders",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "3de70961-008b-4786-9136-46e9144bdd6d",
      "directory_name": "CN=Windows Authorization Access Group,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Windows Authorization Access Group",
        "members": [
          "CN=S-1-5-9,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "cffe7fdf-6e3e-4654-80cc-9e73a62545f3",
      "directory_name": "CN=Terminal Server License Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Terminal Server License Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "517d1a67-72ed-4a67-ae6e-293fe77ee797",
      "directory_name": "CN=Allowed RODC Password Replication Group,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Allowed RODC Password Replication Group",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "f3365740-9382-4ede-9248-78b9020f683f",
      "directory_name": "CN=Denied RODC Password Replication Group,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Denied RODC Password Replication Group",
        "members": [
          "CN=Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
          "CN=Group Policy Creator Owners,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Cert Publishers,CN=Users,DC=passbolt,DC=local",
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Schema Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Controllers,CN=Users,DC=passbolt,DC=local",
          "CN=krbtgt,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
          "CN=Group Policy Creator Owners,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Cert Publishers,CN=Users,DC=passbolt,DC=local",
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Schema Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Controllers,CN=Users,DC=passbolt,DC=local"
        ],
        "users": [
          "CN=krbtgt,CN=Users,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "a2780c9b-6d8f-414f-972c-3e29b942fce2",
      "directory_name": "CN=Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Read-only Domain Controllers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "2e9b89b8-17c5-4540-b4a7-f8ef5842bc6a",
      "directory_name": "CN=Enterprise Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Enterprise Read-only Domain Controllers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "851ac393-b85d-4381-9676-0cee97342ee1",
      "directory_name": "CN=Cloneable Domain Controllers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Cloneable Domain Controllers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "00f6d69e-b230-4208-adf6-c54cdb05f378",
      "directory_name": "CN=Protected Users,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Protected Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "78593851-f7f0-46d9-b1fe-926187a27ca4",
      "directory_name": "CN=Key Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Key Admins",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "950cf781-970a-4abc-87b8-d2d1b36d7f51",
      "directory_name": "CN=Enterprise Key Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Enterprise Key Admins",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "0772f5dd-d6d6-419d-802f-10ce13ac70ab",
      "directory_name": "CN=DnsAdmins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:24:20+00:00",
      "directory_modified": "2018-07-03T15:24:20+00:00",
      "group": {
        "name": "DnsAdmins",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "7d350141-3867-4022-9ab0-06ab2f71dcff",
      "directory_name": "CN=DnsUpdateProxy,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:24:20+00:00",
      "directory_modified": "2018-07-03T15:24:20+00:00",
      "group": {
        "name": "DnsUpdateProxy",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "79c8f5a0-a659-4787-8597-1b58059adce7",
      "directory_name": "CN=Finance,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T04:03:14+00:00",
      "directory_modified": "2019-02-05T11:12:05+00:00",
      "group": {
        "name": "Finance",
        "members": [
          "CN=Test1,OU=PassboltUsers,DC=passbolt,DC=local",
          "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Test1,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "users": [
          "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "91ea4dda-8925-4799-8b0a-279b9cde0610",
      "directory_name": "CN=Operations,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T04:03:51+00:00",
      "directory_modified": "2019-02-06T19:07:16+00:00",
      "group": {
        "name": "Operations",
        "members": [
          "CN=Finance,OU=PassboltUsers,DC=passbolt,DC=local",
          "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local",
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Finance,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "users": [
          "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local",
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "5f3d705a-6234-4929-95e6-0cf32a866325",
      "directory_name": "CN=DevOps,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-08-22T08:27:00+00:00",
      "directory_modified": "2018-09-05T12:59:12+00:00",
      "group": {
        "name": "DevOps",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "7d49daff-14ac-464a-aa61-4c719ccb90e4",
      "directory_name": "CN=Test1,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2019-02-05T11:12:05+00:00",
      "directory_modified": "2019-02-05T11:12:36+00:00",
      "group": {
        "name": "Test1",
        "members": [
          "CN=Test2,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Test2,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "20836130-7cff-41d5-bfae-151e5ed75f5f",
      "directory_name": "CN=Test2,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2019-02-05T11:12:36+00:00",
      "directory_modified": "2019-02-05T11:13:38+00:00",
      "group": {
        "name": "Test2",
        "members": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "b6c6ab17-c5cf-41f1-8e1b-c7915a69bcce",
      "directory_name": "CN=TestGroup,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2019-11-19T14:22:01+00:00",
      "directory_modified": "2019-11-19T14:22:01+00:00",
      "group": {
        "name": "TestGroup",
        "members": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "35c087a8-050c-4245-b075-07f876a5c6b1",
      "directory_name": "CN=Administration,OU=PassboltGroups,DC=passbolt,DC=local",
      "directory_created": "2020-11-01T18:21:22+00:00",
      "directory_modified": "2020-11-01T18:21:22+00:00",
      "group": {
        "name": "Administration",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    {
      "type": "group",
      "id": "4e58a1a7-fce2-46b3-a901-a5c1a2905233",
      "directory_name": "CN=Developers,OU=PassboltGroups,DC=passbolt,DC=local",
      "directory_created": "2020-11-01T18:22:15+00:00",
      "directory_modified": "2020-11-01T18:23:17+00:00",
      "group": {
        "name": "Developers",
        "members": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ]
      }
    },
    {
      "type": "group",
      "id": "3a9bb88f-79a7-4d16-a0dc-aae560f3099e",
      "directory_name": "CN=MyParentGroup,OU=PassboltGroups,DC=passbolt,DC=local",
      "directory_created": "2020-11-01T18:53:53+00:00",
      "directory_modified": "2020-11-01T18:54:39+00:00",
      "group": {
        "name": "MyParentGroup",
        "members": [
          "CN=Developers,OU=PassboltGroups,DC=passbolt,DC=local",
          "CN=Administration,OU=PassboltGroups,DC=passbolt,DC=local"
        ],
        "groups": [
          "CN=Developers,OU=PassboltGroups,DC=passbolt,DC=local",
          "CN=Administration,OU=PassboltGroups,DC=passbolt,DC=local"
        ],
        "users": []
      }
    }
  ],
  "tree": {
    "CN=Administrators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "844c0a72-6155-43e0-8dce-30989b7dd3b8",
      "directory_name": "CN=Administrators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-04T08:25:24+00:00",
      "group": {
        "name": "Administrators",
        "members": [
          "CN=remy,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
          "CN=diego,CN=Users,DC=passbolt,DC=local",
          "CN=Administrator,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": {
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "21e1d71d-3f94-4187-8242-84dc572864f7",
            "directory_name": "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-04T07:28:02+00:00",
            "group": {
              "name": "Domain Admins",
              "members": [
                "CN=Administrator,CN=Users,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
                  "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-03T15:22:08+00:00",
                  "directory_modified": "2018-07-03T15:54:21+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                }
              }
            }
          },
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "27627310-5ebe-41dd-b71b-027669870b17",
            "directory_name": "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2020-03-10T16:49:41+00:00",
            "group": {
              "name": "Enterprise Admins",
              "members": [
                "CN=remy,CN=Users,DC=passbolt,DC=local",
                "CN=Administrator,CN=Users,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=remy,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "dcbf6b7d-2db0-40fb-8c9d-639d44952f9c",
                  "directory_name": "CN=remy,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-04T08:25:24+00:00",
                  "directory_modified": "2020-11-02T16:19:42+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                },
                "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
                  "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-03T15:22:08+00:00",
                  "directory_modified": "2018-07-03T15:54:21+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                }
              }
            }
          }
        },
        "users": {
          "CN=remy,CN=Users,DC=passbolt,DC=local": {
            "type": "user",
            "id": "dcbf6b7d-2db0-40fb-8c9d-639d44952f9c",
            "directory_name": "CN=remy,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-04T08:25:24+00:00",
            "directory_modified": "2020-11-02T16:19:42+00:00",
            "errors": {
              "email": [
                "user email could not be retrieved"
              ],
              "first_name": [
                "user first name could not be retrieved"
              ],
              "last_name": [
                "user last name could not be retrieved"
              ]
            },
            "user": {
              "username": null,
              "profile": {
                "first_name": null,
                "last_name": null
              }
            }
          },
          "CN=diego,CN=Users,DC=passbolt,DC=local": {
            "type": "user",
            "id": "2b899164-f9cf-4b6c-9260-4331b501ca28",
            "directory_name": "CN=diego,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:22:08+00:00",
            "directory_modified": "2018-07-09T18:48:37+00:00",
            "errors": {
              "email": [
                "user email could not be retrieved"
              ],
              "first_name": [
                "user first name could not be retrieved"
              ],
              "last_name": [
                "user last name could not be retrieved"
              ]
            },
            "user": {
              "username": null,
              "profile": {
                "first_name": null,
                "last_name": null
              }
            }
          },
          "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
            "type": "user",
            "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
            "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:22:08+00:00",
            "directory_modified": "2018-07-03T15:54:21+00:00",
            "errors": {
              "email": [
                "user email could not be retrieved"
              ],
              "first_name": [
                "user first name could not be retrieved"
              ],
              "last_name": [
                "user last name could not be retrieved"
              ]
            },
            "user": {
              "username": null,
              "profile": {
                "first_name": null,
                "last_name": null
              }
            }
          }
        }
      }
    },
    "CN=Users,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "ef614508-e52e-4589-88b9-a50d07838193",
      "directory_name": "CN=Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Users",
        "members": [
          "CN=Domain Users,CN=Users,DC=passbolt,DC=local",
          "CN=S-1-5-11,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local",
          "CN=S-1-5-4,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": {
          "CN=Domain Users,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "b479ad3d-dfa9-49f5-a328-1d5bf01d7672",
            "directory_name": "CN=Domain Users,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:23:41+00:00",
            "group": {
              "name": "Domain Users",
              "members": [],
              "groups": [],
              "users": []
            }
          }
        },
        "users": []
      }
    },
    "CN=Guests,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "01abd98c-d36e-4588-a64b-69aa6a3bcf8e",
      "directory_name": "CN=Guests,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Guests",
        "members": [
          "CN=Domain Guests,CN=Users,DC=passbolt,DC=local",
          "CN=Guest,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": {
          "CN=Domain Guests,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "31a48559-3ea6-4919-9ac9-e9e61df39bde",
            "directory_name": "CN=Domain Guests,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:23:41+00:00",
            "group": {
              "name": "Domain Guests",
              "members": [],
              "groups": [],
              "users": []
            }
          }
        },
        "users": {
          "CN=Guest,CN=Users,DC=passbolt,DC=local": {
            "type": "user",
            "id": "976999d8-c52f-449b-b8d4-cc5455a2d71b",
            "directory_name": "CN=Guest,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:22:08+00:00",
            "directory_modified": "2018-07-03T15:22:08+00:00",
            "errors": {
              "email": [
                "user email could not be retrieved"
              ],
              "first_name": [
                "user first name could not be retrieved"
              ],
              "last_name": [
                "user last name could not be retrieved"
              ]
            },
            "user": {
              "username": null,
              "profile": {
                "first_name": null,
                "last_name": null
              }
            }
          }
        }
      }
    },
    "CN=Print Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "19915e94-cedc-4ede-8d6b-7638b52d69b9",
      "directory_name": "CN=Print Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Print Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Backup Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "0e916fe7-9b05-476a-9ad5-58bd76daa304",
      "directory_name": "CN=Backup Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Backup Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Replicator,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "fd392e68-fbea-417e-9417-c25050719490",
      "directory_name": "CN=Replicator,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Replicator",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Remote Desktop Users,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "87f0436a-ee24-48b1-b2c9-27fc65b1aeda",
      "directory_name": "CN=Remote Desktop Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-04T07:55:04+00:00",
      "group": {
        "name": "Remote Desktop Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Network Configuration Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "525baf41-b1dd-4b4c-a93b-2fdc0965ec7d",
      "directory_name": "CN=Network Configuration Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Network Configuration Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Performance Monitor Users,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "f7ff7c7e-cb17-4e8f-bf71-3abd98931c2b",
      "directory_name": "CN=Performance Monitor Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Performance Monitor Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Performance Log Users,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "2ce88fc8-e4f4-4150-8db2-3c81d7d7432a",
      "directory_name": "CN=Performance Log Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Performance Log Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Distributed COM Users,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "eb49096a-a5fb-4d6a-97ca-d54a89799177",
      "directory_name": "CN=Distributed COM Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Distributed COM Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=IIS_IUSRS,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "15b327df-2ab3-4d39-bc08-2451a95dae4c",
      "directory_name": "CN=IIS_IUSRS,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "IIS_IUSRS",
        "members": [
          "CN=S-1-5-17,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    "CN=Cryptographic Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "56e4588b-4480-4a57-8e63-38ab11dbb87e",
      "directory_name": "CN=Cryptographic Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Cryptographic Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Event Log Readers,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "242de46c-e2d7-4764-9454-1ee282446fd9",
      "directory_name": "CN=Event Log Readers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Event Log Readers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Certificate Service DCOM Access,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "d2379f57-1c78-4110-8d44-abe26acb6c72",
      "directory_name": "CN=Certificate Service DCOM Access,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:37:20+00:00",
      "group": {
        "name": "Certificate Service DCOM Access",
        "members": [
          "CN=S-1-5-11,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    "CN=RDS Remote Access Servers,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "5f41884e-c323-4c40-b2ac-4b95bf0509a2",
      "directory_name": "CN=RDS Remote Access Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "RDS Remote Access Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=RDS Endpoint Servers,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "4af953f5-62f7-4aca-9931-94fe877d56e2",
      "directory_name": "CN=RDS Endpoint Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "RDS Endpoint Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=RDS Management Servers,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "4936a20a-2ba9-4cd4-8a4d-5e903f2838a2",
      "directory_name": "CN=RDS Management Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "RDS Management Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Hyper-V Administrators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "ac68732a-3352-442e-9dfa-a307d79b186f",
      "directory_name": "CN=Hyper-V Administrators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Hyper-V Administrators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Access Control Assistance Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "97daeb3c-5f90-422f-9996-400af20730eb",
      "directory_name": "CN=Access Control Assistance Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Access Control Assistance Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Remote Management Users,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "61182d57-f383-42cd-b274-12cd1d7e1571",
      "directory_name": "CN=Remote Management Users,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Remote Management Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=System Managed Accounts Group,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "28da6122-e8d9-4d45-88a6-74c07fbc8aa8",
      "directory_name": "CN=System Managed Accounts Group,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "System Managed Accounts Group",
        "members": [
          "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": {
          "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local": {
            "type": "user",
            "id": "e2c5478c-b599-482d-b096-38d3e5574224",
            "directory_name": "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:22:08+00:00",
            "directory_modified": "2018-07-03T15:22:08+00:00",
            "errors": {
              "email": [
                "user email could not be retrieved"
              ],
              "first_name": [
                "user first name could not be retrieved"
              ],
              "last_name": [
                "user last name could not be retrieved"
              ]
            },
            "user": {
              "username": null,
              "profile": {
                "first_name": null,
                "last_name": null
              }
            }
          }
        }
      }
    },
    "CN=Storage Replica Administrators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "644c936c-7754-4add-9db4-a8dc6da20869",
      "directory_name": "CN=Storage Replica Administrators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "group": {
        "name": "Storage Replica Administrators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Domain Computers,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "c83384ce-8f91-42ad-a144-e3707f76f6a1",
      "directory_name": "CN=Domain Computers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Domain Computers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=RAS and IAS Servers,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "8505a9be-e109-443c-827c-08cb3895cc09",
      "directory_name": "CN=RAS and IAS Servers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "RAS and IAS Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Server Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "e3d870e8-06f5-42f6-8d47-d44cb75f2bcb",
      "directory_name": "CN=Server Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Server Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Account Operators,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "1e876c6f-930f-4b09-b137-c8cfe898423f",
      "directory_name": "CN=Account Operators,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "group": {
        "name": "Account Operators",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Pre-Windows 2000 Compatible Access,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "dfa41147-e8c7-4fb1-906d-8ab61410b754",
      "directory_name": "CN=Pre-Windows 2000 Compatible Access,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:37:21+00:00",
      "group": {
        "name": "Pre-Windows 2000 Compatible Access",
        "members": [
          "CN=INSTANCE-1,OU=Domain Controllers,DC=passbolt,DC=local",
          "CN=S-1-5-11,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    "CN=Incoming Forest Trust Builders,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "4afb1c84-98d3-4994-8bcb-eedfb2ec3d65",
      "directory_name": "CN=Incoming Forest Trust Builders,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Incoming Forest Trust Builders",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Windows Authorization Access Group,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "3de70961-008b-4786-9136-46e9144bdd6d",
      "directory_name": "CN=Windows Authorization Access Group,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Windows Authorization Access Group",
        "members": [
          "CN=S-1-5-9,CN=ForeignSecurityPrincipals,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": []
      }
    },
    "CN=Terminal Server License Servers,CN=Builtin,DC=passbolt,DC=local": {
      "type": "group",
      "id": "cffe7fdf-6e3e-4654-80cc-9e73a62545f3",
      "directory_name": "CN=Terminal Server License Servers,CN=Builtin,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Terminal Server License Servers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Allowed RODC Password Replication Group,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "517d1a67-72ed-4a67-ae6e-293fe77ee797",
      "directory_name": "CN=Allowed RODC Password Replication Group,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Allowed RODC Password Replication Group",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Denied RODC Password Replication Group,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "f3365740-9382-4ede-9248-78b9020f683f",
      "directory_name": "CN=Denied RODC Password Replication Group,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Denied RODC Password Replication Group",
        "members": [
          "CN=Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
          "CN=Group Policy Creator Owners,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Cert Publishers,CN=Users,DC=passbolt,DC=local",
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Schema Admins,CN=Users,DC=passbolt,DC=local",
          "CN=Domain Controllers,CN=Users,DC=passbolt,DC=local",
          "CN=krbtgt,CN=Users,DC=passbolt,DC=local"
        ],
        "groups": {
          "CN=Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "a2780c9b-6d8f-414f-972c-3e29b942fce2",
            "directory_name": "CN=Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:54:21+00:00",
            "group": {
              "name": "Read-only Domain Controllers",
              "members": [],
              "groups": [],
              "users": []
            }
          },
          "CN=Group Policy Creator Owners,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "c3b91053-ed22-4f66-8aaa-8eb729a24e6c",
            "directory_name": "CN=Group Policy Creator Owners,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:23:41+00:00",
            "group": {
              "name": "Group Policy Creator Owners",
              "members": [
                "CN=Administrator,CN=Users,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
                  "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-03T15:22:08+00:00",
                  "directory_modified": "2018-07-03T15:54:21+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                }
              }
            }
          },
          "CN=Domain Admins,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "21e1d71d-3f94-4187-8242-84dc572864f7",
            "directory_name": "CN=Domain Admins,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-04T07:28:02+00:00",
            "group": {
              "name": "Domain Admins",
              "members": [
                "CN=Administrator,CN=Users,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
                  "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-03T15:22:08+00:00",
                  "directory_modified": "2018-07-03T15:54:21+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                }
              }
            }
          },
          "CN=Cert Publishers,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "9fbb3fe8-4142-454f-8bc6-05e9d831037f",
            "directory_name": "CN=Cert Publishers,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:37:21+00:00",
            "group": {
              "name": "Cert Publishers",
              "members": [
                "CN=INSTANCE-1,OU=Domain Controllers,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": []
            }
          },
          "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "27627310-5ebe-41dd-b71b-027669870b17",
            "directory_name": "CN=Enterprise Admins,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2020-03-10T16:49:41+00:00",
            "group": {
              "name": "Enterprise Admins",
              "members": [
                "CN=remy,CN=Users,DC=passbolt,DC=local",
                "CN=Administrator,CN=Users,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=remy,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "dcbf6b7d-2db0-40fb-8c9d-639d44952f9c",
                  "directory_name": "CN=remy,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-04T08:25:24+00:00",
                  "directory_modified": "2020-11-02T16:19:42+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                },
                "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
                  "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-03T15:22:08+00:00",
                  "directory_modified": "2018-07-03T15:54:21+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                }
              }
            }
          },
          "CN=Schema Admins,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "ee0fe752-cf1f-4812-a7bb-fe423ff7a5d4",
            "directory_name": "CN=Schema Admins,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2020-03-10T16:52:29+00:00",
            "group": {
              "name": "Schema Admins",
              "members": [
                "CN=remy,CN=Users,DC=passbolt,DC=local",
                "CN=Administrator,CN=Users,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=remy,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "dcbf6b7d-2db0-40fb-8c9d-639d44952f9c",
                  "directory_name": "CN=remy,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-04T08:25:24+00:00",
                  "directory_modified": "2020-11-02T16:19:42+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                },
                "CN=Administrator,CN=Users,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
                  "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
                  "directory_created": "2018-07-03T15:22:08+00:00",
                  "directory_modified": "2018-07-03T15:54:21+00:00",
                  "errors": {
                    "email": [
                      "user email could not be retrieved"
                    ],
                    "first_name": [
                      "user first name could not be retrieved"
                    ],
                    "last_name": [
                      "user last name could not be retrieved"
                    ]
                  },
                  "user": {
                    "username": null,
                    "profile": {
                      "first_name": null,
                      "last_name": null
                    }
                  }
                }
              }
            }
          },
          "CN=Domain Controllers,CN=Users,DC=passbolt,DC=local": {
            "type": "group",
            "id": "372158d7-18fd-4d12-b48f-9826b9c6266e",
            "directory_name": "CN=Domain Controllers,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:54:21+00:00",
            "group": {
              "name": "Domain Controllers",
              "members": [],
              "groups": [],
              "users": []
            }
          }
        },
        "users": {
          "CN=krbtgt,CN=Users,DC=passbolt,DC=local": {
            "type": "user",
            "id": "a989a46e-0692-4380-830d-f10914b44dc6",
            "directory_name": "CN=krbtgt,CN=Users,DC=passbolt,DC=local",
            "directory_created": "2018-07-03T15:23:41+00:00",
            "directory_modified": "2018-07-03T15:54:21+00:00",
            "errors": {
              "email": [
                "user email could not be retrieved"
              ],
              "first_name": [
                "user first name could not be retrieved"
              ],
              "last_name": [
                "user last name could not be retrieved"
              ]
            },
            "user": {
              "username": null,
              "profile": {
                "first_name": null,
                "last_name": null
              }
            }
          }
        }
      }
    },
    "CN=Enterprise Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "2e9b89b8-17c5-4540-b4a7-f8ef5842bc6a",
      "directory_name": "CN=Enterprise Read-only Domain Controllers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Enterprise Read-only Domain Controllers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Cloneable Domain Controllers,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "851ac393-b85d-4381-9676-0cee97342ee1",
      "directory_name": "CN=Cloneable Domain Controllers,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Cloneable Domain Controllers",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Protected Users,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "00f6d69e-b230-4208-adf6-c54cdb05f378",
      "directory_name": "CN=Protected Users,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Protected Users",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Key Admins,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "78593851-f7f0-46d9-b1fe-926187a27ca4",
      "directory_name": "CN=Key Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Key Admins",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Enterprise Key Admins,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "950cf781-970a-4abc-87b8-d2d1b36d7f51",
      "directory_name": "CN=Enterprise Key Admins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:23:41+00:00",
      "group": {
        "name": "Enterprise Key Admins",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=DnsAdmins,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "0772f5dd-d6d6-419d-802f-10ce13ac70ab",
      "directory_name": "CN=DnsAdmins,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:24:20+00:00",
      "directory_modified": "2018-07-03T15:24:20+00:00",
      "group": {
        "name": "DnsAdmins",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=DnsUpdateProxy,CN=Users,DC=passbolt,DC=local": {
      "type": "group",
      "id": "7d350141-3867-4022-9ab0-06ab2f71dcff",
      "directory_name": "CN=DnsUpdateProxy,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:24:20+00:00",
      "directory_modified": "2018-07-03T15:24:20+00:00",
      "group": {
        "name": "DnsUpdateProxy",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=Operations,OU=PassboltUsers,DC=passbolt,DC=local": {
      "type": "group",
      "id": "91ea4dda-8925-4799-8b0a-279b9cde0610",
      "directory_name": "CN=Operations,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T04:03:51+00:00",
      "directory_modified": "2019-02-06T19:07:16+00:00",
      "group": {
        "name": "Operations",
        "members": [
          "CN=Finance,OU=PassboltUsers,DC=passbolt,DC=local",
          "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local",
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": {
          "CN=Finance,OU=PassboltUsers,DC=passbolt,DC=local": {
            "type": "group",
            "id": "79c8f5a0-a659-4787-8597-1b58059adce7",
            "directory_name": "CN=Finance,OU=PassboltUsers,DC=passbolt,DC=local",
            "directory_created": "2018-07-09T04:03:14+00:00",
            "directory_modified": "2019-02-05T11:12:05+00:00",
            "group": {
              "name": "Finance",
              "members": [
                "CN=Test1,OU=PassboltUsers,DC=passbolt,DC=local",
                "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local"
              ],
              "groups": {
                "CN=Test1,OU=PassboltUsers,DC=passbolt,DC=local": {
                  "type": "group",
                  "id": "7d49daff-14ac-464a-aa61-4c719ccb90e4",
                  "directory_name": "CN=Test1,OU=PassboltUsers,DC=passbolt,DC=local",
                  "directory_created": "2019-02-05T11:12:05+00:00",
                  "directory_modified": "2019-02-05T11:12:36+00:00",
                  "group": {
                    "name": "Test1",
                    "members": [
                      "CN=Test2,OU=PassboltUsers,DC=passbolt,DC=local"
                    ],
                    "groups": {
                      "CN=Test2,OU=PassboltUsers,DC=passbolt,DC=local": {
                        "type": "group",
                        "id": "20836130-7cff-41d5-bfae-151e5ed75f5f",
                        "directory_name": "CN=Test2,OU=PassboltUsers,DC=passbolt,DC=local",
                        "directory_created": "2019-02-05T11:12:36+00:00",
                        "directory_modified": "2019-02-05T11:13:38+00:00",
                        "group": {
                          "name": "Test2",
                          "members": [
                            "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
                          ],
                          "groups": [],
                          "users": {
                            "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local": {
                              "type": "user",
                              "id": "55872084-ed6f-4e96-b401-479dd86ca357",
                              "directory_name": "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local",
                              "directory_created": "2018-07-09T03:56:42+00:00",
                              "directory_modified": "2018-07-09T03:56:42+00:00",
                              "user": {
                                "username": "ada@passbolt.com",
                                "profile": {
                                  "first_name": "Ada",
                                  "last_name": "Lovelalce"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "users": []
                  }
                }
              },
              "users": {
                "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "40bc8f0a-bb48-4365-83f7-0b864cd623c5",
                  "directory_name": "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local",
                  "directory_created": "2018-07-09T03:58:15+00:00",
                  "directory_modified": "2018-07-09T03:58:15+00:00",
                  "user": {
                    "username": "zoe@passbolt.com",
                    "profile": {
                      "first_name": "Zoe",
                      "last_name": "Logos"
                    }
                  }
                }
              }
            }
          }
        },
        "users": {
          "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local": {
            "type": "user",
            "id": "40bc8f0a-bb48-4365-83f7-0b864cd623c5",
            "directory_name": "CN=Zoe Logos,OU=PassboltUsers,DC=passbolt,DC=local",
            "directory_created": "2018-07-09T03:58:15+00:00",
            "directory_modified": "2018-07-09T03:58:15+00:00",
            "user": {
              "username": "zoe@passbolt.com",
              "profile": {
                "first_name": "Zoe",
                "last_name": "Logos"
              }
            }
          },
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local": {
            "type": "user",
            "id": "55872084-ed6f-4e96-b401-479dd86ca357",
            "directory_name": "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local",
            "directory_created": "2018-07-09T03:56:42+00:00",
            "directory_modified": "2018-07-09T03:56:42+00:00",
            "user": {
              "username": "ada@passbolt.com",
              "profile": {
                "first_name": "Ada",
                "last_name": "Lovelalce"
              }
            }
          }
        }
      }
    },
    "CN=DevOps,OU=PassboltUsers,DC=passbolt,DC=local": {
      "type": "group",
      "id": "5f3d705a-6234-4929-95e6-0cf32a866325",
      "directory_name": "CN=DevOps,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-08-22T08:27:00+00:00",
      "directory_modified": "2018-09-05T12:59:12+00:00",
      "group": {
        "name": "DevOps",
        "members": [],
        "groups": [],
        "users": []
      }
    },
    "CN=TestGroup,OU=PassboltUsers,DC=passbolt,DC=local": {
      "type": "group",
      "id": "b6c6ab17-c5cf-41f1-8e1b-c7915a69bcce",
      "directory_name": "CN=TestGroup,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2019-11-19T14:22:01+00:00",
      "directory_modified": "2019-11-19T14:22:01+00:00",
      "group": {
        "name": "TestGroup",
        "members": [
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
        ],
        "groups": [],
        "users": {
          "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local": {
            "type": "user",
            "id": "55872084-ed6f-4e96-b401-479dd86ca357",
            "directory_name": "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local",
            "directory_created": "2018-07-09T03:56:42+00:00",
            "directory_modified": "2018-07-09T03:56:42+00:00",
            "user": {
              "username": "ada@passbolt.com",
              "profile": {
                "first_name": "Ada",
                "last_name": "Lovelalce"
              }
            }
          }
        }
      }
    },
    "CN=MyParentGroup,OU=PassboltGroups,DC=passbolt,DC=local": {
      "type": "group",
      "id": "3a9bb88f-79a7-4d16-a0dc-aae560f3099e",
      "directory_name": "CN=MyParentGroup,OU=PassboltGroups,DC=passbolt,DC=local",
      "directory_created": "2020-11-01T18:53:53+00:00",
      "directory_modified": "2020-11-01T18:54:39+00:00",
      "group": {
        "name": "MyParentGroup",
        "members": [
          "CN=Developers,OU=PassboltGroups,DC=passbolt,DC=local",
          "CN=Administration,OU=PassboltGroups,DC=passbolt,DC=local"
        ],
        "groups": {
          "CN=Developers,OU=PassboltGroups,DC=passbolt,DC=local": {
            "type": "group",
            "id": "4e58a1a7-fce2-46b3-a901-a5c1a2905233",
            "directory_name": "CN=Developers,OU=PassboltGroups,DC=passbolt,DC=local",
            "directory_created": "2020-11-01T18:22:15+00:00",
            "directory_modified": "2020-11-01T18:23:17+00:00",
            "group": {
              "name": "Developers",
              "members": [
                "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local"
              ],
              "groups": [],
              "users": {
                "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local": {
                  "type": "user",
                  "id": "55872084-ed6f-4e96-b401-479dd86ca357",
                  "directory_name": "CN=Ada Lovelalce,OU=PassboltUsers,DC=passbolt,DC=local",
                  "directory_created": "2018-07-09T03:56:42+00:00",
                  "directory_modified": "2018-07-09T03:56:42+00:00",
                  "user": {
                    "username": "ada@passbolt.com",
                    "profile": {
                      "first_name": "Ada",
                      "last_name": "Lovelalce"
                    }
                  }
                }
              }
            }
          },
          "CN=Administration,OU=PassboltGroups,DC=passbolt,DC=local": {
            "type": "group",
            "id": "35c087a8-050c-4245-b075-07f876a5c6b1",
            "directory_name": "CN=Administration,OU=PassboltGroups,DC=passbolt,DC=local",
            "directory_created": "2020-11-01T18:21:22+00:00",
            "directory_modified": "2020-11-01T18:21:22+00:00",
            "group": {
              "name": "Administration",
              "members": [],
              "groups": [],
              "users": []
            }
          }
        },
        "users": []
      }
    },
    "CN=Betty Holberton,OU=PassboltUsers,DC=passbolt,DC=local": {
      "type": "user",
      "id": "aa4204c8-e474-4df3-a7cb-d4a754b03c0c",
      "directory_name": "CN=Betty Holberton,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T03:57:38+00:00",
      "directory_modified": "2018-07-09T03:57:38+00:00",
      "user": {
        "username": "betty@passbolt.com",
        "profile": {
          "first_name": "Betty",
          "last_name": "Holberton"
        }
      }
    },
    "CN=Sofia Kovalevskaya,OU=PassboltUsers,DC=passbolt,DC=local": {
      "type": "user",
      "id": "16789f75-2cf7-4755-9bd9-634d1ff42240",
      "directory_name": "CN=Sofia Kovalevskaya,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2018-07-09T03:58:58+00:00",
      "directory_modified": "2018-07-09T03:58:58+00:00",
      "user": {
        "username": "sofia@passbolt.com",
        "profile": {
          "first_name": "Sofia",
          "last_name": "Kovalevskaya"
        }
      }
    },
    "CN=FR$,CN=Users,DC=passbolt,DC=local": {
      "type": "user",
      "id": "adcd8b68-0b08-4f4e-a8c1-0b564dab79a3",
      "directory_name": "CN=FR$,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2020-03-10T16:58:45+00:00",
      "directory_modified": "2020-03-10T16:58:45+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    "CN=maxence zanardo,OU=PassboltUsers,DC=passbolt,DC=local": {
      "type": "user",
      "id": "f8b5860e-8280-4bdc-9ec9-de7e49810084",
      "directory_name": "CN=maxence zanardo,OU=PassboltUsers,DC=passbolt,DC=local",
      "directory_created": "2020-09-03T15:48:04+00:00",
      "directory_modified": "2020-09-03T15:48:04+00:00",
      "user": {
        "username": "max@passbolt.com",
        "profile": {
          "first_name": "maxence",
          "last_name": "zanardo"
        }
      }
    }
  },
  "errors": [
    {
      "type": "user",
      "id": "a2c72e5c-6416-4595-a64f-6b240012b418",
      "directory_name": "CN=Administrator,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "976999d8-c52f-449b-b8d4-cc5455a2d71b",
      "directory_name": "CN=Guest,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "e2c5478c-b599-482d-b096-38d3e5574224",
      "directory_name": "CN=DefaultAccount,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-03T15:22:08+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "2b899164-f9cf-4b6c-9260-4331b501ca28",
      "directory_name": "CN=diego,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:22:08+00:00",
      "directory_modified": "2018-07-09T18:48:37+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "a989a46e-0692-4380-830d-f10914b44dc6",
      "directory_name": "CN=krbtgt,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-03T15:23:41+00:00",
      "directory_modified": "2018-07-03T15:54:21+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "dcbf6b7d-2db0-40fb-8c9d-639d44952f9c",
      "directory_name": "CN=remy,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2018-07-04T08:25:24+00:00",
      "directory_modified": "2020-11-02T16:19:42+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    },
    {
      "type": "user",
      "id": "adcd8b68-0b08-4f4e-a8c1-0b564dab79a3",
      "directory_name": "CN=FR$,CN=Users,DC=passbolt,DC=local",
      "directory_created": "2020-03-10T16:58:45+00:00",
      "directory_modified": "2020-03-10T16:58:45+00:00",
      "errors": {
        "email": [
          "user email could not be retrieved"
        ],
        "first_name": [
          "user first name could not be retrieved"
        ],
        "last_name": [
          "user last name could not be retrieved"
        ]
      },
      "user": {
        "username": null,
        "profile": {
          "first_name": null,
          "last_name": null
        }
      }
    }
  ]
};
