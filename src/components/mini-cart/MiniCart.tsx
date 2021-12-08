import Avatar from "@component/avatar/Avatar";
import FlexBox from "@component/FlexBox";
import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import Link from "next/link";
import React, {Fragment, useCallback} from "react";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Icon from "../icon/Icon";
import Typography, { H5, Paragraph, Tiny } from "../Typography";
import { StyledMiniCart } from "./MiniCartStyle";
import Cookies from "js-cookie"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import change_modal_status from "../../../Redux/Actions/change_modal_status";
import { BASE_URL } from "@component/Variables";
import CurrencyFormatter from "@component/CurrencyFormatter";
type MiniCartProps = {
  toggleSidenav?: () => void;
  mobile?:boolean
};

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav ,mobile}) => {
  const { state, dispatch } = useAppContext();
  const { cartList } = state.cart
  let dispatch2 = useDispatch()
  let modal = useSelector((state:any)=>state.new.modal)
  let current_currency = useSelector((state:any)=>state.token.current_currency)
  const getTotalPrice = () => {
    return (
        cartList.reduce(
            (accumulator, item) => accumulator + Number.parseFloat(item.price.replace(/ /g,"")) * item.qty,
            0
        ) || 0
    );
};


  const handleAddCart = useCallback(
    (amount,product) => () => {
      const login = Cookies.get("isLoggedIn")
      if(login === "true"){
        let lang
        let lang2 = Cookies.get("lang") || "uz"
        const token = Cookies.get("token")
        if(typeof lang2 === "undefined"){
          lang = lang2
        }
        else{
          lang = "uz"
        }
        const data = new FormData();
        data.append("keyword",product.id.toString())
        axios({
          method:"POST",
          url:`${BASE_URL}/orders/add-basket/${lang}`,
          headers:{
            "Authorization":`Bearer ${token}`
          },
          data:data
        })
      }
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            ...product,
            id:product.id,
            imgUrl:product.image,
            qty: amount,
        },
        });
    },
    []
);

