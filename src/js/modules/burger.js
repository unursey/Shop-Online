import { getElements } from "./getElements.js";
import { openAnimationBurger, closeAnimationBurger } from "./animation.js";

const { page, burgerMenu, burger, btnBurger } = getElements();

const changeBtnBurger = () => {
  btnBurger.classList.toggle("header__button-nav_icon-open");
  btnBurger.classList.toggle("header__button-nav_icon-close");
};

const closeBurger = () => {
  if (burger.classList.contains("burger_visible")) {
    burger.classList.remove("burger_visible");
    changeBtnBurger();
  }
};

export const addOpenBurger = () => {
  btnBurger.addEventListener("click", () => {
    if (!burger.classList.contains("burger_visible")) {
      openAnimationBurger(burgerMenu, burger);
    }
    if (burger.classList.contains("burger_visible")) {
      closeAnimationBurger(burgerMenu);
    }
    burger.classList.toggle("burger_visible");
    changeBtnBurger();
    pageOverfow();
  });
};

export const addCloseBurger = () => {
  page.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("burger") ||
      (e.target.closest(".header__container") &&
        !e.target.closest(".header__button-nav"))
    ) {
      closeAnimationBurger(burgerMenu);
      closeBurger();
      pageOverfow();
    }
  });
};

const pageOverfow = () => {
  const bodyWidth = page.offsetWidth;
  if (burger.classList.contains("burger_visible")) {
    page.style.overflow = "hidden";
    page.style.marginRight = `${getScrollBarSize(bodyWidth)}px`;
  } else {
    setTimeout(function () {
      page.style.overflow = "";
      page.style.marginRight = "";
    }, 500);
  }
};

const getScrollBarSize = (bodyWidth) => {
  let newBodyWidth = page.offsetWidth;

  if (newBodyWidth === bodyWidth) {
    return;
  }
  const x = newBodyWidth - bodyWidth;
  return x;
};
