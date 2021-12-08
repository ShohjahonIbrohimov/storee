import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import NavbarLayout from "@component/layout/NavbarLayout";
import ShopCard1 from "@component/shop/ShopCard1";
import { H1 } from "@component/Typography";
import React, {useEffect} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import Button from "@component/buttons/Button";
import Icon from "@component/icon/Icon";
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import Cookies from "js-cookie"
import { NextSeo } from "next-seo";
import get_shop_list from "../../../../Redux/Actions/get_shop_list";
import get_shop_products from "../../../../Redux/Actions/get_product_shop";
import { fetch_user_info } from "../../../../Redux/Actions/Action";
const ShopList = ({data,shop_list}) => {
    let router = useRouter()
    let intl = useIntl()
    let {page} = router.query;
    let dispatch = useDispatch()
    
    let wishlist = useSelector((state:any)=>state.new.shops)
    useEffect(()=>{
        dispatch(get_shop_list(shop_list))
    },[])
    
    useEffect(() => {
        let lang = Cookies.get("lang")
        axios.get(`${BASE_URL}/shops/list/${lang}?page=${page}`)
            .then(response=>{
                dispatch(get_shop_products(response.data))
                dispatch(get_shop_list(response.data))
            })
            .catch(()=>{
               return;
            })
    },[page]);
  dispatch(fetch_user_info(data))
  return (
    <NavbarLayout>
    <div>
        <NextSeo
            title={intl.formatMessage({id:"footer_header_link3"})}
            description={intl.formatMessage({id:"footer_header_link3"})}
            additionalMetaTags={[{
            name: 'keyword',
            content: intl.formatMessage({id:"footer_header_link3"})
            }, 
        ]}
        />
      <H1 mb="24px">
          <FormattedMessage
            id="footer_header_link3"
            defaultMessage="Magazinlar"
          />
      </H1>

      <Grid container spacing={6}>
        {shop_list?.datas?.data?.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ShopCard1 {...item} />
          </Grid>
        ))}
      </Grid>

      {shop_list.datas.last_page !==1 
        ?
        <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
          <StyledPagination>
              <ReactPaginate
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
                  pageCount={wishlist?.lastPage || 0}
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
    </div>
    </NavbarLayout>
  );
};



        // export async function getStaticPaths() {
        //     let data = await axios.get(`${BASE_URL}/shops/count-page`)
        //     let paths=[]
        //     for (let i = 1; i <= data.data; i++){
        //         paths.push({
        //             params:{page:i.toString()}
        //         })
        //     }
        //     console.log("---------------------------------------",paths);
            
        //     return {
        //       paths: paths,
        //       fallback: false
        //     };
        //   }


  export async function getServerSideProps(ctx){ 
    let {token} = cookies(ctx)
    let {lang} = cookies(ctx)
    let {page} = ctx.params
    let y
    if(lang){
        y = lang
    }
    else{
        y = "uz"
    }
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${y}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })
    const data =  request2.data;
    const request2_1 = await axios({
        method: "GET",
        url: `${BASE_URL}/shops/list/${lang}?page=${page}`,

    })

    
    const shop_list =  request2_1.data;
    return {
        props:{
            data,
            shop_list
        }
    }
}
export default ShopList;
