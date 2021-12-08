// import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";
import { CSSProperties } from "styled-components";
import Box from "../Box";
import Button from "../buttons/Button";
import Card, { CardProps } from "../Card";
import { Chip } from "../Chip";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import ProductIntro from "../products/ProductIntro";
import Rating from "../rating/Rating";
import { H3, SemiSpan } from "../Typography";
import { StyledProductCard1 } from "./ProductCardStyle";
import axios from "axios";
import Cookies from "js-cookie"
import useWindowSize from "@hook/useWindowSize";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import { BASE_URL } from "@component/Variables";
import { LazyLoadImage } from "react-lazy-load-image-component";
export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  off?: number;
  rating?: number;
  id?: string | number;
  is_favourite?:boolean,
  category_keyword?:string
  total?:string,
  shopName?:string,
  shopKeyword?:string
  // className?: string;
  // style?: CSSProperties;
  // imgUrl: string;
  // title: string;
  // price: number;
  // off: number;
  // rating?: number;
  // subcategories?: Array<{
  //   title: string;
  //   url: string;
  // }>;
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  title,
  price,
  off,
  rating,
  is_favourite,
  category_keyword,
  shopName,
  shopKeyword,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  let dispatch2 = useDispatch()
  let width = useWindowSize()
  const { state, dispatch } = useAppContext();
  const cartItem: CartItem = state.cart.cartList.find((item) => item.id === id);
  let user = useSelector((state:any)=>state.token.user)
  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);
  const [success,setsuccess] = useState(is_favourite)
  
  const handleAddCart = useCallback(
      (amount) => () => {
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
          data.append("keyword",id.toString())
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
            name: title,
            qty: amount,
            price,
            imgUrl,
            id,
            categoryKeyword:category_keyword,
          },
        });
       
      },
      []
  );

  const handleremoveCart = useCallback(
      (amount) => () => {
        const login = Cookies.get("isLoggedIn")
        if(login === "true"){
         if(amount===0){
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
          data.append("keyword",id.toString())
          axios({
            method:"POST",
            url:`${BASE_URL}/orders/delete-basket/${lang}`,
            headers:{
              "Authorization":`Bearer ${token}`
            },
            data:data
          })
         }
         else{
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
          data.append("keyword",id.toString())
          axios({
            method:"POST",
            url:`${BASE_URL}/orders/remove-basket/${lang}`,
            headers:{
              "Authorization":`Bearer ${token}`
            },
            data:data
          })
         }
        }
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            name: title,
            qty: amount,
            price,
            imgUrl,
            id,
            categoryKeyword:category_keyword
          },
        });
        
        
      },
      []
  );

  const handlewishlist = (id2)=>{
    const token2 = Cookies.get("token");
    const lang = Cookies.get("lang")
    const formData = new FormData();
    formData.append("keyword",id2)
    axios({
      method:"POST",
      url:`${BASE_URL}/flowers/set-favorites/${lang}`,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token2}`,
      },
      data:formData
    })
        .then((response)=>{
              if(response.data.errors){
                  setsuccess(success)
              }
              else{
                // let array = [{data:{favoritesCount:0}}]
                if(response?.data?.status === 1){
                  let array ={...user};
                  array.data.favoritesCount++;
                  dispatch2(fetch_user_info(array))
                  setsuccess(true)
                }
                else{
                  let array ={...user};
                  array.data.favoritesCount--;
                  dispatch2(fetch_user_info(array))
                  setsuccess(false)
                }


              }
        })
        .catch(error=>{
          console.log(error)
        })
  }
  return (
    <StyledProductCard1 {...props} className="shadow-none">
      <div className="image-holder">
        {!!off && (
          <Chip
            position="absolute"
            bg="primary.main"
            color="primary.text"
            fontSize="10px"
            fontWeight="600"
            p="5px 10px"
            top="10px"
            left="10px"
          >
            {off}%
            <FormattedMessage
              id="off(chegirma)"
              defaultMessage="Chegirma"
            />
          </Chip>
        )}

        <FlexBox  >
        <FlexBox className="extra-icons extra_icons2">
          {success
          ?
              <Icon className="favorite-icon" color="primary" variant="small" onClick={()=>handlewishlist(id)}>
                heart-filled
              </Icon>
          :
              <Icon className="favorite-icon outlined-icon" variant="small" onClick={()=>handlewishlist(id)}>
                heart
              </Icon>
          }
          </FlexBox>
          {/* <FlexBox className="extra-icons" >
            <Icon
              color="secondary"
              variant="small"
              mb="0.5rem"
              onClick={toggleDialog}
            >
              eye-alt
            </Icon>
          </FlexBox> */}
          


        </FlexBox>

        <Link href={`/${category_keyword}/${id}`}>
          <a>
            <LazyLoadImage
              src={imgUrl}
              alt={title}
              className="product_image2"
              style={{objectFit:"cover"}}
              visibleByDefault={false}
              threshold={-50}
              effect="blur"
              placeholderSrc=""
            />
          </a>
        </Link>
      </div>
      <div className="details detail_product_card1_style"  >
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/${category_keyword}/${id}`}>
              <a>
                <H3
                  className="title"
                  fontSize = {width < 650 ? "10px" : "13px"} 
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb="15px"
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>

            <Rating className="rating_productcard1_style"  value={rating || 0} outof={5} color="warn" readonly />

            <FlexBox alignItems="center" mt={width < 650 ? "0px" :"10px" }>
              <SemiSpan pr="0rem" fontWeight="600" style={{textTransform:"lowercase",whiteSpace:"nowrap"}} fontSize = {width < 650 ? "10px" : "large"} className="text-danger" >
                {price}
              </SemiSpan>
              {off && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>{price}</del>
                </SemiSpan>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
            width="30px"
            style={cartItem?.price?.toString().length > 10 && width < 350 ? {marginTop:"-15px"}:{}}
          >
            <Button
              className="cart_productcard1_style"
              variant="outlined"
              color="primary"
              padding="3px"
              size="none"
              width={width < 650 ? 20 : 30}
              height={width < 650 ? 20 : 30}
              borderColor="primary.light"
              onClick={handleAddCart((cartItem?.qty || 0) + 1)}
            >
              {!! cartItem?.qty 
                ? 
                  <AddIcon 
                      className="text-danger"
                      style=
                        {{
                          width:'15px',
                          height:"15px",
                        }}
                  />
                 
                : 
                  <AddShoppingCartIcon 
                    className="text-danger"
                    style=
                      {{
                        width:'15px',
                        height:"15px"
                      }}
                  /> 
              }
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <SemiSpan color="text.primary" fontWeight="600" fontSize={width < 650 ? "10px" : "14px"}>
                  {cartItem?.qty}
                </SemiSpan>
                <Button
                  style={{paddingBottom:"0px",paddingTop:"0px"}}
                  variant="outlined"
                  color="primary"
                  padding="3px"
                  size="none"
                  width={width < 650 ? 20 : 30}
                  borderColor="primary.light"
                  onClick={handleremoveCart(cartItem?.qty - 1)}
                >
                  <RemoveIcon className="text-danger" style={{width:'15px',height:"15px"}} />

                </Button>
              </Fragment>
            )}
        
          </FlexBox>
        </FlexBox>
      </div>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro
              open={open}
              rating={rating}
              imgUrl={[imgUrl]}
              title={title}
              price={price}
              id={id}
              categoryKeyword={category_keyword}
              shopName={shopName}
              shopKeyword={shopKeyword}
          />
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={toggleDialog}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal>
    </StyledProductCard1>
  );
};
// const handleCartAmountChange = useCallback(
  //     (amount) => () => {
  //       const login = Cookies.get("isLoggedIn")
  //       if(login === "true"){
  //         let lang
  //         let lang2 = Cookies.get("lang") || "uz"
  //         const token = Cookies.get("token")
  //         if(typeof lang2 === "undefined"){
  //           lang = lang2
  //         }
  //         else{
  //           lang = "uz"
  //         }
  //         const data = new FormData();
  //         data.append("keyword",id.toString())
  //         axios({
  //           method:"POST",
  //           url:"https://api.wolt.uz/api/v1/orders/add-basket/" + lang,
  //           headers:{
  //             "Authorization":`Bearer ${token}`
  //           },
  //           data:data
  //         })
  //       }
  //       dispatch({
  //         type: "CHANGE_CART_AMOUNT",
  //         payload: {
  //           name: title,
  //           qty: amount,
  //           price,
  //           imgUrl,
  //           id,
  //         },
  //       });
  //     },
  //     []
  // );
// ProductCard1.defaultProps = {
//   id: "324321",
//   title: "KSUS ROG Strix G15",
//   imgUrl: "/assets/images/products/macbook.png",
//   off: 50,
//   price: 450,
//   rating: 0,
// };

export default ProductCard1;
