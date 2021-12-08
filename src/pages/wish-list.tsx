import React, {useEffect, useState} from "react";
import Button from "../components/buttons/Button";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import DashboardLayout from "../components/layout/CustomerDashboardLayout";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import ProductCard1 from "../components/product-cards/ProductCard1";
import {useDispatch} from "react-redux";
import cookies from "next-cookies";
import axios from "axios";
import {fetch_user_info} from "../../Redux/Actions/Action";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import Icon from "@component/icon/Icon";
import get_shop_products from "../../Redux/Actions/get_product_shop";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import {useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
const WishList = ({data,wishlist2}) => {
    let intl = useIntl()
    const dispatch = useDispatch()
    dispatch(fetch_user_info(data))
    const router = useRouter()
    const [wishlist,setdata2] = useState(wishlist2)
    let {page} = router.query
    let currency_id = Cookies.get("currency_id")
    useEffect(() => {
       let token = Cookies.get("token")
       let lang = Cookies.get("lang")
       let currency_text = typeof currency_id === "undefined" ? "" : `&currency=${currency_id}`;
       axios({
           url:`${BASE_URL}/flowers/get-favorites/${lang}?page=${page}${currency_text}`,
           method:"GET",
           headers:{
               "Authorization":`Bearer ${token}`
           }
       })
            .then(response=>{
                dispatch(get_shop_products(response.data))
                setdata2(response.data)
            })
            .catch(()=>{
                return;
            })
    }, [page]);

  return (
    <DashboardLayout>
        <NextSeo
            title={intl.formatMessage({id:"wishlist"})}
            description={intl.formatMessage({id:"wishlist"})}
            additionalMetaTags={[{
            name: 'keyword',
            content: intl.formatMessage({id:"wishlist"})
            }, 
        ]}
        />
        <div>
        <DashboardPageHeader
            title={intl.formatMessage({id:"wishlist"})}
            iconName="heart_filled"
        />


                {wishlist?.datas?.data.length !==0 ?
                <>
                <Grid container spacing={6}>
                    {wishlist?.datas?.data?.map((item) => (
                    <Grid item lg={4} sm={4} xs={6} key={item}>
                    <ProductCard1
                        is_favourite={item.is_favorites}
                        title={item.name}
                        imgUrl={item.image}
                        price={item.price}
                        id={item.keyword}
                        rating={item.ratings}
                        category_keyword = {item.categoryKeyword}
                        shopName={item.shopName}
                        shopKeyword={item?.shopKeyword}
                        />
                    </Grid>
                    ))}
                </Grid>
                <br/>
                {wishlist.datas.last_page !==1 
                    ?
                    <FlexBox>
                    <StyledPagination >
                        <ReactPaginate
                            initialPage={typeof page !== "undefined" ? parseInt(page.toString())-1 : 0 }
                            previousLabel={
                                <Button
                                    style={{cursor: "pointer"}}
                                    className="control-button"
                                    color="primary"
                                    overflow="hidden"
                                    height="auto"
                                    padding="6px"
                                    borderRadius="50%"
                                >
                                    <Icon defaultcolor="currentColor" variant="small">
                                        chevron-left
                                    </Icon>
                                </Button>

                            }
                            nextLabel={
                                <Button
                                    style={{cursor: "pointer"}}
                                    className="control-button"
                                    color="primary"
                                    overflow="hidden"
                                    height="auto"
                                    padding="6px"
                                    borderRadius="50%"
                                >
                                    <Icon defaultcolor="currentColor" variant="small">
                                        chevron-right
                                    </Icon>
                                </Button>
                            }
                            breakLabel={
                                <Icon defaultcolor="currentColor" variant="small">
                                    triple-dot
                                </Icon>
                            }
                            pageCount={wishlist.lastPage}
                            marginPagesDisplayed={true}
                            pageRangeDisplayed={false}
                            onPageChange={(r)=>{
                                let query2 = {...router.query}
                                query2.page = r.selected+1
                                router.push( {pathname:router.pathname,query:query2})
                                }
                            }
                            containerClassName="pagination"
                            subContainerClassName="pages pagination"
                            activeClassName="active"
                            disabledClassName="disabled"
                        />
                    </StyledPagination>
                    </FlexBox>
                :
                ""
                }
                </>
            :
                intl.formatMessage({id:"empty"})}


        </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(ctx){
    let {token} = cookies(ctx)
    let {lang,currency_id} = cookies(ctx)
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
    let currency_text = typeof currency_id === "undefined" ? "" : `?currency=${currency_id}`
    const request2_1 =  await axios({
        method:"GET",
        url:`${BASE_URL}/flowers/get-favorites/${x}${currency_text}`,
        headers:{
            "Authorization":`Bearer ${token} `
        },
    })
    const answer = await request2.data;
    const answer_1 = await request2_1.data;
    return {props:{data:answer,wishlist2:answer_1}}
}
export default WishList;
