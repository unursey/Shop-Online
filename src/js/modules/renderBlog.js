const loadGoods = async (page) => {
  const result = await fetch("https://gorest.co.in/public-api/posts" + page);
  const data = await result.json();
  return data;
};

const loadUsers = async (user) => {
    const result = await fetch("https://gorest.co.in/public-api/users/" + user);
    const data = await result.json();
    console.log(data);
    return data;
  };

const renderGoods = async (page, pageNum) => {
  const data = await loadGoods(page);
  const blogArticle = document.createElement("div");
  blogArticle.className = "blog__article";

  const allPageNums = data.meta.pagination.pages;
  console.log(allPageNums);

  const goods = data.data.map((item) => {
    const cart = document.createElement("li");
    cart.className = "blog__article-cart article-cart";
    cart.innerHTML = `
            <div class="article-cart__img-block">
                <img src="img/blog/test.jpg" class="article-cart__img" alt="Превью статьи"/>
            </div>
            <div class="article-cart__text-block">
                <h2 class="article-cart__title-block"><a href="article.html?id=${item.id}" class="article-cart__title">${item.title}</a></h2>
                <div class="article-cart__info">
                  <p class="article-cart__date">22 октября 2021, 12:45</p>
                  <div class="article-cart__reaction">
                      <a class="article-cart__views">0К</a>
                      <a class="article-cart__comments">0</a>
                  </div>
                </div>
            </div
        `;
    return cart;
  });

  blogArticle.append(...goods);
  document.querySelector(".blog__container").append(blogArticle);

  renderPagination(+pageNum, allPageNums);
};

const renderPagination = (pageNum, allPageNums) => {
  let firstPage = pageNum - 1;
  let firstTextPage = firstPage;

  const activePage = pageNum;
  const activeTextPage = activePage;

  let lastPage = pageNum + 1;
  let lastTextPage = lastPage;

  if (pageNum === 1) {
    firstPage = allPageNums;
    firstTextPage = '...'
  }

  if (pageNum === allPageNums) {
    lastPage = 1;
    lastTextPage = 1;
  }

  const pagination = document.createElement("div");
  pagination.className = "blog__pagination pagination";

  pagination.innerHTML = `
        <a href="?page=${firstPage}" class="pagination__left" aria-label="left">
            <svg tabindex="0" class="pagination__img" width="37" height="37" viewBox="0 0 37 37" fill="#8F8F8F" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.375 16.9583H10.5296L16.0487 11.4237L13.875 9.25L4.625 18.5L13.875 27.75L16.0487 25.5763L10.5296 20.0417H32.375V16.9583Z" fill="#8F8F8F"/>
            </svg>                    
        </a>
        <div class="pagination__num-list">
            <a href="?page=${firstPage}" class="pagination__num">${firstTextPage}</a>
            <a href="?page=${activePage}"class="pagination__num pagination__num_active">${activeTextPage}</a>
            <a href="?page=${lastPage}" class="pagination__num">${lastTextPage}</a>
        </div>
        <a href="?page=${lastPage}" class="pagination__right" aria-label="right">
            <svg tabindex="0" class="pagination__img" width="37" height="37" viewBox="0 0 37 37" fill="#8F8F8F" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.625 16.9583H26.4704L20.9513 11.4237L23.125 9.25L32.375 18.5L23.125 27.75L20.9513 25.5763L26.4704 20.0417H4.625V16.9583Z" fill="#3670C7"/>
            </svg>              
        </a>
        `;
  document.querySelector(".blog__container").append(pagination);
};

export const renderArticle = async (id) => {
    let backPage;
    if (sessionStorage.getItem('backurl')) {
        backPage = sessionStorage.getItem('backurl');
    } else {
        backPage = "?page=1"
    }
 
  const data = await loadGoods(id);
  const user = await loadUsers(data.data.user_id);

  const article = document.createElement("article");
  article.className = "article__container";

  article.innerHTML = `
    <div class="article__crumbs crumbs">
      <p class="crumbs__text"><a href="/index.html">Главная</a></p>
      <svg class="crumbs__icon" width="18" height="18" viewBox="0 0 18 18" fill="#525252" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z" fill="#525252"/>
      </svg>
      <p class="crumbs__text"><a href="/blog.html${backPage}">Блог</a></p>
      <svg class="crumbs__icon" width="18" height="18" viewBox="0 0 18 18" fill="#525252" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z" fill="#525252"/>
      </svg>
      <p class="crumbs__text crumbs__text-title">${data.data.title}</p>
    </div>

    <h1 class="page__title">${data.data.title}</h1>
    <p class="article__text">${data.data.body}</p>

    <div class="article__link-block">
        <a class="article__link-back" href='/blog.html${backPage}'>К списку статей</a>

        <div class="article__author">
          <a class="article__link-author">${user.data.name}</a>
          <p class="article__date">22 октября 2021, 12:45</p>
          <div class="article__reaction">
            <a class="article__views">0К</a>
            <a class="article__comments">0</a>
          </div>
          </div>
    </div>    
    `;
 
  document.querySelector(".article").append(article);
};

export const createPage = () => {
    let page = "?page=1";
    let pageNum = 1;

    if (location.search) {
      page = location.search;

      let params = new URL(document.location).searchParams;
      pageNum = params.get("page");
    }

    renderGoods(page, pageNum);
    sessionStorage.setItem('backurl', page);
};

export const createArticle = () => {
    let params = new URL(document.location).searchParams;
    let id = "/" + params.get("id");
    renderArticle(id);
};

