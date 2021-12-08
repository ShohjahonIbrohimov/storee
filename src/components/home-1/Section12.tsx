import Card from "../Card";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import { H4, SemiSpan } from "../Typography";
import {useSelector} from "react-redux";
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component";
const Section12: React.FC = () => {
  let serviceList = useSelector((state:any)=>state.token.services);
  return (
    <Container mb="70px">

        <Grid
            container
            className="p-0 m-0 justify-content-between"
            spacing={2}

        >
        {serviceList?.map((item, ind) => (
          <Grid
              item
              lg={3}
              sm={6}
              xs={6}
              key={ind}
          >
            <FlexBox
              as={Card}
              flexDirection="column"
              alignItems="center"
              p="0rem"
              className="py-3"
              height="170px"
              borderRadius={8}
              boxShadow="border"
              hoverEffect
            >
              <FlexBox
                justifyContent="center"
                alignItems="center"
                borderRadius="300px"
                // bg="gray.200"
                size="64px"

              >
                <LazyLoadImage
                  src={item.icon_name}
                  alt={item?.title} 
                  width={28} 
                  height={28}
                  visibleByDefault={false}
                  threshold={-10}
                  effect="blur"
                  placeholderSrc=""
                />

              </FlexBox>
              <H4
                  mt="10px"
                  mb="15px"
                  fontSize="14px"
                  textAlign="center"
                  height="20px"
              >
                {item.title}
              </H4>
              <SemiSpan
                  className="p-0 m-0"
                  fontSize="12px"
                  textAlign="center"
              >
                {item.description}
              </SemiSpan>
            </FlexBox>
          </Grid>
        ))}
        </Grid>

    </Container>
  );
};



export default Section12;
