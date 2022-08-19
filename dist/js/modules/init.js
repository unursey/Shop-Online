import { searchTimer } from "./searchTimer.js";
import { createPage, createArticle } from "./renderBlog.js";
import { acc, removeAcc } from "./acc.js";

export const init = () => {
  searchTimer();
  createPage();
  createArticle();

  const mediaChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      acc();
    } else {
      removeAcc();
    }
  };
  const mediaQuery = window.matchMedia("(max-width: 580px)");
  mediaQuery.addListener(mediaChange);
  mediaChange(mediaQuery);
};
