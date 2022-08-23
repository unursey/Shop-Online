export const addAcc = () => {
  const qBtns = document.querySelectorAll(".collapse__title");

  qBtns.forEach((btn, index) => {  
    btn.addEventListener("click", fooj); 
    btn.myIndex = index;
  });
};

const fooj = (e) => {
  const qItems = document.querySelectorAll(".collapse");
  const qWrapper = document.querySelectorAll(".collapse__block");
  let heightWrapper = 0;

  qWrapper.forEach((elem, index) => {
    if (e.target.myIndex === index) {
        heightWrapper = elem.scrollHeight;
    };
  });

  for (let i = 0; i < qItems.length; i++) {
    if (e.target.myIndex === i) {
      qWrapper[i].style.height = qItems[i].classList.contains(
        "collapse_active"
      )
        ? ""
        : `${heightWrapper}px`;
      qItems[i].classList.toggle("collapse_active");

    } else {
      qItems[i].classList.remove("collapse_active");
      qWrapper[i].style.height = "";
    };
  };
};

export const removeAcc = () => {
  const qItems = document.querySelectorAll(".collapse");
  const qWrapper = document.querySelectorAll(".collapse__block");
  const qBtns = document.querySelectorAll(".collapse__title");
  qBtns.forEach((btn) => {
    btn.removeEventListener('click', fooj);
  });
  qItems.forEach((item, i) => {
    item.classList.remove("collapse_active");
    qWrapper[i].style.height = "";
  });
};
