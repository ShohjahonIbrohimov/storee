import { Chip } from "@component/Chip";
import { useAppContext } from "@context/app/AppContext";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import StyledMobileNavigationBar from "./MobileNavigationBar.style";
import Cookies from  "js-cookie"
import {useIntl} from "react-intl";
import {FormattedMessage} from "react-intl";
const MobileNavigationBar: React.FC = () => {
  const width = useWindowSize();
  const { state } = useAppContext();
  const { cartList } = state.cart;
  const href2 = Cookies.get("isLoggedIn") === "true" ? "/profile/edit" : "/register"
  let intl = useIntl()
  const list = [
  {
    title: intl.formatMessage({id:"mobile_navigation_home"}),
    icon: "home",
    href: "/",
  },
  {
    title: intl.formatMessage({id:"mobile_navigation_category"}),
    icon: "category",
    href: "/mobile-category-nav",
  },
  {
    title: intl.formatMessage({id:"cart"}),
    icon: "cart",
    href: "/mobile-cart",
  },
];
  return (
    width <= 900 && (
      <StyledMobileNavigationBar>
        {list.map((item) => (
          <NavLink className="link" href={item.href} key={item.title}>
            <Icon className="icon" variant="small">
              {item.icon}
            </Icon>
            {item.title}

            {item.icon === "cart" && !!cartList.length && (
              <Chip
                bg="primary.main"
                position="absolute"
                color="primary.text"
                fontWeight="600"
                px="0.25rem"
                top="4px"
                left="calc(50% + 8px)"
              >
                {cartList.length}
              </Chip>
            )}
          </NavLink>
        ))}
          <NavLink
              className="link"
              href={href2}
              key="Account"
          >
            <Icon
                className="icon"
                variant="small"
            >
              user-2
            </Icon>
              <FormattedMessage
                  id="mobile_navigation_account"
                  defaultMessage="Akkount"
              />
          </NavLink>
      </StyledMobileNavigationBar>
    )
  );
};



export default MobileNavigationBar;
