import Box from "@component/Box";
import { useRouter } from "next/router";
import React from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";
import { useSelector } from "react-redux";

const CompanyDashboardNavigation = () => {
  let router = useRouter()
  let {asPath} = router
  let footer_sections = useSelector((state:any)=>state.new.footer)
  const linkList = [];
  console.log(footer_sections);
  
    if(footer_sections.length !==0){
        footer_sections.about_company?.map(one=>
            linkList.push(
                {
                    href: `/company/${one.keyword}`,
                    title: one.name,
                },
            )
        )
        footer_sections.services?.map(one=>
            linkList.push(
                {
                    href: `/company/${one.keyword}`,
                    title: one.name,
                },
            )
        )
    }
    
  return (
    <DashboardNavigationWrapper px="0px" py="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <StyledDashboardNav
          isCurrentPath={asPath===item.href}
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


export default CompanyDashboardNavigation;
