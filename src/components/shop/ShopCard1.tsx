
import React from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan } from "../Typography";
import { ShopCard1Wrapper } from "./ShopCardStyle";
import Rating from "@component/rating/Rating";
import {useRouter} from "next/router";
import {FormattedMessage} from "react-intl"
export interface ShopCard1Props {
  name:string
  rating: number;
  address?: string;
  phone: string;
  logo: string;
  imgUrl: string;
  shopUrl: string;
  id:number,
  keyword:string
  background_image?:string

}

const ShopCard1: React.FC<ShopCard1Props> = ({
  name,
  phone,
  logo,
  rating,
  keyword,
  address,
  background_image
}) => {
  const router = useRouter()
  return (
    <ShopCard1Wrapper overflow="hidden" coverImgUrl={background_image||logo}   onClick={()=>router.push(`/shop/${keyword}/page/1`)}>
      <Box className="black-box" p="17px 30px 56px"  >
        <H3 fontWeight="600" mb="8px" style={{width:'370px',overflow:"hidden",textOverflow:"ellipsis",paddingRight:"50px"}}>
          {name}
        </H3>

        <Box mb="5px" >
          <Rating size="small" value={rating || 0} outof={5} color="warn" />
        </Box>

        <FlexBox mb="3px">
          {/*<Icon defaultcolor="currentColor" size="15px" mt="5px">*/}
          {/*  map-pin-2*/}
          {/*</Icon>*/}
          <SemiSpan style={{height: "40px", wordBreak:"break-all",overflowY:"hidden",textOverflow:"ellipsis"}} color="white" ml="0px">
              {address}
          </SemiSpan>
        </FlexBox>

        {phone ? 
        (
          <FlexBox>
            <Icon defaultcolor="currentColor" size="15px" mt="4px">
              phone_filled
            </Icon>
            <SemiSpan color="white" ml="7px">
              {phone}
            </SemiSpan><br/>
          </FlexBox>
        )
        :
        ""
      }
      </Box>

      <FlexBox pl="30px" pr="18px" justifyContent="space-between">
        <Avatar
          src={logo}
          alt={name}
          size={64}
          mt="-32px"
          border="4px solid"
          borderColor="gray.100"
        />

         <div style={{position:"relative"}}>
         <label  
            className="visit_shop_style"
          >
            <FormattedMessage 
              id="visit_Shop"
            />
          </label>
         </div>
          <a>
            <IconButton size="small" my="0.25rem">
              <Icon defaultcolor="auto">arrow-long-right</Icon>
            </IconButton>
          </a>
      </FlexBox>
    </ShopCard1Wrapper>
  );
};

export default ShopCard1;
