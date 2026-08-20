/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * Some DOM utils
 */
class DomUtils {
  static getAccessibleAndSameDomainIframes() {
    return Array.prototype.filter.call(document.querySelectorAll("iframe"), (iframe) => {
      const contentDocument = DomUtils.getAccessedIframeContentDocument(iframe);
      return (
        contentDocument &&
        DomUtils.isRequestInitiatedFromSameOrigin(window.location.href, contentDocument.location.href)
      );
    });
  }

  /**
   * Returns an accessible iframe document in the page
   * @param {DomElement} iframe found on the page
   * @return {DomElement} iframe document
   */
  static getAccessedIframeContentDocument(iframe) {
    let iframeContentDocument = null;
    try {
      iframeContentDocument = iframe.contentDocument;
    } catch (error) {
      console.error(error);
    }
    return iframeContentDocument;
  }

  /**
   * Check the requested document, top document and an iframe form is initiated from same domain.
   *
   * @param {string} requestedUrl The requested document url
   * @param {string} documentUrl The current active document url
   * @return {Boolean} true
   */
  static isRequestInitiatedFromSameOrigin(requestedUrl, documentUrl) {
    // requestedUrl - from quickaccess
    const parsedRequestedUrl = new URL(requestedUrl);
    // Request initiated document origin
    const requestedOrigin = parsedRequestedUrl.origin;
    // documentUrl - from current active page
    const parsedDocumentUrl = new URL(documentUrl);
    // Top level document/an iframe document origin
    const documentOrigin = parsedDocumentUrl.origin;

    // Requested document and top/iframe document origin is same
    return requestedOrigin === documentOrigin;
  }

  /**
   * Generates x and y coordinates in the element
   * @param {HTMLElement} element
   * @return {{x: number, y: number}[]} return an array of x and y coordinates in the element
   */
  static generateUniquePointsInElement(element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    const cellWidth = DomUtils._calculateCellSize(width);
    const cellHeight = DomUtils._calculateCellSize(height);

    // Calculating the number of cells per row and per column
    const cellsPerRow = Math.ceil(width / cellWidth);
    const cellsPerCol = Math.ceil(height / cellHeight);
    const totalCells = cellsPerRow * cellsPerCol;

    // Pre-allocate all random values in a single crypto call (2 values per cell: x and y)
    const randomBuffer = new Uint32Array(totalCells * 2);
    crypto.getRandomValues(randomBuffer);

    // Pre-calculate edge cell sizes
    const lastColWidth = Math.max(width - (cellsPerRow - 1) * cellWidth, 0);
    const lastRowHeight = Math.max(height - (cellsPerCol - 1) * cellHeight, 0);

    // Pre-allocate array with known size
    const randomPoints = new Array(totalCells);

    // Random point generation
    for (let i = 0; i < totalCells; i++) {
      const row = Math.floor(i / cellsPerRow);
      const col = i % cellsPerRow;
      const isLastCol = col === cellsPerRow - 1;
      const isLastRow = row === cellsPerCol - 1;

      const cellX = col * cellWidth;
      const cellY = row * cellHeight;

      const effectiveCellWidth = isLastCol ? lastColWidth : cellWidth;
      const effectiveCellHeight = isLastRow ? lastRowHeight : cellHeight;

      const bufferIndex = i * 2;
      randomPoints[i] = {
        x: cellX + (randomBuffer[bufferIndex] % effectiveCellWidth) + left,
        y: cellY + (randomBuffer[bufferIndex + 1] % effectiveCellHeight) + top,
      };
    }
    return randomPoints;
  }

  /**
   * Returns the closest ancestor dialog element of the given element, if any.
   * @param {HTMLElement} element
   * @return {HTMLDialogElement | null} The containing dialog, or null when not inside one.
   */
  static getContainingDialog(element) {
    return element?.closest("dialog") ?? null;
  }

  /**
   * Calculate cell size according to a width or height of a frame
   * Function to produce the result: f(x)=10⋅(1−e−a⋅x)+c function for rapid growth followed by a limit at 10
   * x = value
   * a = 0.00624 growth parameter
   * c = 0.9378 vertical offset
   * @param {number} value
   * @return {number}
   * @private use only in function generateRandomPointsInCellsWithPartial
   */
  static _calculateCellSize(value) {
    if (value <= 0) {
      return 1;
    } else if (value >= 100) {
      return 10;
    } else {
      return Math.round(10 * (1 - Math.exp(-0.00624 * value)) + 0.9378);
    }
  }
}

export default DomUtils;
