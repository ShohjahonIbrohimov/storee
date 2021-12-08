import React, {useState} from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import { H1, SemiSpan, Small } from "../Typography";
import { ShopIntroWrapper } from "./ShopStyle";
import {useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import Map_Shop from "@component/map_shop";
import Cookies from "js-cookie"
import axios from "axios";
import {FormattedMessage} from "react-intl";
import { BASE_URL } from "@component/Variables";
import SocialLinks from "@component/SocialLinks";
export interface ShopIntroCardProps {}

const ShopIntroCard: React.FC<ShopIntroCardProps> = () => {
  const data = useSelector((state:any)=>state.new.shop)
  let image_url = typeof data?.data?.background_image !== "undefined" ? data?.data?.background_image : data?.data?.logo
  const image = "url(" + image_url  + ")"
  // const facebook = typeof data.data.facebook !== "undefined" && data.data.facebook  ? "{name: 'facebook',url:" + data.data.facebook + "}" : ""
  // const instagram = typeof data.data.instagram !== "undefined" && data.data.instagram ? "{name: 'instagram',url:" + data.data.instagram + "}" : ""
  // const tiktok = typeof data.data.tiktok !== "undefined" && data.data.tiktok ? "{name: 'tiktok',url:" + data.data.tiktok + "}" : ""
  // const telegram = typeof data.data.telegram !== "undefined" && data.data.telegram ? "{name: 'telegram',url:" + data.data.telegram + "}" : ""
  // const socialLinks = [];
  // socialLinks.push(facebook)
  // socialLinks.push(instagram)
  // socialLinks.push(tiktok)
  // socialLinks.push(telegram)
  const [msg,setmsg] = useState(data?.data?.is_subscribes ? true  : false)
  let handlesubscribe = (id)=> {
    const token = Cookies.get("token")
    const data = new FormData()
    let lang = Cookies.get("lang")
    data.append("keyword",id)
      axios({
          method:"POST",
          url:`${BASE_URL}/shops/subscriber/${lang}`,
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${token}`,
          },
          data:data,
            })
          .then(response=>{
            console.log(response.data)
            if(response.data.errors){
              setmsg(false)
            }
            else{
              if(parseInt(response.data.status) !== 0){
                setmsg(true)
              }
              else{
                setmsg(false)
              }
            }
          })
  }
  const coordinate = data?.data?.coordinate_x !== null && data?.data?.coordinate_y !== null  ? [data?.data?.coordinate_x,data?.data?.coordinate_y] : []
  return (
   <div>
     <div className="row">
       <div
           className="col-md-4 d-none d-sm-none d-md-block d-lg-block d-xl-block"
       >
          <Map_Shop coordinate={coordinate}  />
          <br/>
       </div>
        <div className="col-md-8" style={{borderRadius:"25px"}}>
          <ShopIntroWrapper  pb="20px" overflow="hidden">
            <Box
                className="cover-image"
                style={{backgroundImage:image,}}
                height="280px"
            />

            <FlexBox
                mt="-64px"
                px="30px"
                flexWrap="wrap"
            >
              <Avatar
                  src={data?.data?.logo}
                  style={{objectFit:"cover",objectPosition:"center"}}
                  size={120}
                  mr="37px"
                  border="4px solid"
                  borderColor="gray.100"
              />

              <Box
                  className="description-holder"
                  flex="1 1 0"
                  height="210px"
              >
                <FlexBox
                    className="shop_name_container"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="3px"
                  
                >
                  <Box
                      borderRadius="4px"
                      p="4px 16px"
                      display="inline-block"
                      my="8px"
                      className="w-100 shop_name_shop"

                  >
                    <H1 fontWeight="600" ellipsis={true} id="shop_name"  >
                      {data?.data?.name}
                    </H1>
                  </Box>


                </FlexBox>

                <FlexBox
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"

                >

                  <Box className="shop_info">
                    <FlexBox alignItems="center" mb="14px" mt="0px">
                      <Rating color="warn" value={data?.data?.rating} outof={5} readonly />
                      <Small color="text.muted" pl="0.75rem" display="block">

                      </Small>
                    </FlexBox>
                    <FlexBox className="d-block d-sm-block d-md-none d-lg-none d-xl-none"  mt="10px" >
                      <SocialLinks
                          instagramUrl={data?.data?.instagram}
                          facebookUrl={data?.data?.facebook}
                          telegramUrl={data?.data?.telegram}
                          tiktokUrl={data?.data?.tiktok}
                      />
                    </FlexBox>
                    {/*<FlexBox color="text.muted" mb="8px" maxWidth="270px">*/}
                    {/*  <Icon defaultcolor="currentColor" size="15px" mt="5px">*/}
                    {/*    map-pin-2*/}
                    {/*  </Icon>*/}
                    {/*  <SemiSpan color="text.muted" ml="12px">*/}
                    {/*    845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark*/}
                    {/*  </SemiSpan>*/}
                    {/*</FlexBox>*/}
                    {data?.data?.address  ?
                    <FlexBox color="text.muted" mb="8px" className="w-0">
                      <Icon defaultcolor="currentColor" size="15px" mt="4px">
                        map-pin-2
                      </Icon>
                      <SemiSpan  color="text.muted" ml="12px" id="shop_address">
                        {data?.data?.address}
                      </SemiSpan>
                    </FlexBox>
                        :
                        ""
                    }
                   {data?.data?.userFio &&  
                   <FlexBox color="text.muted" mb="8px">
                      <Icon defaultcolor="currentColor" size="15px" mt="4px">
                        user_filled
                      </Icon>
                      <SemiSpan color="text.muted" ml="12px">
                        {data?.data?.userFio}
                      </SemiSpan>
                    </FlexBox> }

                    {data?.data?.phone 
                    ? 
                      (
                      <FlexBox color="text.muted" mb="0px">
                        <Icon defaultcolor="currentColor" size="15px" mt="4px">
                          phone_filled
                        </Icon>
                        <SemiSpan color="text.muted" ml="12px">
                          {data?.data?.phone}
                        </SemiSpan>
                      </FlexBox>
                    )
                    :
                    ""
                  }

                  </Box>

                  <div className="subscribe_shop_style" >
                    <Button variant="outlined" color="primary" my="12px"  onClick={()=>handlesubscribe(data?.data?.keyword)}>
                      {msg ? <FormattedMessage id="Subscribed" /> : <FormattedMessage id="Subscribe" />}
                    </Button>
                    <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block" >
                      <SocialLinks
                          instagramUrl={data?.data?.instagram}
                          facebookUrl={data?.data?.facebook}
                          telegramUrl={data?.data?.telegram}
                          tiktokUrl={data?.data?.tiktok}
                      />
                    </div>

                  </div>
                </FlexBox>
              </Box>
            </FlexBox>
          </ShopIntroWrapper>
        </div>
        <div className="col-md-4 d-block d-sm-block d-md-none d-lg-none d-xl-none mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0" >
          <Map_Shop coordinate={coordinate}  />
          <br/>
       </div>
     </div>
   </div>
  );
};



export default ShopIntroCard;
