/**
 * Mock settings result from server
 * @returns {object}
 */
export const FormConfig = [
  {
    "type" : "header",
    "level": 1,
    "name" : "Resources workspace",
    "items": [
      {
        "type" : "header",
        "level": 2,
        "name": "Import / Export",
        "items": [
          {
            "type": "ui_action",
            "name": "Can import passwords",
            "slug": "can_import",
            "options": [
              {
                "value": "Allow",
                "label": "Allow"
              },
              {
                "value": "Deny",
                "label": "Deny"
              },

            ],
            "default": "Allow"
          },
          {
            "type": "ui_action",
            "name": "Can export passwords",
            "slug": "can_export",
            "options": [
              {
                "value": "Allow",
                "label": "Allow"
              },
              {
                "value": "Deny",
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
        ]
      },
      {
        "type" : "header",
        "level": 2,
        "name": "Passwords",
        "items": [
          {
            "type": "ui_action",
            "name": "Can preview a password",
            "slug": "can_preview",
            "options": [
              {
                "value": "Allow",
                "label": "Allow"
              },
              {
                "value": "Deny",
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
          {
            "type": "ui_action",
            "slug": "can_copy_to_clipboard",
            "name": "Can copy a password to clipboard",
            "options": [
              {
                "value": "Allow",
                "label": "Allow"
              },
              {
                "value": "Deny",
                "label": "Deny"
              },
            ],
            "default": "Allow"
          },
        ]
      }
    ],
  }
];