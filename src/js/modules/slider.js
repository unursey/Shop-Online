export const swiper = new Swiper(".swiper", {
  init: false,

  //loop: true,
  //centeredSlides: true,
  spaceBetween: 25,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    }
  },
});
