import { getRenderSearchGoods } from './service.js'

export const renderSearchPage = () => {
const input = document.querySelector('.form-search__input');
const btnSearch = document.querySelector('.form-search__button');

btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const text = input.value;
  if (text !== '') {
    getRenderSearchGoods(text);
  } else {
    return;
  } 
});
};
  
