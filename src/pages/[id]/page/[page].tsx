import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard2List from "@component/products/ProductCard2List";
import ProductFilterCard2 from "@component/products/ProductFilterCard2";
import Sidenav from "@component/sidenav/Sidenav";
import { H1, Paragraph } from "@component/Typography";
import React, { useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import useWindowSize from "@hook/useWindowSize";
import {FormattedMessage, useIntl} from "react-intl";
import Cookies from "js-cookie";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import get_search_results from "../../../../Redux/Actions/get_search_results";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
const Category_items_page = ({data,info2}) => {
    let intl = useIntl()
    let lang = Cookies.get("lang")
    let current_currency = useSelector((state:any)=>state.token.current_currency)
    let currency_id = Cookies.get("currency_id");
    const router = useRouter()
    const view ="grid";
    const { id,page } = router.query
    const width = useWindowSize();
    const isTablet = width < 1025;
    const [from_price,setfrom_price] = useState("")
    const [to_price,setto_price] = useState("")
    const [cat_id,setcat_id] = useState("")
    const [sort,setsort] = useState(null)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(get_search_results(info2))
        dispatch(fetch_user_info(data))
        setcat_id(id.toString())
    },[])
    let info = useSelector((state:any)=>state.new.search_results)
    console.log(info);
    
    useEffect(()=>{
       let sort_type = sort ? sort.value : "";
       let url = `${BASE_URL}/flowers/search/${lang}${typeof page === "undefined" ? "?" : `?page=${page}&`}from_price=${from_price}&to_price=${to_price}&keyword=${cat_id}&sort_type=${sort_type}&currency=${currency_id}`
       axios({
           method:"GET",
           url:url,
       })
           .then(res=>{
               dispatch(get_search_results(res.data))
           })
           .catch(()=>{
               return;
           })
    },[from_price,to_price,cat_id,id,sort,page,current_currency,lang,currency_id])
    const sortOptions = [
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
                        <H1 className="fontSize-small" >
                            
                                {info?.categoryName}
                        
                        </H1>
                        <Paragraph
                            color="text.muted"
                        >
                            {info?.datas?.total} <FormattedMessage id="results_found" defaultMessage="natija topildi" />
                        </Paragraph>
                    </div>
                    <FlexBox
                        alignItems="center"
                        flexWrap="wrap"
                    >
                    <Box style={{marginTop:"10px"}} className="w-100 " flex="1 1 0" mr="0.8rem" mb="0.4rem" marginRight="-2px" minWidth="190px">
                        <select
                            value={sort || sortOptions[0]}
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={(r)=>setsort(r.target.value)}
                        >
                            {sortOptions.map(option=> <option key={option.value} value={option.value} >{option.label}</option>)}


                        </select>
                    </Box>
                        {isTablet && (
                            <Sidenav
                                position="right"
                                
                                scroll={true}
                                handle={
                                    <IconButton className="ml-2 margin-top-optionadminkadaa edit qilishda bor, Alohida nomer kerak sababi mijoz o'zini shaxsiy nomerida ro'yxatdan o'tishi mumkin. Mijozlari uchun boshqa tel nomer qo'yishi mumkin,s" size="small">
                                        <Icon>options</Icon>
                                    </IconButton>
                                }
                            >
                                <ProductFilterCard2
                                    setfrom_price={(e)=>setfrom_price(e)}
                                    setto_price={(e)=>setto_price(e)}
                                    setcat_id={(g)=>setcat_id(g)}
                                />
                            </Sidenav>
                        )}
                    </FlexBox>
                </FlexBox>

                <Grid container spacing={6}>
                    <Hidden
                        as={Grid}
                        item
                        lg={3}
                        xs={12}
                        down={1024}
                    >
                        <ProductFilterCard2
                            setfrom_price={(e)=>setfrom_price(e)}
                            setto_price={(e)=>setto_price(e)}
                            setcat_id={(g)=>setcat_id(g)}
                        />
                    </Hidden>

                    <Grid item lg={9} xs={12}>
                        {view === "grid" ? <ProductCard2List  /> :  <ProductCard2List  />}
                    </Grid>
                </Grid>
            </Box>
        </NavbarLayout>
    );
};
Category_items_page.getInitialProps = async (ctx) =>{
    let {token,currency_id} =  cookies(ctx)
    let {lang} =  cookies(ctx)
    let {id} = ctx.query
    let x
    if(lang){
        x = lang
    }
    else{
        x = "uz"
    }
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${x}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })

    const request3 = await axios({
        method: "GET",
            url: `${BASE_URL}/flowers/search/${x}?keyword=${id}&currency=${currency_id}`,
    })
    const answer = await request2.data;
    const answer2 = await request3.data;
    return {
        data:answer,
        info2:answer2
    }
}




export default Category_items_page;
    //    else{
    //        let token  = Cookies.get("token")
    //      axios({
    //       method:"GET",
    //       url:`https://api.wolt.uz/api/v1/flowers/search/${lang}${typeof page === "undefined" ? "?" : `?page=${page}&`}keyword=${cat_id}&${currency_text}`,
    //       headers:{
    //           "Authorization":`Bearer ${token}`
    //       }
    //           })
    //           .then(res=>{
    //             dispatch(get_search_results(res.data))
    //           })
    //           .catch(()=>{
    //             return;
    //           })
    //    }