import { getRenderCategoryGoods, urlPic } from "./service.js";
import { loadImg } from "./loadImg.js";

export const getRenderCategoryPage = () => {
    let params = (new URL(document.location)).searchParams;
    let category = params.get("category");
    document.querySelector('.card-product__title').innerHTML = `${category}`;
    
    getRenderCategoryGoods(category);
};

export const renderCategoryPage = (err, data) => {
    if (err) {
      console.warn(err, data);
      return;
    }
    const list = createPage(data);
    document.querySelector(".category-product__container").append(list);

    const img = document.querySelectorAll('.card-product__img');
    img.forEach((i) => {
      loadImg(i);
    })   
};

export const renderSearchPage = (err, data) => {
  console.log("data search получена: ", data);
  if (err) {
    console.warn(err, data);
    return;
  }
  const section = document.createElement('section');
  const container = document.createElement('div');
  container.className = "container";

  if (data.length !== 0) {
      const list = createPage(data);
      container.append(list);
  } else {
    container.textContent = 'По Вашему запросу ничего не найдено.'
  }
  section.append(container);
  document.querySelector('.main').innerHTML = '';
  document.querySelector('.main').append(section);
  
  const img = document.querySelectorAll('.card-product__img');
  img.forEach((i) => {
    loadImg(i);
  })  
};

export const renderDiscountPage = (err, data) => {
    if (err) {
      console.warn(err, data);
      return;
    }
    const list = createPage(data);
    document.querySelector(".profit__container").append(list);

    const img = document.querySelectorAll('.card-product__img');
    img.forEach((i) => {
      loadImg(i);
    })  
};

const createPage = (data) => {
  const list = document.createElement("ul");
  list.className = "card-product__wrapper";
  const goods = data.map((item) => {
    const discountLabel = document.createElement('div');
    discountLabel.className = "card-product__discount";
    discountLabel.innerHTML = '-' + item.discount + '%';
    let label = '';
    let price = '';
    let oldPrice = '';
    if (item.discount !== 0) {
        price = item.price - item.price*item.discount/100 + ' ₽';
        oldPrice = item.price + ' ₽';
        label = discountLabel;
      } else {
        price = item.price + ' ₽';
        oldPrice = '';
        label = '';
      }
    const cart = document.createElement("li");
    cart.className = "card-product__gallery";
    cart.insertAdjacentHTML(
        "afterbegin", `
        <a href="product.html?id=${item.id}">
        <picture>
            <img
            class="card-product__img"
            src="${urlPic}${item.image}"
            alt="${item.title}"
            width="420"
            height="295"
            />
            
        </picture>
        <p class="card-product__text">
        <div class="card-product__price">
            <span class="card-product__new-price">${price}</span>
            <span class="card-product__old-price">${oldPrice}</span>
        </div>        
        <span class="card-product__desc">${item.title}</span>
        </p>
    </a>
    `);

    cart.append(label);
    return cart;
  });

  list.append(...goods);
  return list;
};