import Box from "@component/Box";
import Image from  "next/image"
import { useAppContext } from "@context/app/AppContext";
import Link from "next/link";
import React, {useCallback} from "react";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import { StyledProductCard7 } from "./ProductCardStyle";
import axios from "axios";
import Cookies from "js-cookie"
import useWindowSize from "@hook/useWindowSize";
import { BASE_URL } from "@component/Variables";
import {useDispatch} from "react-redux"
import change_cart from "../../../Redux/Actions/change_cart"
export interface ProductCard7Props {
  id:string | number;
  name: string;
  qty: number;
  price: string;
  imgUrl?: string;
  keyword?:string;
  totalPrice?:string;
  categoryKeyword:string,
  fetch_basket_list?:any,
  setloading?:any,
  setcartthings?:any,
  cart?:any,
}

const ProductCard7: React.FC<ProductCard7Props & SpaceProps> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  keyword,
  categoryKeyword,
  totalPrice,
  fetch_basket_list,
  setloading,
  setcartthings,
  cart,
  ...props
}) => {
  const { dispatch } = useAppContext();
  let dispatch2 = useDispatch()
  let width = useWindowSize();
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
              qty: amount,
              name:name,
              price:price,
              imgUrl:imgUrl,
              id:id,
              categoryKeyword:categoryKeyword
            },
          })
          dispatch2(change_cart(id+amount))
      },
      []
  );

  const handleremove_1 = useCallback(
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
              qty: amount,
              name:name,
              price:price,
              imgUrl:imgUrl,
              id:id,
              categoryKeyword:categoryKeyword
            },
          });
          dispatch2(change_cart(id+amount))
      },
      []
  );

  const handleremovefull = useCallback(
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
              qty: amount,
              name:name,
              price:price,
              imgUrl:imgUrl,
              id:id,
              categoryKeyword:categoryKeyword
            },
          });
          dispatch2(change_cart(id+amount))
          
      },
      []
  );


  return (
    <StyledProductCard7 {...props}>

      <div
          style={width < 650 ? {width:"100px",height:"100px"} : {width:"180px",height:"100px"}}
          className="mt-3 mt-sm-3 mt-md-0 mt-xl-0 mt-lg-0  ml-3 ml-sm-4 ml-md-0 ml-lg-0 ml-xl-0 shadow-none "
      >
        <Image
        quality={100}
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
        width={width <  650 ? 70 : 180}
        height={width <  650 ? 70 : 180 }
        objectFit="fill"
        alt={name}
        />
      </div>

      <FlexBox
        className="product-details shadow-none"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        <Link href={`${categoryKeyword}/${id}`}>
          <a>
            <Typography
              className="title"
              fontWeight="600"
              fontSize="18px"
              mb="0.5rem"
              mt="0px"
              pt="0px"
            >
              {name}
            </Typography>
          </a>
        </Link>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            padding="4px"
            ml="12px"
            size="small"
            onClick={handleremovefull(0)}
          >
            <Icon size="1.25rem">close</Icon>
          </IconButton>
        </Box>

        {width > 650 ?
          <FlexBox
          width="100%"
          justifyContent="space-between"
          alignItems="flex-end"
          >
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography className="whitespace-nowrap" color="gray.600" mr="0.5rem">
              {price} x {qty} = {totalPrice} 
            </Typography>
           
          </FlexBox>

          <FlexBox alignItems="center" justifyContent="end">
            <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                onClick={handleremove_1(qty - 1)}
                disabled={qty === 1}
            >
              <Icon variant="small">minus</Icon>
            </Button>
            <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
              {qty}
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                onClick={handleAddCart(qty + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
        </FlexBox>
        :
        <FlexBox
          alignItems="start"

        >
            <FlexBox flexWrap="wrap" alignItems="start" className="whitespace-nowrap"  >
            <Typography fontSize="12px" className="whitespace-break d-inline" color="gray.600" mr="0.5rem">
              {price} x {qty}
            </Typography>
            <Typography className="d-inline whitespace-nowrap" fontWeight={500}  color="primary.main" mr="1rem">
             {totalPrice}
            </Typography>
          </FlexBox>

          <FlexBox alignItems="center" justifyContent="start">
            <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                onClick={handleremove_1(qty - 1)}
                disabled={qty === 1}
            >
              <Icon variant="small">minus</Icon>
            </Button>
            <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
              {qty}
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                onClick={handleAddCart(qty + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
            </FlexBox>
        }
      </FlexBox>
    </StyledProductCard7>
  );
};

export default ProductCard7;
