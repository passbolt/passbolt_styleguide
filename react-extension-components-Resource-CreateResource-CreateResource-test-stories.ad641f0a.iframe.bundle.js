/*! For license information please see react-extension-components-Resource-CreateResource-CreateResource-test-stories.ad641f0a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[2494],{"./src/react-extension/components/Resource/CreateResource/CreateResource.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PasswordInDictionary:()=>PasswordInDictionary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CreateResource_test_stories});var react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react=__webpack_require__("./node_modules/react/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),CreateResource=__webpack_require__("./src/react-extension/components/Resource/CreateResource/CreateResource.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js"),UserSettings=__webpack_require__("./src/shared/lib/Settings/UserSettings.js"),Settings_userSettings=__webpack_require__("./src/react-extension/test/fixture/Settings/userSettings.js"),SiteSettings=__webpack_require__("./src/shared/lib/Settings/SiteSettings.js"),Settings_siteSettings=__webpack_require__("./src/react-extension/test/fixture/Settings/siteSettings.js"),PasswordPoliciesContext_test_data=__webpack_require__("./src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data.js"),ResourcePasswordGeneratorContext_test_data=__webpack_require__("./src/react-extension/contexts/ResourcePasswordGeneratorContext.test.data.js"),resourceTypesCollection_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.test.data.js"),WorkflowContext_test_data=__webpack_require__("./src/react-extension/contexts/WorkflowContext.test.data.js"),PasswordExpirySettingsContext_test_data=__webpack_require__("./src/react-extension/contexts/PasswordExpirySettingsContext.test.data.js"),resourceTypeEntity_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.test.data.js"),resourceTypesCollection=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js"),resourceTypeEntity=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.js");const CreateResource_test_stories={title:"Components/Resource/CreateResource",component:CreateResource.A,argTypes:{language:{control:{type:"select",options:["en-US","fr"]}}}},mockedPort=new MockPort.A;mockedPort.addRequestListener("passbolt.resources.create",(data=>data));const Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(CreateResource.A,{...args,...routerProps})})));Template.propTypes={context:prop_types_default().object};const PasswordInDictionary=Template.bind({});PasswordInDictionary.args={context:function defaultAppContext(appContext={}){const port=new MockPort.A,defaultAppContext1={userSettings:new UserSettings.A(Settings_userSettings.A),siteSettings:new SiteSettings.A(Settings_siteSettings.A),port,setContext:function(newContext){Object.assign(this,newContext)}};return Object.assign(defaultAppContext1,appContext)}({port:mockedPort}),...function defaultProps(data={}){const defaultData={folderParentId:null,resourcePasswordGeneratorContext:(0,ResourcePasswordGeneratorContext_test_data.N)(),passwordPoliciesContext:(0,PasswordPoliciesContext_test_data.M)(),passwordExpiryContext:(0,PasswordExpirySettingsContext_test_data.i)(),resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),resourceType:new resourceTypeEntity.Ay((0,resourceTypeEntity_test_data.KD)()),onClose:jest.fn(),dialogContext:{open:jest.fn()},workflowContext:(0,WorkflowContext_test_data.q)()};return delete data.passwordPoliciesContext,Object.assign(defaultData,data)}()};const __namedExportsOrder=["PasswordInDictionary"];PasswordInDictionary.parameters={...PasswordInDictionary.parameters,docs:{...PasswordInDictionary.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <CreateResource {...args} {...routerProps} />}></Route>\n    </MemoryRouter>\n  </AppContext.Provider>",...PasswordInDictionary.parameters?.docs?.source}}}},"./src/react-extension/contexts/ResourcePasswordGeneratorContext.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>defaultResourcePasswordGeneratorContext});var _shared_models_passwordPolicies_PassphraseGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data.js"),_shared_models_passwordPolicies_PasswordGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data.js"),_shared_models_passwordPolicies_PasswordPoliciesDto_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/passwordPolicies/PasswordPoliciesDto.test.data.js");const defaultResourcePasswordGeneratorContext=(data={})=>({lastGeneratedPassword:"This is the last generated password",getSettings:()=>(0,_shared_models_passwordPolicies_PasswordPoliciesDto_test_data__WEBPACK_IMPORTED_MODULE_0__.m)({password_generator_settings:(0,_shared_models_passwordPolicies_PasswordGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_1__._)({min_length:8,max_length:128}),passphrase_generator_settings:(0,_shared_models_passwordPolicies_PassphraseGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_2__.N)({min_words:4,max_words:40})}),onPasswordGenerated:jest.fn(),resetSecretGeneratorSettings:jest.fn(),consumeLastGeneratedPassword:()=>"This is the last generated password",...data})},"./src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>defaultPasswordPoliciesContext});var _models_passwordPolicies_PasswordPoliciesDto_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/passwordPolicies/PasswordPoliciesDto.test.data.js");const defaultPasswordPoliciesContext=(data={})=>{const policies=data?.policies||(0,_models_passwordPolicies_PasswordPoliciesDto_test_data__WEBPACK_IMPORTED_MODULE_0__.m)();return{policies,getPolicies:jest.fn(),findPolicies:jest.fn(),shouldRunDictionaryCheck:jest.fn((()=>policies?.external_dictionary_check||!1)),...data}}},"./src/shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>defaultPassphraseGeneratorSettingsDto});const defaultPassphraseGeneratorSettingsDto=(data={})=>({words:9,word_separator:" ",word_case:"lowercase",...data})},"./src/shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>defaultPasswordGeneratorSettingsDto});const defaultPasswordGeneratorSettingsDto=(data={})=>({length:18,mask_upper:!0,mask_lower:!0,mask_digit:!0,mask_char1:!0,mask_parenthesis:!0,mask_char2:!0,mask_char3:!0,mask_char4:!0,mask_char5:!0,mask_emoji:!1,exclude_look_alike_chars:!0,...data})},"./src/shared/models/passwordPolicies/PasswordPoliciesDto.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>defaultPasswordPoliciesDto,n:()=>configuredPasswordPoliciesDto});var uuid__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),_PasswordGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data.js"),_PassphraseGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data.js");const defaultPasswordPoliciesDto=(data={})=>({default_generator:"password",external_dictionary_check:!0,password_generator_settings:(0,_PasswordGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_0__._)(),passphrase_generator_settings:(0,_PassphraseGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_1__.N)(),source:"default",...data}),configuredPasswordPoliciesDto=(data={})=>defaultPasswordPoliciesDto({id:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),created:"2023-07-01T13:59:11+00:00",created_by:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),modified:"2023-08-01T13:59:11+00:00",modified_by:(0,uuid__WEBPACK_IMPORTED_MODULE_2__.A)(),...data})}}]);