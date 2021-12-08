import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Card from "../Card";
import FlexBox from "../FlexBox";
// import Grid from "../grid/Grid";
import { H3, H4 } from "../Typography";
import Carousel from "@component/carousel/Carousel";

export interface AvailableShopsProps {}

const AvailableShops: React.FC<AvailableShopsProps> = () => {
  const visibleSlides = 6;
  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">Also Available at</H3>
      <Carousel  totalSlides={9} visibleSlides={visibleSlides} >
        {shopList.map((item) => (
        // <Grid container spacing={8} style={{width:"500px"}}>
          <div key={item.name} >
            <Link href="/shop/53324">
              <a>
                <FlexBox
                  as={Card}
                  p="26px"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <Avatar src={item.imgUrl} />
                  <H4 mt="0.75rem" color="gray.800">
                    {item.name}
                  </H4>
                </FlexBox>
              </a>
            </Link>
          </div>
        // </Grid>
        ))}
      </Carousel>

    </Box>
  );
};

const shopList = [
  {
    name: "Tech Friend",
    imgUrl: "/assets/images/faces/propic.png",
  },
  {
    name: "Smart Shop",
    imgUrl: "/assets/images/faces/propic(1).png",
  },
  {
    name: "Gadget 360",
    imgUrl: "/assets/images/faces/propic(8).png",
  },
  {
    name: "Tech Friend",
    imgUrl: "/assets/images/faces/propic.png",
  },
  {
    name: "Smart Shop",
    imgUrl: "/assets/images/faces/propic(1).png",
  },
  {
    name: "Gadget 360",
    imgUrl: "/assets/images/faces/propic(8).png",
  },
  {
    name: "Tech Friend",
    imgUrl: "/assets/images/faces/propic.png",
  },
  {
    name: "Smart Shop",
    imgUrl: "/assets/images/faces/propic(1).png",
  },
  {
    name: "Gadget 360",
    imgUrl: "/assets/images/faces/propic(8).png",
  },
];

export default AvailableShops;
