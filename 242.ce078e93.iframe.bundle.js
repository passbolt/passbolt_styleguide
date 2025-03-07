/*! For license information please see 242.ce078e93.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[242],{"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>entityV2});var entitySchema=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),entity=__webpack_require__("./src/shared/models/entity/abstract/entity.js"),assertString=__webpack_require__("./node_modules/validator/es/lib/util/assertString.js"),entityValidationError=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");const snakeCaseToCamelCase=text=>text?.replace(/_([a-z])/g,((match,letter)=>letter.toUpperCase())),SCALAR_PROPERTY_TYPES=["string","number","integer","boolean"];class EntityV2 extends entity.A{static _cachedSchema={};constructor(dtos={},options={}){const validate=options?.validate??!0;super(dtos,options),this.marshall(),validate&&this.validateSchema(options?.schema),this.createAssociations(options),validate&&this.validateBuildRules(options?.validateBuildRules)}marshall(){}validate(options={}){try{this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules)}catch(error){if(!(error instanceof entityValidationError.A))throw error;return error}return null}validateSchema(schema=null){this._props=entitySchema.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}createAssociations(options={}){const validationErrors=new entityValidationError.A;for(const[associationProp,associationEntityClass]of Object.entries(this.constructor.associations))try{if(this._props[associationProp]){this[`_${snakeCaseToCamelCase(associationProp)}`]=new associationEntityClass(this._props[associationProp],{...options,clone:!1}),delete this._props[associationProp]}}catch(error){if(!(error instanceof entityValidationError.A))throw error;validationErrors.addAssociationError(associationProp,error)}if(validationErrors.hasErrors())throw validationErrors}static get associations(){return{}}get(propName){(0,assertString.A)(propName);const schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');return this._props[propName]}set(propName,value,options={}){(0,assertString.A)(propName);const validate=options?.validate??!0;if(this.isAssociation(propName))this.setAssociation(propName,value,options);else{const basePropName=propName.split(".")[0],schemaProperties=this.constructor.getSchema().properties[basePropName];if(!schemaProperties)throw new Error(`The property "${basePropName}" has no schema definition.`);if("array"===schemaProperties?.type)this.setArrayProp(propName,value,options);else{if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');validate&&entitySchema.A.validateProp(basePropName,value,schemaProperties),this._props[basePropName]=value}}}setArrayProp(propName,value,options){(0,assertString.A)(propName);const propNameSplit=propName.split("."),basePropName=propNameSplit[0];let index=null;const schemaProperties=this.constructor.getSchema().properties[basePropName],validate=options?.validate??!0;if(2!==propNameSplit.length)throw new Error(`The property "${propNameSplit[0]}" has no index passed.`);{const arrayIndexMatch=propNameSplit[1].match(/^(\d+)$/);if(!arrayIndexMatch)throw new Error(`The property "${propNameSplit[0]}" has an invalid index format. Expected format: digits.`);index=parseInt(arrayIndexMatch[1],10)}if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties.items.type))throw new Error('The property "associated_entity" with array type should reference scalar properties only.');validate&&entitySchema.A.validateProp(basePropName,value,schemaProperties.items),this._props[basePropName]||(this._props[basePropName]=[]),this._props[basePropName][index]=value}setAssociation(propName,value,options={}){if((0,assertString.A)(propName),this.isAssociation(propName)){const propNameSplit=propName.split("."),associationPropName=snakeCaseToCamelCase(propNameSplit[0]);if(propNameSplit.length>1){this[`_${associationPropName}`]||(this[`_${associationPropName}`]=new this.constructor.associations[propNameSplit[0]]({},{validate:!1}));const concatenatedPropName=propNameSplit.slice(1).join(".");this[`_${associationPropName}`].set(concatenatedPropName,value,options)}else value instanceof this.constructor.associations[propName]?this[`_${associationPropName}`]=value:this[`_${associationPropName}`]=new this.constructor.associations[propName](value,options)}}diffProps(compareEntity){if(!(compareEntity instanceof EntityV2))throw new TypeError('The property "compareEntity" should be of "EntityV2" type.');const diff={},schema=this.constructor.getSchema(),propertiesNamesToCompare=Object.keys(schema.properties).filter((propertyName=>SCALAR_PROPERTY_TYPES.includes(schema.properties[propertyName].type)));for(const propertyName of propertiesNamesToCompare){const propValue=this.get(propertyName),comparedPropValue=compareEntity.get(propertyName);propValue!==comparedPropValue&&(diff[propertyName]=comparedPropValue)}return diff}hasDiffProps(compareEntity){const diff=this.diffProps(compareEntity);return Object.keys(diff).length>0}isAssociation(propName){const mainPropName=propName.split(".")[0];return Boolean(this.constructor.associations?.[mainPropName])}}const entityV2=EntityV2}}]);