import { searchTimer } from "./searchTimer.js";
import { createPage, createArticle } from "./renderBlog.js";
import { addAcc, removeAcc } from "./acc.js";
import { addOpenBurger, addCloseBurger } from './burger.js';

export const init = () => {
  searchTimer();
  addOpenBurger(),
  addCloseBurger(),
  createPage();
  createArticle();

  const mediaQuery = window.matchMedia("(max-width: 580px)");

  const mediaChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      addAcc();
    } else {
      removeAcc();
    };
  };

  mediaQuery.addListener(mediaChange);
  mediaChange(mediaQuery);
};
