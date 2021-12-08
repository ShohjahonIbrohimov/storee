import Box from "@component/Box";
// import CarouselCard1 from "@component/carousel-cards/CarouselCard1";
import Carousel from "@component/carousel/Carousel";
import React, { Fragment } from "react";
import Typography from "@component/Typography";
// import {StyledCarouselCard1} from "@component/carousel-cards/CarouselCardStyle";
import {useSelector} from "react-redux";
import useWindowSize from "@hook/useWindowSize";
import {FormattedMessage} from "react-intl";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Section1: React.FC = () => {
  let router = useRouter()
  const banner = useSelector((state:any)=>state.new.banner)
  const width = useWindowSize()
  let carousel_style
  if(width<650){
    carousel_style={
      width:"100vw",
      height:'100%'
    }
  }
  else{
    carousel_style={
      width:"100vw",
      height:"100%"
    }
  }
  return (
    <Fragment>

      <Box bg="gray.white"  mt="6px">

          <Carousel
            totalSlides={banner?.length || 0}
            visibleSlides={1}
            infinite={true}
            autoPlay={true}
            showDots={true}
            showArrow={false}
            spacing="0px"
            interval={4000}
            dotGroupMarginTop="-30px"
          >
            {banner?.map(banners=>
            (
                <div
                    key={banners?.id}
                    style={{position:"relative"}}
                >

                  <div  style={carousel_style}>
                  <LazyLoadImage
                   style={{width:"100%",height:"auto",objectFit:"cover",objectPosition:"center"}}
                   src={width < 650 ? banners.img_s : banners.img}
                   alt={banners.title}
                    className="category_image"
                    visibleByDefault={false}
                    threshold={0}
                    effect="blur"
                    placeholderSrc=""
                  />
                    {/* <img
                        style={{width:"100%",height:"auto",objectFit:"cover",objectPosition:"center"}}
                        src={width < 650 ? banners.img_s : banners.img}
                        alt={banners.title}
                    /> */}
                  </div>

                  <div

                      className="mt-1"
                      style={width < 750 ? {
                          position:"absolute",
                          top:"10%",
                          left:"10%",
                          color:banners.text_color || "red",
                          fontSize:"small"
                         }:
                          {
                          position:"absolute",
                          top:"10%",
                          left:"10%",
                          color:banners.text_color || "red",
                          }}
                  >
                    <h2
                        style={width<750 ? {position:"absolute",top:"4px",width:"90vw"}:{position:"absolute",top:"-20px",marginTop:"40px",width:"90vw"}}
                        className="title fs-sm-6  banner_title"
                    >
                        {banners.title}
                    </h2>
                    <Typography
                        style={width < 750 ?  {width:"90vw",fontSize:"12px",position:"absolute",top:"23px"} :{position:"absolute",top:"70px",width:"90vw"} }
                        mb="0.35rem"
                    >
                        {banners.description}
                    </Typography>
                    <button
                        onClick={()=>router.push(banners.url)}
                        className="btn btn-banner px-0"
                        style={width < 750 ?
                            {
                              backgroundColor:banners.button_color || "red",
                              color:banners.text_color || "red",
                              position:"absolute",
                              width:"100px",
                              paddingTop:"2px",
                              paddingBottom:"2px",
                              paddingLeft:"0px",
                              paddingRight:"0px",
                              fontSize:"12px",
                              top:"45px"
                            }
                            :
                            {
                              backgroundColor:banners.button_color || "red",
                              color:banners.text_color || "red",
                              position:"absolute",
                              top:"100px",
                              width:"160px"
                            }
                        }
                    >
                      <FormattedMessage
                          id="banner_button"
                          defaultMessage="Visit Collection"
                      />
                    </button>
                  </div>
                </div>
            )
          )}
          </Carousel>

      </Box>
    </Fragment>
  );
};

export default Section1;
