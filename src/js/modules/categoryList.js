export const addCategory = (err, data) => {
    if (err) {
      console.warn(err, data);   
    }
    document.querySelectorAll(".category").forEach((elem) => {
        const allCategory = data.map(createCategory);
        elem.append(...allCategory);
    })
  };
  
  const createCategory = (i) => {
    const item = document.createElement("li");
    item.classList.add("category__text");
    const link = document.createElement("a");
    link.textContent = i;
    link.href = `category.html?category=${i}`;
    item.append(link);
    return item;
  };