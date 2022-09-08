import { addProductData } from "./serviceStorage.js";
import {
  getStorageProductData,
  setStorageProductData,
  removeStorageProductData,
} from "./serviceStorage.js";

export const addToShoppingCart = () => {
  const addBtn = document.querySelector(".product__button-add");
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProductData(e.target.dataset.id);
    countShoppingCart();
  });
};

export const countShoppingCart = () => {
  const count = document.querySelector(".navigation__cart-count");
  chageCountCart(count);
};

export const countShoppingCartIn = () => {
  const count = document.querySelector(".shopping-cart__cart-count");
  chageCountCart(count);
};

const chageCountCart = (count) => {
  const data = getStorageProductData();
  if (data.length === 0) {
    count.style.display = "none";
  } else {
    count.style.display = "block";

    let sum = data.reduce((acc, i) => {
      return acc + i.count;
    }, 0);
    count.textContent = sum;
  }
};

export const checkedProduct = () => {
  const checkboxMain = document.querySelector(
    ".shopping-cart__checkbox-parent"
  );
  const checkboxChild = document.querySelectorAll(
    ".shopping-cart__checkbox-children"
  );

  checkboxMain.addEventListener("change", () => {
    if (checkboxMain.checked) {
      checkboxChild.forEach((i) => {
        i.checked = true;
        i.setAttribute("checked", "");
      });
      totalSum();
    } else {
      checkboxChild.forEach((i) => {
        i.checked = false;
        i.removeAttribute("checked", "");
      });
      totalSum();
    }
  });
  checkboxChild.forEach((i) => {
    i.addEventListener("change", (e) => {
      if (i.checked) {
        i.checked = true;
        i.setAttribute("checked", "");
        totalSum();
      } else {
        i.checked = false;
        i.removeAttribute("checked", "");
        if (checkboxMain.checked) {
          checkboxMain.checked = false;
          checkboxMain.removeAttribute("checked", "");
        }
        totalSum();
      }
    });
  });
};

const totalSum = () => {
  const totalNew = document.querySelector(".shopping-cart__total-new");
  const totalCount = document.querySelector(".shopping-cart__total-count");
  const totalOld = document.querySelector(".shopping-cart__total-old");
  const totalDiscount = document.querySelector(
    ".shopping-cart__total-discount"
  );
  const checkboxChild = document.querySelectorAll(
    ".shopping-cart__checkbox-children"
  );

  let newSum = 0;
  let oldSum = 0;
  let countSum = 0;

  const storageData = getStorageProductData();
  checkboxChild.forEach((item, index) => {
    if (item.checked) {
      storageData.forEach((i) => {
        if (
          i.id ===
          document.querySelectorAll(".shopping-cart__item")[index].dataset.id
        ) {
          newSum += Math.ceil(i.price - (i.price * i.discount) / 100) * i.count;
          oldSum += i.price * i.count;
          countSum += i.count;
        }
      });
    }
  });
  totalNew.textContent = newSum + " ₽";
  totalOld.textContent = oldSum + " ₽";
  totalDiscount.textContent = oldSum - newSum + " ₽";
  totalCount.textContent = countSum;
};

export const changeCount = () => {
  const count = document.querySelectorAll(".shopping-cart__count");
  const li = document.querySelectorAll(".shopping-cart__item");
  const preview = document.querySelectorAll(".shopping-cart__preview");

  li.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      if (e.target.closest(".shopping-cart__add")) {
        e.preventDefault();
        const storageData = getStorageProductData();

        storageData.forEach((i) => {
          if (i.id === e.currentTarget.dataset.id) {
            i.count++;
            if (i.count > count[index].dataset.count) {
              return;
            } else {
              count[index].textContent = i.count;
              const newCount = i.count;
              changePrice(i, newCount);
              setStorageProductData(storageData);
              countShoppingCart();
              countShoppingCartIn();
              totalSum();
            }
          }
        });
      }

      if (e.target.closest(".shopping-cart__lower")) {
        e.preventDefault();
        const storageData = getStorageProductData();
        storageData.forEach((i) => {
          if (i.id === e.currentTarget.dataset.id) {
            i.count--;
            if (i.count <= 0) {
              item.remove();
              removeStorageProductData(item.dataset.id);
              preview[index].remove();
              totalSum();
            } else {
              count[index].textContent = i.count;
              const newCount = i.count;
              changePrice(i, newCount);
              setStorageProductData(storageData);
              countShoppingCart();
              countShoppingCartIn();
              totalSum();
            }
          }
        });
      }

      if (e.target.closest(".shopping-cart__new-trash")) {
        li[index].remove();
        removeStorageProductData(e.currentTarget.dataset.id);
        preview[index].remove();
        totalSum();
      }
    });
  });
};

const changePrice = (storageData, count) => {
  const li = document.querySelectorAll(".shopping-cart__item");
  const newPrice = document.querySelectorAll(".shopping-cart__new-price");
  const oldPrice = document.querySelectorAll(".shopping-cart__old-price");
  const creditPrice = document.querySelectorAll(".shopping-cart__credit-price");
  li.forEach((n, index) => {
    if (storageData.id === n.dataset.id) {
      let price = 0;
      price = Math.ceil(
        (storageData.price - (storageData.price * storageData.discount) / 100) *
          count
      );
      newPrice[index].textContent = price + " ₽";
      creditPrice[index].textContent =
        "В кредит от " + Math.ceil(price / 12) + " ₽";

      if (storageData.discount === 0) {
        oldPrice[index].textContent = "";
      } else {
        oldPrice[index].textContent = storageData.price * count + " ₽";
      }
    }
  });
};

export const deleteProduct = () => {
  const btnDel = document.querySelector(".shopping-cart__trash");

  btnDel.addEventListener("click", () => {
    const li = document.querySelectorAll(".shopping-cart__item");
    const preview = document.querySelectorAll('.shopping-cart__preview');
    const checkboxChild = document.querySelectorAll(".shopping-cart__checkbox-children");
    const storageData = getStorageProductData();

    checkboxChild.forEach((item, index) => {   
      if (item.checked) {

        storageData.forEach((i) => {
          if (i.id === li[index].dataset.id) {
            removeStorageProductData(li[index].dataset.id);
            li[index].remove();
            preview[index].remove();
            totalSum();
          }
        });
      }
    });
  });
};
