
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
    }
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    administrationWorkspaceContext: {
      must: {
        save: false,
        test: false
      },
      onResetActionsSettings: jest.fn(),
      can: {
        save: false
      },
      onSaveEnabled: jest.fn(),
      onTestEnabled: jest.fn(),
      onSynchronizeEnabled: jest.fn(),
      onGetUsersDirectoryRequested: () => mockUserDirectorySettings,
      onGetUsersRequested: () => mockUsers,
      onTestUsersDirectoryRequested: () => mockUserDirectorySettings,
    },
    dialogContext: {
      open: jest.fn()
    }
  };
}

export const mockResult = {
  "base_dn": "DC=passbolt,DC=local",
  "connection_type": "plain",
  "default_group_admin_user": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "default_user": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "directory_type": "ad",
  "domain_name": "passbolt.local",
  "email_prefix": "",
  "email_suffix": "",
  "group_object_class": "",
  "use_email_prefix_suffix": false,
  "user_object_class": "",
  "enabled": true,
  "enabled_users_only": false,
  "group_path": undefined,
  "groups_parent_group": undefined,
  "password": "password",
  "port": 389,
  "server": "127.0.0.1",
  "sync_groups_create": true,
  "sync_groups_delete": true,
  "sync_groups_update": true,
  "sync_users_create": true,
  "sync_users_delete": true,
  "user_path": undefined,
  "username": "username",
  "users_parent_group": undefined,
};

export const mockUserDirectorySettings = {
  "header": {
    "id": "3d385c64-e47d-4051-b87a-95a45d8ab6d9",
    "status": "success",
    "servertime": 1604585526,
    "title": "app__view_success",
    "action": "9f7e766d-a30e-50d5-b16d-5cdc474fd1e8",
    "message": "The operation was successful.",
    "url": "\/directorysync\/settings.json?api-version=v2",
    "code": 200
  },
  "body": {
    "source": "db",
    "directory_type": "ad",
    "domain_name": "passbolt.local",
    "username": "username",
    "password": "password",
    "base_dn": "DC=passbolt,DC=local",
    "server": "127.0.0.1",
    "port": 389,
    "default_user": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "default_group_admin_user": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "enabled_users_only": false,
    "sync_users_create": true,
    "sync_users_delete": true,
    "sync_groups_create": true,
    "sync_groups_delete": true,
    "sync_groups_update": true,
    "connection_type": "plain"
  }
};

