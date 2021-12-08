import Box from "@component/Box";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";
import {useSelector} from "react-redux";

const Section2= () => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();
  const data = useSelector((state:any)=>state.new.category_product)
  const loading = useSelector((state:any) => state.new.category_loading)
  // window?.scrollY
  // useEffect(()=>{
  //   sety(window.scrollY)
  //   console.log(window.scrollY);
  // },[y])
  
  useEffect(() => {
    if (width < 500) setVisibleSlides(2 );
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);
  let left_button_style;
  let right_button_style;
  if(width < 650) {
    left_button_style = {
      marginLeft:'-20px',
    }
    right_button_style = {
      marginRight:'-20px',
    }
  }
  else{

  }
  return (
      <div>
        {loading ? "" : data?.map(category=>(
          category.flowers.length !==0 ?
              <div
                  className="mt-5 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0"
                  key={category.id}
                  id={category.keyword}
              >
                <CategorySectionCreator

                    iconName="light"
                    title={category.title}
                    seeMoreLink={`/${category.keyword}/page/1`}
                >
                  <Box
                      mb="0rem"
                  >
                    <Carousel
                      leftButtonStyle={left_button_style}
                      rightButtonStyle={right_button_style}
                      totalSlides={category.flowers.length }
                      visibleSlides={visibleSlides}
                    >
                      {category.flowers.map((item) => (
                          <Box
                              py="0rem"
                              key={item.keyword}
                          >
                            <ProductCard1
                                id={item.keyword}
                                category_keyword = {item.categoryKeyword}
                                imgUrl={item.image}
                                title={item.name}
                                rating={item.rating}
                                price={item.price}
                                key={item.keyword}
                                is_favourite={item.is_favorites}
                                shopName={item.shopName}
                                shopKeyword={item.shopKeyword}
                            />
                          </Box>
                      ))}
                    </Carousel>
                  </Box>
                </CategorySectionCreator>
              </div>
              :
              ""
        ))}

    </div>
  );
};

export default Section2;
