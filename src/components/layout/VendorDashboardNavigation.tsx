import Box from "@component/Box";
import { useRouter } from "next/router";
import React from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";
import {useIntl} from "react-intl";
import Avatar from "@component/avatar/Avatar";
import {H5} from "@component/Typography";
import {useSelector} from "react-redux"

const VendorDashboardNavigation = () => {
  let userInfo = useSelector((state:any)=>state.token.user)
  const { pathname } = useRouter();
  let intl = useIntl();
  const linkList = [
  {
    href: "/vendor/products/page/1",
    title:intl.formatMessage({id:"Products"}),
    iconName: "box",
  },
  {
    href: "/vendor/add-product",
    title: intl.formatMessage({id:"add_new_product"}),
    iconName: "upload",
  },
  {
    href: "/vendor/orders/page/1",
    title: intl.formatMessage({id:"orders"}),
    iconName: "shopping-cart",
  },
  {
    href: "/vendor/account-settings",
    title: intl.formatMessage({id:"account_settings"}),
    iconName: "gear-2",
  },
];

  return (
    <DashboardNavigationWrapper px="0px" py="1.5rem" color="gray.900">
      <FlexBox p="14px 32px"  alignItems="center">
        <Avatar src={userInfo?.data?.avatar ? userInfo?.data?.shopImage  :"https://api.dana.uz/storage/images/noimg.jpg" } size={64} />
        <Box ml="12px" flex="1 1 0">
          <FlexBox
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
          >
            <div>
              <H5 my="0px">{userInfo?.data?.shopName}</H5>
            </div>
          </FlexBox>
        </Box>
      </FlexBox><br/>
      {linkList.map((item) => (
        <StyledDashboardNav
          isCurrentPath={pathname.includes(item.href)}
          href={item.href}
          key={item.title}
          px="1.5rem"
          mb="1.25rem"
        >
          <FlexBox alignItems="center">
            <Box className="dashboard-nav-icon-holder">
              <Icon variant="small" defaultcolor="currentColor" mr="10px">
                {item.iconName}
              </Icon>
            </Box>
            <span>{item.title}</span>
          </FlexBox>
        </StyledDashboardNav>
      ))}
    </DashboardNavigationWrapper>
  );
};


export default VendorDashboardNavigation;
