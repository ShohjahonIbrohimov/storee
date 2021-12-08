// import productDatabase from "@data/product-database";
import React, {useEffect, useState} from "react";
import Box from "../Box";
import Carousel from "@component/carousel/Carousel";
import ProductCard1 from "../product-cards/ProductCard1";
import { H3 } from "../Typography";
import {useSelector} from "react-redux";
import useWindowSize from "@hook/useWindowSize";
import {FormattedMessage} from "react-intl";

export interface RelatedProductsProps {}

const RelatedProducts: React.FC<RelatedProductsProps> = () => {
  const info = useSelector((state:any)=>state.new.one_product_info)
  const width = useWindowSize()
  const [visibleSlides, setVisibleSlides] = useState(width < 650 ? 2 : 4);
    useEffect(() => {
        console.log(width)
        if (width < 650) setVisibleSlides(2);
        else if (width < 950) setVisibleSlides(3);
        else setVisibleSlides(4);
    }, [width]);
    let slides_count;
        if(width < 650){
            slides_count = info?.smilarFlowers?.length
        }
        else{
            slides_count = info?.smilarFlowers?.length
        }
  return (
    <Box mb="3.75rem">
      <H3 className="fw-bold" mb="1.5rem">
          <FormattedMessage
              id="related_product"
          />
      </H3>
      <Carousel showArrow={width<650 ? false : true}  totalSlides={slides_count} visibleSlides={visibleSlides} >
        {info?.smilarFlowers?.map((item,ind) => (
            <ProductCard1
                key={ind}
                id={item.keyword}
                imgUrl={item.image}
                title={item.name}
                price={item.price}
                rating={item.rating}
                is_favourite = {item.is_favorites}
                shopName={item.shopName}
                shopKeyword={item.shopKeyword}
                hoverEffect
            />
        ))}
      </Carousel>
    </Box>
  );
};

export default RelatedProducts;
