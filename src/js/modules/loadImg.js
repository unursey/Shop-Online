import { urlPic } from "./service.js";

export const loadImg = (img, src) => {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error("Error!"));  
      img.src = `${urlPic}image/error.jpg`;
          
    };
    //img.src = src;
  });
};
