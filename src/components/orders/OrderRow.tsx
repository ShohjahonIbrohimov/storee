import useWindowSize from "@hook/useWindowSize";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface OrderRowProps {
  item?: {
    orderId?: any;
    status?: number;
    statusName?: string;
    delivery_time?: string | Date;
    total_price?: number;

  };
  detail?:boolean
}

const OrderRow: React.FC<OrderRowProps> = ({ item ,detail}) => {
  let width = useWindowSize()
  const getColor = (status) => {
    switch (status) {
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "success";
      case 4:
        return "secondary"
      default:
        return "";
    }
  };
  if(width < 650){
    return (
        <Link  href={detail ? `/vendor/orders/${item.orderId}` : `/orders/${item?.orderId}`}>
          <a className="text-transformation-none shop_orders_table" href={detail ? `/vendor/orders/${item.orderId}` : `/orders/${item?.orderId}`}  >
            <H5 m="6px" textAlign="left" className="order_h5">
              {item.orderId}
            </H5>
            <Box  textAlign="left" className="shop_order_status_name" >
              <Chip  p="0.25rem 1rem" className={`bg2-${getColor(item.status)} ${!detail ? "order_class4" : "shop_order4"}`}>
                <Small >{item.statusName}</Small>
              </Chip>
            </Box>
            <Typography className="flex-grow pre shop_order_delivery_price" m="6px" textAlign="left">
              {item.delivery_time}<br/>{ width < 700  ? item.total_price : ""}
            </Typography>
            {width >700 ?
                <Typography m="6px" textAlign="left" style={{wordBreak:"break-word"}}>
                  {item.total_price}
                </Typography>
                :
                ""}

            <Hidden flex="0 0 0 !important" down={769}>
              <Typography textAlign="center" color="text.muted">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
              </Typography>
            </Hidden>
          </a>
        </Link>
    );
  }
  else{
    return (
        <Link  href={detail ? `/vendor/orders/${item.orderId}` : `/orders/${item?.orderId}`}>
          <TableRow as="a" className="text-transformation-none shop_orders_table" href={detail ? `/vendor/orders/${item.orderId}` : `/orders/${item?.orderId}`} my="1rem" padding="6px 18px">
            <H5 m="6px" textAlign="left" className="order_h5">
              {item.orderId}
            </H5>
            <Box  textAlign="left" className="shop_order_status_name" >
              <Chip  p="0.25rem 1rem" className={`bg2-${getColor(item.status)} ${!detail ? "order_class4" : "shop_order4"}`}>
                <Small >{item.statusName}</Small>
              </Chip>
            </Box>
            <Typography className="flex-grow pre shop_order_delivery_price" m="6px" textAlign="left">
              {item.delivery_time}<br/>{ width < 700  ? item.total_price : ""}
            </Typography>
            {width >700 ?
                <Typography m="6px" textAlign="left" style={{wordBreak:"break-word"}}>
                  {item.total_price}
                </Typography>
                :
                ""}

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
    );
  }

};

export default OrderRow;
