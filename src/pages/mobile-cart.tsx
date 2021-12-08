import AppLayout from "@component/layout/AppLayout"
import MiniCart2 from "@component/mini-cart/mobileMiniCart"
import { NextSeo } from "next-seo"

import React from "react"
import { useIntl } from "react-intl"
const mobile_cart = ()=>{
    let intl = useIntl()
    return (<AppLayout title={intl.formatMessage({id:"cart"})}>
              <NextSeo
                title={intl.formatMessage({id:"cart"})}
              />
              <MiniCart2 mobile={true}/>
            </AppLayout>
           )
}
export default mobile_cart