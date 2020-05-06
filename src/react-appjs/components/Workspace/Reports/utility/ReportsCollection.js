
class ReportsCollection {
  constructor(reports) {
    this.reports = reports;
  }

  /**
   * Find a report by its slug.
   * @param slug
   * @return {*}
   */
  findBySlug(slug) {
    for(let i in this.reports) {
      if(this.reports[i]['slug'] === slug) {
        return this.reports[i];
      }
    }

    return {};
  }

  /**
   * Transform reports config array into the format expected by the accordion menu.
   * @return {Array}
   */
  toAccordionMenuItems() {
    const accordionItems = [];
    const reportsRef = {};

    for(let i in this.reports) {
      const category = this.reports[i].category;
      const categoryRef = category || 'root';

      if(!reportsRef[categoryRef]) {
        reportsRef[categoryRef] = [];
      }
      reportsRef[categoryRef].push(this.reports[i]);
    }

    for(let i in reportsRef) {
      if (i === 'root') {
        for(let j in reportsRef[i]) {
          accordionItems.push(reportsRef[i][j]);
        }
      } else {
        accordionItems.push({
          "name": i,
          "children": reportsRef[i]
        });
      }
    }

    return accordionItems;
  }
}


export default ReportsCollection;