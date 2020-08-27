import AbstractView from "./abstractComponent";

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._clickHandler.click();
  }
  setClickHandler(callback) {
    this._clickHandler.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
