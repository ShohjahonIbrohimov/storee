import React from "react";
import FlexBox from "../FlexBox";
import ProductCard9 from "../product-cards/ProductCard9";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import get_search_results from "../../../Redux/Actions/get_search_results";
import Button from "@component/buttons/Button";
import Icon from "@component/icon/Icon";
import ReactPaginate from "react-paginate";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import { BASE_URL } from "@component/Variables";

export interface ProductCard9ListProps {}

const ProductCard10List: React.FC<ProductCard9ListProps> = () => {
    const dispatch = useDispatch()
    const data = useSelector((state:any)=>state.new.search_results)
    const wishlist = data
    const handlePageChange = async (url) => {
        let url2 = Number.parseInt(url.selected) +Number.parseInt("1")
        console.log(url2)
        axios.get(`${BASE_URL}/flowers/search/ru?page=${url2}`)
            .then(response=>{
                dispatch(get_search_results(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    };
    return (
        <div>
            {wishlist.datas && wishlist.datas.data.length !== 0 ? wishlist.datas.data.map((item, ind) => (
                <ProductCard9
                    mb="1.25rem"
                    key={ind}
                    keyword={item.keyword}
                    imgUrl={item.image}
                    rating={item.rating}
                    off={0}
                    price={item.price}
                    title={item.name}
                    is_favorite={item.is_favorites}
                    shopName={item.shopName}
                />
            )) : ""}

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
                        pageCount={wishlist.lastPage}
                        marginPagesDisplayed={true}
                        pageRangeDisplayed={false}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        subContainerClassName="pages pagination"
                        activeClassName="active"
                        disabledClassName="disabled"
                    />
                </StyledPagination>
            </FlexBox>
        </div>
    );
};

export default ProductCard10List;
