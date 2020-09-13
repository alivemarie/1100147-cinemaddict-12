import AbstractComponentView from "./abstract-component.js";

const createLoadingBarTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`;
};

export default class LoadingBar extends AbstractComponentView {

  getTemplate() {
    return createLoadingBarTemplate();
  }
}
