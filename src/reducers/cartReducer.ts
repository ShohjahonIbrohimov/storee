const CHANGE_CART_AMOUNT = "CHANGE_CART_AMOUNT";
import Cookies from "js-cookie"
let isLoggedIn = Cookies.get("IsLoggedIn")
export const cartInitialState = {
  cartList: [],
};

export type CartItem = {
  id: string | number;
  name: string;
  qty: number ;
  price: any;
  imgUrl?: string;
  categoryKeyword:string,
  totalPrice?:any,
};

export type cartStateType = {
  cartList: CartItem[];
};

export type cartActionType = {
  type: typeof CHANGE_CART_AMOUNT;
  payload: CartItem;
};

export const cartReducer: React.Reducer<cartStateType, cartActionType> = (
  state: cartStateType,
  action: cartActionType
) => {
  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state.cartList;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);
      
      if (cartItem.qty < 1)
        return {
          cartList: cartList.filter((item) => item.id !== cartItem.id),
        };
      else if (exist){
        if(isLoggedIn === "true"){
          return {
            cartList: cartList.map((item) => {
              if (item.id === cartItem.id) return { ...item, qty: cartItem.qty};
              else return item;
            }),
          }
        }
        else{
          return {
            cartList: cartList.map((item) => {
              if (item.id === cartItem.id) return { ...item, qty: cartItem.qty};
              else return item;
            }),
          }
        }
      }
      else
        return {
          cartList: [...cartList, cartItem],
        };

    default: {
    }
  }
};

