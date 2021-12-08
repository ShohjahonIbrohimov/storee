import React, {useEffect, useState} from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
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
import {useIntl} from "react-intl";
import {FormattedMessage} from "react-intl";
import {useRouter} from "next/router";
import get_personal_orders from "../../../Redux/Actions/get_personal_orders";
import { BASE_URL } from "@component/Variables";
export interface CustomerOrderListProps {}

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {
  const orders = useSelector((state:any)=>state.token.personal_orders);
  let intl = useIntl();
  let router = useRouter();
  let {page} = router.query;
  const [data2,setdata2] = useState(orders);
  const dispatch = useDispatch()
  useEffect(() => {
      let currency_text = typeof Cookies.get("currency_id") === "undefined" ? "" : `currency=${Cookies.get("currency_id")}`
      let lang = Cookies.get("lang")
      let token = Cookies.get("token")
    axios({
        url:`${BASE_URL}/orders/personal-order-list/${lang}${typeof page=== "undefined" ? "?" : `?page=${page}&`}${currency_text}`,
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response=>{
          dispatch(get_personal_orders(response.data))
          setdata2(response.data)
        })
        .catch(()=>{
          return;
        })
  }, [page,Cookies.get("lang"),Cookies.get("currency_id")]);
  return (
    <div>
      <DashboardPageHeader title={intl.formatMessage({id:"My Orders"})} iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow  padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            <FormattedMessage
                id="Order"
                defaultMessage="Buyurtmalar"
            /> #
          </H5>
          <H5 color="text.muted" my="0px" mx="6px"  textAlign="left">
              <FormattedMessage
                  id="Status"
                  defaultMessage="Status"
              />

          </H5>
          <H5 color="text.muted" my="0px" mx="6px"  textAlign="left">
              <FormattedMessage
                  id="Date Purchased"
                  defaultMessage="Sotib olingan vaqti"
              />
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" mr="-40px" textAlign="left">
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

      { data2?.datas?.data.length !==0 ?
          <>
          {data2?.datas?.data?.map((item, ind) => (
            <OrderRow  item={item} key={ind} detail={false} />
          ))}
          {data2?.datas?.last_page !==1 
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
                      onPageChange={(r)=> {
                          router.push(`/orders/page/${r.selected+1}`)
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
          </> : ""}


    </div>
  );
};


export default CustomerOrderList;
