import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import VendorOrderList from "@component/orders/VendorOrderList";
import React, {useEffect} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useIntl} from "react-intl";
import {fetch_user_info} from "../../../../../Redux/Actions/Action";
import one_shop_orders from "../../../../../Redux/Actions/one_shop_orders";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";


const Orders_vendor_page = ({data,orders}) => {
 let intl = useIntl()
 const dispatch = useDispatch()
 dispatch(fetch_user_info(data))
 useEffect(()=>{
     dispatch(one_shop_orders(orders))
 },[])
  return (
    <VendorDashboardLayout >
        <NextSeo
            title={intl.formatMessage({id:"orders",defaultMessage:"Buyurtmalar"})}
        />
        <div>
        <DashboardPageHeader2
            title={intl.formatMessage({id:"orders",defaultMessage:"Buyurtmalar"})}
            iconName="bag_filled"
        />
        <VendorOrderList />
        </div>
    </VendorDashboardLayout>
  );
};
Orders_vendor_page.getInitialProps = async (ctx) => {
    let {token} = cookies(ctx)
    let {lang,currency_id} = cookies(ctx)
    let currency_text = typeof currency_id === "undefined" ? "" : `?currency=${currency_id}`
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
        url: `${BASE_URL}/shops/orders-list/${answer.data?.is_shops ? answer.data?.is_shops : ""}/${lang}${currency_text}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })
    const answer_1 = await request2_1.data;
    return {data: answer,orders:answer_1}
}

export default Orders_vendor_page;
