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
  console.log(data);

  const goods = data.data.map((item) => {
    const cart = document.createElement("div");
    cart.className = "blog__article-cart article-cart";
    cart.innerHTML = `
            <div class="article-cart__img-block">
                <img src="img/blog/test.jpg" class="article-cart__img" alt="Превью статьи"/>
            </div>
            <div class="article-cart__text-block">
                <a href="article.html?id=${item.id}" class="article-cart__title">${item.title}</a>
                <p class="article-cart__date">22 октября 2021, 12:45</p>
                <div class="article-cart__reaction">
                    <a class="article-cart__views">0К</a>
                    <a class="article-cart__comments">0</a>
                </div>
            </div
        `;
    return cart;
  });

  blogArticle.append(...goods);
  document.querySelector(".blog__container").append(blogArticle);

  renderPagination(+pageNum);
};

const renderPagination = (pageNum) => {
  const pagination = document.createElement("div");
  pagination.className = "blog__pagination pagination";

  pagination.innerHTML = `
        <button class="pagination__left" aria-label="left">
            <svg tabindex="0" class="pagination__img" width="37" height="37" viewBox="0 0 37 37" fill="#8F8F8F" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.375 16.9583H10.5296L16.0487 11.4237L13.875 9.25L4.625 18.5L13.875 27.75L16.0487 25.5763L10.5296 20.0417H32.375V16.9583Z" fill="#8F8F8F"/>
            </svg>                    
        </button>

        <div class="pagination__num-list">
            <a href="?page=${pageNum - 1}" class="pagination__num">${
    pageNum - 1
  }</a>
            <a href="?page=${pageNum}"class="pagination__num">${pageNum}</a>
            <a href="?page=${pageNum + 1}" class="pagination__num">${
    pageNum + 1
  }</a>
        </div>

        <button class="pagination__right" aria-label="right">
            <svg tabindex="0" class="pagination__img" width="37" height="37" viewBox="0 0 37 37" fill="#8F8F8F" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.625 16.9583H26.4704L20.9513 11.4237L23.125 9.25L32.375 18.5L23.125 27.75L20.9513 25.5763L26.4704 20.0417H4.625V16.9583Z" fill="#3670C7"/>
        </svg>              
        </button>
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
  console.log(user);

  const article = document.createElement("div");
  article.className = "article";

  article.innerHTML = `
    <article class="article">
        <h1 class="page__title">${data.data.title}</h1>
        <p class="articles__text">${data.data.body}</p>

        <a class="articles__link-back" href='/blog.html${backPage}'>К списку статей</a>

        <a class="articles__link-author">${user.data.name}</a>
 
      </article>
        `;

  document.querySelector(".article__container").append(article);
};

export const createPage = () => {
  if (location.pathname === "/blog.html") {
    let page = "?page=1";
    let pageNum = 1;

    if (location.search) {
      page = location.search;

      let params = new URL(document.location).searchParams;
      pageNum = params.get("page");
    }

    renderGoods(page, pageNum);

    sessionStorage.setItem('backurl', page);
  }
};

export const createArticle = () => {
  if (location.pathname === "/article.html") {
    let params = new URL(document.location).searchParams;
    let id = "/" + params.get("id");
    renderArticle(id);

  }
};

