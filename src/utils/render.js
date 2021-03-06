import AbstractComponent from "../view/abstract-component.js";
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (element instanceof AbstractComponent) {
    element = element.getElement();
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractComponent) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractComponent) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parent.replaceChild(newChild, oldChild);
};

const getMostCommentedFilms = (films) => {
  const sortedFilmsByComments = films.slice().sort((firstItem, secondItem) => secondItem.commentsIds.length - firstItem.commentsIds.length);
  const mostCommented = sortedFilmsByComments.filter((film) => film.commentsIds.length > 0);
  return mostCommented;
};

const getTopRatedFilms = (films) => {
  const sortedFilmsByRating = films.slice().sort((firstItem, secondItem) => secondItem.rating - firstItem.rating);
  const topRated = sortedFilmsByRating.filter((film) => film.rating > 0);
  return topRated;
};

export {render, RenderPosition, createElement, renderTemplate, remove, replace, getMostCommentedFilms, getTopRatedFilms};
