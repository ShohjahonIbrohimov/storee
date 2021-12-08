import axios from "axios";
import categoryfetch_success from "../Actions/CategoryFetching.js";
import Cookies from "js-cookie"
import fetch_language_list from "../Actions/fetch_language_list";
import get_company_info from "../Actions/get_company_info";
import get_cart_products from "../Actions/get_cart_products";
import get_cards2 from "../Actions/get_acceptable_payment_card";
import get_currencies_list from "../Actions/get_currencies_list";
import { BASE_URL } from "../../src/components/Variables";
const initialState = {
    lang:Cookies.get("lang") || "uz",
    coordinates:[],
    category:[],
    category_loading:true,
    shop:[],
    update_user_info:false,
    language_list:[],
    banner:null,
    shop_products:[],
    company_info:[],
    category_product:[],
    one_shop_products:[],
    one_product_info:[],
    cart_products:[],
    search_results:[],
    category_id:null,
    modal:false,
    footer:[],
    shops:[],
    CartIsChanged:false,
    CartLoadedFully:""
}


const languagereducer = (state = initialState,action)=>{
    switch (action.type){
       
        case "CHANGE_LANGUAGE":
            return {
                ...state,
                lang:action.payload
            }
        case "GET_COORDINATES":
            return  {
                ...state,
                coordinates: action.payload
            }
        case "GET_CATEGORY":
            return {
                ...state,
                category:action.payload,
                category_loading: false
            }
        case "GET_SHOP":
            return {
                ...state,
                shop: action.payload
            }
        case "UPDATE_USER_INFO":
            return {
                ...state,
                update_user_info: update_user_info ? false : true
            }
        case "FETCH_LANGUAGE_LIST":
            return {
                ...state,
                language_list: action.payload
            }
        case "GET_BANNER":
            return {
                ...state,
                banner: action.payload
            }
        case "GET_SHOP_PRODUCTS":
            return {
                ...state,
                shop_products: action.payload
            }
        case "GET_COMPANY_INFO":
            return {
                ...state,
                company_info: action.payload
            }
        case "GET_CATEGORY_PRODUCTS":
            return  {
                ...state,
                category_product: action.payload
            }
        case "GET_ONE_SHOP_PRODUCTS":
            return {
                ...state,
                one_shop_products: action.payload
            }
        case "GET_ONE_PRODUCT_INFO":
            return  {
                ...state,
                one_product_info: action.payload

            }
        case "GET_CART_PRODUCTS":
            return {
                ...state,
                cart_products: action.payload
            }
        case "GET_SEARCH_RESULTS":
            return {
                ...state,
                search_results: action.payload
            }
        case "GET_CATEGORY_ID":
            return {
                ...state,
                category_id:action.payload
            }
        case "CHANGE_MODAL_STATUS":
            return {
                ...state,
                modal: action.payload
            }
        case "GET_FOOTER_ACTIONS":
            return{
                ...state,
                footer:action.payload
            }
        case "GET_SHOP_LIST":
            return{
                ...state,
                shops:action.payload
            }
        case "CHANGE_CART":
            return{
                ...state,
                CartIsChanged:action.payload
            }
        case "CART_LOADED_FULLY":
            return {
                ...state,
                CartLoadedFully:action.payload
            }
        default:return state
    }
}


export const fetch_category_request = ()=>{
    return function (dispatch) {
        let lang
        const lang2 = Cookies.get("lang") || "uz";
        if(typeof lang2 !== "undefined"){
            lang= lang2
        }
        else{
            lang = "uz"
        }
        axios({
            method:"GET",
            url:`${BASE_URL}/flowers/main-category/list/${lang}`,
        })
            .then(response =>{
                dispatch(categoryfetch_success(response.data))
            })
            .catch(errors2=>{
                console.log(errors2)
            })
    }
}
export const fetch_language_request = ()=>{
    return function (dispatch) {
        let lang
        const lang2 = Cookies.get("lang") || "uz";
        if(typeof lang2 !== "undefined"){
            lang = lang2
        }
        else{
            lang = "uz"
        }
        axios({
            method:"GET",
            url:`${BASE_URL}/references/language/${lang}` ,
        })
            .then(response =>{
                dispatch(fetch_language_list(response.data))
            })
            .catch(errors2=>{
                console.log(errors2)
            })
    }
}
export const fetch_company_info= ()=>{
    return function (dispatch) {
        let lang
        const lang2 = Cookies.get("lang") || "uz";
        const token = Cookies.get("token")
        if(typeof lang2 !== "undefined"){
            lang = lang2
        }
        else{
            lang = "uz"
        }
        axios({
            method:"GET",
            url:`${BASE_URL}/references/about-company/${lang}`,
        })
            .then(response =>{
                console.log("About",response.data);
                dispatch(get_company_info(response.data[0]))
            })
            .catch(errors2=>{
                console.log(errors2)
            })
        axios({
            method:"GET",
            url:`${BASE_URL}/references/payment-image`,
        })
        .then(response =>{
            dispatch(get_cards2(response.data))
        })
        .catch(errors2=>{
            console.log(errors2)
        })

        axios.get(`${BASE_URL}/references/currency/${lang}`)
            .then(res=>{
                dispatch(get_currencies_list(res.data))
            })


       if(Cookies.get("isLoggedIn")==="true"){
           let currency = typeof Cookies.get("currency_id") === "undefined" ? "" :`?currency=${Cookies.get("currency_id")}`
           axios({
               method:"GET",
               url:`${BASE_URL}/orders/basket-list/${lang}${currency}`,
               headers:{
                   "Authorization":`Bearer ${token}`
               }
           })
               .then(response =>{
                   dispatch(get_cart_products(response.data))
               })
               .catch(()=>{
                   return;
               })
       }
    }
}

export default languagereducer;
