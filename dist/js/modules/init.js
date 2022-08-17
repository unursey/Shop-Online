import {searchTimer} from "./searchTimer.js";
import {createPage, createArticle, } from "./renderBlog.js";


export const init = () => { 
searchTimer();
createPage();



createArticle();


}

