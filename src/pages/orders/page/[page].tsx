import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import CustomerOrderList from "@component/orders/CustomerOrderList";
import React from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import get_personal_orders from "../../../../Redux/Actions/get_personal_orders";
import { BASE_URL } from "@component/Variables";
import { useIntl } from "react-intl";
import { NextSeo } from "next-seo";

const Orders = ({data,personal_orders}) => {
  let intl = useIntl()
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  dispatch(get_personal_orders(personal_orders))
  return (
  <CustomerDashboardLayout >
    <NextSeo
      title={intl.formatMessage({id:"My Orders"})} 
    />
    <CustomerOrderList />
  </CustomerDashboardLayout>
  );
};

Orders.getInitialProps = async (ctx) =>  {
  let {token,currency_id} = cookies(ctx)
  let {lang} = cookies(ctx)
  let currency_text = typeof currency_id === "undefined" ? "" : `?currency=${currency_id}`
  let x
  if(lang){
    x = lang
  }
  else{
    x="uz"
  }
  const request2 = await axios({
    method:"GET",
    url:`${BASE_URL}/profile/max-value/${x}`,
    headers:{
      "Authorization":`Bearer ${token} `
    },
  })
  const request2_1 = await axios({
    method:"GET",
    url:`${BASE_URL}/orders/personal-order-list/${x}${currency_text}`,
    headers:{
      "Authorization":`Bearer ${token} `
    },
  })
  const answer_1 = await request2_1.data;
  const answer = await request2.data;

  return {
          data:answer,
          personal_orders:answer_1
  }
}
export default Orders;
