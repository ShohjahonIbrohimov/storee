import React, {Fragment, useEffect, useState} from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";
import {useDispatch, useSelector} from "react-redux";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import Button from "@component/buttons/Button";
import Icon from "@component/icon/Icon";
import axios from "axios";
import Cookies from "js-cookie"
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";
import one_shop_orders from "../../../Redux/Actions/one_shop_orders";
import {FormattedMessage} from "react-intl";
import { BASE_URL } from "@component/Variables";
export interface VendorOrderListProps {}

const VendorOrderList: React.FC<VendorOrderListProps> = () => {
  let orders = useSelector((state:any)=>state.token.one_shop_orders);
  let user = useSelector((state:any)=>state.token.user)
  const [data2,setdata2] = useState(orders)
  const dispatch = useDispatch()
  let router =  useRouter()
  let {page} =router.query
  let lang = router.locale
  useEffect(() => {
      let currency_text = typeof Cookies.get("currency_id") === "undefined" ? "" : `currency=${Cookies.get("currency_id")}`
      let token = Cookies.get("token")
    axios({
        url:`${BASE_URL}/shops/orders-list/${user?.data?.is_shops ? user?.data?.is_shops : "" }/${lang}${typeof page=== "undefined" ? "?" : `?page=${page}&`}${currency_text}`,
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response=>{
          dispatch(one_shop_orders(response.data))
          setdata2(response.data)
        })
        .catch(()=>{
          return;
        })
  }, [page,Cookies.get("lang"),Cookies.get("currency_id")]);
  return (
    <Fragment>
      {orders?.length === 0 ? <div style={{textAlign: "center"}}>
          <FormattedMessage
            id="none_orders"
          />
          </div> 
          :
          <>
          <Hidden down={769}>
            <TableRow padding="0px 18px" boxShadow="none" bg="none">
              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                  <FormattedMessage
                    id="Order_#"
                    defaultMessage="Buyurtma #"
                  />
              </H5>
              <H5 color="text.muted" my="0px" mx="6px"  textAlign="left">
                  <FormattedMessage
                    id="Status"
                    defaultMessage="Xolati"
                  />
              </H5>
              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                  <FormattedMessage
                    id="Date Purchased"
                    defaultMessage="Sotib Olingan"
                  />
              </H5>
              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                  <FormattedMessage
                    id="Total"
                    defaultMessage="Umumiy"
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
        {data2?.datas?.data?.length !==0 ?
            <>
                {data2?.datas?.data?.map((item, ind) => (
                    <OrderRow item={item} key={ind} detail={true} />
                ))}
                {data2?.datas?.last_page !== 1
                  ?
                  <FlexBox justifyContent="center" mt="2.5rem">
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
                          pageCount={data2.lastPage}
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
            ""
        }


      </>
      }
    </Fragment>
  );
};

// const orderList = [
//   {
//     orderNo: "1050017AS",
//     status: "Pending",
//     purchaseDate: new Date(),
//     price: 350,
//     href: "/vendor/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Processing",
//     purchaseDate: new Date(),
//     price: 500,
//     href: "/vendor/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Delivered",
//     purchaseDate: "2020/12/23",
//     price: 700,
//     href: "/vendor/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Delivered",
//     purchaseDate: "2020/12/23",
//     price: 700,
//     href: "/vendor/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Cancelled",
//     purchaseDate: "2020/12/15",
//     price: 300,
//     href: "/vendor/orders/5452423",
//   },
// ];


export default VendorOrderList;
