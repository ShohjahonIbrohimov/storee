import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import { H5 } from "@component/Typography";
import React, {useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { fetch_user_info } from "../../../../Redux/Actions/Action";
import get_one_product_info from "../../../../Redux/Actions/get_one_product_info";
import {FormattedMessage} from "react-intl";
import Cookies from "js-cookie"
import {useRouter} from "next/router";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";


const ProductDetails = ({data,info}) => {
  let router = useRouter()
  let {keyword} = router.query
  let lang = Cookies.get("lang") || "uz"
  const dispatch = useDispatch()
  // let info = useSelector((state:any)=>state.new.one_product_info)
  useEffect(()=>{
    dispatch(fetch_user_info(data))
    dispatch(get_one_product_info(info))
    
  },[])
  let current_currency = useSelector((state:any)=>state.token.current_currency)

    useEffect(() => {
    let currency_id = Cookies.get("currency_id");
    let currency_text = typeof currency_id !== "undefined" ?  `?currency=${currency_id}` : ""
    let token  = Cookies.get("token")
         axios({
          method:"GET",
          url:`${BASE_URL}/flowers/show/${keyword}/${lang}${currency_text}`,
          headers:{
              "Authorization":`Bearer ${token}`
          }
      })
      .then(res=>{
        dispatch(get_one_product_info(res.data))
      })
      .catch(()=>{
        return;
      })
    }, [current_currency,Cookies.get("lang"),lang]);
  const [selectedOption, setSelectedOption] = useState("review");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };

  return (
    <NavbarLayout >
      <NextSeo
        title={info?.seo?.length !==0 && info?.seo ? info?.data?.name: ""} 
        description={info?.seo?.length !==0 && info?.seo ? info?.seo?.view_mdescription : ""} 
        additionalMetaTags={[{
          name: 'keyword',
          content: info?.seo?.length !==0 && info?.seo ? info?.seo?.view_mkeywords : ""
        }, ]}
         openGraph={{
               type:"product",
               images:[
                 {
                   url:info?.data?.image?.length !== 0 ? info?.data?.image[0] : "",
                   alt:info?.seo?.length !==0 && info?.seo ? info?.data?.name: ""
                 }
               ]
             }}
      />
      <div>
        <ProductIntro
            rating={info?.data.rating}
            shopName={info?.data.shop_name}
            imgUrl={info?.data?.image?.length !== 0 ?
                  info?.data?.image
                :
                  ["https://api.dana.uz/storage/images/noimg.jpg",]
            }
            title={info?.data.name}
            price={info?.data.price}
            id={info.data.keyword}
            keyword2={info.data.shop_keyword}
            categoryKeyword={info.data.categoryKeyword}
            deliveryTime = {info.data.shopDeliveryTime}
        />

        <FlexBox
          id="scroll_to_detail"
          borderBottom="1px solid"
          borderColor="gray.400"
          mt="20px"
          mb="26px"
        >
          {/*<H5*/}
          {/*  className="cursor-pointer"*/}
          {/*  mr="25px"*/}
          {/*  p="4px 10px"*/}
          {/*  color={*/}
          {/*    selectedOption === "description" ?*/}
          {/*            "primary.main"*/}
          {/*        :*/}
          {/*            "text.muted"*/}
          {/*  }*/}
          {/*  borderBottom={selectedOption === "description" && "2px solid"}*/}
          {/*  borderColor="primary.main"*/}
          {/*  onClick={handleOptionClick("description")}*/}
          {/*>*/}
          {/*   <FormattedMessage*/}
          {/*       id="description"*/}
          {/*       defaultMessage="Tavsif"*/}
          {/*   />*/}
          {/*</H5>*/}
          <H5
            className="cursor-pointer"
            p="4px 10px"
            color={selectedOption === "review" ? "primary.main" : "text.muted"}
            onClick={handleOptionClick("review")}
            borderBottom={selectedOption === "review" && "2px solid"}
            borderColor="primary.main"
          >
            <FormattedMessage id="Review" />
          </H5>
          {/*  <H5*/}
          {/*  className="cursor-pointer"*/}
          {/*  p="4px 10px"*/}
          {/*  color={selectedOption === "contact" ? "primary.main" : "text.muted"}*/}
          {/*  onClick={handleOptionClick("contact")}*/}
          {/*  borderBottom={selectedOption === "contact" && "2px solid"}*/}
          {/*  borderColor="primary.main"*/}
          {/*>*/}
          {/*  <FormattedMessage*/}
          {/*      id="contact"*/}
          {/*  />*/}
          {/*</H5>*/}
        </FlexBox>



        <Box mb="50px">
          {/*{selectedOption === "description" && <ProductDescription />}*/}
          {selectedOption === "review" && <ProductReview/>}
          {/*{selectedOption === "contact" && <ContactForm />}*/}
        </Box>

          {info?.smilarFlowers?.length !== 0 ? <RelatedProducts /> : ""}
      </div>
    </NavbarLayout>
  );
};


ProductDetails.getInitialProps = async (ctx) =>{
    let {token,currency_id} =  cookies(ctx)
    let {lang} =  cookies(ctx)
    let {keyword} = ctx.query
    let x
    if(lang){
        x = lang
    }
    else{
        x = "uz"
    }
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${x}` ,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })

    const request3 = await axios({
        method: "GET",
        url: `${BASE_URL}/flowers/show/${keyword}/${x}?currency=${currency_id}`,
    })
    const answer = await request2.data;
    const answer2 = await request3.data;
    return {
        data:answer,
        info:answer2
    }
}

export default ProductDetails;
