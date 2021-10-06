export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = data => data
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;

    this.render();
  }

  getLinkTemplate () {
    return `<a href="/${this.link}" class="column-chart__link">View all</a>`;
  }

  getColumns () {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;
    return this.data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0) + '%'
      return `<div style="--value: ${String(Math.floor(item * scale))}" data-tooltip="${percent}"></div>`
    })
      .join('');
  }

  get template () {
    return `
      <div class="column-chart ${!this.data.length ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.link ? this.getLinkTemplate() : ''}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.getColumns()}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div'); // (*)

    element.innerHTML = this.template;

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
