import React from "react";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import {FormattedMessage} from "react-intl";
export type CheckoutProps = {
  data?:{
    data?:any,
    totalProductPrice?:string,
    totalDelivery?:string,
    totalPrice?:string,
    discount?:string
  }
}
const CheckoutSummary: React.FC<CheckoutProps> = ({data}) => {
    return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">
            <FormattedMessage id="Subtotal" />:
        </Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
              {data?.totalProductPrice}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">
            <FormattedMessage id="Shipping" />:
        </Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {data?.totalDelivery}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint"><FormattedMessage id="Discount" defaultMessage="Chegirma" />:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {data?.discount}
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />


      <Typography

        fontSize="25px"
        fontWeight="600"
        lineHeight="0.5"
        textAlign="right"
        mb="-0.3rem"
      >
        {data?.totalPrice}
      </Typography>
    </Card1>
  );
};

export default CheckoutSummary;
