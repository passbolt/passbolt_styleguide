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

import FormExtractionService from "./DomExtraction/FormExtractionService";
import OrphanFieldsExtractionService from "./DomExtraction/OrphanFieldsExtractionService";
import PageScraperService from "./Scraping/PageScraperService";
import ScrapingIdentityService from "./Scraping/ScrapingIdentityService";
import ClassificationService from "./classification/ClassificationService";
import ShadowDomQueryService from "./ShadowDom/ShadowDomQueryService";
import DomUtils from "../lib/Dom/DomUtils";
import { TEXT_FIELDS } from "../lib/InForm/OrphanDictionary";

/**
 * Live-DOM entry point that wires the whole pipeline: extraction (real forms + pseudo-forms) ->
 * scraping (value-free payload) -> classification (roles) -> resolution back to live elements. The only
 * DOM-facing seam of the classification stack; everything downstream is value-free. Each document (the
 * top document plus every accessible same-origin iframe) is classified independently and the results are
 * merged, so credentials served inside a same-origin iframe are covered too. Stateless service exposing
 * static methods only.
 */
class PageClassificationService {
  /**
   * Extract, scrape and classify every classifiable document (top document + same-origin iframes), then
   * resolve each classified field back to its live element and merge the per-document results.
   * @returns {{fields: Array<{fieldId: string, formId: string, role: string, element: Element}>, forms: Object<string, {role: string, multiStep: boolean, otpSegments: Array<Array<string>>}>}}
   *   The classified live fields and per-form roles across all documents.
   */
  static classifyPage() {
    // Per-layer timings, accumulated across every classified document (page + same-origin iframes).
    const timings = { enumeration: 0, extraction: 0, scraping: 0, classification: 0, resolution: 0, aggregation: 0 };
    const enumerationStart = PageClassificationService.now();
    const documents = PageClassificationService.classifiableDocuments();
    timings.enumeration = PageClassificationService.now() - enumerationStart;

    const perDocument = documents.map((root) => {
      try {
        return PageClassificationService.classifyDocument(root, timings);
      } catch (error) {
        // A single malformed document/iframe must never take down autofill and the call-to-action for
        // the whole page; skip it and surface the cause.
        console.error("Passbolt: page classification failed for a document.", error);
        return { fields: [], forms: {} };
      }
    });

    const aggregationStart = PageClassificationService.now();
    const result = {
      fields: perDocument.flatMap((documentResult) => documentResult.fields),
      forms: Object.assign({}, ...perDocument.map((documentResult) => documentResult.forms)),
    };
    timings.aggregation = PageClassificationService.now() - aggregationStart;

    return result;
  }

  /**
   * The documents to classify: the top document plus each accessible same-origin iframe document.
   * @returns {Array<Document>} The classifiable documents.
   */
  static classifiableDocuments() {
    let iframeDocuments = [];
    try {
      iframeDocuments = DomUtils.getAccessibleAndSameDomainIframes()
        .map((iframe) => DomUtils.getAccessedIframeContentDocument(iframe))
        .filter(Boolean);
    } catch (error) {
      console.error("Passbolt: unable to enumerate same-origin iframes.", error);
    }

    return [document, ...iframeDocuments];
  }

  /**
   * Run the whole pipeline over a single document and resolve its classified fields back to live elements.
   * @param {Document|Element} root The document (or element) to classify.
   * @returns {{fields: Array<{fieldId: string, formId: string, role: string, element: Element}>, forms: object}} The resolved result for this document.
   */
  static classifyDocument(root, timings = { extraction: 0, scraping: 0, classification: 0, resolution: 0 }) {
    const extractionStart = PageClassificationService.now();
    const skeleton = FormExtractionService.aggregateForms(root);
    OrphanFieldsExtractionService.aggregatePseudoForms(PageClassificationService.discoverFields(root), skeleton);
    timings.extraction += PageClassificationService.now() - extractionStart;

    const scrapingStart = PageClassificationService.now();
    const page = PageScraperService.scrape(skeleton);
    timings.scraping += PageClassificationService.now() - scrapingStart;

    const classificationStart = PageClassificationService.now();
    const classification = ClassificationService.classify(page);
    timings.classification += PageClassificationService.now() - classificationStart;

    const resolutionStart = PageClassificationService.now();
    const resolved = PageClassificationService.resolve(page, classification);
    timings.resolution += PageClassificationService.now() - resolutionStart;

    return resolved;
  }

  /**
   * High-resolution timestamp in milliseconds, guarded for document-less contexts.
   * @returns {number} The current time in milliseconds.
   */
  static now() {
    return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : 0;
  }

  /**
   * Discover every text-like field under a root (piercing shadow DOM) with its viewable rect, the shape
   * the pseudo-form extraction consumes.
   * @param {Document|Element} [root] The root to scan; defaults to the top document.
   * @returns {Array<{element: Element, viewableRect: DOMRect}>} The discovered fields.
   */
  static discoverFields(root = document) {
    return ShadowDomQueryService.querySelectorAllDeep(root, TEXT_FIELDS).map((element) => ({
      element,
      viewableRect: element.getBoundingClientRect(),
    }));
  }

  /**
   * Join the scraped fields with their classified role and their live element (dropping fields whose
   * element was collected or that got no role).
   * @param {PageScraping} page The scraped payload.
   * @param {{fields: Object<string, string>, forms: object}} classification The classification output.
   * @returns {{fields: Array<{fieldId: string, formId: string, role: string, element: Element}>, forms: object}} The resolved result.
   */
  static resolve(page, classification) {
    const fields = page.fields
      .map((field) => ({
        fieldId: field.fieldId,
        formId: field.formId,
        role: classification.fields[field.fieldId],
        element: ScrapingIdentityService.elementFor(field.fieldId),
      }))
      .filter((field) => field.element && field.role);
    return { fields, forms: classification.forms };
  }
}

export default PageClassificationService;
