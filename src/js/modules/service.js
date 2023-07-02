import { addCategory } from "./categoryList.js";
import { renderCategoryPage, renderDiscountPage, renderSearchPage } from "./renderCategoryPage.js";
import { renderProductPage, renderRecommend } from "./renderProductPage.js";
import { renderShoppingCart } from "./renderShoppingCart.js";

export const URL = "https://goofy-superb-emmental.glitch.me/api/goods";
export const urlPic = "https://goofy-superb-emmental.glitch.me/";

const urlCategory = "https://goofy-superb-emmental.glitch.me/api/category";

export const fetchRequest = async (
  url,
  { method = "", callback, body, headers }
) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

export const getRenderProduct = (id) => {
  fetchRequest(`${URL}/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: renderProductPage,
  });
};

export const getRenderShoppingCart = (id) => {
  fetchRequest(`${URL}/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: renderShoppingCart,
  });
};

export const getRenderCategory = () => {
  fetchRequest(urlCategory, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: addCategory,
  });
};

export const getRenderSearchGoods = (text) => {
  fetchRequest(`${URL}?search=${text}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: renderSearchPage,
  });
};


export const getRenderCategoryGoods = (text) => {
  fetchRequest(`${URL}/category/${text}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: renderCategoryPage,
  });
};

export const getRenderDiscountGoods = () => {
  fetchRequest(`${URL}/discount`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    callback: renderDiscountPage,
  });
};

export const getRenderRecommendGoods = (text) => {
    fetchRequest(`${URL}/category/${text}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      callback: renderRecommend,
    });
  };