import Avatar from "@component/avatar/Avatar";
import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch} from "react-redux";
import Button from "@component/buttons/Button";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie"
import {useRouter} from "next/router";
import {FormattedMessage, useIntl} from "react-intl";
import get_shop_products from "../../../../../Redux/Actions/get_product_shop";
import {fetch_user_info} from "../../../../../Redux/Actions/Action";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";

const Products_vendor_page = ({data}) => {
    let intl = useIntl()
    const router = useRouter()
    const dispatch = useDispatch()
    dispatch(fetch_user_info(data))
    const [data2,setdata2] = useState({datas:{current_page:1,data:[]},lastPage:1,length:0})
    let lang = router.locale
    let {status,page} = router.query

    useEffect(() => {
        let currency_id = Cookies.get("currency_id");
        let currency_text = typeof currency_id !== "undefined" ?  `&currency=${currency_id}` : ""
        let token = Cookies.get("token")
        
        let status_text = typeof status ==="undefined" ? "" : "?status=" + status;
        if(typeof page !== "undefined" && typeof status !== "undefined"){

            let token = Cookies.get("token")
            axios({
                method:"GET",
                url:`${BASE_URL}/flowers/personal-flowers/${lang}${status_text}&page=${page}${currency_text}`,
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
        }
        else if(typeof page === "undefined" && typeof status !== "undefined"){
            axios({
            url:`${BASE_URL}/flowers/personal-flowers/${lang}${status_text}${currency_text}`,
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
            .then(res=>{
                dispatch(get_shop_products(res.data))
                setdata2(res.data)
            })
            .catch(()=>{
                return ;
            })
        }
        else if(typeof page !== "undefined" && typeof status === "undefined") {
            let token = Cookies.get("token")
            axios({
                url:`${BASE_URL}/flowers/personal-flowers/${lang}?page=${page}${currency_text}`,
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
                .then(response=>{
                    dispatch(get_shop_products(response.data))
                    setdata2(response.data)
                })
                .catch(error=>{
                    console.log(error)
                })
        }
        else if(typeof page === "undefined" && typeof status === "undefined"){
            status_text = typeof status ==="undefined" ? "?status=" : "?status=" + status;
            axios({
                url:`${BASE_URL}/flowers/personal-flowers/${lang}${status_text}${currency_text}`,
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
        })
            .then(res=>{
                dispatch(get_shop_products(res.data))
                setdata2(res.data)
            })
            .catch(()=>{
                return;
            })
        }
    }, [status,page,Cookies.get("lang"),Cookies.get("currency_id")]);


  return (
    <VendorDashboardLayout title={intl.formatMessage({id:"Products"})}>
        <NextSeo
            title={intl.formatMessage({id:"Products"})}
        />
        <div>
        <div className="flex flex-wrap">
            <div className="d-none w-fit  float-right d-sm-none d-md-none d-lg-inline d-xl-inline">
                    <select onChange={(r)=>{
                        let query2 = {...router.query}
                        query2.status = r.target.value
                        router.push( {pathname:router.pathname,query:query2})
                        }
                        }
                    className="form-select" aria-label="Default select example"
                    >
                        <option value="">
                            {intl.formatMessage({id:"All"})}
                        </option>
                        <option value="2">
                            {intl.formatMessage({id:"inactive"})}
                        </option>
                        <option value="1">

                            {intl.formatMessage({id:"active"})}
                        </option>
                        <option value="4">
                            {intl.formatMessage({id:"blocked"})}
                        </option>
                        <option value="3">
                            {intl.formatMessage({id:"in_moderation"})}
                        </option>
                    </select>
                </div>
                <DashboardPageHeader2 title={intl.formatMessage({id:"Products"})} iconName="delivery-box" />
        </div>
                <div  className="col-12 col-sm-4 w-80 col-md-3 d-inline d-sm-inline d-md-inline d-lg-none d-xl-none">
                    <select id="vendor_product_filter" onChange={(r)=>{
                        let query2 = {...router.query}
                        query2.status = r.target.value
                        router.push( {pathname:router.pathname,query:query2})
                        }
                        }
                    className="form-select" aria-label="Default select example"
                    >
                        <option value="">
                            {intl.formatMessage({id:"All"})}
                        </option>
                        <option value="2">
                            {intl.formatMessage({id:"inactive"})}
                        </option>
                        <option value="1">

                            {intl.formatMessage({id:"active"})}
                        </option>
                        <option value="4">
                            {intl.formatMessage({id:"blocked"})}
                        </option>
                        <option value="3">
                            {intl.formatMessage({id:"in_moderation"})}
                        </option>
                    </select>
                </div>
            {data2?.datas?.data.length === 0 ? <div>Siz xaliham birorta mahsulot yaratmagansiz</div> :
                <>
                    <Hidden down={769}>
                        <TableRow padding="0px 18px" mb="-0.125rem" boxShadow="none" bg="none">
                            <FlexBox my="0px" mx="6px" flex="2 2 2px !important">
                                <H5 ml="56px" color="text.muted" textAlign="left">
                                    <FormattedMessage
                                        id="Product Name"
                                        defaultMessage="Ism"
                                    />
                                </H5>
                            </FlexBox>
                            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                                <FormattedMessage
                                    id="category_name"
                                    defaultMessage="Kategoriya Nomi"
                                />
                            </H5>
                            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                                <FormattedMessage
                                    id="Regular Price"
                                    defaultMessage="Narx"
                                />
                            </H5>
                            <H5
                                flex="0 0 0 !important"
                                color="text.muted"
                                px="22px"
                                my="0px"
                            ></H5>
                        </TableRow>
                    </Hidden>

                    {data2?.datas?.data.length !== 0 ?<> {data2?.datas?.data?.map((item, ind) => (
                        <>
                            <Link href={"/vendor/products/" + item.keyword} key={ind}>
                                <TableRow as="a" href={"/vendor/products/" + item.keyword} my="1rem" padding="6px 18px">
                                    <FlexBox id="vendor_product_table_name" alignItems="center" m="6px" flex="2 2 2px !important">
                                        <Avatar src={item.image} size={36}/>
                                        <Typography textAlign="left" ml="20px">
                                            {item.name}
                                        </Typography>
                                    </FlexBox>
                                    <H5
                                        className="text-truncate"
                                        m="6px"
                                        textAlign="left"
                                        fontWeight="600"
                                        id="vendor_product_table_category_name"
                                        color={item.stock < 6 ? "error.main" : "inherit"}
                                    >
                                        {item.categoryName}
                                    </H5>
                                    <H5 m="6px" id="vendor_product_table_price" textAlign="left" fontWeight="400">
                                        {item.price}
                                    </H5>

                                    <Hidden flex="0 0 0 !important" down={769}>
                                        <Typography textAlign="center" color="text.muted">
                                            <IconButton size="small">
                                                <Icon variant="small" defaultcolor="currentColor">
                                                    arrow-right
                                                </Icon>
                                            </IconButton>
                                        </Typography>
                                    </Hidden>
                                </TableRow>
                            </Link>
                        </>
                        ))}
                        {data2.lastPage !==1 
                            ?
                            <StyledPagination>
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
                                    pageCount={data2?.lastPage}
                                    marginPagesDisplayed={true}
                                    pageRangeDisplayed={false}
                                    onPageChange={r=>{
                                        let query2 = {...router.query}
                                        query2.page = r.selected + 1
                                        router.push( {pathname:router.pathname,query:query2})
                                        }
                                    }
                                    containerClassName="pagination"
                                    subContainerClassName="pages pagination"
                                    activeClassName="active"
                                    disabledClassName="disabled"
                                />
                            </StyledPagination>
                        :
                        ""
                        }
                    </> :<div>Siz xaliham birorta mahsulot yaratmagansiz</div> }

                </>
            }
        </div>
    </VendorDashboardLayout>
  );
};

Products_vendor_page.getInitialProps = async (ctx) => {
    let {token} = cookies(ctx)
    let {lang} = cookies(ctx)
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
    const answer = await request2.data;

    return {data: answer}
}
export default Products_vendor_page;
