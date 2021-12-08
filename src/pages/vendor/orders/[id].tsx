import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import TableRow from "@component/TableRow";
import Typography, { H6 } from "@component/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import Cookies from "js-cookie"
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import Loading from "@component/Loading";
import { NextSeo } from "next-seo";
const OrderDetails = ({data,order_info,statuses2}) => {
  const router = useRouter();
  let [loading,setloading] = useState(true)
  let lang =router.locale
  let intl = useIntl()
  const { id } = router.query;
  const data2 = data
  let [statuses,setstatuses] = useState(statuses2)
  const [info,setinfo] = useState(order_info)
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  useEffect(() => {
        let token = Cookies.get("token");
        
        let currency_id = Cookies.get("currency_id");
        let currency_text = typeof currency_id !== "undefined" ? `?currency=${currency_id}` : ""
        axios({
          method: "GET",
          url: `${BASE_URL}/shops/orders-products/${data.data?.is_shops ? data.data?.is_shops : ""}/${id}/${lang}${currency_text}`,
          headers: {
            "Authorization": `Bearer ${token} `
          },
        })
            .then(res=>{
              console.log(res);
              setinfo(res.data)
              setloading(false)
            })
            .catch(()=>null)
        axios({
          method: "GET",
          url: `${BASE_URL}/orders/status-list/${lang}`,
        })
            .then(res=>{
                setstatuses(res.data)
            })
            .catch(()=>null)
  }, [Cookies.get("lang"),Cookies.get("currency_id")]);
  
  let handleStatusChange = (e) =>{
    setloading(true)
    let token = Cookies.get("token")
    
    const data = new FormData()
    data.append("keyword",data2.data.is_shops);
    data.append("order_id",info.order.orderId)
    data.append("status",e)
    axios({
      method:"POST",
      url:`${BASE_URL}/shops/order-change-status/${lang}`,
      headers:{
        "Authorization":`Bearer ${token}`
      },
      data:data
    })
        .then(response=>{
          if (response.data.errors){
            return;
          }
          else{
            axios({
              method: "GET",
              url: `${BASE_URL}/shops/orders-products/${data2.data?.is_shops ? data2.data?.is_shops : ""}/${id}/${lang}`,
              headers: {
                "Authorization": `Bearer ${token} `
              },
            })
                .then((res)=>{
                  setloading(false)
                  setinfo(res.data)
                })
                .catch(()=>null)
          }
        })
  }




  if(loading){
    return <Loading/>
  }
  else{
    return (
      <VendorDashboardLayout title={intl.formatMessage({id:"Order Details"})}>
         <NextSeo
            title={intl.formatMessage({id:"Order Details",})}
        />
      <div>
        <DashboardPageHeader2
          title={intl.formatMessage({id:"Order Details"})}
          iconName="bag_filled"
          button={
            <Link href="/vendor/orders/page/1">
              <Button color="primary" bg="primary.light" px="2rem">
                <FormattedMessage
                  id="Back To Order List"
                  defaultMessage="Buyurtmalar listiga qaytish"
                />
              </Button>
            </Link>
          }
        />

        <Card p="0px" mb="30px" overflow="hidden">

          <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
            <FlexBox
              className="pre"
              flex="0 0 0 !important"
              m="6px"
              alignItems="center"
            >
              <Typography fontSize="14px" color="text.muted" mr="4px">
                <FormattedMessage
                  id="Order ID"
                  defaultMessage="Buyurtma raqami"
                />
                :
              </Typography>
              <Typography fontSize="14px">{id}</Typography>
            </FlexBox>
            <FlexBox m="6px" alignItems="center" >
              <Typography style={{width:"-webkit-fit-content",whiteSpace:"nowrap"}} mr="4px" fontSize="14px" color="text.muted">
                <FormattedMessage
                  id="Placed On"
                  defaultMessage="Joylashgan"
                />: 
              </Typography> 
              <Typography style={{width:"130px"}}  fontSize="14px"  >
                  {info.datas[0]?.delivery_time}
              </Typography>


            </FlexBox>
            <FlexBox
              className="pre "
              m="6px"
              ml="0px"
              alignItems="center"
            >
                  <Typography  fontSize="14px" color="text.muted" mr="4px" ml="6px" >
                  <FormattedMessage
                    id="Total"
                    defaultMessage="Umumiy"
                  />:
                </Typography>
                <Typography style={{width:"220px"}} fontSize="14px">{info?.order.total_price} {info?.order.currencyName}</Typography>
            </FlexBox>

            <Box  ml="6px">
              <Typography  fontSize="14px" color="text.muted" className="whitespace-nowrap  ">
                <FormattedMessage
                  id="Select List"
                  defaultMessage="Listni tanlang"
                />:
              </Typography>
              <select
                  value={parseInt(info.order.status) }
                  disabled={info.order.statusName === statuses[statuses.length-1]}
                  onChange={(r)=>handleStatusChange(r.target.value)}
                  className="form-control mt-1"
                  id="sel1"
              >
                {statuses?.map((val,ind) => (<option key={ind} value={ind+1}>{val}</option>))}
              </select>
            </Box>
          </TableRow>

          <Box py="0.5rem">
            {info?.datas?.map((item) => (
              <FlexBox
                px="1rem"
                py="0.5rem"
                flexWrap="wrap"
                alignItems="center"
                key={item}
              >
                <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                  <Avatar src={item.image} size={64} />
                  <Box ml="20px">
                    <H6 my="0px">{item.productName}</H6>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.muted">
                        {item.price} {item.currencyName} x
                      </Typography>
                      <Box maxWidth="60px" ml="0.3rem" mr="0.3rem" mt="0rem">
                          <Typography fontSize="14px" color="text.muted">
                              {item.count}
                          </Typography>

                      </Box>  <Typography fontSize="14px" color="text.muted">
                              = {item.totalPrice} {item.currencyName}
                          </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
              </FlexBox>
            ))}
          </Box>
        </Card>

      </div>
    </VendorDashboardLayout>
    )  
  }

};
OrderDetails.getInitialProps = async (ctx) => {
  let {token} = cookies(ctx)
  let {lang,currency_id} = cookies(ctx)
  let {id} = ctx.query
  let currency_text = typeof currency_id !== "undefined" ? `?currency=${currency_id}` : ""
  const request2 = await axios({
    method: "GET",
    url: `${BASE_URL}/profile/max-value/${lang}`,
    headers: {
      "Authorization": `Bearer ${token} `
    },
  })
  const answer = await request2.data;
  const request2_1 = await axios({
    method: "GET",
    url: `${BASE_URL}/shops/orders-products/${answer.data?.is_shops ? answer.data?.is_shops : ""}/${id}/${lang}${currency_text}`,
    headers: {
      "Authorization": `Bearer ${token} `
    },
  })
  const answer_1 = await request2_1.data;
  const request2_2 = await axios({
    method: "GET",
    url: `${BASE_URL}/orders/status-list/${lang}`,
  })
  const answer_2 = await request2_2.data;
  return {
            data: answer,
            order_info:answer_1,
            statuses2:answer_2
  }
}
// const orderStatusList = [
//   {
//     label: "Processing",
//     value: "Processing",
//   },
//   {
//     label: "Pending",
//     value: "Pending",
//   },
//   {
//     label: "Delivered",
//     value: "Delivered",
//   },
//   {
//     label: "Cancelled",
//     value: "Cancelled",
//   },
// ];

export default OrderDetails;
