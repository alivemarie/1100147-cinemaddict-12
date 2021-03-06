import {showFullReleaseDate, showCommentDate} from "../utils/film.js";
import {replace, createElement} from "../utils/render.js";
import AbstractComponentView from "./abstract-component.js";
import he from "he";

const ERROR_ANIMATION_TIMEOUT = 3000;
const KeyCodes = {
  ENTER: 13
};

const createFilmInfoHead = (film) => {
  const {
    rating,
    title,
    titleOriginal
  } = film;

  return `<div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${titleOriginal}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>`;
};
const createFilmDetailsTable = (film) => {
  const {
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres
  } = film;

  return `<table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${showFullReleaseDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                ${genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``)}
               </td>
            </tr>
          </table>`;
};

const createAddToWatchlistControl = (isAddedToWatchlist) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isAddedToWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>`;
};

const createIsWatchedControl = (isMarkedAsWatched) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isMarkedAsWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>`;
};

const createIsFavoriteControl = (isFavorite) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`;
};

const createFilmDetailsControls = ({
  isAddedToWatchlist,
  isMarkedAsWatched,
  isFavorite
}) => {

  const addToWatchlistControl = createAddToWatchlistControl(isAddedToWatchlist);
  const isWatchedControl = createIsWatchedControl(isMarkedAsWatched);
  const isFavoriteControl = createIsFavoriteControl(isFavorite);

  return `<section class="film-details__controls">
        ${addToWatchlistControl}
        ${isWatchedControl}
        ${isFavoriteControl}
      </section>`;
};

const createFilmDetailsCommentsList = (comments, filmID) => {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${comments.map((comment) => {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${showCommentDate(comment.date)}</span>
                <button class="film-details__comment-delete" data-film-id="${filmID}" data-comment-id="${comment.id}">Delete</button>
              </p>
            </div>
          </li>`;
  }).join(``)}
        </ul>`;
};

const createAddingCommentField = () => {
  return `<div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

const createFilmDetailsTemplate = (film) => {
  const {
    poster,
    description,
    ageRating,
    comments,
  } = film;

  const filmInfoHead = createFilmInfoHead(film);
  const filmDetailsTable = createFilmDetailsTable(film);
  const filmDetailsControls = createFilmDetailsControls(film);
  const filmDetailsCommentsList = createFilmDetailsCommentsList(comments, film.id);
  const filmAddingCommentField = createAddingCommentField();

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          ${filmInfoHead}
          ${filmDetailsTable}
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      ${filmDetailsControls}
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${filmDetailsCommentsList}
        ${filmAddingCommentField}
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends AbstractComponentView {
  constructor(filmDetails) {
    super();
    this._filmDetails = filmDetails;

    this._selectEmojiHandler = this._selectEmojiHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._inputTextCommentHandler = this._inputTextCommentHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setSelectEmojiHandler();
    this._setCommentTextInputHandler();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmDetails);
  }

  enableIsFavoriteToggler(changeData) {
    const element = this.getElement();

    const isFavoriteToggleHandler = (evt) => {
      evt.preventDefault();

      changeData(
          Object.assign(
              {},
              this._filmDetails,
              {
                isFavorite: !this._filmDetails.isFavorite
              }
          )
      );
      const oldIsFavoriteElement = element.querySelector(`#favorite`);
      const updatedIsFavoriteElement = createElement(createIsFavoriteControl(this._filmDetails.isFavorite));
      replace(updatedIsFavoriteElement, oldIsFavoriteElement);
    };

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, isFavoriteToggleHandler);
  }

  enableIsWatchedToggler(changeData) {
    const element = this.getElement();

    const isWatchedToggleHandler = (evt) => {
      evt.preventDefault();

      changeData(
          Object.assign(
              {},
              this._filmDetails,
              {
                isMarkedAsWatched: !this._filmDetails.isMarkedAsWatched
              }
          )
      );
      const oldIsWatchedElement = element.querySelector(`#watched`);
      const updatedIsWatchedElement = createElement(createIsWatchedControl(this._filmDetails.isMarkedAsWatched));
      replace(updatedIsWatchedElement, oldIsWatchedElement);
    };

    element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, isWatchedToggleHandler);
  }

  enableIsAddedToWatchlistToggler(changeData) {
    const element = this.getElement();

    const addToWatchlistToggleHandler = (evt) => {
      evt.preventDefault();

      changeData(
          Object.assign(
              {},
              this._filmDetails,
              {
                isAddedToWatchlist: !this._filmDetails.isAddedToWatchlist
              }
          )
      );
      const oldIsAddedToWatchlistElement = element.querySelector(`#watchlist`);
      const updatedIsAddedToWatchlistElement = createElement(createAddToWatchlistControl(this._filmDetails.isAddedToWatchlist));
      replace(updatedIsAddedToWatchlistElement, oldIsAddedToWatchlistElement);
    };

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, addToWatchlistToggleHandler);
  }

  setCommentSubmitHandler(callback) {
    this._formSubmit = callback;
    this._commentSubmitHandler();
  }

  setDeleteErrorHandler() {
    this._currentDeletingComment.style.animation = `shake ${ERROR_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._currentDeletingComment.style.animation = ``;
      this._currentDeleteButton.disabled = false;
      this._currentDeleteButton.innerHTML = `Delete`;
    }, ERROR_ANIMATION_TIMEOUT);
  }

  setFormErrorHandler() {
    const commentFormElement = this.getElement().querySelector(`.film-details__new-comment`);
    commentFormElement.style.animation = `shake ${ERROR_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      commentFormElement.style.animation = ``;
      this.getElement().querySelector(`.film-details__comment-input`).disabled = false;
    }, ERROR_ANIMATION_TIMEOUT);
  }

  setCommentsDeleteHandler(callback) {
    this._commentDeletingClick = callback;

    const element = this.getElement();

    element.querySelectorAll(`.film-details__comment`).forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        this._currentDeletingComment = comment;
        this._deleteClickHandler(evt);
      });
    });
  }

  setCloseButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  _setSelectEmojiHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._selectEmojiHandler);
  }

  _setCommentTextInputHandler() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._inputTextCommentHandler);
  }

  _commentSubmitHandler() {
    const element = this.getElement();

    const addCommentHandler = (evt) => {
      if (evt.keyCode === KeyCodes.ENTER && evt.ctrlKey) {
        evt.preventDefault();
        const commentTextElement = element.querySelector(`.film-details__comment-input`);
        const commentEmojiElement = element.querySelector(`.film-details__add-emoji-label`);

        commentTextElement.style.outline = this._commentText ? `` : `3px solid red`;
        commentEmojiElement.style.outline = this._emoji ? `` : `3px solid red`;

        if (this._commentText && this._emoji) {
          this.getElement().querySelector(`.film-details__comment-input`).disabled = true;
          this._formSubmit(this._emoji, he.encode(this._commentText));
        }
      }
    };

    element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, addCommentHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `BUTTON`) {
      this._currentDeleteButton = evt.target;
      this._commentDeletingClick(evt.target.dataset.commentId);
      evt.target.innerHTML = `Deleting...`;
      evt.target.disabled = true;
    }
  }

  _closeButtonClickHandler() {
    this._callback.click();
  }

  _selectEmojiHandler(evt) {
    const emoji = evt.target.value;
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    if (emoji) {
      emojiContainer.innerHTML = `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`;
      this._emoji = emoji;
    }
  }

  _inputTextCommentHandler(evt) {
    evt.preventDefault();
    this._commentText = evt.target.value;
  }
}
