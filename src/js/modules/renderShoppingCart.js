import {
  getStorageProductData,
  setStorageProductData,
} from "./serviceStorage.js";
import { getRenderShoppingCart, urlPic } from "./service.js";
import { checkedProduct, changeCount, deleteProduct } from "./control.js";
import { loadImg } from "./loadImg.js";

export const getShoppingCartItem = () => {
  const data = getStorageProductData();

  data.forEach((item) => {
    getRenderShoppingCart(item.id);
  });
};

export const renderShoppingCart = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  let count = 1;
  const storageData = getStorageProductData();
  storageData.forEach((i) => {
    if (i.id === data.id) {
      count = i.count;
      i.price = data.price;
      i.discount = data.discount;
      setStorageProductData(storageData);
    }
  });

  let price = "";
  let oldPrice = "";
  if (data.discount !== 0) {
    price = Math.ceil(data.price - (data.price * data.discount) / 100) * count;
    oldPrice = data.price * count + " ₽";
  } else {
    price = data.price * count;
    oldPrice = "";
  }
  const cart = document.createElement("li");
  cart.className = "shopping-cart__item";
  cart.dataset.id = data.id;

  cart.insertAdjacentHTML(
    "afterbegin",
    `
                    <div class="shopping-cart__block-checkbox">
                      <label class="shopping-cart__label">
                        <input class="shopping-cart__input shopping-cart__checkbox-children" type="checkbox">
                        <span class="shopping-cart__checkbox"></span>
                      </label>
                    </div>

                    <div class="shopping-cart__block-img">
                      <img class="shopping-cart__img" src="${urlPic}${
      data.image
    }" alt="${data.title}" width="130" height="130" />
                    </div>

                    <div class="shopping-cart__block-text">
                      <p class="shopping-cart__name">${data.title}</p>
                      <div class="shopping-cart__about">
                        <p class="shopping-cart__light-text">Цвет: черный</p>
                        <p class="shopping-cart__light-text">Оперативная память: 16 ГБ</p>
                      </div>
                    </div>

                    <div class="shopping-cart__block-count">
                      <button class="shopping-cart__btn shopping-cart__lower" aria-label="Уменьшить количество товара">
                        <svg class="shopping-cart__btn-img" width="36" height="36" viewBox="0 0 36 36" fill="#8F8F8F"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle class="shopping-cart__btn-circle" cx="18" cy="18" r="17.5" fill="white" stroke="#E8E8E8" />
                          <path class="shopping-cart__btn-path" d="M14.2 18.088H21.08V19.168H14.2V18.088Z" fill="#8F8F8F" />
                        </svg>
                      </button>

                      <span class="shopping-cart__count" data-count=${
                        data.count
                      }>${count}</span>

                      <button class="shopping-cart__btn shopping-cart__add" aria-label="Увеличить количество товара">
                        <svg class="shopping-cart__btn-img" width="36" height="36" viewBox="0 0 36 36" fill="#2D2D2D"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle class="shopping-cart__btn-circle" cx="18" cy="18" r="17.5" fill="white" stroke="#E8E8E8" />
                          <path class="shopping-cart__btn-path"
                            d="M21.48 19.168H18.216V22.608H17.056V19.168H13.808V18.088H17.056V14.672H18.216V18.088H21.48V19.168Z"
                            fill="#2D2D2D" />
                        </svg>
                      </button>
                    </div>

                    <div class="shopping-cart__block-price">
                      <p class="shopping-cart__text-price shopping-cart__new-price">${price} ₽</p>
                      <p class="shopping-cart__text-price shopping-cart__old-price">${oldPrice}</p>
                      <p class="shopping-cart__text shopping-cart__credit-price shopping-cart__text_color_blue">В кредит от ${Math.ceil(
                        price / 12
                      )} ₽</p>
                    </div>

                    <button class="shopping-cart__btn shopping-cart__new-trash" aria-label="Удалить выделенные товары">
                      <svg class="shopping-cart__btn-del" width="18" height="24" viewBox="0 0 18 24" fill="#C9C9C9"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.0214 2.35355L13.1679 2.5H13.375H17.25V4H0.75V2.5H4.625H4.83211L4.97855 2.35355L6.08211 1.25H11.9179L13.0214 2.35355ZM4 22.75C2.90114 22.75 2 21.8489 2 20.75V6.25H16V20.75C16 21.8489 15.0989 22.75 14 22.75H4Z"
                          fill="#C9C9C9" stroke="#C9C9C9" />
                      </svg>
                    </button>
  
  `
  );

  const preview = document.createElement("div");
  preview.className = "shopping-cart__preview";

  preview.innerHTML = `
      <img class="shopping-cart__img" src="${urlPic}${data.image}" alt="" width="130" height="130" />
    `;

  document.querySelector(".shopping-cart__block-preview").append(preview);
  document.querySelector(".shopping-cart__list").append(cart);

  const img = document.querySelectorAll(".shopping-cart__img");
  img.forEach((i) => {
    loadImg(i);
  });

  if (
    document.querySelectorAll(".shopping-cart__item").length ===
    storageData.length
  ) {
    checkedProduct();
    changeCount();
    deleteProduct();
  }
};
