export const getStorageProductData = () =>
  localStorage.getItem("shopping")
    ? JSON.parse(localStorage.getItem("shopping"))
    : [];

export const setStorageProductData = (data) => {
  localStorage.setItem("shopping", JSON.stringify(data));
};

export const addProductData = (product) => {
  const data = getStorageProductData("shopping");
  let n = 0;

  data.forEach((i) => {
    if (i.id === product) {
      i.count++;
      n = 1;
    } 
  });

if (n === 1) {  
  setStorageProductData(data);
} else {
  data.push({ id: product, count: 1, price: 0, discount: 0 });
  setStorageProductData(data);
}
};

export const removeStorageProductData = (id) => {
  const data = getStorageProductData("shopping");
  const newData = data.filter((item) => item.id !== id);
  setStorageProductData(newData);
};
