import React, {useState} from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import Button from "@component/buttons/Button";
import Icon from "@component/icon/Icon";
import ReactPaginate from "react-paginate";
import axios from "axios";
import get_shop_products from "../../../Redux/Actions/get_product_shop";
import {useDispatch, useSelector} from "react-redux";
import { BASE_URL } from "@component/Variables";


const ProductCard1List = () => {
    const dispatch = useDispatch()
    const data = useSelector((state:any)=>state.new.one_shop_products)
    const [wishlist,setdata2] = useState(data)
    const handlePageChange = async (url) => {
        let url2 = Number.parseInt(url.selected) +Number.parseInt("1")
        console.log(url2)
        axios.get(`${BASE_URL}/flowers/shop-flowers/2/ru?page=${url2}`)
            .then(response=>{
                dispatch(get_shop_products(response.data))
                setdata2(response.data)
            })
            .catch(error=>{
                console.log(error)
            })
    };
  return (
    <div>
      <Grid container spacing={6}>
        {wishlist.datas ? wishlist.datas.data.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ProductCard1 title={item.name} imgUrl={item.image} price={item.price} shopKeyword={item?.shopKeyword} id={item.keyword} rating={0} />
          </Grid>
        )) : ""}
      </Grid>

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

export default ProductCard1List;
