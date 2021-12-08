import Box from "@component/Box";
import { useRouter } from "next/router";
import React, {Fragment} from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import {H5} from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";
import {useDispatch, useSelector} from "react-redux";
import logout from "../../../Redux/Actions/LogoutAction"
import Avatar from "@component/avatar/Avatar";
import axios from "axios";
import Cookies from "js-cookie"
import { useAppContext } from "@context/app/AppContext";
import get_cart_products from "../../../Redux/Actions/get_cart_products";
import useWindowSize from "@hook/useWindowSize";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import {useIntl} from "react-intl";
import change_modal_status from "../../../Redux/Actions/change_modal_status";
import { BASE_URL } from "@component/Variables";
const CustomerDashboardNavigation = () => {
  const user2 = useSelector((state:any)=>state.token.user)
  let modal = useSelector((state:any)=>state.new.modal)
  const dispatch2 = useDispatch()
  const width = useWindowSize()
  const router = useRouter();
  let intl = useIntl()
  //Cart Things
  const { state, dispatch } = useAppContext();
  const { cartList } = state.cart;
  const handleCartAmountChange2 = (amount,product) =>  {
    console.log("Header")
    dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
            ...product,
            qty: amount,
        },
    });
}
  const handleremovecart = () =>{
    try{
        cartList.forEach((value)=>{handleCartAmountChange2(0,value)})
    }
    catch{
        return;
    }
    const lang4 = Cookies.get("lang") || "uz";
    const token = Cookies.get("token")
    if(Cookies.get("isLoggedIn") === "true"){
        axios({
            method:"GET",
            url:`${BASE_URL}/orders/basket-list/${lang4}`,
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
            .then(response =>{
                dispatch2(get_cart_products(response.data))
            })
            .catch(errors2=>{
                console.log(errors2)
            })
    }
}
  const logout2 = () =>{
    let token = Cookies.get("token")
    axios({
      method:"POST",
      url:`${BASE_URL}/login/logout`,
      headers:{
          "Authorization":`Bearer ${token}`
      }
    })
          .then(()=>{
                  Cookies.remove("isLoggedIn");
                  Cookies.remove("token");
                  dispatch2(logout());
                  dispatch2(fetch_user_info([]));
                  handleremovecart();
                  handleremovecart();
               
                  if(router.pathname.startsWith("/profile") ||router.pathname.startsWith("/vendor") || router.pathname.startsWith("/wish-list")){
                  //--------------------- Clearing data from carts---------------------------
                      router.push('/')
                  }

          })
          .catch(()=>{
              return;
          })


  }
  if(user2?.errors){
    let loggedin = Cookies?.get("isLoggedIn") || "false"
    if(loggedin === "true" && !Cookies.get("token")){
      console.log("Google ");
      dispatch2(logout())
      router.push("/")
    }
  }

  const {pathname}  = useRouter();

    //LinkLists
  const linkList = [
  {
    title: "",
    list: [
        {
        href: "/profile/edit",
        title:intl.formatMessage({id:"edit_p"}),
        iconName: "user-profile",

      },
        {
        href: user2?.data?.is_shops ? "/vendor/products/page/1" : "/vendor/create",
        title:user2?.data?.is_shops !== null ? intl.formatMessage({id:"business_account"})  : intl.formatMessage({id:"create_shop"}),
        iconName: "crown",

      },
        {
        href: "/wish-list",
        title:intl.formatMessage({id:"wishlist"}),
        iconName: "heart",

      },
      {
        href:"/orders/page/1",
        title:intl.formatMessage({id:"orders"}),
        iconName:"cart",
      },
    ],
  },

];
const linkList2 = [
    {
    title:"",
    list: [
      {
        href: "/profile/budget",
        title: intl.formatMessage({id:"hisob"}),
        iconName: "money-transfer",

      },

      {
        href: "/document",
        title:intl.formatMessage({id:"document"}),
        iconName: "file",

      },
        {
        href: "/terms_deliver",
        title: intl.formatMessage({id:"deliver"}),
        iconName: "truck",
      },
        {
        href: "/help",
        title: intl.formatMessage({id:"need_help"}),
        iconName: "help",
      },
    ],
  },
]
//linklists

    return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
       <FlexBox p="14px 32px"  alignItems="center">
              <Avatar src={user2?.data?.avatar ? user2?.data?.avatar  :"https://api.dana.uz/storage/images/noimg.jpg" } size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{user2?.data?.fullname ? user2?.data?.fullname : user2?.data?.phone}</H5>
                  </div>
                </FlexBox>
              </Box>
            </FlexBox><br/>

      {linkList.map((item) => (
        <Fragment key={item.title}>

          {item.list.map((item) => (
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
          <StyledDashboardNav
              onClick={()=>dispatch2(change_modal_status(!modal))}
              isCurrentPath={false}
              href="#"
              key={intl.formatMessage({id:"order_status"})}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    order_s2
                  </Icon>
                </Box>
                <span>{intl.formatMessage({id:"order_status"})}</span>
              </FlexBox>

            </StyledDashboardNav>
        </Fragment>
      ))}
      {linkList2.map((item) => (
        <Fragment key={item.title}>

          {item.list.map((item) => (
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

            {width < 650 ? 
            <StyledDashboardNav
            // isCurrentPath={pathname.includes("/profile")}
            href="#"
            key="Log Out"
            px="1.5rem"
            mb="1.25rem"
          >
              <div onClick={logout2}>
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                        logout
                    </Icon>
                  </Box>
                  <span>{intl.formatMessage({id:"logout"})} </span>
                </FlexBox>
                </div>
          </StyledDashboardNav>
          : 
          ""  
          }

        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
  }


export default CustomerDashboardNavigation;
