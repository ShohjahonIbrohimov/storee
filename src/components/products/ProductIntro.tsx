
import { useAppContext } from "@context/app/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import { H1, H2, H3, H6, SemiSpan } from "../Typography";
import {useDispatch} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import CheckoutForm from "@component/checkout/CheckoutForm";
import get_current_product from "../../../Redux/Actions/get_current_product";
import {FlashOnSharp, ShoppingCart} from "@material-ui/icons";
import InnerImageZoom  from "react-inner-image-zoom"
import ProductDescription from "@component/products/ProductDescription";
import Cookies from "js-cookie"
import axios from "axios";
import { BASE_URL } from "@component/Variables";
import get_cart_products from "../../../Redux/Actions/get_cart_products";
import Currencies from "@component/Currencies";
export interface ProductIntroProps {
  imgUrl?: string[];
  title: string;
  price: number;
  id?: string | number;
  rating?:number,
  total?:string,
  className?:string,
  open?:boolean,
  keyword2?:string,
  categoryKeyword?:string,
  shopName?:string,
  shopKeyword?:string,
  deliveryTime?:string,
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price,
  id,
  rating,
  className,
  open,
  categoryKeyword,
  shopName,
  keyword2,
  shopKeyword,
  deliveryTime
}) => {
  let router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let lang2 = router.locale
  
  useEffect(() => {
    if(!modal){
      dispatch2(get_current_product(""))
    }
  }, [modal]);
  /*
    Cart Renewing
  */
    const { cartList } = state.cart;
    const handleCartAmountChange2 = (amount,product) =>  {
        console.log("Header")
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                ...product,
                qty: amount,
            },
        });
    }
    const handleCartAmountChange = (amount,product) =>  {
        console.log("Header")
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
    const handleremovecartMain = async () =>{
        try{
            if(Cookies.get("isLoggedIn") === true){
                await cartList.forEach((value)=>{handleCartAmountChange2(0,value)})
            }
        }
        catch{
            return;
        }
        const token = Cookies.get("token")
        let currency_text = typeof Cookies.get("currency_id") === "undefined" ? "" : `?currency=${Cookies.get("currency_id")}`
        if(Cookies.get("isLoggedIn") === "true"){
            await axios({
                method:"GET",
                url:`${BASE_URL}/orders/basket-list/${lang2}${currency_text}`,
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
                .then( async(response) =>{
                    await cartList.forEach((value)=>{handleCartAmountChange2(0,value)})
                    await dispatch2(get_cart_products(response.data));
                    try{
                        await response.data.products.map(product=>handleCartAmountChange(product.count,product))
                    }
                    catch{
                        return;
                    }
                })
                .catch(errors2=>{
                    console.log(errors2)
                })
        }
    }

    /*
      Cart Renewing
    */
  const routerId = router.query.id as string;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };
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
        .then(()=>{
          handleremovecartMain()
        })
      }
      else{
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            id,
            name: title,
            qty: amount,
            price,
            imgUrl:imgUrl[0],
            categoryKeyword:categoryKeyword
          },
        });
      }
      
    },
    []
);

const handleremoveCart = useCallback(
    (amount) => () => {
      const login = Cookies.get("isLoggedIn")
      if(login === "true"){
        if(amount===0){
         let lang
         
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
         .then(()=>handleremovecartMain())
        }
        else{
         const token = Cookies.get("token")
         const data = new FormData();
         data.append("keyword",id.toString())
         axios({
           method:"POST",
           url:`${BASE_URL}/orders/remove-basket/${lang2}`,
           headers:{
             "Authorization":`Bearer ${token}`
           },
           data:data
         })
         .then(()=>{
           handleremovecartMain()
         })
        }
       }
      else{
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: {
            name: title,
            qty: amount,
            price,
            imgUrl:imgUrl[0],
            id,
            categoryKeyword:categoryKeyword
          },
        });
      }
    },
    []
);

//   const handleCartAmountChange = useCallback(
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
//           url:`${BASE_URL}/orders/add-basket/${lang}`,
//           headers:{
//             "Authorization":`Bearer ${token}`
//           },
//           data:data
//         })
//       }
//       dispatch({
//         type: "CHANGE_CART_AMOUNT",
//         payload: {
//           id:id,
//           name: title,
//           qty: amount,
//           price:price,
//           imgUrl:imgUrl[0],
          
