/*! For license information please see 1923.196bd5ed.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[1923],{"./src/shared/models/entity/folder/folderEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ht:()=>folderWithReadPermissionDto,nk:()=>defaultFolderDto});var uuid__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),_permission_permissionEntity_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/permission/permissionEntity.test.data.js"),_permission_permissionCollection_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/permission/permissionCollection.test.data.js"),_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js");const defaultFolderDto=(data={},options={})=>{const id=data?.id||(0,uuid__WEBPACK_IMPORTED_MODULE_3__.A)(),defaultData={id,name:"Accounting",created:"2020-02-01T00:00:00+00:00",modified:"2020-02-01T00:00:00+00:00",created_by:"d57c10f5-639d-5160-9c81-8a0c6c4ec856",modified_by:"d57c10f5-639d-5160-9c81-8a0c6c4ec856",permission:(0,_permission_permissionEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.uq)({aco:"Folder",aco_foreign_key:id}),folder_parent_id:null,personal:!1,...data};return!data.permissions&&options.withPermissions&&(defaultData.permissions=(0,_permission_permissionCollection_test_data__WEBPACK_IMPORTED_MODULE_1__.w)({aco:"Folder",aco_foreign_key:id},options.withPermissions)),!data.creator&&options?.withCreator&&(defaultData.creator=(0,_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_2__.cI)()),!data.modifier&&options?.withModifier&&(defaultData.modifier=(0,_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_2__.cI)()),defaultData},folderWithReadPermissionDto=(data={})=>{const id=data?.id||(0,uuid__WEBPACK_IMPORTED_MODULE_3__.A)();return defaultFolderDto({id,permission:(0,_permission_permissionEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.js)({aco_foreign_key:id,aco:"Folder"}),...data})}},"./src/shared/models/entity/group/groupEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>defaultGroupDto});var uuid__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),_groupUser_groupUserEntity_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/groupUser/groupUserEntity.test.data.js"),_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js");const defaultGroupDto=(data={},options={})=>{const groupId=data.id||(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),defaultData={id:groupId,name:"Current group",created:"2022-01-13T13:19:04.661Z",modified:"2022-01-13T13:19:04.661Z",created_by:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),modified_by:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),...data};if(!data.my_group_user&&options?.withMyGroupUser&&(defaultData.my_group_user=(0,_groupUser_groupUserEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.M2)({group_id:groupId,is_admin:!0})),!data.creator&&options?.withCreator&&(defaultData.creator=(0,_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_1__.cI)()),!data.modifier&&options?.withModifier&&(defaultData.modifier=(0,_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_1__.cI)()),!data.groups_users&&options?.withGroupsUsers){const groupsUsersCount="number"==typeof options?.withGroupsUsers?options?.withGroupsUsers:1;defaultData.groups_users=[];for(let i=0;i<groupsUsersCount;i++){const groupUserDto=(0,_groupUser_groupUserEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.M2)({user_id:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),group_id:groupId,is_admin:!0});defaultData.groups_users.push(groupUserDto)}}return defaultData}},"./src/shared/models/entity/permission/permissionCollection.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>defaultPermissionsDtos});var _permissionEntity_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/permission/permissionEntity.test.data.js");const defaultPermissionsDtos=(data={},options={})=>{const dtos=[],count=options.count||10,acoForeignKey=crypto.randomUUID();for(let i=0;i<count;i++){const dto=(0,_permissionEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.SJ)({aco_foreign_key:acoForeignKey,...data},options);dtos.push(dto)}return dtos}},"./src/shared/models/entity/permission/permissionEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$t:()=>ownerGroupPermissionDto,SJ:()=>defaultPermissionDto,i:()=>ownerFolderPermissionDto,jM:()=>readFolderPermissionDto,js:()=>readPermissionDto,kZ:()=>readGroupPermissionDto,nF:()=>updateGroupPermissionDto,uq:()=>ownerPermissionDto,yA:()=>updatePermissionDto});var uuid__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js"),_group_groupEntity_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/group/groupEntity.test.data.js");const defaultPermissionDto=(data={},options={})=>{const defaultData={id:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),aco:"Resource",aco_foreign_key:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),aro:"User",aro_foreign_key:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),created:"2022-03-04T13:59:11+00:00",modified:"2022-03-04T13:59:11+00:00",type:15,...data};return!data.user&&options?.withUser&&(defaultData.user=(0,_user_userEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.cI)({id:defaultData.aro_foreign_key},options.withUser)),!data.group&&options?.withGroup&&(defaultData.group=(0,_group_groupEntity_test_data__WEBPACK_IMPORTED_MODULE_1__.K)({id:defaultData.aro_foreign_key},options.withGroup)),defaultData},ownerPermissionDto=(data={})=>defaultPermissionDto({type:15,...data}),updatePermissionDto=(data={})=>defaultPermissionDto({type:7,...data}),readPermissionDto=(data={})=>defaultPermissionDto({type:1,...data}),ownerFolderPermissionDto=(data={})=>ownerPermissionDto({aco:"Folder",...data}),readFolderPermissionDto=(data={})=>readPermissionDto({aco:"Folder",...data}),ownerGroupPermissionDto=(data={})=>defaultPermissionDto({type:15,aro:"Group",user:null,...data},{withGroup:!0}),updateGroupPermissionDto=(data={})=>defaultPermissionDto({type:7,aro:"Group",user:null,...data},{withGroup:!0}),readGroupPermissionDto=(data={})=>defaultPermissionDto({type:1,aro:"Group",user:null,...data},{withGroup:!0})},"./src/shared/models/entity/resource/resourceEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j8:()=>defaultResourceDto,Ge:()=>resourceStandaloneTotpDto,oS:()=>resourceWithFavoriteDto,Jn:()=>resourceWithReadPermissionDto,f1:()=>resourceWithTotpDto});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),permissionEntity_test_data=__webpack_require__("./src/shared/models/entity/permission/permissionEntity.test.data.js");const defaultFavoriteDto=(data={})=>({id:(0,v4.A)(),user_id:(0,v4.A)(),foreign_key:(0,v4.A)(),created:"2020-08-27T08:35:21+00:00",...data});var resourceTypeEntity_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.test.data.js"),userEntity_test_data=__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js"),permissionCollection_test_data=__webpack_require__("./src/shared/models/entity/permission/permissionCollection.test.data.js");const defaultTagDto=(data={})=>({id:crypto.randomUUID(),slug:"personal-tag",is_shared:!1,...data});var resourceMetadataEntity_test_data=__webpack_require__("./src/shared/models/entity/resourceMetadata/resourceMetadataEntity.test.data.js");const defaultResourceDto=(data={},options={})=>{const id=data?.id||(0,v4.A)(),defaultData={id,resource_type_id:resourceTypeEntity_test_data.s_,expired:null,deleted:!1,created:"2022-03-04T13:59:11+00:00",modified:"2022-03-04T13:59:11+00:00",created_by:(0,v4.A)(),modified_by:(0,v4.A)(),folder_parent_id:null,personal:!1,favorite:null,metadata:(0,resourceMetadataEntity_test_data.m)({resource_type_id:data?.metadata?.resource_type_id||data?.resource_type_id||resourceTypeEntity_test_data.s_}),permission:(0,permissionEntity_test_data.uq)({aco_foreign_key:id}),...data};return!data.permissions&&options.withPermissions&&(defaultData.permissions=(0,permissionCollection_test_data.w)({aco_foreign_key:id},options.withPermissions)),!data.creator&&options?.withCreator&&(defaultData.creator=(0,userEntity_test_data.cI)()),!data.modifier&&options?.withModifier&&(defaultData.modifier=(0,userEntity_test_data.cI)()),!data.favorite&&options?.withFavorite&&(defaultData.favorite=defaultFavoriteDto({foreign_key:id})),!data.tags&&options?.withTags&&(defaultData.tags=((count=10)=>{const dtos=[];for(let i=0;i<count;i++){const groupDto=defaultTagDto({slug:`tag ${i}`});dtos.push(groupDto)}return dtos})()),defaultData},resourceWithReadPermissionDto=(data={},options={})=>{const id=data?.id||(0,v4.A)();return defaultResourceDto({id,permission:(0,permissionEntity_test_data.js)({aco_foreign_key:id}),...data},options)},resourceWithFavoriteDto=(data={},options={})=>{const id=data?.id||(0,v4.A)();return defaultResourceDto({id,favorite:defaultFavoriteDto({foreign_key:id}),...data},options)},resourceWithTotpDto=(data={},options={})=>defaultResourceDto({resource_type_id:resourceTypeEntity_test_data.Av,...data},options),resourceStandaloneTotpDto=(data={},options={})=>defaultResourceDto({resource_type_id:resourceTypeEntity_test_data.vD,metadata:(0,resourceMetadataEntity_test_data.m)({resource_type_id:resourceTypeEntity_test_data.vD,username:null}),...data},options)},"./src/shared/models/entity/resourceMetadata/resourceMetadataEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>defaultResourceMetadataDto});var _resourceType_resourceTypeEntity_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.test.data.js");const defaultResourceMetadataDto=(data={})=>({resource_type_id:data?.resource_type_id||_resourceType_resourceTypeEntity_test_data__WEBPACK_IMPORTED_MODULE_0__.s_,name:"Passbolt",username:"admin@passbolt.com",uris:["https://passbolt.com"],description:"Description",...data})}}]);