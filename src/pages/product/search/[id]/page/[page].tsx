import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard4List from "@component/products/ProductCard4List";
import SearchProductFilterCard from "@component/products/SearchProductFilterCard";
import Sidenav from "@component/sidenav/Sidenav";
import { H1, Paragraph } from "@component/Typography";
import React, { useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Cookies from "js-cookie"
import {FormattedMessage, useIntl} from "react-intl";
import useWindowSize from "@hook/useWindowSize";
import get_search_results from "../../../../../../Redux/Actions/get_search_results";
import {fetch_user_info} from "../../../../../../Redux/Actions/Action";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";

const ProductSearchResult_Page = ({data,info2}) => {
  let intl = useIntl()
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  const view = "grid";
  let info = useSelector((state:any)=>state.new.search_results)
  const width = useWindowSize();
  const isTablet = width < 1025;
  const [from_price,setfrom_price] = useState("")
  const [to_price,setto_price] = useState("")
  const [cat_id,setcat_id] = useState("")
  const [sort,setsort] = useState(null)
  const router = useRouter();
  const { id } = router.query;
  let lang = router.locale;
  let current_currency = useSelector((state:any)=>state.token.current_currency)
  useEffect(()=>{
      dispatch(get_search_results(info2))
  },[])
  useEffect(()=>{
    console.log("It comes")
    let currency_id = Cookies.get("currency_id");
    let currency_text = typeof currency_id !== "undefined" ?  `&currency=${currency_id}` : ""
    let url = `${BASE_URL}/flowers/search/${lang}?from_price=${from_price}&to_price=${to_price}&keyword=${cat_id}&sort_type=${sort}&text=${id}${currency_text}`
    axios({
        method:"GET",
        url:encodeURI(url),
    })
          .then(res=>{
            console.log("Search Results:","Response:",res)
            dispatch(get_search_results(res.data))
          })
          .catch((e)=>{
              console.log("Error:",e);
          })
  },[from_price,to_price,cat_id,sort,id,current_currency,Cookies.get("lang"),lang])
 const sortOptions = [
        {label:intl.formatMessage({ id:"Sort By"}),value: ""},
        { label: intl.formatMessage({id:"low_high"}), value: 1 },
        { label: intl.formatMessage({id:"high_low"}), value: 2 },

    ];

  return (
    <NavbarLayout>
      <NextSeo
          title={info?.seo?.length !==0 && info?.seo ?  info?.seo?.mtitle : ""} 
          description={info?.seo?.length !==0 && info?.seo ? info?.seo?.mdescription : ""} 
          additionalMetaTags={[{
          name: 'keyword',
          content: info?.seo?.length !==0 && info?.seo ? info?.seo.mkeywords :""
          }, ]}
          openGraph={{
            type:"product",
          }}
      />
      <Box pt="20px" pb="20px">
        <FlexBox
          p="1.25rem"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mb="55px"
          elevation={5}
          as={Card}
        >
          <div>
            <H1 fontSize="15px" style={{marginBottom:"10px",textTransform:"capitalize"}} ><FormattedMessage id="search_for" /> "{id}"</H1>
            <Paragraph color="text.muted">{info?.datas?.total} <FormattedMessage id="results_found" /></Paragraph>
          </div>
          <FlexBox alignItems="right" flexWrap="wrap">

            <Box style={{marginTop:"10px"}} flex="1 1 0" mr="0.6rem" mb="0.4rem" marginRight="-2px" minWidth="190px">
                <select
                    value={sort || sortOptions[0]}
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(r)=>setsort(r.target.value)}
                >
                  {sortOptions.map(option=> <option key={option.value} value={option.value} >{option.label}</option>)}


                </select>
              {/*<Select*/}
              {/*  placeholder={intl.formatMessage({id:"Sort By"})}*/}
              {/*  defaultValue={sortOptions[0]}*/}
              {/*  options={sortOptions}*/}
              {/*  onChange={(e)=>{setsort(e)}}*/}
              {/*/>*/}
            </Box>


            {isTablet && (
              <Sidenav
                
                position="left"
                scroll={true}
                handle={
                  <IconButton size="small" className="ml-2">
                    <Icon>options</Icon>
                  </IconButton>
                }
              >
                <SearchProductFilterCard  setfrom_price={(e)=>setfrom_price(e)}  setto_price={(e)=>setto_price(e)}  setcat_id={(g)=>setcat_id(g)} />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>

        <Grid container spacing={6}>
          <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            <SearchProductFilterCard  setfrom_price={(e)=>setfrom_price(e)}  setto_price={(e)=>setto_price(e)}  setcat_id={(g)=>setcat_id(g)} />
          </Hidden>

          <Grid item lg={9} xs={12}>
            {view === "grid" ? <ProductCard4List  /> :  <ProductCard4List  />}
          </Grid>
        </Grid>
      </Box>
    </NavbarLayout>
  );
};
ProductSearchResult_Page.getInitialProps = async (ctx) =>{
  let {token,currency_id} =  cookies(ctx)
  let {lang} =  cookies(ctx)
  let {id} = ctx.query
  let currency_text = typeof currency_id !== "undefined" && `&currency=${currency_id}`
  const request2 = await axios({
    method: "GET",
    url: `${BASE_URL}/profile/max-value/${lang}` ,
    headers: {
      "Authorization": `Bearer ${token} `
    },
  })

  const request3 = await axios({
    method: "GET",
      url: encodeURI(`${BASE_URL}/flowers/search/${lang}?text=${id}${currency_text}`),
  })

  const answer = await request2.data;
  const answer2 = await request3.data;
  return {
    data:answer,
    info2:answer2
  }
}



export default ProductSearchResult_Page;