//           categoryKeyword:categoryKeyword
//         },
//       });
//     },
//     []
// );

  let dispatch2 = useDispatch()
  let {keyword} = router.query
  return (
    <Box overflow="hidden" >
      <Grid container  spacing={!open ? 10 : 4} className={!open ? "mr-0 pr-0 " : ""}  style={!open ? {padding:"0px"} : {padding:"20px"} } >
        <Grid item md={5} lg={5} xl={5} xs={12} style={{width:"fit-content"}}  alignItems="center" >
          <Box>
            <div >
              <FlexBox   justifyContent="center" mb="18px" >
                <div className={!open ? "product_image" :"product_image_main"}  style={!open ? {height:"420px",overflow:"hidden",width:"480px"}:{height:"280px",overflow:"hidden",width:"290px"}} >
                    <InnerImageZoom
                      zoomScale={!open ? 0.5 : 1.5}
                      style={!open ? {overflow:"hidden",width:"480px",objectFit:"cover",objectPosition:"center"}:{overflow:"hidden",width:"350px",objectFit:"cover",objectPosition:"center"}}
                      height={!open ? "450px" : "350px"}
                      alt={title}
                      src={imgUrl[selectedImage]}
                      zoomSrc={imgUrl[selectedImage]}
                      zoomType="hover"
                      zoomPreload={true}
                      fullscreenOnMobile={true}
                  />
                </div>
                {/*<LazyImage*/}

                {/*  quality={100}*/}
                {/*  src={}*/}
                {/*  alt={title}*/}
                {/*  height={300}*/}
                {/*  width={}*/}
                {/*  loading="eager"*/}
                {/*  objectFit="cover"*/}
                {/*/>*/}
              </FlexBox>
              <FlexBox  overflow="auto" className={!open ?  "product_image_slider mt-1" :"product_image_slider_main mt-1"} >
                {imgUrl.map((url, ind) => (
                  <Box
                    mb="7px"
                    size={70}
                    minWidth={70}

                    bg="white"
                    borderRadius="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    border="1px solid"
                    key={ind}
                    ml={ind === 0 && "auto"}
                    mr={ind === imgUrl.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "gray.400"
                    }

                    onMouseEnter={handleImageClick(ind)}
                  >
                    <Avatar src={url} borderRadius="10px"  />
                  </Box>
                ))}

              </FlexBox>
            </div>
          </Box>
        </Grid>

        <Grid className="padding-0" item lg={!open ? 7 : 4} xl={!open ? 7 : 4} md={!open ? 7 : 4} xs={12} >
          <H1
              mb="1rem"
          >
            {title}
          </H1>


          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>
              <FormattedMessage
                  id="rating"
                  defaultMessage="Rating"
              />:
            </SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={rating} outof={5} />
            </Box>
          </FlexBox>

          <Box mb="24px">
            <H2 style={{fontSize:"20px",whiteSpace:"nowrap"}} color="primary.main" mb="4px" lineHeight="1">
              {price}
            </H2>
          </Box>
          {!cartItem?.qty ? (
              <div className="mr-0 mr-sm-0 mr-md-2 mr-lg-2 mr-xl-2">
            <Button
              className="mt-2 add_to_cart_detail width-sm-100"
              color="success"
              variant="contained"
              size="small"
              mb="40px"
              style={{width:"327px"}}
              onClick={handleAddCart(1)}
            >
              <ShoppingCart/> <FormattedMessage
                id="add_to_cart"
                defaultMessage="Savatchaga qo'shish"
              />
            </Button>

              </div>
          ) : (
            <FlexBox alignItems="center" mb="10px" className="mr-2 plus_minus_container_detail" >
              <Button
                p="9px"
                outline={true}
                size="small"
                color="danger"
                onClick={handleremoveCart(cartItem.qty - 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>
              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>
              <Button
                p="9px"
                outline={true}
                size="small"
                color="danger"
                onClick={handleAddCart(cartItem?.qty + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}
          <div>
            <Button className="mt-2 width-sm-100 buy_now_detail" style={{width:"327px",marginBottom:"20px"}} color="danger" onClick={()=>{toggle();dispatch2(get_current_product(keyword))}}><FlashOnSharp/><FormattedMessage id="Buy Now" defaultMessage="Hoziroq sotib olish" /></Button>
            <div style={{width:"fit-content",marginBottom:"10px"}}><Currencies /></div>
            <Modal size="lg"   isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={()=>{toggle();}}><FormattedMessage id="Buy Now" defaultMessage="Hoziroq sotib olish" /></ModalHeader>
              <ModalBody >
                  <CheckoutForm deliveryTime = {deliveryTime} postcard_visible={true} />
              </ModalBody>
            </Modal>
          </div>

          <FlexBox alignItems="center" mb="1rem" >
            <SemiSpan className="whitespace-nowrap">
              <FormattedMessage
                  id="sold_by"
              />:</SemiSpan>
            <Link href={`/shop/${shopKeyword || keyword2}/page/1` }>
              <a>
                <H6 className="whitespace-nowrap" lineHeight="1" ml="8px">
                  {shopName}
                </H6>
              </a>
            </Link>
          </FlexBox>

          <br/>
          {!open ? <>

            <H2>
              <FormattedMessage id="description" />
            </H2>
            <hr className="details-hr-7 details-hr-sm-100 "/>
            <ProductDescription /></> : ""}
        </Grid>
      </Grid>
    </Box>
  );
};

ProductIntro.defaultProps = {
  imgUrl: [
    "/assets/images/products/headphone.png",
    "/assets/images/products/hiclipart.com (16).png",
    "/assets/images/products/hiclipart.com (18).png",
  ],
  title: "Mi Note 11 Pro",
  price: 1100,
};

export default ProductIntro;
