export const acc = () => {
  const qBtns = document.querySelectorAll(".footer__title-acc");

  qBtns.forEach((btn, index) => {  
    btn.addEventListener("click", fooj); 
    btn.myIndex = index;
  });
};

const fooj = (e) => {
  const qItems = document.querySelectorAll(".footer__acc");
  const qWrapper = document.querySelectorAll(".footer__block-list");

  let heightWrapper = 0;

  qWrapper.forEach((elem, index) => {
    if (e.target.myIndex === index) {
        heightWrapper = elem.scrollHeight;
    }
  })

  for (let i = 0; i < qItems.length; i++) {
    if (e.target.myIndex === i) {

      qWrapper[i].style.height = qItems[i].classList.contains(
        "footer__acc_active"
      )
        ? ""
        : `${heightWrapper}px`;
      qItems[i].classList.toggle("footer__acc_active");

    } else {
      qItems[i].classList.remove("footer__acc_active");
      qWrapper[i].style.height = "";
    }
  }
};

export const removeAcc = () => {
  const qItems = document.querySelectorAll(".footer__acc");
  const qWrapper = document.querySelectorAll(".footer__block-list");
  const qBtns = document.querySelectorAll(".footer__title-acc");
  qBtns.forEach((btn) => {
    btn.removeEventListener('click', fooj);
  })
  qItems.forEach((item, i) => {
    item.classList.remove("footer__acc_active");
    qWrapper[i].style.height = "";
  });
};
