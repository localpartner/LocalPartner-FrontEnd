import { atom, selector } from "recoil";

export const cartList =  atom({
  key: 'cartList',
  default:[],
});

export const cartFetchData = selector({
    key : 'cartaddedData',
    get: ({get}) => {
      const cartD = get(cartList);
      const clength = cartD.length;
      const cartData = cartD;
      const total = cartD.reduce((prev , cur) => prev + (cur.productDetails[0].price * cur.quantity) , 0 ); 
      return {
        cartData,
        clength,
        total
      };
    },
})