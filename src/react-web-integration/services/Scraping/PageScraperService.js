/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.15.0
 */

import FormScraperService from "../DomExtraction/FormScraperService";
import FieldScraperService from "./FieldScraperService";
import ScrapingIdentityService from "./ScrapingIdentityService";
import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";

/**
 * Turns the extraction skeleton into the page scraping payload: one record per form keyed by formId, one per field, and a per-form field-type histogram.
 */
class PageScraperService {
  /**
   * Builds the page payload from the extraction skeleton.
   *
   * @param {object[]} formElements The extraction skeleton.
   * @returns {PageScraping} The page payload.
   */
  static scrape(formElements) {
    const skeletons = formElements ?? [];
    const forms = {};
    const fields = [];

    for (const skeleton of skeletons) {
      const scraped = PageScraperService._scrapeForm(skeleton);
      if (scraped) {
        forms[scraped.form.formId] = scraped.form;
        fields.push(...scraped.fields);
      }
    }

    // Globals are guarded so the scrape never throws in a document-less context.
    return {
      url: location?.href ?? "",
      documentUrl: document?.URL ?? "",
      title: document?.title ?? "",
      forms,
      fields,
    };
  }

  /**
   * Scrape a single skeleton container: issue its stable id, delegate container data to
   * {@link FormScraperService} and each field to {@link FieldScraperService}, and tally the `fieldTypes` histogram.
   * @private
   * @param {object} skeleton The skeleton container entry.
   * @returns {{form: FormScraping, fields: FieldScraping[]}} The form and its fields, or `null` when the
   *   container is not an element.
   */
  static _scrapeForm(skeleton) {
    const containerElement = skeleton?.containerElement;
    if (!ShadowDomQueryService.isElement(containerElement)) {
      return null;
    }

    const formId = ScrapingIdentityService.formId(containerElement);
    const form = FormScraperService.scrape(containerElement, formId);
    const fields = [];

    for (const field of skeleton.fields ?? []) {
      const element = PageScraperService._fieldElementOf(field);
      if (!ShadowDomQueryService.isElement(element)) {
        continue;
      }

      const fieldRecord = FieldScraperService.scrape(element, formId);
      fields.push(fieldRecord);
      PageScraperService._incrementFieldTypeCount(form, fieldRecord.type);
    }

    return { form, fields };
  }

  /**
   * Resolve a skeleton field's element, reading both shapes: real forms carry `{ element }`, pseudo-forms
   * `{ fieldElement }`.
   * @private
   * @param {{element?: Element, fieldElement?: Element}} field The skeleton field entry.
   * @returns {Element|undefined} The field element, or `undefined` for a malformed entry.
   */
  static _fieldElementOf(field) {
    return field?.fieldElement ?? field?.element;
  }

  /**
   * Increment a form's `fieldTypes` histogram (in place). A field with no type adds no bucket.
   * @private
   * @param {FormScraping} formRecord The form record whose histogram is updated.
   * @param {string} type The scraped field's input type, if any.
   * @returns {void}
   */
  static _incrementFieldTypeCount(formRecord, type) {
    if (!type) {
      return;
    }
    formRecord.fieldTypes[type] = (formRecord.fieldTypes[type] || 0) + 1;
  }
}

export default PageScraperService;
