import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import React, { useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import cookies from "next-cookies";
import {FormattedMessage, useIntl} from "react-intl";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {Step,ProgressBar} from "react-step-progress-bar"
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";

const OrderDetails = ({data,order_info}) => {
  let [o_info,setinfo] = useState(order_info)
  let intl = useIntl()
  console.log(o_info)
  let width = useWindowSize()
  let router = useRouter()
  const orderStatus = o_info?.order?.status-1
  let {id} = router.query
  let current_currency = useSelector((state:any)=>state.token.current_currency)
  let lang = useSelector((state:any)=>state.new.lang) || Cookies.get("lang");
  const breakpoint = 350;
  let dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  useEffect(()=>{
    let token = Cookies.get("token");
    let currency_id = Cookies.get("currency_id")
    let currency_text = typeof currency_id === "undefined" ? "" : `&currency=${currency_id}`
      axios({
        method:"GET",
        url:`${BASE_URL}/orders/order-details/${lang}?order_id=${id}${currency_text}`,
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      })
          .then(res=>{
            setinfo(res.data)
          })
          .catch(()=>null)
  },[Cookies.get("currency_id"),Cookies.get("lang"),current_currency,lang])
  return (
    <DashboardLayout>
      <NextSeo
       title={intl.formatMessage({id:"Order Details"})} 
      />
    <div>
      <DashboardPageHeader
        title={intl.formatMessage({id:"Order Details"})}
        iconName="bag_filled"
      />

      <Card p="2rem 1.5rem" mb="30px" >
        <div className="padding-y-30 margin_bottom_50">
          <ProgressBar percent={orderStatus*50} filledBackground="linear-gradient(to right, pink, red)">
          <Step>
            {({ accomplished }) => (
              <div className={`indexedStep `}>
                <div className={`indexedStep1 step1_order ${accomplished ? "accomplished" : ""}  `}>
                  <Icon size="32px" defaultcolor="currentColor">
                        package-box
                  </Icon>
                </div>
                <div className="order_status_text">
                {intl.formatMessage({id:"packaging"})}
                </div>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished }) => (
              <div className={`indexedStep`}>
              <div className={`indexedStep1  ${accomplished ? "accomplished" : ""}  `}>
                <Icon size="32px" defaultcolor="currentColor">
                      truck-1
                </Icon>
              </div>
              <div className="order_status_text">
              {intl.formatMessage({id:"delivering"})}
              </div>
            </div>
            )}
          </Step>
          <Step>
            {({ accomplished }) => (
              <div className={`indexedStep `}>
              <div className={`indexedStep1  ${accomplished ? "accomplished" : ""}  `}>
                <Icon size="32px" defaultcolor="currentColor">
                      delivery
                </Icon>
              </div>
              <div className="order_status_text" >
              {intl.formatMessage({id:"delivered"})}
              </div>
            </div>
            )}
          </Step>
        </ProgressBar>
        </div>
        {/* <FlexBox
          flexDirection={width < breakpoint ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mt="2rem"
          mb="3rem"
          mx={width < 650  ? "1rem" : "2rem"}
        >
          {stepIconList.map((item, ind) => {
            // let title_style2
            // if(ind===1 && width < 650){
            //   title_style2={
            //     position:"absolute",
            //     bottom:"-25px",
            //     whiteSpace:"nowrap",
            //     fontSize:"xx-small",
            //     textAlign:"center",
            //     left:"-20px"
            //   }
            // }
            // else if(ind===2 && width < 650){
            //   title_style2={
            //     position:"absolute",
            //     bottom:"-25px",
            //     whiteSpace:"nowrap",
            //     fontSize:"xx-small",
            //     textAlign:"center",
            //   }
            // }
            // else if(ind===0 && width < 650){
            //   title_style2={
            //     position:"absolute",
            //     bottom:"-25px",
            //     whiteSpace:"nowrap",
            //     fontSize:"xx-small",
            //     textAlign:"center",
            //     left:"-17px"
            //   }
            // }
            return(
            <Fragment key={item.name}  >
              <Box position="relative" >
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item.icon}
                  </Icon>
                </Avatar>
                <div style={title_style}>{item.name}</div>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}

            </Fragment>
          )})}
        
        </FlexBox> */}
        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="primary.light"
            color="primary.main"
            textAlign="center"
            style={{width:"350px"}}
          >
            <FormattedMessage id="estimated_delivery" />: <b>{o_info.order.delivery_time}</b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              {intl.formatMessage({id:"Order ID"})}:
            </Typography>
            <Typography fontSize="14px">{o_info.order.orderId}</Typography>
          </FlexBox>
        </TableRow>

        <Box py="0.5rem">
          {o_info.datas.map((item,ind) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.image} size={64} />
                <Box ml="20px">
                  <H6 my="0px">{item.productName}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    {item.price} {item.currencyName} x {item.count} = {item.totalPrice} {item.currencyName}
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">

                </Typography>
              </FlexBox>
              <FlexBox flex="160px" m="6px" alignItems="center">
                {/*<Button variant="text" color="primary">*/}
                {/*  <Typography fontSize="14px">Write a Review</Typography>*/}
                {/*</Button>*/}
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              <FormattedMessage id="address" />
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {o_info?.order?.address}
            </Paragraph>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              <FormattedMessage id="total_summary" />
            </H5>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                <FormattedMessage id="Subtotal"/>:
              </Typography>
              <H6 my="0px">{o_info?.order?.product_price} {o_info?.order?.currencyName}</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                <FormattedMessage id="delivery_price" />:
              </Typography>
              <H6 my="0px">{o_info.order.delivery_price} {o_info?.order?.currencyName}</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                <FormattedMessage id="Discount" />:
              </Typography>
              <H6 my="0px">{o_info.order.discount} {o_info?.order?.currencyName}</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px"><FormattedMessage id="Total" /></H6>
              <H6 my="0px">{o_info?.order?.total_price} {o_info?.order?.currencyName}</H6>
            </FlexBox>
            <Typography fontSize="14px">{o_info.order.statusName}</Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
    </DashboardLayout>
  );
};

OrderDetails.getInitialProps = async (ctx) =>{
  let {token,lang,currency_id} = await cookies(ctx);
  let currency_text = typeof currency_id === "undefined" ? "" : `&currency=${currency_id}`
  let {id} = await ctx.query
  let request1 = await axios({
    method:"GET",
    url:`${BASE_URL}/orders/order-details/${lang}?order_id=${id}${currency_text}`,
    headers:{
      "Authorization" : `Bearer ${token}`
    }
  })
  const request2_1 = await axios({
    method:"GET",
    url:`${BASE_URL}/profile/max-value/${lang}${currency_text}`,
    headers:{
      "Authorization":`Bearer ${token} `
    },
  })
  
  
  const answer_1 = await request2_1.data;
  let answer1 = await request1.data
  return {
    data:answer_1,
    order_info:answer1
  }
}
export default OrderDetails;
