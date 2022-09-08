export const getElements = () => {
    const page = document.querySelector('.page');
    const burgerMenu = page.querySelector('.burger__menu');
    const burger = page.querySelector('.burger');
    const btnBurger = page.querySelector(".header__button-nav");
    const countCart = document.querySelector(".navigation__cart-count");
    const countCartIn = document.querySelector(".shopping-cart__cart-count");
  
    return {
        page,
        burgerMenu,
        burger,
        btnBurger,
        countCart,
        countCartIn,
    };
  };
  