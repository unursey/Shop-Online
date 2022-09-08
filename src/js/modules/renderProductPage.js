import { getRenderProduct, getRenderRecommendGoods, urlPic } from "./service.js";
import { swiper } from './slider.js';
import { addToShoppingCart } from "./control.js";
import { loadImg } from "./loadImg.js";

export const getRenderProductPage = () => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    
    getRenderProduct(id);
};

export const renderProductPage = (err, data) => {
    console.log("data category получена: ", data);
    if (err) {
      console.warn(err, data);
      return;
    }
    let label = '';
    let price = '';
    let oldPrice = '';
    if (data.discount !== 0) {
        price = data.price - data.price*data.discount/100 + ' ₽';
        oldPrice = data.price + ' ₽';
        label = 'inline-block'
      } else {
        price = data.price + ' ₽';
        oldPrice = '';
        label = 'none';
      }

    const container = document.createElement('div');
    container.className = 'container product__container';

    container.innerHTML = `
    <div class="product__crumbs crumbs">
    <p class="crumbs__text"><a href="index.html">Главная</a></p>

    <svg class="crumbs__icon" width="18" height="18" viewBox="0 0 18 18" fill="#525252"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z"
            fill="#525252" />
    </svg>
    <p class="crumbs__text">Каталог</p>
    <svg class="crumbs__icon" width="18" height="18" viewBox="0 0 18 18" fill="#525252"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z"
            fill="#525252" />
    </svg>
    <p class="crumbs__text"><a href="category.html?category=${data.category}">${data.category}</a></p>
    <svg class="crumbs__icon" width="18" height="18" viewBox="0 0 18 18" fill="#525252"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z"
            fill="#525252" />
    </svg>
    <p class="crumbs__text">${data.title}</p>
</div>

<h1 class="product__title">${data.title}</h1>

<div class="product__block">
    <div class="product__picture">
        <img class="product__img" src="${urlPic}${data.image}" alt="${data.title}" width="757" height="427" />
        <div class="product__discount" style="display:${label}">-${data.discount}%</div>
    </div>

    <div class="product__card">
        <div class="product__price">
            <p class="product__new-price">${price}</p>
            <p class="product__old-price">${oldPrice}</p>         
        </div>

        <a href="#" class="product__additional">В кредит от ${Math.round(data.price/12)} ₽</a>

        <div class="product__button">
            <button class="product__button-add" data-id="${data.id}">Добавить в корзину</button>
            <button class="product__button-like" aria-label="Добавить в избранное">
                <svg class="product__button-svg" width="29" height="26" viewBox="0 0 29 26"
                    fill="#3670C7" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.6875 0.125C18.295 0.125 15.9987 1.23875 14.5 2.99875C13.0012 1.23875 10.705 0.125 8.3125 0.125C4.0775 0.125 0.75 3.4525 0.75 7.6875C0.75 12.885 5.425 17.12 12.5062 23.555L14.5 25.3563L16.4937 23.5413C23.575 17.12 28.25 12.885 28.25 7.6875C28.25 3.4525 24.9225 0.125 20.6875 0.125ZM14.6375 21.5062L14.5 21.6437L14.3625 21.5062C7.8175 15.58 3.5 11.6613 3.5 7.6875C3.5 4.9375 5.5625 2.875 8.3125 2.875C10.43 2.875 12.4925 4.23625 13.2212 6.12H15.7925C16.5075 4.23625 18.57 2.875 20.6875 2.875C23.4375 2.875 25.5 4.9375 25.5 7.6875C25.5 11.6613 21.1825 15.58 14.6375 21.5062Z"
                        fill="#3670C7" />
                </svg>
            </button>
        </div>

        <div class="product__info">
            <div class="product__info-block">
                <p class="product__info-text product__info-title">Доставка</p>
                <p class="product__info-text">1-3 января</p>
            </div>
            <div class="product__info-block">
                <p class="product__info-text product__info-title">Продавец</p>
                <p class="product__info-text">ShopOnline</p>
            </div>
        </div>
        <button class="product__additional product__additional-btn">Узнать о снижении цены</button>
    </div>
</div>
<div class="product__description">
    <h3 class="product__subtitle">Описание</h3>
    <p class="product__text">${data.description}</p>
</div>
    `;
    document.querySelector('.product').append(container);

    const img = document.querySelector('.product__img');
      loadImg(img);


    getRenderRecommendGoods(data.category);
    addToShoppingCart();
};

export const renderRecommend = (err, data) => {
    console.log("data category получена: ", data);
    if (err) {
      console.warn(err, data);
      return;
    }

    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");

    const newData = data.filter(function(elem) {
      if (elem.id !== id) {
        return true;
      } else {
        return false;
      }
    });

    const list = document.createElement("ul");
    list.className = "recommend__list swiper-wrapper";
    const goods = newData.map((item) => {
      let label = '';
      let price = '';
      let oldPrice = '';
      if (item.discount !== 0) {
          price = item.price - item.price*item.discount/100 + ' ₽';
          oldPrice = item.price + ' ₽';
          label = 'inline-block'
        } else {
          price = item.price + ' ₽';
          oldPrice = '';
          label = 'none';
        }
      const card = document.createElement("li");
      card.className = "recommend__item swiper-slide";
      card.insertAdjacentHTML(
        "afterbegin", `
          <a href="product.html?id=${item.id}">
            <div class="recommend__card">
              <div class="recommend__block-img">                                  
                  <img class="recommend__img" src="${urlPic}${item.image}" alt="${item.title}"
                    width="420" height="295" />
                    <div class="recommend__discount" style="display:${label}">-${item.discount}%</div>
              </div>
              <div class="recommend__price">
                <p class="recommend__new-price">${price}</p>
                <p class="recommend__old-price">${oldPrice}</p>
              </div>
              <p class="recommend__name">${item.title}</p>
            </div>
          </a>
      `);
      return card;
    });
  
    list.append(...goods);
    document.querySelector(".recommend__swiper").append(list);

    const img = document.querySelectorAll('.recommend__img');
    img.forEach((i) => {
      loadImg(i);
    })

    if (newData.length === 0) {
      document.querySelector('.recommend').innerHTML = '';
    };

    if ('.swiper-wrapper') {
      swiper.init();
    };
};
