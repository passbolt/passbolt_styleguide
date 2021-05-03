

const createFolder = index => {
  return   {
    "id": index,
    "name": "Folder-" + index,
    "created": "2020-02-01T00:00:00+00:00",
    "modified": "2020-02-01T00:00:00+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permission": {
      "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
      "aco": "Folder",
      "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-05-11T10:11:13+00:00",
      "modified": "2020-05-11T10:11:13+00:00"
    },
    "folder_parent_id": null,
    "personal": false
  }
}

export default (() => {
  let folders = [];
  for(let i = 0; i < 10; i++) {
    folders.push(createFolder( "" + i));
  }
  return folders;
})();



/*export default*/  [
  {
  "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "name": "Accounting",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
    "aco": "Folder",
    "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
  "name": "Bank",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "c5355878-fb96-5c21-8bb5-e8de4b24db8b",
    "aco": "Folder",
    "aco_foreign_key": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "personal": false
}, {
  "id": "7ecd7376-8540-58c1-88d9-678c027d464a",
  "name": "Blogs",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "e8ffb030-09f5-54cd-ad64-68e3e983a3d4",
    "aco": "Folder",
    "aco_foreign_key": "7ecd7376-8540-58c1-88d9-678c027d464a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
  "personal": false
}, {
  "id": "3ed65efd-7c41-5906-9c02-71e2d95951da",
  "name": "Certificates",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "3a2611ed-cbcb-523f-b095-a130187173ae",
    "aco": "Folder",
    "aco_foreign_key": "3ed65efd-7c41-5906-9c02-71e2d95951da",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
  "name": "Communication",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "35ac3960-fe92-5a8d-ba40-3628445679a5",
    "aco": "Folder",
    "aco_foreign_key": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
  "name": "Continous Integration",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "00e7e1df-b1f6-5fb1-b6d0-cbcb15fa80d8",
    "aco": "Folder",
    "aco_foreign_key": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
  "name": "Credit Cards",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "9e458b44-62bf-54fb-a4bc-dd83e71a1123",
    "aco": "Folder",
    "aco_foreign_key": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 7,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "personal": false
}, {
  "id": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
  "name": "Human Resources",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "480c325f-ce9c-5086-8400-339877e06bd6",
    "aco": "Folder",
    "aco_foreign_key": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "299f613b-0706-570a-8636-956186384e0a",
  "name": "IT",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "8e1cb9e9-363b-57d0-b8b7-c85f5b84c57a",
    "aco": "Folder",
    "aco_foreign_key": "299f613b-0706-570a-8636-956186384e0a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "25acb455-5368-5055-8d56-36a4f30a81b3",
  "name": "Licenses",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "240ac5c6-de8a-5220-9d32-fb68d75675c2",
    "aco": "Folder",
    "aco_foreign_key": "25acb455-5368-5055-8d56-36a4f30a81b3",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
  "name": "Marketing",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "b72b5766-3de3-5209-a553-fd0a016dc151",
    "aco": "Folder",
    "aco_foreign_key": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "907c3f61-f416-5834-86d2-e721501ee493",
  "name": "Private",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "9879c5c6-bf14-5ea2-bd72-252eaeaeff08",
    "aco": "Folder",
    "aco_foreign_key": "907c3f61-f416-5834-86d2-e721501ee493",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": true
}, {
  "id": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
  "name": "Production",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "f0b404d0-ad8f-5094-81f4-5a83e7e40465",
    "aco": "Folder",
    "aco_foreign_key": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
  "name": "Sales",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "3bb8d63d-ab7c-5e76-b213-421891676ecd",
    "aco": "Folder",
    "aco_foreign_key": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
  "name": "Social Networks",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "3726325c-bf8e-50ee-92ad-78f0ecda9f99",
    "aco": "Folder",
    "aco_foreign_key": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
  "personal": false
}, {
  "id": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
  "name": "Staging",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "0f41e5c0-59d5-5dc7-ac39-96ba53f45224",
    "aco": "Folder",
    "aco_foreign_key": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
  "name": "Travel",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "14eb12bc-56be-594f-aa44-c088ecd67207",
    "aco": "Folder",
    "aco_foreign_key": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
  "name": "VAT",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "7741b2dd-5f5e-5e14-9a0f-4c04eb0f031f",
    "aco": "Folder",
    "aco_foreign_key": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "personal": false
}];