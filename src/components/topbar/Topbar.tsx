import React, { useEffect, useState} from 'react';
import Container from '../Container';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
import Image from '../Image';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import NavLink from '../nav-link/NavLink';
import { Small } from '../Typography';
import StyledTopbar from './Topbar.style';
import { useDispatch, useSelector } from "react-redux";
import change_lang from "../../../Redux/Actions/LanguageAction"
import Cookies from "js-cookie"
import axios from "axios";
import categoryfetch_success from "../../../Redux/Actions/CategoryFetching";
import {useRouter} from "next/router";
import Link from "next/link"
import {FormattedMessage} from "react-intl";
import get_current_currency from "../../../Redux/Actions/get_current_currency";
import get_cart_products from "../../../Redux/Actions/get_cart_products";
import {useAppContext} from "@context/app/AppContext";
import get_footer_sections from '../../../Redux/Actions/get_footer_sections';
import { BASE_URL } from '@component/Variables';
import { LazyLoadImage } from "react-lazy-load-image-component";
import cart_loaded_fully from '../../../Redux/Actions/cart_stated_loaded_fully';
import get_currencies_list from "../../../Redux/Actions/get_currencies_list";
const Topbar: React.FC = () => {
  const router = useRouter()
  let currencies = useSelector((state:any)=>state.token.currencies)
  const info = useSelector((state:any)=>state.new.company_info)
  let languageList = useSelector((state: any) => state.new.language_list)
  let chosen_currency = currencies.filter(currency2=>currency2.id=== parseInt(Cookies.get("currency_id")))
  let [currency,setcurrency] = useState(chosen_currency.length !== 0 ? chosen_currency[0] : currencies.filter(currency=>currency.code === "UZS")[0])
  const dispatch2 = useDispatch()
  let current_language = useSelector((state:any)=>state.token.current_language)
  let current_currency = useSelector((state:any)=>state.token.current_currency)
  let footer = useSelector((state:any)=>state.new.footer)
  let loaded_cart = useSelector((state:any)=>state.new.CartLoadedFully)
  let header = footer.header
  useEffect(() => {
        let chosen_currency = currencies.filter(currency2=>currency2.id=== parseInt(Cookies.get("currency_id")))
        console.log(chosen_currency);
        
        setcurrency(chosen_currency.length !== 0 ? chosen_currency[0] : currencies.filter(currency=>currency.code === "UZS")[0])
        dispatch2(get_current_currency(currency))
        Cookies.remove("currency_name")
        Cookies.set("currency_name",currency?.name,{expires:1})
  }, [currency,Cookies.get("currency_id"),loaded_cart,currencies]);

  const handleCurrencyClick = (item) =>{
    setcurrency(item)
    dispatch2(get_current_currency(item))
    Cookies.remove("currency_id")
    Cookies.set("currency_id",item.id,{expires:30})
    router.push(router.asPath)
  }
  let x = languageList.filter(lang=>lang.code === router.locale ? lang :"")
  const [language, setLanguage] = useState(x.length !== 0 ? x[0] : languageList[0]);
  useEffect(()=>{
      x = languageList.filter(lang=>lang.code === router.locale ? lang :"")
      setLanguage(x.length !== 0 ? x[0] : languageList[0])
      console.log("Language",language)
  },[languageList])


  const handleLanguageClick = (lang, item) => () => {
    setLanguage(item);
    dispatch2(change_lang(lang))
    Cookies.remove("lang")
    Cookies.set("lang", lang, { expires: 7 })
    
  };
  Cookies.remove("lang")
  Cookies.set("lang",`${router.locale}`,{expires:1})
  const lang = router.locale
  useEffect(()=>{
  /*
    * Currencies List
  */
  axios.get(`${BASE_URL}/references/currency/${lang}`)
      .then(res=>{
          dispatch2(get_currencies_list(res.data))
      })
  /*
        * Category Products List
  */
    axios({
      method:"GET",
      url:`${BASE_URL}/flowers/main-category/list/${lang}`,
    })
        .then(response =>{
          dispatch2(categoryfetch_success(response.data))
        })
        .catch(()=>{
          return;
        })
    axios({
      method:"GET",
      url:`${BASE_URL}/references/helps/list/${lang}`,
    })
    .then((res)=>{
      dispatch2(get_footer_sections(res.data))
    })
    .catch(()=>null)
  },[Cookies.get("lang"),current_language])

    useEffect(() => {
        let token = Cookies.get("token");
        let currency = typeof Cookies.get("currency_id") === "undefined" ? "" :`?currency=${Cookies.get("currency_id")}`
        if(Cookies.get("isLoggedIn")==="true") {
            axios({
                method: "GET",
                url: `${BASE_URL}/orders/basket-list/${lang}${currency}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    dispatch2(get_cart_products(response.data));
                    dispatch2(cart_loaded_fully(!loaded_cart))

                    handleCart(response);
                })
                .catch(() => {
                    return;
                })
        }
        else{
            axios({
              method:"POST",
              url:`${BASE_URL}/....`,
              data:cartList
            })
            .then((res)=>{
              dispatch2(get_cart_products(res.data))
              dispatch2(cart_loaded_fully(!loaded_cart))
            })
            .catch(()=>null)
        }
        
    }, [currency,current_currency]);


  //handle Cart when currency Change

    const { state, dispatch } = useAppContext();
    const { cartList } = state.cart;
    const handleCartAmountChange2 = (amount,product) =>  {
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                ...product,
                qty: amount,
            },
        });
    }
     const handleCartAmountChange = (amount,product) =>  {
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                ...product,
                imgUrl:product.image,
                id:product.keyword,
                qty: amount,
            },
        });
    }

    let handleCart = (response)=>{
        try{
            cartList.forEach(product=>handleCartAmountChange2(0,product))
            response.data.products.map(product=>handleCartAmountChange(product.count,product))
        }
        catch{
            return;
        }
    }
  return (
    <StyledTopbar style={{ zIndex: 100000000000000000 }}>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <div className="logo">
            <Link href="/">
                <LazyLoadImage 
                  src={info.logo} 
                  height={40} 
                  alt="dana.uz" 
                  visibleByDefault={false}
                  threshold={0}
                  effect="blur"
                  placeholderSrc=""
                />
            </Link>
          </div>
          <FlexBox alignItems="center">
            <Icon size="14px" >phone-call</Icon>
            <span>{info.phone}</span>
          </FlexBox>
          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>{info.email}</span>
          </FlexBox>
          {header?.map(one=>{
            return <FlexBox alignItems="center" ml="20px" key={one.id}>
            <NavLink className="link" color="white" href={one.type === 3 ?  `/faq` : `/company/${one.keyword}`}>
                {one.name}
           </NavLink>
         </FlexBox>
          })}
          
          
          
          
        </FlexBox>
        <FlexBox className="topbar-right" alignItems="center">
          {/* <FlexBox alignItems="center" className="d-block d-md-none d-lg-none d-xl-none"  ml="5px" >
             <div className="link " onClick={()=>dispatch2(change_modal_status(!modal))}>
               <FormattedMessage id="order_status" />
            </div>
          </FlexBox> */}
          <NavLink className="link" href="/help">
             <FormattedMessage id="need_help" defaultMessage="Yordam Kerakmi?" />
          </NavLink>
        
          <Menu
            direction="right"
            className="ml-0 pl-0"
            handler={
              <FlexBox
                className="dropdown-handler mr-1"
                alignItems="center"
                height="40px"
              >
                <Icon size="0.7rem">{currency?.code}</Icon>
                <Small fontWeight="600" className="fs-small p-0">{currency?.code}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
          {currencies.map((item) => (
            <MenuItem key={item} onClick={()=>handleCurrencyClick(item)}>
             <Icon size="0.8rem">{item?.code}</Icon>
              <Small className="ml-1" fontWeight="600"> {item.code}</Small>
            </MenuItem>
          ))}
          </Menu>
          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
                mr="0.25rem"
              >
                {language !== undefined
                  ?
                    <>
                      <Image width="14px" height="14px" src={language.image} alt={language.code} />
                      <Small fontWeight="600" className="fs-small" style={{textTransform:"uppercase"}}>{language.code}</Small>
                    </>
                  :
                    ""
                }
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {languageList.map((item) => (
             <Link href={router.asPath} locale={item.code} key={item.title} ><MenuItem onClick={handleLanguageClick(item.code, item)}>
                <Image
                  src={item.image}
                  borderRadius="2px"
                  mr="0.5rem"
                  width="22"
                  height="22"
                  alt={item.code}
                />
                <Small fontWeight="600">{item.local}</Small>
              </MenuItem></Link>
            ))}
          </Menu>

        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};



export default Topbar;
