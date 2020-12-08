/**
 * return LoggedInUser get request fetch
 */
export default () => {
  return {
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
      "username": "remy",
      "password": "5L>%LXZyYc}\\y1f",
      "base_dn": "DC=passbolt,DC=local",
      "server": "34.77.100.167",
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
  }
}