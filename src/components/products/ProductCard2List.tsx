import React, {useEffect} from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import Button from "@component/buttons/Button";
import Icon from "@component/icon/Icon";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import get_search_results from "../../../Redux/Actions/get_search_results";
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import { BASE_URL } from "@component/Variables";


const ProductCard2List = () => {
    const dispatch = useDispatch()
    const data = useSelector((state:any)=>state.new.search_results)
    const wishlist = data||[]
    const router = useRouter()
    const {id,page} = router.query
    useEffect(() => {
        let currency_text = `&currency=${Cookies.get("currency_id")}`
        let lang = Cookies.get("lang")
        axios.get(`${BASE_URL}/flowers/search/${lang}?page=${page}&keyword=${id}${currency_text}`)
            .then(response=>{
                dispatch(get_search_results(response.data))
            })
            .catch(()=>{
                return;
            })
    }, [page,Cookies.get("lang"),Cookies.get("currency_id")]);

    return (
        <div>
                {wishlist?.datas && wishlist?.datas?.data.length !==0 ?
                    <>
                         <Grid container spacing={6}>
                            {wishlist?.datas?.data?.map((item, ind) => (
                                <Grid item lg={4} sm={4} xs={6} key={ind}>
                                    <ProductCard1
                                        title={item.name}
                                        category_keyword = {item.categoryKeyword}
                                        imgUrl={item.image}
                                        price={item.price}
                                        id={item.keyword}
                                        rating={item.rating}
                                        is_favourite={item.is_favorites}
                                        shopName={item.shopName}
                                        shopKeyword={item?.shopKeyword}
                                    />
                                </Grid>
                            ))}
                         </Grid>
                        {wishlist?.datas?.last_page!==1
                            ?
                            <FlexBox
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            mt="32px"
                        >
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
                    : ""}



        </div>
    );
};

export default ProductCard2List;
