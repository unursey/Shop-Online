import { searchTimer } from "./searchTimer.js";
import { getRenderCategory, getRenderDiscountGoods } from "./service.js";
import { createPage, createArticle } from "./renderBlog.js";
import { addAcc, removeAcc } from "./acc.js";
import { addOpenBurger, addCloseBurger } from "./burger.js";
import { getRenderCategoryPage } from "./renderCategoryPage.js";
import { getRenderProductPage } from "./renderProductPage.js";
import { getShoppingCartItem } from "./renderShoppingCart.js";
import { countShoppingCart, countShoppingCartIn } from "./control.js";
import { renderSearchPage } from "./renderSearchPage.js";

export const init = () => {
  searchTimer();
  addOpenBurger();
  addCloseBurger();
  getRenderCategory();
  countShoppingCart();
  renderSearchPage();

  if (location.pathname === "/blog.html") {
    createPage();
  }

  if (location.pathname === "/article.html") {
    createArticle();
  }

  if (location.pathname === "/category.html") {
    getRenderCategoryPage();
  }

  if ((location.pathname === "/index.html") || (location.pathname === "/")) {
    getRenderDiscountGoods();
  }

  if (location.pathname === "/product.html") {
    getRenderProductPage();
  }

  if (location.pathname === "/shoppingcart.html") {
    getShoppingCartItem();
    getRenderDiscountGoods();
    countShoppingCartIn();
  }

  const mediaQuery = window.matchMedia("(max-width: 580px)");

  const mediaChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      addAcc();
    } else {
      removeAcc();
    }
  };

  mediaQuery.addListener(mediaChange);
  mediaChange(mediaQuery);
};