export const mockUsers = {
  "header": {
    "id": "d0e8e203-5031-4ec4-b6b9-cb15a780009b",
    "status": "success",
    "servertime": 1604585526,
    "title": "app_users_index_success",
    "action": "d7bc9044-a64e-5421-a4d7-7a94eaa39d37",
    "message": "The operation was successful.",
    "url": "\/users.json?contain%5Bprofile%5D=1\u0026api-version=v2",
    "code": 200
  },
  "body": [
    {
      "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "dame@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-11-02T12:33:25+00:00",
      "modified": "2020-11-02T13:33:25+00:00",
      "profile": {
        "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
        "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "first_name": "Dame Steve",
        "last_name": "Shirley",
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "avatar": {
          "id": "02258aab-c89e-4dd4-8c76-143a1620eb8c",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "model": "Avatar",
          "filename": "dame steve.png",
          "filesize": 20676,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "f2695972b9009970ac85aae95f907693268cd249",
          "path": "Avatar\/0e\/23\/b6\/02258aabc89e4dd48c76143a1620eb8c\/02258aabc89e4dd48c76143a1620eb8c.png",
          "adapter": "Local",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/0e\/23\/b6\/02258aabc89e4dd48c76143a1620eb8c\/02258aabc89e4dd48c76143a1620eb8c.a99472d5.png",
            "small": "img\/public\/Avatar\/0e\/23\/b6\/02258aabc89e4dd48c76143a1620eb8c\/02258aabc89e4dd48c76143a1620eb8c.65a0ba70.png"
          }
        }
      },
      "groups_users": [],
      "role": {
        "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "name": "user",
        "description": "Logged in user",
        "created": "2012-07-04T13:39:25+00:00",
        "modified": "2012-07-04T13:39:25+00:00"
      },
      "gpgkey": {
        "id": "f0df9afb-2f0a-5273-aa1e-1f625f2920a0",
        "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWVJ3EBEADbUrPtSQprUnUAxYb9qJiDO+nhzQAbVOiz7cc34xYLyjwIzlgn\nfwO2kEUm4mlN6xCbXmlL9KIuTrehYpB1dmAbDk+jYUowPj92YoqDXp8VRZ3Dz86E\nyEXg7Od1XB4Ym6BnYtckkksmBM1eMX99K\/j91PYXRU0Xz8AMtEZu7jg1mLq279bv\nFTY9qKzyJOkshKYcmWLpeKqAKEqPWfTQ89Z\/mVudQDu6KYKNVEe+SdYGJh8jJfe3\nsVgFAlSUeUeylWYjFP6eWobpe+SoIp2Ji2nJAWp4lqXm5sH4w6iPHqCH+jXbr1cL\nHWVU01fLiKOxWVBi9Gmd6PgFn1oBKetXARU6RiETNbQoi1F5\/ugeN+lziJ5DxLoA\ndbqlb34IaAQMS5aaICq+fJKgOtZxDCmFYYzubTqqtDiOqDV5sxLtgyEiwgK6YnXj\n2JElHGbZNKCh33hyg9tOYWUHsXB4kwpAgbI5VEceACCRLO53D8kLOIBp5W8sSOra\n0m+9yitbuFDRWIoAouJdwolHPH8ChhqBUxzs8Mu8KYLe2JIujETiMSvOnaChrVK5\nw\/Q\/AsJYiyKGEVpfNFfMqLRKZMFubHhLsihDbk0Fz6C0M8C9MVZ6vglFBJuT9YjY\nY\/UVm2psWesoXUhfAI1rjEObYHTvFT8gkkxsjvenr9q938HbTn1b1sxIjwARAQAB\ntChEYW1lICdTdGV2ZScgU2hpcmxleSA8ZGFtZUBwYXNzYm9sdC5jb20+iQJOBBMB\nCgA4AhsDBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEA+ZTXFKv11RMVVgp3Y4m\n25Wc8dAFAl0bm88ACgkQ3Y4m25Wc8dDSqw\/+O\/wnI48\/Cl\/QxiUuxOzKAQQsbeDw\nnxBWunpx1LQMOqqfwiDu1SBYaBZzoM5phFCjBhZeykWZyzCVAuaXa5mImDWmUitK\nFSgUmMOVe4tBuBXoXhk1sn5pyTxjBjer\/PP2SdRhF0AwRni2vaqFSCueAQ6kCVUK\nfttjBZ\/zWFJqJLqjJmHvJ2yBXLAQrdG1V5aJQT0LxiVBcJ2c2LQw3LrwZ0WlMT4v\nyoLtZq0cZs7q9rjvh42i7HTmkkjHuLhsQ8MsG9kItqoG9Ht903qgqRZYQVJcuqPT\n1dQBLY1YOjqa63qRndwt6r2IGMzABniNWsQ\/DOizae1o6Rb12UcTWW2nREg6IVUe\n+WUNLNOxbnS0bgJzkvV2ab2Rkh4yX3g5SGTbJxnIUEataSuzoo0lk6TaO5BZffyH\n48Ad5dBV7O2BFNVB0H1Fs+A03EqMF1+mxJ1cmc+PYwtcwz135PT7Lkonvu+7Ze9p\nQR\/B+al+3F008D647ciATXIFUsEfS2L7FFRmyaMvr\/Wh0hV\/VA84cKbJuEbuGxFR\nn0cUsh6T0kCahRFdpDq322IxgH3alCYx75dIstnr9ckfE+teAQe3nmLro33q+QTH\nzriUwsSIuZOF29qQgbM9AnW49Nm0fOx6MzlVeoiN8Kqb4wkfN4MsYKDybsY2DkuJ\nh50+vKZm2j6MpJm5Ag0EVZUncQEQAMVk1qBkdXFXIJQSL1oD3jfPL5gSFy9Ho1Hs\nUkN8uM7ILhmD+5sJ\/6mHnJFrV9zDLjmNnOTnfug72+L2sNCIvzFGuncvCNM2Xqtr\nWAsSf+XXS4Map\/Qdn1DrRnIvfeLgvIHGhMe8HdRmr4wwbnocub0ujGtqW2DqHOer\nwxP42ImBpCcY2NoHnu4aCPPPqKd8A6eZcIw9DQ9gb+9St+qGuUzk\/TcwHQb0dHUO\nqyT+zZclyxQYO7gEkbNAsQOtz0YT3vz+dq+g+3JSQApBq74Waws6d9c1l7qWVGds\njYR9qRULv8AZqA53JgzGZfcigzBzX9SGQVgAnBKLeEWIptdEKsQJGVJgO13iWkqv\n72OSrrNlI9LR648m8n80wXRZVgiVQ9hikNJZnEu8nNEVqEXAktu8JRUNxTZvrw6z\nmtIFEwTyvXibYnMniLoUK3sa8GHmMT25c7tgYwSfdsciz+e5In5LHTs1g1qMGb59\nK5+62CYE5WhqBRh\/eB7\/Csiip0ohflwuE62RuSi5rKMbAXmyCv8NNw9ocsF01bZb\nf2s+jl5Vl\/CMyI4k3yCdIq3CZD5fq\/lip2HAjaHCMFWfrBy2HGZRUzN+CAIsJO3L\n2lOUgwNhEBa9vPq+wcLbLxd1TV61g+J\/1nMZ+4H6hRlDrJP15YmgY13Qki5NrjxV\nvf05vCO9ABEBAAGJAjYEGAEKACACGwwWIQQD5lNcUq\/XVExVWCndjibblZzx0AUC\nXRub2gAKCRDdjibblZzx0Nz2D\/9FnXa9KytV\/WvktA74v2N77uUurArhMUAzu8Hz\njeKWMOjofRcX1W0izm5lyi96npRwxo3tF9d6WeE1Filck5FeZeqMK0R3DU1BYPfu\nDFqXVTJokiaCchJfHn+PNMmlyDrDu6FIvOaJBfOrGouMK7pkrpSsfwTRfNK2r9Wv\nEaI5DTP2wMYkEwvoVzHfHioCYoOgP8Lma8\/0PaNIQ8kOpiydc+qXyLly0OSEb7XT\nQEHO3uaCoFodu9QghRxaoIxZ3kb\/LUB4pWnZhd\/00+ijcOU2mmc\/sONfnaD4wbR5\nqrTelDruSAOy2PPBzkcTstg3DQeUUWMGZIGdkrAq+ufGO9xUGJ18LF76xG31FcWN\nmhShZ+rYAAOdy4MMHaMdbACcJRyKX9iI7avmj8nPKeq88JtnFY9v+t6lp+4OHKdj\nHaKgo27jGW8OhPRK4R96W+xQdnB8O7eJS4XilgSUEjDnBsZmbzoVPy4avFk+06wz\nFhCq\/EE26P1lkREPmR72TtSjw5DZUST+uAVCOdz\/VbD7nJh8oSgzWmoZvx53PcjP\nP6H7xJd29T63Hx78ZLekls41qWKXCgXpoapO4pK4Qco4YqlRuQAejcKp6WLCzXDT\nsJqDMAb6AJhuS1Jea7zGoad7YlvCXXiSgSXs\/lmiRt9FEbQaKunk03bDjlJwgU5f\nUXjj0w==\n=ikRL\n-----END PGP PUBLIC KEY BLOCK-----",
        "bits": 4096,
        "uid": "Dame \u0027Steve\u0027 Shirley \u003Cdame@passbolt.com\u003E",
        "key_id": "959CF1D0",
        "fingerprint": "03E6535C52AFD7544C555829DD8E26DB959CF1D0",
        "type": "RSA",
        "expires": null,
        "key_created": "2015-07-02T11:58:41+00:00",
        "deleted": false,
        "created": "2020-11-02T14:33:26+00:00",
        "modified": "2020-11-02T14:33:26+00:00"
      },
      "is_mfa_enabled": false,
      "last_logged_in": null
    },
    {
      "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "betty@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-10-19T14:33:25+00:00",
      "modified": "2020-10-26T14:33:25+00:00",
      "profile": {
        "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "first_name": "Betty",
        "last_name": "Holberton",
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "avatar": {
          "id": "0baf5788-8e7f-4f5d-8c1e-c9a7fecd8750",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "model": "Avatar",
          "filename": "betty.png",
          "filesize": 115942,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
          "path": "Avatar\/60\/1a\/4a\/0baf57888e7f4f5d8c1ec9a7fecd8750\/0baf57888e7f4f5d8c1ec9a7fecd8750.png",
          "adapter": "Local",
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/60\/1a\/4a\/0baf57888e7f4f5d8c1ec9a7fecd8750\/0baf57888e7f4f5d8c1ec9a7fecd8750.a99472d5.png",
            "small": "img\/public\/Avatar\/60\/1a\/4a\/0baf57888e7f4f5d8c1ec9a7fecd8750\/0baf57888e7f4f5d8c1ec9a7fecd8750.65a0ba70.png"
          }
        }
      },
      "groups_users": [],
      "role": {
        "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "name": "user",
        "description": "Logged in user",
        "created": "2012-07-04T13:39:25+00:00",
        "modified": "2012-07-04T13:39:25+00:00"
      },
      "gpgkey": {
        "id": "b4ac2e2f-2764-51e6-82c9-2066943733ff",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWVIFEBEADNf9iYgEVVxHAQ06XTEtx2kpm9jW4kiwBUeJxDEWnUPACEW0Qn\n8qA+WAAMeFppxGIjkxW3lyI+TfV0Cclw7h5GTSMlSlIosrNqFRDvj\/q8ghZLAccy\n5rcpHfLwHdmGR+S4qzCxfJQ9rkBdZQkde4LpRDmbx1EkFeed1FXwoNuxFfp7cBoo\n\/Z5if+mf+6pn1oLAy47PlASYltPvtj\/pK3ZNBatPz5vfBVRjTH9UrdXK8ZjnWypw\nACln7pe1vz5mAmNJdpPhxvAMXMx9zWEookYQFCaeOKI9t6t5LX9Vn2wAfHqLV94P\n8trrBRHYgAjMI\/fIoOXxcSBEBM98AeJMgMjwQ4\/P1o0bvAhxitNCIgqeLtW2bR4W\nG+8SF6ALcZM1kGt8a0DSC9X8dtHpKSvoCT7GgCXtuMl1gptjprzHnM1thhSXZyFI\nmVM3e99MC101JG1pQpmyC91KyHPWcwZE\/ugIZTsJQwSjPeLHcGbp+5cLOWArH64Y\nVdiUkQ0SwPdB1tsUvfekoNBWQgCNAL9yFTXOsxNM9AsZ+r55kQvp3voMdt49n6z1\n9P6sVaPa3+7yj1W5LBIV0stgxixbXBBTnAx19R+23FnmecfHYH8cIiFwJsYWsAYB\nCGFzhP9kYzU7Io6TXAZ03LY9KGZW1aRhZTUuY+JErWFYr\/D+9skZ5GE1bQARAQAB\ntCRCZXR0eSBIb2xiZXJ0b24gPGJldHR5QHBhc3Nib2x0LmNvbT6JAk4EEwEKADgC\nGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQSnVIYMOt5asEWZAl7T8f5L5h1w\nCQUCXRubCAAKCRDT8f5L5h1wCS7hEACZMSsu66LG0m875Ow4eivGQaJ8CStPGAaG\nhjgeINUnEWWLABfcGAKYhUCeReKY6sESE+EjS7igeqrjME2Y1WhvUgvuCOz1u8Ei\nV4skeewqV0cfZR0U2HW9nwapP9DNpEVjYPncTshvbYaUzF99RCj5kxpcy4VWd\/On\nacbeWGF2wcrsy6X9zsbkAzHxjq0EfKyZtfnl3\/gMVhaL02v7Q9OtTz\/to0cLPnm0\nYSfCpd91+To9vXQsz8B5OAGOvuEJ3JizL30E\/xc0qqI\/Mn6NtMSsoY3XZHt51c8y\ngtV5PavMBKX1ktp3hXR+qfXoMy5fkT80hNu8geyN3HcRjYWSas\/0lV6ts4kZFrpr\nbH6Xb20O0stiNrD0EM4Z2hUhQTg+\/IOj9LeyBi+XpRx6S1f206u2j4DlEcvLcFCU\nq5RHYqc8AfjdJsaC3t9BkmI8zCAJNM+q15EAkYhVfeznyLzKt2avQAR\/7RYElt4H\nX2mfIa38vIqjl\/hcIgIOFRhLG\/c+ajMG0i7xwt5bffuZsXwqOBZIPTS9RKYjmwJ0\nzTUbTRxYONBR3ddDBfDDm3\/bYcnfqJlApJEdBzdemv7StYN5U6+YXjxmwE3JR7+h\n9a+GYhQ4r6pBi1Q8n69nOStQy\/ikgQq4dzrlw0jYoTcsfYhc1vDA3Gp9ue6CVbRn\n+UoI61Mtm7kCDQRVlSBRARAAu8uW\/hS53cTd6nkO46glyE5MOenGBwX6hs+33OVD\nVWSwZJkO3U\/O6xVspe+SlMZY+bKoDlLrIj5qENFudAwVmq+QuLU+QTE673FD5SFZ\nP1DuTe2Hjoo3s0xmLdQQegECCZBniWwnLmzpl89owtbrli+hlN78VYYezI6ev9WT\n\/JSQRV4GIDxbPjcdeLJNiszpcJRxn7SVSogYax+G8CjGOZRL0ZQAmqhi0x\/NJS7U\n2kiP6BwObNGP1bTmwIBa6VF0NWC07xnUDJ3kV0SOT16EsR8G\/0Huq1AYe7TvKAwy\n8A0x8gd9fLvIjSOWL0vsOvVEzGth3tZZjmMEhwK5ZpA570gEJjDs9zY6WCnR4qmE\nosHdZIaB7DG+zyBm0G4suJAAMsIDOiBdyIKnbQRALegGitVwv3IHTfRKaJDTBrEG\ndMeuE0uHMrR3vQMWDAUj2c6UV2OrHePpucZYLIj11s2xlhhpbf22q3hIp5jQ5qsm\n1\/XKoSuyWuYzAVIKo+7KDB\/rLAbtUsrnRa\/YsgwyAraq5NaBcIvd81aDtosxKbO1\nD3BCWfq2TkHRwTVR\/PhI5RJ1y3\/67+1Q+Su1v2Mqw\/wyfjIMcioZcDSSEZXDVzo+\n8J5mIG3z4ckWcY7LwAu09yV\/RRdkePvMxe0Gz\/fdUP1Vt4Z0W1cuOwPrI2MB\/gnJ\naisAEQEAAYkCNgQYAQoAIAIbDBYhBKdUhgw63lqwRZkCXtPx\/kvmHXAJBQJdG5sg\nAAoJENPx\/kvmHXAJnt8P\/iOaamlsCIWoWgMfWikipAh9M\/xfvxY5E2qWFhDHqFun\noVZYuXeZ\/PX8ZRrhgr7wrvk6XYlitbHWivoq9z\/gchX1l+xj3ncWH6Jwr8VJRKWT\nbFxj6YvbN5gUjXsk1qxx0oLxVALPINIXRuqFZJRpEHbE47S3jC1VN+G2Z3\/JOcoY\nmXCXlx66EA95BPRxSZt65HWEA\/zNyqwR0ZakG0mnuL154A+BPsNcM1I3uHfBzmGb\nBpW1nC7Wmb484fZlVzIcAUsBod1n+nIXUcVnrWD8zwqP\/B7lhYpp1ozb8+vF1hID\nDr\/BJNlZW56rvSKjlIETkqKjWCIxOB9BamnrxxemmEWf82aDosjdGmgwHrYpfgDM\nArtnsZ+2fVCOGggmJ92I0P8zf9qCiSWGg0\/8xzf4SS5TfU4fMjIVqexHiOKX0ci6\nbQOX5VfKRaPMX00ljb+BEz3aFKi7\/lggxSB5vTJqpintCbs182p\/8D9ZTDVyKEVQ\nII0JPr+VdwEO1mm0wMq6iIe2zlKM9qjqq2TuRmsNS7QUnijFU2j3lbfl9LcpEPiw\nVTRIHkS0aUc\/4Ln+IaOAUovDSN0jLwBmbl7gHrp+r7JQgPEQI8P4XjjEndrg0X24\nHdlU4AAE7nI6dZeGf8IEXj5k\/kDkIMSJmMtm2eXpJZcPYGDVUkOA30ioDY14fVY9\n=KJsT\n-----END PGP PUBLIC KEY BLOCK-----",
        "bits": 4096,
        "uid": "Betty Holberton \u003Cbetty@passbolt.com\u003E",
        "key_id": "E61D7009",
        "fingerprint": "A754860C3ADE5AB04599025ED3F1FE4BE61D7009",
        "type": "RSA",
        "expires": null,
        "key_created": "2015-07-02T11:28:17+00:00",
        "deleted": false,
        "created": "2020-11-02T14:33:26+00:00",
        "modified": "2020-11-02T14:33:26+00:00"
      },
      "is_mfa_enabled": false,
      "last_logged_in": null
    },
    {
      "id": "887422c0-bef6-59a7-bbda-84c253ee0848",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "frances@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-11-02T14:33:25+00:00",
      "modified": "2020-11-02T14:33:25+00:00",
      "profile": {
        "id": "543865d0-5f9b-598d-928b-2811f3cae77f",
        "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
        "first_name": "Frances",
        "last_name": "Allen",
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "avatar": {
          "id": "3af7b0ca-6b6c-4e54-a36c-60cb060bb34d",
          "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
          "foreign_key": "543865d0-5f9b-598d-928b-2811f3cae77f",
          "model": "Avatar",
          "filename": "frances.png",
          "filesize": 283883,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "95af1b264a94de0b75af95e75030832245afc8bf",
          "path": "Avatar\/e5\/86\/e2\/3af7b0ca6b6c4e54a36c60cb060bb34d\/3af7b0ca6b6c4e54a36c60cb060bb34d.png",
          "adapter": "Local",
          "created": "2020-11-02T14:33:25+00:00",
          "modified": "2020-11-02T14:33:25+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/e5\/86\/e2\/3af7b0ca6b6c4e54a36c60cb060bb34d\/3af7b0ca6b6c4e54a36c60cb060bb34d.a99472d5.png",
            "small": "img\/public\/Avatar\/e5\/86\/e2\/3af7b0ca6b6c4e54a36c60cb060bb34d\/3af7b0ca6b6c4e54a36c60cb060bb34d.65a0ba70.png"
          }
        }
      },
      "groups_users": [
        {
          "id": "38804173-18aa-5ec1-99b9-354496374816",
          "group_id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
          "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        }
      ],
      "role": {
        "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "name": "user",
        "description": "Logged in user",
        "created": "2012-07-04T13:39:25+00:00",
        "modified": "2012-07-04T13:39:25+00:00"
      },
      "gpgkey": {
        "id": "82eaeed6-32a9-5e56-af93-6bc362a9d62b",
        "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
        "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFWWaH8BEADaNmNDTAuy9QRsdFTV1yJSbI6u5GYuDWV6TS7isEFxj+BIvgAc\nryRjXfUHJv\/WOC1O4lCS5sOvYxwVTsafY6U4qqEJZa2SO+1GxC5Gdty+G6pVnkw6\n9Zh4RUErKKQYR9qCKyHBDMcEnDHZv4KMRMhwgrihWWyfOgdIkgv7PESsGTJIzZ7q\n62ylAPHRdF7BGFn6WUJbH75NIxpybY8mRuVM\/5rCbn1zxzHiUSR2V8jjjVSZIrye\noJnXuP7ZCG8GkJxRPX0wu5q+2gumczeWBLkFN2+X3wf0y\/K1kn9wB4TFTfpEGxIU\naJ6yhwCS48b6NDG6rENth1idzbu0Q9lKqNxJ8v24bQ2tZsO6qGFxvqA4eCaW+tx1\n182oq4Akmi2Oon\/ryU5OFoLObhDI9uFYkSh5EOS6DefcXMwcUZT9Wvy4DA\/6gqSj\no26lZiqGZ77PtTPB876wHWPyrwiDgTdkaOYdvpx95AnUcQtkgh7n0kCkMEHLP5kc\nNEIoJzbu2UKZ6nxMG\/gMD2kX1anSdI2MJXGdEQO4bX4Do3UeiOyHzXzqe3YC+l3d\nc5F8Nqug\/GiRHGEex3FOEEUHGhzSrOcf0QKAjtK9pfZicrUjLMeQC7veXp\/Hfut4\nuxhl1CtEXMhK\/FIVjNV25gaoA8aZUiw4mb+dnIgIzj7n+B\/aPWurlsE\/iQARAQAB\ntCRGcmFuY2VzIEFsbGVuIDxmcmFuY2VzQHBhc3Nib2x0LmNvbT6JAk4EEwEKADgC\nGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AWIQSY2jM1BpLyG9X4Ohfo3FYXR3+x\nTAUCXRucbQAKCRDo3FYXR3+xTGU8EADNdPHIU02EFJbn1c2\/7oXA60bn4wixt0ZO\nJU5jrbDefpysP7xs7I8wFy2EZDgZQkeKisEs26cNR1i0XqsmvKvqypzpLidSXCGo\n5yOce8llpoasLnCVEvIFyDUX87gYw9W99G3NErIC8E5HkpuErcDxvssMMVfof0Zg\nFetniTQjAXASlDQy681bYsdK56NXoMlO8ZCocM1Kcl\/EGhDGYc6EzjZ8YijjQTyd\nmB\/MqFpibUxUusKtVEpcdBmFmlamTbKGmVZhLTI\/B\/9uk1jrOABeXi00pXJC8ZBq\nKT3VpmHtV9Q7A+Oq2ad6deqYuEPjwUy1Hg7rV87H6CyKwQsgvSUe85X2Wf\/HtmAq\nOX7R1tnCFuzVI6Gt0dja25xKgEt4l3eUa8EhAXh90qHzJ9EqJ6IjqvLK9pVUp6Hs\nfxVfo8abZawiesvJ\/oa2GC\/1fYoHzV0MwXgLqzROEvncGLzZ\/4SMmz5Qzk9a9Zze\n78L1IcbegckJO88CjT6Rf0dEtm2UVawupIRTQavpuR1ECJjNxLA+Mhc6+HJ1zGH4\nSP9\/RAlWgh5C+KzJKC+Vgdl6D83rOOfjk7JO8YdI48R+6K073zQwpIineqRTozR9\nhUra9El4\/7G41WwGl51k+8rssA3YP22tQojP+hStVtjmwNNaLMIIm+nc4KItQsSz\nHO\/+hh+s9bkCDQRVlmh\/ARAAswOgpvan17ZeYR8nr5sKBsMkWKI\/Px8r+dBbO2xS\nBXMdhaUKjbEHPUn0n03FpqDRtW2EWxRpSWcXFQXqXEN7phUXqVHsKT4Enp61J3u8\n2RoMj8fo0Lxce3WO8WbYJpj1+LhvCvttoJaqjB3YiwtYn7U92DZLhEgzXTbuGOSr\nCwQ\/c5zOqnApomnDudL4M34seNtn\/DwYfXdDuHVcYNKBDSJWaZOVYkbvbgFbgjMf\nwRnAt1uyBX1K2bmlsfvvw6iV26EcGOFB2LywlVAZn+nIgbWq+qBS9uaRZXYmKK2I\naiAKK56iRTg\/t524h\/lu5KSZg1Uu6i3R+3ghuMv+Y4pcbSE2L+qs0s5awd66xwBr\nFZpBLwUSPUEuOrZS9HRY4nLmEbQkOuSwmSjQcJNHrVIgCKWIat2tB5v6kjUY7pyO\n7Gj8V5bCv6ewgmSTzW+oPzijY+Qh7+h+ITdfHZvRWm1cXaIj0FL3AvVXPxMoz9\/0\nPqH\/QuAW1jEPJuWlhdvJ\/AO3+rO5fDR+84Xm4Fi\/Bu1cBVJz5fap\/uJZe7ZIn657\nZ7JXAd2WCQ9FHGiWErnjdxEAIp5KHgvo2FOjvXzooC\/\/W4uI8kx001iq22CU8YBd\nX7ulKmR+sBMTT+bimyRhMl2dgOE9IEozDah8Y4D7mcLSJeC5Dhwu7cPVgVKcdHX4\neVsAEQEAAYkCNgQYAQoAIAIbDBYhBJjaMzUGkvIb1fg6F+jcVhdHf7FMBQJdG5xg\nAAoJEOjcVhdHf7FMZzYQAJu\/d3f+3tSi5Hzs\/0A\/TH0jvPjoXPuYlZhlZp1fs8SC\no5KSVOPUrdvlJkX0\/eqg4XcTEz27bWDJ5y73rOOR81y2FE\/WIem0bFQGd8PedX2Y\n2X9VzoElGIh+zji1\/S\/9J63+UrIRDMipjQmNK0UyZXak+mdbU7Jjgg1r5akoji8Z\npOAUGQuGu4wNioCsC0Vx3Y7yC666DjqQy5V4Glxclwjrj26y1VFGE1g1Z+ZHa7fx\noTUv6wNqtp4WvE4AaKpcUzXj\/IUhXR9Kc4Mckz3HXYo4xKPwpzMVo+H7sYtltK+h\nRLG\/HGMzIpphHeW\/T+3NKjVUODIA7R9F9c7ZnEE5QYSzjpeLkdgXgxO312VOYpn2\nVc+Dm5Wj8cS7L3AGwzcM9GkpT4TxJNyAN8ImfcYnBeXXWMXxn+SyrJ07CYGEmcWY\n7Nd7PNDHEi\/1H61hr2RVoMlxd\/4r8MiAAb7P0Q94es2ykdmm6RH8wwL1vkRqgs78\n895GiLiI99ZWeHdO85GJWB6oUwNwqjQm0CP6EklHr4nmJoon\/bNrmHViZvQ9Or1F\nT5sCBF9rH9JdWQ1B7d4kH1hU\/n16ObwxE83spd\/BBo0b7ayiE6\/MCmUouLTIqdh2\nd5o7RTE7uW+LciwI0b78SL7Mw1UH+njrtq6QjfYni1wLI770s3\/7+lSUIi895K5T\n=82jm\n-----END PGP PUBLIC KEY BLOCK-----",
        "bits": 4096,
        "uid": "Frances Allen \u003Cfrances@passbolt.com\u003E",
        "key_id": "477FB14C",
        "fingerprint": "98DA33350692F21BD5F83A17E8DC5617477FB14C",
        "type": "RSA",
        "expires": null,
        "key_created": "2015-07-03T10:48:31+00:00",
        "deleted": false,
        "created": "2020-11-02T14:33:26+00:00",
        "modified": "2020-11-02T14:33:26+00:00"
      },
      "is_mfa_enabled": false,
      "last_logged_in": null
    },
    {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-09-02T14:33:25+00:00",
      "modified": "2020-10-02T14:33:25+00:00",
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "avatar": {
          "id": "bee583a7-0518-481d-bccc-76466f8608fc",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "model": "Avatar",
          "filename": "ada.png",
          "filesize": 170049,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
          "path": "Avatar\/aa\/45\/ab\/bee583a70518481dbccc76466f8608fc\/bee583a70518481dbccc76466f8608fc.png",
          "adapter": "Local",
          "created": "2020-11-02T14:33:26+00:00",
          "modified": "2020-11-02T14:33:26+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/aa\/45\/ab\/bee583a70518481dbccc76466f8608fc\/bee583a70518481dbccc76466f8608fc.a99472d5.png",
            "small": "img\/public\/Avatar\/aa\/45\/ab\/bee583a70518481dbccc76466f8608fc\/bee583a70518481dbccc76466f8608fc.65a0ba70.png"
          }
        }
      },
      "groups_users": [],
      "role": {
        "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "name": "user",
        "description": "Logged in user",
        "created": "2012-07-04T13:39:25+00:00",
        "modified": "2012-07-04T13:39:25+00:00"
      },
      "gpgkey": {
        "id": "04481719-5d9d-5e22-880a-a6b9270601d2",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFXHTB8BEADAaRMUn++WVatrw3kQK7\/6S6DvBauIYcBateuFjczhwEKXUD6T\nhLm7nOv5\/TKzCpnB5WkP+UZyfT\/+jCC2x4+pSgog46jIOuigWBL6Y9F6KkedApFK\nxnF6cydxsKxNf\/V70Nwagh9ZD4W5ujy+RCB6wYVARDKOlYJnHKWqco7anGhWYj8K\nKaDT+7yM7LGy+tCZ96HCw4AvcTb2nXF197Btu2RDWZ\/0MhO+DFuLMITXbhxgQC\/e\naA1CS6BNS7F91pty7s2hPQgYg3HUaDogTiIyth8R5Inn9DxlMs6WDXGc6IElSfhC\nnfcICao22AlM6X3vTxzdBJ0hm0RV3iU1df0J9GoM7Y7y8OieOJeTI22yFkZpCM8i\ntL+cMjWyiID06dINTRAvN2cHhaLQTfyD1S60GXTrpTMkJzJHlvjMk0wapNdDM1q3\njKZC+9HAFvyVf0UsU156JWtQBfkE1lqAYxFvMR\/ne+kI8+6ueIJNcAtScqh0LpA5\nuvPjiIjvlZygqPwQ\/LUMgxS0P7sPNzaKiWc9OpUNl4\/P3XTboMQ6wwrZ3wOmSYuh\nFN8ez51U8UpHPSsI8tcHWx66WsiiAWdAFctpeR\/ZuQcXMvgEad57pz\/jNN2JHycA\n+awesPIJieX5QmG44sfxkOvHqkB3l193yzxu\/awYRnWinH71ySW4GJepPQARAQAB\ntB9BZGEgTG92ZWxhY2UgPGFkYUBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEA\/YOlY9MspcjrN92E1O1sV2bBU8FAl0b\nmi8ACgkQE1O1sV2bBU+Okw\/\/b\/PRVTz0\/hgdagcVNYPn\/lclDFuwwqanyvYu6y6M\nAiLVn6CUtxfU7GH2aSwZSr7D\/46TSlBHvxVvNlYROMx7odbLgq47OJxfUDG5OPi7\nLZgsuE8zijCPURZTZu20m+ratsieV0ziri+xJV09xJrjdkXHdX2PrkU0YeJxhE50\nJuMR1rf7EHfCp45nWbXoM4H+LnadGC1zSHa1WhSJkeaYw9jp1gh93BKD8+kmUrm6\ncKEjxN54YpgjFwSdA60b+BZgXbMgA37gNQCnZYjk7toaQClUbqLMaQxHPIjETB+Z\njJNKOYn740N2LTRtCi3ioraQNgXQEU7tWsXGS0tuMMN7w4ya1I6sYV3fCtfiyXFw\nfuYnjjGzn5hXtTjiOLJ+2kdy5OmNZc9wpf6IpKv7\/F2RUwLsBUfH4ondNNXscdkB\n6Zoj1Hxt16TpkHnYrKsSWtoOs90JnlwYbHnki6R\/gekYRSRSpD\/ybScQDRASQ0aO\nhbi71WuyFbLZF92P1mEK5GInJeiFjKaifvJ8F+oagI9hiYcHgX6ghktaPrANa2De\nOjmesQ0WjIHirzFKx3avYIkOFwKp8v6KTzynAEQ8XUqZmqEhNjEgVKHH0g3sC+EC\nZ\/HGLHsRRIN1siYnJGahrrkNs7lFI5LTqByHh52bismY3ADLemxH6Voq+DokvQn4\nHxS5Ag0EVcdMHwEQAMFWZvlswoC+dEFISBhJLz0XpTR5M84MCn19s\/ILjp6dGPbC\nvlGcT5Ol\/wL43T3hML8bzq18MRGgkzhwsBkUXO+E7jVePjuGFvRwS5W+QYwCuAmw\nDijDdMhrev1mrdVK61v\/2U9kt5faETW8ZIYIvAWLaw\/lMHbVmKOa35ZCIJWcNsrv\noro2kGUklM6Nq1JQyU+puGPHuvm+1ywZzpAH5q55pMgfO+9JjMU3XFs+eqv6LVyA\n\/Y6T7ZK1H8inbUPm\/26sSvmYsT\/4xNVosC\/ha9lFEAasz\/rbVg7thffje4LWOXJB\no40iBTlHsNbCGs5BfNC0wl719JDA4V8mwhGInNtETCrGwg3mBlDrk5jYrDq5IMVk\nyX4Z6T8Fd2fLHmUr2kFc4vC96tGQGhNrbAa\/EeaAkWMeFyp\/YOW0Z3X2tz5A+lm+\nqevJZ3HcQd+7ca6mPTrYSVVXhclwSkyCLlhRJwEwSxrn+a2ZToYNotLs1uEy6tOL\nbIyhFBQNsR6mTa2ttkd\/89wJ+r9s7XYDOyibTQyUGgOXu\/0l1K0jTREKlC91wKkm\ndw\/lJkjZCIMc\/KTHiB1e7f5NdFtxwErToEZOLVumop0FjRqzHoXZIR9OCSMUzUmM\nspGHalE71GfwB9DkAlgvoJPohyiipJ\/Paw3pOytZnb\/7A\/PoRSjELgDNPJhxABEB\nAAGJAjYEGAEKACACGwwWIQQD9g6Vj0yylyOs33YTU7WxXZsFTwUCXRuaPgAKCRAT\nU7WxXZsFTxX0EADAN9lreHgEvsl4JK89JqwBLjvGeXGTNmHsfczCTLAutVde+Lf0\nqACAhKhG0J8Omru2jVkUqPhkRcaTfaPKopT2KU8GfjKuuAlJ+BzH7oUq\/wy70t2h\nsglAYByv4y0emwnGyFC8VNw2Fe+Wil2y5d8DI8XHGp0bAXehjT2S7\/v1lEypeiiE\nNbhAnGG94Zywwwim0RltyNKXOgGeT4mroYxAL0zeTaX99Lch+DqyaeDq94g4sfhA\nVvGT2KJDT85vR3oNbB0U5wlbKPa+bUl8CokEDjqrDmdZOOs\/UO2mc45V3X5RNRtp\nNZMBGPJsxOKQExEOZncOVsY7ZqLrecuR8UJBQnhPd1aoz3HCJppaPI02uINWyQLs\nCogTf+nQWnLyN9qLrToriahNcZlDfuJCRVKTQ1gw1lkSN3IZRSkBuRYRe05US+C6\n8JMKHP+1XMKMgQM2XR7r4noMJKLaVUzfLXuPIWH2xNdgYXcIOSRjiANkIv4O7lWM\nxX9vD6LklijrepMl55Omu0bhF5rRn2VAubfxKhJs0eQn69+NWaVUrNMQ078nF+8G\nKT6vH32q9i9fpV38XYlwM9qEa0il5wfrSwPuDd5vmGgk9AOlSEzY2vE1kvp7lEt1\nTdb3ZfAajPMO3Iov5dwvm0zhJDQHFo7SFi5jH0Pgk4bAd9HBmB8sioxL4Q==\n=Kwft\n-----END PGP PUBLIC KEY BLOCK-----",
        "bits": 4096,
        "uid": "Ada Lovelace \u003Cada@passbolt.com\u003E",
        "key_id": "5D9B054F",
        "fingerprint": "03F60E958F4CB29723ACDF761353B5B15D9B054F",
        "type": "RSA",
        "expires": null,
        "key_created": "2015-08-09T12:48:31+00:00",
        "deleted": false,
        "created": "2020-11-02T14:33:26+00:00",
        "modified": "2020-11-02T14:33:26+00:00"
      },
      "is_mfa_enabled": false,
      "last_logged_in": null
    },
    {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "role_id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
      "username": "admin@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-11-02T14:33:25+00:00",
      "modified": "2020-11-02T14:33:25+00:00",
      "profile": {
        "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
        "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "first_name": "Admin",
        "last_name": "User",
        "created": "2020-11-02T14:33:25+00:00",
        "modified": "2020-11-02T14:33:25+00:00",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "groups_users": [
        {
          "id": "03e26ff8-81d2-5b7f-87e4-99bbc40e1f95",
          "group_id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "15b5e2c6-164a-50e9-a46f-2b4a9ab9345a",
          "group_id": "c9c8fd8e-a0fa-53f0-967b-42edca3d91e4",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "15f486f6-4f5a-53f7-82ca-974e0be74e95",
          "group_id": "4ff007f6-80ec-5bf7-8f0a-46a17178db6f",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "2510a118-c838-5470-a0dd-aff268d4a2b6",
          "group_id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "8e42567e-6e6e-54bc-b17b-0f5afde5b01c",
          "group_id": "3feba74f-47da-5146-9d8f-76c7266c60ea",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "99fabba9-e069-59e6-a3b6-775436322b21",
          "group_id": "a89b771e-62ab-5434-b2fa-950827439ac7",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "9c937007-8d53-532d-b02f-80f100139990",
          "group_id": "faa73142-fb5e-5891-8b9f-4a00b3836fad",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "ad80b164-c30f-53e0-aac1-3040fa2f136d",
          "group_id": "f16c507f-9105-502e-aa8a-ba24c36dbdcf",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "c8f4bc84-2ea2-5509-8d6a-6b7378b7fffa",
          "group_id": "5fe7a6af-d97e-54f1-a4fc-b4b8bdb6e2ac",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        },
        {
          "id": "d100fc5d-6685-50aa-897b-87ac816e28c8",
          "group_id": "b7cbce9f-6a20-545b-b20a-fcf4092307df",
          "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "is_admin": true,
          "created": "2020-11-02T14:33:26+00:00"
        }
      ],
      "role": {
        "id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
        "name": "admin",
        "description": "Organization administrator",
        "created": "2012-07-04T13:39:25+00:00",
        "modified": "2012-07-04T13:39:25+00:00"
      },
      "gpgkey": {
        "id": "91d8a7fd-3ab3-5e98-a4a5-0d8694ff23b9",
        "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFY06pcBEADjYRuq05Zatu4qYtXmexbrwtUdakNJJHPlWxcusohdTLUmSXrt\n7LegXBE3OjvV9HbdBQfbpjitFp8eJw5krYQmh1+w\/UYjb5Jy\/A7ma3oawzbVwNpL\nwuAafYma5LLLloZD\/OpYKprhWfW9FHKyq6t+AcH5CFs\/HvixdrdbAO7K1\/z6mgWc\nT6HBP5\/dGTseAlrvUDTsW1kzo6qsrOWoUunrqm31umsvcfNROtDKM16zgZl+GlYY\n1BxNcRKr1\/AcZUrp4zdSSc6IXrYjJ+1kgHz\/ZoSrKn5QiqEn7wQEveJu+jNGSv8j\nMvQgjq+AmzveJ\/4f+RQirbe9JOeDgzX7NqloRil3I0FPFoivbRU0PHi4N2q7sN8e\nYpXxXzuL+OEq1GQe5fTsSotQTRZUJxbdUS8DfPckQaK79HoybTQAgA6mgQf\/C+U0\nX2TiBUzgBuhayiW12kHmKyK02htDeRNOYs4bBMdeZhAFm+5C74LJ3FGQOHe+\/o2o\nBktk0rAZScjizijzNzJviRB\/3nAJSBW6NSNYcbnosk0ET2osg2tLvzegRI6+NQJE\nb0EpByTMypUDhCNKgg5aEDUVWcq4iucps\/1e6\/2vg2XVB7xdphT4\/K44ZeBHdFuf\nhGQvs8rkAPzpkpsEWKgpTR+hdhbMmNiL984Ywk98nNuzgfkgpcP57xawNwARAQAB\ntCtQYXNzYm9sdCBEZWZhdWx0IEFkbWluIDxhZG1pbkBwYXNzYm9sdC5jb20+iQJO\nBBMBCgA4AhsDBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEDB0XYRENHjPJAG0a\nWxszLtBkJtMFAl0bmoYACgkQWxszLtBkJtPnxg\/\/Q9WOWUGf7VOnfbaIix3NGAON\nI7rgXuLFc1E0vG20XWT2+C6xGskFwjoJbiyDrbMYnILGn7vDIn3MSoITemLjtt97\n\/lEXK7AgbJEWQWF1lxpXm0nCvjJ6h+qatGK96ncjcua6ecUut10A\/CACpuqxfKOh\nD6CaM5l\/ksEDtwvrv2MIaVajuCvwg+yUx0I0rfAQv0YTXbJ5MRn1pvOo3c6n5Q0z\n5eu\/iiG0UNNIE3Tk5KpT02MTMv5ullpt3mtNjMHH0\/TdPxCtUKVh4q34x3syiYLe\npaddf5Ctv9CL52VWfsG3qFPHp7euOFY8lfzuemoqD9jcE7QIJnkCmwtLXLQrE0O2\nRW\/y\/oXqrETXu2sFyHMr1Xw\/\/QeJgIv63LBGmcPOj93VyHIlcUDarM2oq2+DXKxr\nDs2xfnFKVCZwpSvecIfKXUKsnX3AGrpetoZdfw0jAUVI3nt6YCu8KvczXxetfjOV\n3HHXa40gtOZk5OoKbfuTjzQlpc1oaDyLH8PT1GYsN3wWoDs4zulh6uKDpSt+4z58\nH1BfPFlrO2uhZSfk3E83uBQXZcABeXNxCdrTCJm8P90sbjLu1TlaeOnrWwVT7Yq8\ni8LE7lbAXnT1HjQlDi8GB2+2EnZZmOX+Z84a16jDElZazUNsE8zT7OmyjuB7GGDb\nQEFYzkb9dr1j1sukzty5Ag0EVjTqlwEQAJ37C9s4pq4jvcEF3bJgL+q3SBolgBIp\nN1g1\/woi9vEiOh+7e08Kr8mEhF04cpRDbhY6dcZ8OIXIQ99fgdNXfehlAWnI56NE\n\/FOIyif8TvGBfO6yE35fKSskwGNdUZWIZ0U0pxSXQvB+KEGWlq2c3Uf\/jhTZDnLN\nvfDjnYmn5ycp5sVWhtAmKFha9NJ6LGA0D1MC+jcCJCKtQRGgVvlqOESFDmQ7Pu8\/\nayr2BO0URHJ0Ob30lHluCnoKIv50qGpL9BYuGAdCfLBHXzRQhHIbfc\/cTPkK1kTX\nX5x\/MkiEl88TeGN+yjNVS7qqdxYgs+QYnDDZqevhWEvVyXVQjcCWSIHfjL1x5Ndq\nYL6+ci\/OxyIFoPs4K2umN3JPmpFi+fIPh2CexKy6BnyE8oAgNvgdDb6ZOfAtvShZ\nPM7QG4LZal2+nYp4n7gJRh6kepTQT\/4Bua0xOtRQhgcI4nGtcCxEDRMMzjqbGYlc\nnciMjsiMg9LPpWPDA+xKrRZKYwVFy8vLx\/alOz\/h1BZjx2u7YmuaGENxE62Lfyh0\nxeoCBDTdnWEOQTH6LVsomVtUO1FVap1t5jkYSdpxBuHf8\/2Ye7N3FTMRKe9n4e75\nsAJ00utnMl6P2Zca9mM4T29PK+LPFx2G2h35DQ7MbEid1cAZ8QVR3UyoiR8+u9jM\nek+9uFCm+nAxABEBAAGJAjYEGAEKACACGwwWIQQMHRdhEQ0eM8kAbRpbGzMu0GQm\n0wUCXRuamQAKCRBbGzMu0GQm004PD\/9sFmFkdoSqwU\/En77+h0gt4knlgZbgj0iR\nromnknIwLKBbJJXksHmMPXJB9b3WZ\/gGV3pPVtDWDKg3NZW4HLK13w3s3wQ2ViVV\nA6FzABDSkI3YBqkkasLRZU7oN9XajdFfph5wLhDSgTCjSncGfcjVzPugWKLqPPih\nZO6mpqxSFYEhx+p\/O80Tlj90UsOFRdot7cqn5wOhXZtKsQ0RwaA\/uq\/sFe6UNKHG\n2RBgQfoj5JbazJbvlgMiWxhBalwZKQWs8IBh\/4ag8AFwwoJN+gOtNM9C4UCHu+yt\n0Tv2\/Tu+Apcj0oyFaKJD4uQUmChQ2fDRysqJEIhee+yL29mrdcB4jG7Q2rt8HbhY\nwlsHKgas0YIHdR6dUOCiyw72i0khwrd2PDgxKRu5+cob6wMSqXbIIxFLLLACHy2s\nKd6fQcg8FxoivEiF0lRfMi32A\/YWGJ\/k1OoFCzW55KFXqqBMptYZWh2Jezhttmid\nYHPc7jas7HEPnw3SvVM0gYAcmEVWWvjKfUpOhSYYkk\/B71w9RuIpPyyI7G2XI8Db\nG2ttngDIOL8njS6ybU9Og6yTNUoHL1wWEZN1b3fznKHcC9lyr8MIg00QNeDItt9i\nILCOkjoEdUdauqlRIa+EmUu+AL+JobrlQTzyrCIm7aaT3Hp9EyaEx5xvJDWtmjgf\nFYNCFtV1fw==\n=amwR\n-----END PGP PUBLIC KEY BLOCK-----",
        "bits": 4096,
        "uid": "Passbolt Default Admin \u003Cadmin@passbolt.com\u003E",
        "key_id": "D06426D3",
        "fingerprint": "0C1D1761110D1E33C9006D1A5B1B332ED06426D3",
        "type": "RSA",
        "expires": null,
        "key_created": "2015-10-31T16:21:43+00:00",
        "deleted": false,
        "created": "2020-11-02T14:33:26+00:00",
        "modified": "2020-11-02T14:33:26+00:00"
      },
      "is_mfa_enabled": false,
      "last_logged_in": null
    }
  ]
};
