

export const initialState = {
    token: null,
    user:[],
    isLoading:true,
    error:"",
    isLoggedIn:false,
    open:false,
    current_language :"uz",
    one_shop_orders:[],
    personal_orders:[],
    order_id:null,
    cards2:[],
    currencies:[],
    current_currency:[],
    postcard_text:"",
    current_product:"",
    services:[]
}
export const TokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TOKEN":
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true
            }
        case "GET_USER_INFO":
            return {
                ...state,
                isLoading: false,
                user:action.payload
            }
        case "GET_USER_INFO_FAILURE":
            return{
                ...state,
                isLoading:false,
                error: action.error
            }
        case "OPEN_LOGIN":
            return {
                ...state,
                open: true
            }
        case "CLOSE_LOGIN":
            return {
                ...state,
                open: false
            }
        case "LOG_OUT":
            return {
                ...state,
                isLoggedIn: false
            }
        case "ONE_SHOP_ORDERS":
            return {
                ...state,
                one_shop_orders: action.payload
            }
        case "GET_PERSONAL_ORDERS":
            return  {
                ...state,
                personal_orders:action.payload
            }
        case "GET_ORDER_ID":
            return {
                ...state,
                order_id: action.payload
            }
        case "GET_CARDS2":
            return {
                ...state,
                cards2: action.payload
            }
        case "GET_CURRENCY_LIST":
            return {
                ...state,
                currencies: action.payload
            }
        case "GET_CURRENT_CURRENCY":
            return {
                ...state,
                current_currency: action.payload
            }
        case "GET_POSTCARD_TEXT":
            return {
                ...state,
                postcard_text: action.payload
            }
        case "GET_CURRENT_PRODUCT_KEYWORD":
            return {
                ...state,
                current_product: action.payload
            }
        case "GET_SERVICES":
            return {
                ...state,
                services: action.payload
            }

        default:
            return state;
    }
}