const handleremove_1 = useCallback(
    (amount,product) => () => {
      const login = Cookies.get("isLoggedIn")
      if(login === "true"){
        let lang
        let lang2 = Cookies.get("lang") || "uz"
        const token = Cookies.get("token")
        if(typeof lang2 === "undefined"){
          lang = lang2
        }
        else{
          lang = "uz"
        }
        const data = new FormData();
        data.append("keyword",product.id.toString())
        axios({
          method:"POST",
          url:`${BASE_URL}/orders/remove-basket/${lang}`,
          headers:{
            "Authorization":`Bearer ${token}`
          },
          data:data
        })
      }
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            id:product.id,
            name:product.name,
            price:product.price,
            imgUrl:product.image,
            qty: amount,
            categoryKeyword:product.categoryKeyword,
          },
        });
    },
    []
);

  const handleremovefull = useCallback(
      (amount, product) => () => {
        const login = Cookies.get("isLoggedIn")
        if(login === "true"){
          let lang
          let lang2 = Cookies.get("lang") || "uz"
          const token = Cookies.get("token")
          if(typeof lang2 === "undefined"){
            lang = lang2
          }
          else{
            lang = "uz"
          }
          const data = new FormData();
          data.append("keyword",product.id.toString())
          axios({
            method:"POST",
            url:`${BASE_URL}/orders/delete-basket/${lang}`,
            headers:{
              "Authorization":`Bearer ${token}`
            },
            data:data
          })
        }
          dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
              ...product,
              qty: amount,
            },
          });
      },
      []
  );

  return (
      <StyledMiniCart style={mobile ? {height:"fit-content"} : {height:"100vh"}} >
        <div className={`cart-list ${mobile && cartList?.length ? `h-50vh-scroll` : `w-100`}`} >
          <FlexBox alignItems="center" m="0px 20px" height="74px">
            <Icon size="1.75rem">cart</Icon>
            <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
              {cartList?.length} <FormattedMessage id="item" defaultMessage="ta" />
            </Typography>
          </FlexBox>

          <Divider/>

          {!!!cartList?.length && (
            <>
              <FlexBox
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height={mobile ? "50vh" :"calc(100% - 180px)"  }
              >
                <LazyImage
                    quality={100}
                    src="/assets/images/logos/shopping-bag.svg"
                    width="90px"
                    height="100%"
                />
                <Paragraph
                    mt="1rem"
                    color="text.muted"
                    textAlign="center"
                    maxWidth="200px"
                >
                  <FormattedMessage id="empty_cart" />
              
                </Paragraph>
               
              </FlexBox>
              <Fragment  >
              <Button
                  variant="contained"
                  className="mb-5 w-95"
                  color="primary"
                  m="1rem  0.75rem"
                  onClick={()=>dispatch2(change_modal_status(!modal))}
              >
                <Typography fontWeight={600}>
                  <FormattedMessage id="order_status" defaultMessage="Buyurtma xolati" /> 
                </Typography>
              </Button>
              </Fragment>
              </>   
          )}
          <div >
            {cartList.map((item: CartItem) => (
                <Fragment key={item.id}>
                  <div className="cart-item">
                    <FlexBox alignItems="center" flexDirection="column">
                      <Button
                          variant="outlined"
                          color="primary"
                          padding="5px"
                          size="none"
                          borderColor="primary.light"
                          borderRadius="300px"
                          onClick={handleAddCart(item.qty + 1,item)}
                      >
                        <Icon variant="small">plus</Icon>
                      </Button>
                      <Typography fontWeight={600} fontSize="15px" my="3px">
                        {item?.qty}
                      </Typography>
                      <Button
                          variant="outlined"
                          color="primary"
                          padding="5px"
                          size="none"
                          borderColor="primary.light"
                          borderRadius="300px"
                          onClick={handleremove_1(item.qty - 1, item)}
                          disabled={item.qty === 1}
                      >
                        <Icon variant="small">minus</Icon>
                      </Button>
                    </FlexBox>

                    <Link href={`${item.categoryKeyword}/${item.id}`}>
                      <a>
                        <Avatar
                            src={item.imgUrl || "/assets/images/products/iphone-x.png"}
                            mx="1rem"
                            alt={item?.name}
                            size={76}
                        />
                      </a>
                    </Link>

                    <div className="product-details">
                      <Link href={`${item.categoryKeyword}/${item.id}`}>
                        <a>
                          <H5 className="title py-1" fontSize="14px">
                            {item?.name}
                          </H5>
                        </a>
                      </Link>
                      <Tiny color="text.muted">
                        {item?.price} x {item?.qty} = <label className="fw-bolder">{CurrencyFormatter(item.qty * parseFloat(item.price.replace(/ /g,""))) +  " " + current_currency?.name}</label>
                      </Tiny>
                    
                    </div>

                    <Icon
                        className="clear-icon"
                        size="1rem"
                        ml="1.25rem"
                        onClick={handleremovefull(0, item)}
                    >
                      close
                    </Icon>
                  </div>
                  <Divider/>
                </Fragment>
            ))}
          </div>
        </div>

        {!!cartList.length && (

              <Fragment>
              <Link href="/cart">
                <Button
                    variant="contained"
                    className="mb-0"
                    color="primary"
                    m="1rem 1rem 0.75rem"
                    onClick={toggleSidenav}
                >
                  <Typography fontWeight={600} >
                    <FormattedMessage 
                      id="Checkout Now"
                      defaultMessage="Hoziroq sotib olish"
                    /> ({CurrencyFormatter(getTotalPrice())  +  " " + current_currency?.name})
                  </Typography>
                </Button>
              </Link>
              
              <Button
                  variant="contained"
                  className="mb-5"
                  color="primary"
                  m="1rem 1rem 0.75rem"
                  onClick={()=>dispatch2(change_modal_status(!modal))}
              >
                <Typography fontWeight={600} >
                  <FormattedMessage id="order_status" defaultMessage="Buyurtma xolati" /> 
                </Typography>
              </Button>
          
              {/*<Link  href="/cart">*/}
              {/*  <Button*/}
              {/*      className="mb-5"*/}
              {/*      color="primary"*/}
              {/*      variant="outlined"*/}
              {/*      m="0px 1rem 0.75rem"*/}
              {/*      onClick={toggleSidenav}*/}
              {/*  >*/}
              {/*    <Typography fontWeight={600}>View Cart</Typography>*/}
              {/*  </Button>*/}
              {/*</Link>*/}
            </Fragment>

        )}
      </StyledMiniCart>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};

export default MiniCart;
