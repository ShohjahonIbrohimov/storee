import Box from "@component/Box";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ShopCard1 from "@component/shop/ShopCard1";
import Grid from "@component/grid/Grid";
import {useIntl} from "react-intl";

const Section2= ({shop_list}) => {
    const [visibleSlides, setVisibleSlides] = useState(3);
    const width = useWindowSize();
    let intl = useIntl()
    useEffect(() => {
        if (width < 500) setVisibleSlides(1);
        else if (width < 650) setVisibleSlides(2);
        else if (width < 950) setVisibleSlides(3);
        else setVisibleSlides(3);
    }, [width]);
    let left_button_style;
    let right_button_style;
    let shop_style
    if(width < 650) {
        left_button_style = {
        marginLeft:'-20px',
        marginTop:"-10px"
        }
        right_button_style = {
        marginRight:'-20px',
        marginTop:"-10px"
        }
        shop_style = {
            marginLeft:"40px"
        }
    }
    else{
        left_button_style = {

        }
    }
    return (
        <div>

                    <div
                        style={{textTransform:"capitalize"}}
                    >
                        <CategorySectionCreator
                            iconName="light"
                            title={intl.formatMessage({
                                id:"Shops"
                            })}
                            seeMoreLink="/shopList/page/1"
                        >
                            <Box
                                mt="-0.25rem"
                                mb="0rem"
                            >
                                <Carousel
                                    leftButtonStyle={left_button_style}
                                    rightButtonStyle={right_button_style}
                                    totalSlides={shop_list?.length}
                                    visibleSlides={visibleSlides}
                                    infinite={false}
                                    autoPlay={true}
                                    showArrow={true}
                                    spacing="15px"
                                    interval={4000}
                                >
                                    {shop_list.map((item, ind) => (
                                        <Grid
                                            item
                                            lg={12}
                                            sm={12}
                                            xs={12}
                                            key={ind}
                                            style={shop_style}
                                        >
                                            <ShopCard1 {...item} />
                                        </Grid>
                                    ))}
                                </Carousel>
                            </Box>
                        </CategorySectionCreator>
                    </div>


        </div>
    );
};

export default Section2;
