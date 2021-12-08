import {fetch_user_info} from "../../Redux/Actions/Action";
import React from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import cookies from "next-cookies"
import Grid from "@component/grid/Grid";
import "bootstrap/dist/css/bootstrap.min.css"
import AppLayout from "@component/layout/AppLayout";
import CategorySectionCreator from "@component/CategorySectionCreator";
import {Card1} from "@component/Card1";
import {useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
const Deliver_Terms = ({data}) => {
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  let intl = useIntl()
  return (
    <AppLayout >
        <NextSeo
            title={intl.formatMessage({id:"deliver"})}
            description={intl.formatMessage({id:"deliver"})}
            additionalMetaTags={[{
            name: 'keyword',
            content: intl.formatMessage({id:"deliver"})
            }, 
        ]}
        />
      <div style={{marginTop:"50px",marginBottom:"50px"}}>
        <div  style={{color:"#f7961"}}>
            <CategorySectionCreator
            iconName="truck2"
            title={intl.formatMessage({id:"deliver"})}
              >
              <Card1>
                    <Grid style={{padding:"30px"}}>

                    </Grid>
              </Card1>
            </CategorySectionCreator>
        </div>
    </div>
  </AppLayout>
  );
};


export default Deliver_Terms;

Deliver_Terms.getInitialProps = async (ctx) =>  {
    let {token,lang} = cookies(ctx)
    console.log("Token:",token)
    const request2 = await axios({
        method:"GET",
        url:`${BASE_URL}/profile/max-value/${lang}`,
        headers:{
            "Authorization":`Bearer ${token} `
        },
    })
    const answer = await request2.data;



  return {data:answer}
}
