import Carousel from "@component/carousel/Carousel";
import useWindowSize from "@hook/useWindowSize";
import React, { useEffect, useState } from "react";
import ProductCard6 from "../product-cards/ProductCard6";
import { useSelector } from "react-redux";
import {useRouter} from "next/router";
import Container from "@component/Container";
import Box from "@component/Box";

const Section3: React.FC = () => {
  const width = useWindowSize();
  let router= useRouter()
  const [visibleSlides, setVisibleSlides] = useState(12);
  useEffect(()=>{
    if(width < 650 )
    {
      setVisibleSlides(4)
    }
    else if(width< 835 && width  > 650){
      setVisibleSlides(5)
    }
    else{
      setVisibleSlides(8)
    }
  },[width])
  const categoryList2 = useSelector((state: any) => state.new.category)
  const loading = useSelector((state: any) => state.new.category_loading)
  let slides_count;
  if(loading){
    slides_count = 0
  }
  else{
    if(width < 650){

      slides_count = categoryList2.length 
    }
    else{

      slides_count = categoryList2.length 
    }
  }
  
  return (
    <>
        <div className="mt-4">
            {width < 650 
            ?
                 <div
                    className="carouselStyle"
                 >
                   <Carousel
                       rightButtonClass="ml-lg-2 "
                       leftButtonClass="ml-lg-2 "
                       showArrow={width<650 ? false : true}
                       totalSlides={slides_count}
                       visibleSlides={visibleSlides}
                   >
                     {loading && categoryList2.length !== 0 ?
                          ""
                         :
                           categoryList2.map(item => (
                            <div
                                 className="cursor-pointer2"
                                 onClick={()=>router.push(`/${item.keyword}/page/1`)}
                                 key={item}
                            >
                               <ProductCard6
                                   title={item.title}
                                   subtitle={item.keyword}
                                   imgUrl={item.icon_b}
                                   s_imgUrl={item.icon_s}
                               />
                            </div>
                           ))
                     }
                   </Carousel>
                 </div>

            :
              <div className="carousel_margin_top caroseul_creator_style" >
                   <div
                   >
                     <Box>
                     <Container>
                      <Carousel
                          leftButtonClass="ml-lg-2"
                          leftButtonStyle={{position:"absolute",top:"50px"}}
                          rightButtonStyle={{position:"absolute",top:"50px"}}
                          showArrow={width<650 ? false : true}
                          totalSlides={loading ?
                                0
                              :
                                categoryList2.length
                          }
                          visibleSlides={visibleSlides}
                      >
                        {loading && categoryList2.length !== 0  ?
                              ""
                            :
                              categoryList2.map(item => (
                                <div
                                    onClick={()=>router.push(`/${item.keyword}/page/1`)}
                                    key={item}
                                >
                                  <ProductCard6
                                      title={item.title}
                                      subtitle={item.keyword}
                                      imgUrl={item.icon_b}
                                      s_imgUrl={item.icon_s}

                                  />
                                </div>
                              ))
                        }
                      </Carousel>
                     </Container>
                     </Box>
                   </div>
              </div>

            }
        </div>
    </>
  );
};



export default Section3;
