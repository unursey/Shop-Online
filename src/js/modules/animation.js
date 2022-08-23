const startAnimation = (duration, callback) => {
    let startAnimation = NaN;
  
    requestAnimationFrame(function step(timestamp) {
      startAnimation ||= timestamp;
      const progress = (timestamp - startAnimation) / duration;
  
      callback(progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    });
  };
  
  export const openAnimationBurger = (burgerMenu, burger) => {
    const duration = 600;
    startAnimation(duration, (progress) => {
      burgerMenu.style.opacity = progress;
      burger.style.opacity = progress;
    });
  };
  
  
  
  export const closeAnimationBurger = (burgerMenu) => {
    const duration = 1000;
    startAnimation(duration, (progress) => {
      burgerMenu.style.opacity = 1 - progress;
    });
  };
  