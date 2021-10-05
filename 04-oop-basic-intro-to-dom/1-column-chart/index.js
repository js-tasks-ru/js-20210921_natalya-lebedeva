export default class ColumnChart {
  chartHeight = 50;
  data;
  label;
  value;
  link;

  constructor({ data, label, value, link = '' }) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
    this.initEventListeners();
  }

  getLinkTemplate () {
    return `<a href="/${this.link}" class="column-chart__link">View all</a>`;
  }

  getColumns () {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;
    return this.data.map(item => `<div style="--value: ${String(Math.floor(item * scale))}" data-tooltip="${(item / maxValue * 100).toFixed(0) + '%'}"></div>`);
  }

  getTemplate () {
    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        ${this.label}
        ${this.link ? this.getLinkTemplate() : ''}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.getColumns().join('')}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div'); // (*)

    element.innerHTML = this.getTemplate();

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element = element.firstElementChild;
  }

  formatHeading (data) {
    return data;
  }

  initEventListeners () {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  update (data) {}

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
