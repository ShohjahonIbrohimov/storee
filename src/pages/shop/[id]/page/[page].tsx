import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import ShopIntroCard from "@component/shop/ShopIntroCard";
import Sidenav from "@component/sidenav/Sidenav";
import React, { useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {H5} from "@component/Typography";
import Box from "@component/Box";
import Shop_Review from "@component/Shop_Review";
import ProductCard3List from "@component/products/ProductCard3List";
import {useRouter} from "next/router";
import Cookies from "js-cookie"
import ProductFilterCard3 from "@component/products/ProductFilterCard3";
import {FormattedMessage} from "react-intl";
import useWindowSize from "@hook/useWindowSize";
import get_search_results from "../../../../../Redux/Actions/get_search_results";
import get_one_shop_products from "../../../../../Redux/Actions/get_one_shop_products";
import {fetch_user_info} from "../../../../../Redux/Actions/Action";
import get_shop_info from "../../../../../Redux/Actions/get_shop_info";
import { BASE_URL } from "@component/Variables";
import AppLayout from "@component/layout/AppLayout";
import Container from "@component/Container";
import { NextSeo } from "next-seo";

const Shop_page = ({shop_data,data,shop_products}) => {
  const router = useRouter()
  const data4 = useSelector((state:any)=>state.new.shop)
  const dispatch = useDispatch() 
  const [from_price,setfrom_price] = useState("")
  const [to_price,setto_price] = useState("")
  const [cat_id,setcat_id] = useState("")
  let [reviews,setreviews] = useState({data:{ratingList:[]},lastPage:"0"})
  let [ReviewPage,setReviewPage] = useState(0)
  let [addedStatus,setaddedStatus] = useState("")
    console.log(reviews)
  const sort = ""
  const width = useWindowSize();
  const isTablet = width < 1025;
  const [selectedOption, setSelectedOption] = useState("description");
  let lang = useSelector((state:any)=>state.new.lang) || Cookies.get("lang");
  let current_currency = useSelector((state:any)=>state.token.current_currency)
  const { id,page } = router.query
  useEffect(()=> {
      setreviews(data4)
  },[data4])

  dispatch(fetch_user_info(data))
  
  dispatch(get_one_shop_products(shop_products))
  useEffect(()=>{
    dispatch(get_shop_info(shop_data))
    dispatch(get_search_results(shop_products))
  },[])
  useEffect(()=>{
          axios.get(`${BASE_URL}/shops/rating-list/${id}/${lang}?page=${ReviewPage}`)
              .then(res=>{
                  setreviews(res.data)
              })
              .catch(()=>null)
  },[ReviewPage,addedStatus])
  useEffect(()=>{
    let currency_id = Cookies.get("currency_id");
    let currency_text = typeof currency_id !== "undefined" ?  `&currency=${currency_id}` : ""
    if(from_price !== "" || to_price !== "" || cat_id !== "" ){
        let sort_type =  "";
        let url = `${BASE_URL}/flowers/search/${lang}?page=${page}&from_price=${from_price}&to_price=${to_price}&keyword=${cat_id}&sort_type=${sort_type}&shop_id=${shop_data.data.id}${currency_text}`
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
    }
  },[from_price,to_price,cat_id,sort,id,current_currency,Cookies.get("currency_id"),page])
  // let handleReviewsAllClick = ()=>{
  //     axios.get(`${BASE_URL}/shops/rating-list/${id}/${lang}`)
  //         .then(res=>{
  //             setreviews(res.data)
  //         })
  //         .catch(()=>null)
  // }
  const handleOptionClick = (opt) => () => {
      setSelectedOption(opt);
  }
  return (
    <AppLayout >
        <NextSeo
            title={shop_data?.seo[2]?.view_share_title || shop_data?.seo?.view_share_title} 
            description={shop_data?.seo[1]?.view_mdescription || shop_data?.seo?.view_mdescription}
            additionalMetaTags={[{
            name: 'keyword',
            content: shop_data?.seo?.view_mkeywords || shop_data?.seo?.view_mkeywords
            }, ]}
            openGraph={{
                profile: {
                    firstName:data4?.data?.name,
                    username: data4?.data?.keyword,
                    // gender:"male"

                },
                images:[
                    {
                        url:data4?.data?.logo,
                        alt:data4?.data?.name
                    }
                ],
                
              }}
        />
       <Container className="mt-50">
        <div>
            <ShopIntroCard  />

                <FlexBox
                    borderBottom="1px solid"
                    borderColor="gray.400"
                    mt="80px"
                    mb="26px"
                    className="whitespace-break word-break"
                >
                    <H5
                        className="cursor-pointer"
                        mr="10px"
                        p="4px 10px"
                        color={
                            selectedOption === "description" ? "primary.main" : "text.muted"
                        }
                        borderBottom={selectedOption === "description" && "2px solid"}
                        borderColor="primary.main"
                        onClick={handleOptionClick("description")}
                    >
                        <FormattedMessage
                            id="Products"
                            defaultMessage="Mahsulotlar"
                        />
                    </H5>
                    <H5
                        className="cursor-pointer"
                        p="4px 10px"
                        mr="10px"
                        color={selectedOption === "review" ? "primary.main" : "text.muted"}
                        onClick={handleOptionClick("review")}
                        borderBottom={selectedOption === "review" && "2px solid"}
                        borderColor="primary.main"
                    >
                        <FormattedMessage
                            id="Review"
                            defaultMessage="Tavsif"
                        />
                    </H5>
                    <H5
                        className="cursor-pointer"
                        p="4px 10px"

                        color={selectedOption === "contact" ? "primary.main" : "text.muted"}
                        onClick={handleOptionClick("contact")}
                        borderBottom={selectedOption === "contact" && "2px solid"}
                        borderColor="primary.main"
                    >
                        <FormattedMessage
                            id="description"
                            defaultMessage="Tavsif"
                        />
                    </H5>
                </FlexBox>
                <Box mb="50px">
                    {
                        selectedOption === "description"
                        &&
                            <Grid container spacing={6}>
                                <Hidden as={Grid} item md={3} xs={12} down={1024}>
                                    <ProductFilterCard3
                                        setfrom_price={(e)=>setfrom_price(e)}
                                        setto_price={(e)=>setto_price(e)}
                                        setcat_id={(g)=>setcat_id(g)}
                                    />
                                </Hidden>

                                <Grid item md={9} xs={12}>
                            {isTablet && (
                                <Sidenav
                                position="left"
                                scroll={true}
                                handle={
                                <FlexBox justifyContent="flex-end" mb="12px">
                                <Icon>options</Icon>
                                </FlexBox>
                            }
                                >
                                    <ProductFilterCard3
                                        setfrom_price={(e)=>setfrom_price(e)}
                                        setto_price={(e)=>setto_price(e)}
                                        setcat_id={(g)=>setcat_id(g)}
                                    />
                                </Sidenav>
                                )}
                                    <ProductCard3List />
                                </Grid>
                                </Grid>
                    }
                    {selectedOption === "review" &&
                        <div
                            style=
                                {{
                                    backgroundColor:"white",
                                    borderRadius:"15px",
                                    padding:"20px",
                                }}
                        >
                            <Shop_Review setaddedstatus={(e)=>setaddedStatus(e)}   reviews={reviews} setreviews={(r)=>setreviews(r)} setReviewPage={(e)=>setReviewPage(e)} ReviewPage={ReviewPage} />
                        </div>
                    }
                    {
                        selectedOption === "contact" &&
                            <div style={{backgroundColor:"white",borderRadius:"15px",padding:"20px"}}>
                                <div className="whitespace-break" dangerouslySetInnerHTML={{__html:shop_data?.data?.description}} ></div> 
                            </div>
                    }
                </Box>

            </div>
       </Container>
    </AppLayout>
  );
};
Shop_page.getInitialProps = async (ctx)=>{
    let {token,currency_id} = await cookies(ctx)
    let currency_text = typeof currency_id !== "undefined" ?  `&currency=${currency_id}` : ""
    let {lang} =await cookies(ctx)
    let f;
    if(lang){
        f = await lang
    }
    else{
        f= await "uz"
    }
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${f}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })
    const answer = await request2.data;
    const { id } = ctx.query
    const url = await `${BASE_URL}/shops/show/${id}/${f}`
    const request2_1 = await axios({
        method:"GET",
        url:url,
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    const answer_1 = await request2_1.data;
    const shop_product_url = await `${BASE_URL}/flowers/search/${f}?shop_id=${request2_1?.data?.data?.id }${currency_text}`
    const request2_3 = await axios.get(shop_product_url)
    const answer_2 = await request2_3.data
    return {
            shop_data:answer_1,
            data:answer,
            shop_products:answer_2
    }
}
export default Shop_page;