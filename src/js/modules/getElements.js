export const getElements = () => {
    const page = document.querySelector('.page');
    const burgerMenu = page.querySelector('.burger__menu');
    const burger = page.querySelector('.burger');
    const btnBurger = page.querySelector(".header__button-nav");
  
    return {
        page,
        burgerMenu,
        burger,
        btnBurger,
    };
  };
  