import {getRandomInteger} from "../utils";
import {
  AGE_RATINGS,
  ACTORS,
  SCREENWRITERS,
  FILM_DIRECTORS,
  DURATIONS,
  POSTERS,
  FILM_NAME,
  COMMENT_AUTHOR,
  COMMENT_EMOJI,
  COMMENT_TEXT,
  DESCRIPTION,
  FILM_GENRE,
  COUNTRIES
} from "../consts";

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomItem = (items) => {
  return items[getRandomInteger(0, items.length - 1)];
};

const getFewRandomItems = (items, max, separator) => {
  const randomIndex = getRandomInteger(1, max);
  const randomItems = items.slice().sort(() => Math.random() - 0.5);
  randomItems.splice(randomIndex, randomItems.length - randomIndex);
  return randomItems.join(separator);
};

const generateComment = () => {
  return {
    text: getRandomItem(COMMENT_TEXT),
    emoji: getRandomItem(COMMENT_EMOJI),
    author: getRandomItem(COMMENT_AUTHOR),
    commentDate: randomDate(new Date(2012, 0, 1), new Date())
  };
};

export const generateFilmDetails = () => {
  const title = getRandomItem(FILM_NAME);
  const titleOriginal = title;
  const poster = getRandomItem(POSTERS);
  const rating = (Math.random() * 10).toFixed(1);
  const duration = getRandomItem(DURATIONS);
  const director = getRandomItem(FILM_DIRECTORS);
  const country = getRandomItem(COUNTRIES);
  const ageRating = getRandomItem(AGE_RATINGS);
  const writers = getFewRandomItems(SCREENWRITERS, 3, `, `);
  const actors = getFewRandomItems(ACTORS, 5, `, `);
  const genres = getFewRandomItems(FILM_GENRE, 3, ` `);
  const description = getFewRandomItems(DESCRIPTION, 5, ` `);
  const releaseDate = randomDate(new Date(1960, 0, 1), new Date());
  const commentNumber = getRandomInteger(1, 5);
  const comments = new Array(commentNumber).fill().map(generateComment);

  return {
    title,
    titleOriginal,
    poster,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres,
    description,
    ageRating,
    comments
  };
};

