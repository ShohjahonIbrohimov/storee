import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
// import AvailableShops from "@component/products/AvailableShops";
// import FrequentlyBought from "@component/products/FrequentlyBought";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import { H5 } from "@component/Typography";
import React, { useState } from "react";
// import Button from "@component/buttons/Button";
// import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
// import Map20 from "../map2";
import ContactForm from "../../components/contact"
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import get_one_product_info from "../../../Redux/Actions/get_one_product_info";
import { BASE_URL } from "@component/Variables";

const ProductDetails = ({data,info}) => {
    const dispatch = useDispatch()
    dispatch(fetch_user_info(data))
    dispatch(get_one_product_info(info))
    // const [modal, setModal] = useState(false);
  //   const toggle = () =>
  // {
  //     setModal(!modal);
  // };
  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };

  return (
    <div>
      <ProductIntro rating={info.data.rating} shopName={info.data.shop_name} imgUrl={info.data.image.length !== 0 ? info.data.image : ["https://api.wolt.uz/storage/images/noimg.jpg",]}  title={info.data.name} price={info.data.price} id={info.data.id} />

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          mr="25px"
          p="4px 10px"
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
          borderBottom={selectedOption === "description" && "2px solid"}
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
        >
          Description
        </H5>
        <H5
          className="cursor-pointer"
          p="4px 10px"
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          borderColor="primary.main"
        >
          Review (3)
        </H5>
          <H5
          className="cursor-pointer"
          p="4px 10px"
          color={selectedOption === "contact" ? "primary.main" : "text.muted"}
          onClick={handleOptionClick("contact")}
          borderBottom={selectedOption === "contact" && "2px solid"}
          borderColor="primary.main"
        >
           Contact
        </H5>
      </FlexBox>



      <Box mb="50px">
        {selectedOption === "description" && <ProductDescription />}
        {selectedOption === "review" && <ProductReview/>}
        {selectedOption === "contact" && <ContactForm />}
      </Box>


      {/*<FrequentlyBought />*/}

      {/*<AvailableShops />*/}

        {info.smilarFlowers.length !== 0 ? <RelatedProducts /> : ""}
    </div>
  );
};

ProductDetails.layout = NavbarLayout;

ProductDetails.getInitialProps = async (ctx) =>{
    let {token} =  cookies(ctx)
    let {lang} =  cookies(ctx)
    let {id} = ctx.query
    let x
    if(lang){
        x = lang
    }
    else{
        x = "uz"
    }
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${x}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })

    const request3 = await axios({
        method: "GET",
        url: `${BASE_URL}/flowers/show/${id}/${x}`,
    })
    const answer = await request2.data;
    const answer2 = await request3.data;
    return {
        data:answer,
        info:answer2
    }
}

export default ProductDetails;
