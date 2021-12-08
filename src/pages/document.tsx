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
const Help = ({data}) => {
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  let intl = useIntl()
  return (
  <AppLayout>
    <NextSeo
      title={intl.formatMessage({id:"document"})}
      description={intl.formatMessage({id:"document"})}
      additionalMetaTags={[{
      name: 'keyword',
      content: intl.formatMessage({id:"document"})
      }, ]}
    />
    <div style={{color:"#f7961",marginTop:"30px",marginBottom:"30px"}}>
        <CategorySectionCreator
        iconName="document"
        title={intl.formatMessage({id:"document"})}
          >
            <Card1 >
                <Grid style={{padding:"10px"}}>

                </Grid>
            </Card1>
        </CategorySectionCreator>
    </div>
  </AppLayout>
  );
};


export default Help;

Help.getInitialProps = async (ctx) =>  {6
    let {token,lang} = cookies(ctx)
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
