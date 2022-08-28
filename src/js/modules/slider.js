export const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  loop: true,
  //centeredSlides: true,
  spaceBetween: 25,

  autoplay: {
    delay: 3000,
  },

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
