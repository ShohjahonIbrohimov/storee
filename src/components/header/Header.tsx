import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import { useAppContext } from "@context/app/AppContext";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import MiniCart from "../mini-cart/MiniCart";
import SearchBox from "../search-box/SearchBox";
import Login from "../sessions/Login";
import Sidenav from "../sidenav/Sidenav";
import {Tiny} from "../Typography";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import logout from "../../../Redux/Actions/LogoutAction";
import {useRouter} from "next/router";
import Cookies  from "js-cookie"
import "bootstrap/dist/css/bootstrap.min.css"
import StyledSearchBox from "@component/search-box/SearchBoxStyle";
// import TextField from "@component/text-field/TextField";
import { AccountCircle, Favorite, HelpRounded, ShoppingCart} from "@material-ui/icons";
import axios from "axios";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import get_cart_products from "../../../Redux/Actions/get_cart_products";
import Icon from "@component/icon/Icon";
import {FormattedMessage} from "react-intl";
import change_modal_status from "../../../Redux/Actions/change_modal_status";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import CheckStatus from "@component/OrderStatus/CheckStatus";
import { BASE_URL } from "@component/Variables";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));



type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({  className }) => {
  const router = useRouter()
  const info = useSelector((state:any)=>state.new.company_info)
  // let currency = useSelector((state:any)=>state.token.current_currency)
  const dispatch2 = useDispatch()
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const { state, dispatch } = useAppContext();
  const { cartList } = state.cart;
  const user2 = useSelector((state:any)=>state.token.user)
  const cart = useSelector((state:any)=>state.new.cart_products)
  const [user,setuser] = useState(user2)
  let [isloggedin,setloggedin] = useState("false");
  let modal = useSelector((state:any)=>state.new.modal)
  useEffect(() => {
      setloggedin(Cookies.get("isLoggedIn"));
      let lang
      let token = Cookies.get("token")
      let lang2 = router.locale|| "uz"
      if(typeof lang2 !== "undefined"){
          lang = lang2
      }
      else{
          lang = "uz"
      }

      axios({
          method:"GET",
          url:`${BASE_URL}/profile/max-value/${lang}`,
          headers:{
              "Authorization":`Bearer ${token}`
          }
      })
          .then(response2=>{
              if(response2.data?.data?.phone){
                  dispatch2(fetch_user_info(response2.data))
                  setuser(response2.data)
                  console.log("Header");
                  Cookies.remove("isLoggedIn")
                  Cookies.set("isLoggedIn","true",{expires:1})
              }
              else if(response2.data?.errors){
                  Cookies.remove("isLoggedIn")
                  Cookies.remove("token")
                  Cookies.set("isLoggedIn","false",{expires:1})
                  setloggedin("false")
              }
          })
  }, [isloggedin,Cookies.get("isLoggedIn"),Cookies.get("token")]);


  //-----------------------------------------------------
  let classes = useStyles();
  const [open2, setOpen2] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router2 = useRouter()
    let shop2;
  try {
      shop2 = user2.data?.is_shops
  }
  catch (e){
      try{
          let loggedin = Cookies.get("isLoggedIn") || "false";
          if(loggedin === "true" && user.errors){
              dispatch2(logout())
              Cookies.remove("isLoggedIn")
              Cookies.set("isLoggedIn","false",{expires:1})
              // router2.push("/")
              shop2=null
          }
      }
      catch(r){
            return;
      }
  }
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
    const handleCartAmountChange = (amount,product) =>  {
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                ...product,
                id:product.keyword,
                imgUrl:product.image,
                qty: amount,
            },
        });
    }
    useEffect(()=>{
        if(Cookies.get("isLoggedIn") === "true"){
            cart?.products?.map(product=>handleCartAmountChange(product.count,product))
        }
    },[cart])
const handleremovecart = () =>{
    try{
        cartList.forEach((value)=>{handleCartAmountChange2(0,value)})
    }
    catch{
        return;
    }
    let lang4
    const lang2 = Cookies.get("lang") || "uz";
    const token = Cookies.get("token")
    let currency_text = typeof Cookies.get("currency_id") === "undefined" ? "" : `?currency=${Cookies.get("currency_id")}`
    if(typeof lang2 !== "undefined"){
        lang4 = lang2
    }
    else{
        lang4 = "uz"
    }
    if(Cookies.get("isLoggedIn") === "true"){
        axios({
            method:"GET",
            url:`${BASE_URL}/orders/basket-list/${lang4}${currency_text}`,
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
  const handleclick = () =>{
      let token = Cookies.get("token")
      axios({
          method:"POST",
          url:`${BASE_URL}/login/logout`,
          headers:{
              "Authorization":`Bearer ${token}`
          }
      })
          .then(()=>{
                  Cookies.remove("isLoggedIn")
                  Cookies.remove("token")
                  dispatch2(logout())
                  dispatch2(fetch_user_info([]))
                  handleremovecart()
                  handleremovecart()
              

                  setloggedin("false")
                  if(router2.pathname.startsWith("/profile") ||router2.pathname.startsWith("/vendor") || router.pathname.startsWith("/wish-list")){
                  //--------------------- Clearing data from carts---------------------------

                      router2.push('/')

                  }

          })
          .catch(()=>{
              return;
          })


  }
  const handleToggle = () => {
    setOpen2((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen2(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen2(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open2);
  React.useEffect(() => {
    if (prevOpen.current === true && open2 === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open2;
  }, [open2]);
  //-----------------------------------------------------

  const cartHandle = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton style={{
                            zIndex: 0,
                            background: "rgba(255, 255, 255, 0)",
                            marginLeft:"-12px"
                        }}
                  color="text.muted"
                  bg="white"
                 >
          <ShoppingCart style={{fontSize:"25px",color:"#ae99d2"}} />
          <div style={{fontSize:"small",fontWeight:"lighter",}}>
              <FormattedMessage id="cart" defaultMessage="Savatcha"  />
          </div>
      </IconButton>

      {!!cartList.length && (
        <FlexBox
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="3px"
        >
          <Tiny color="white" fontWeight="600">
            {cartList.length}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );

  const wishlisthandle = (
    <FlexBox ml="20px" alignItems="flex-start">
        <IconButton
            style={{
                zIndex: 0,
                background: "rgba(255, 255, 255, 0)",
                marginLeft:"-12px"
            }}
            color="text.muted"
            bg="white"
            onClick={()=>router.push("/wish-list")}
        >


            <Favorite style={{fontSize:"25px",color:"#ae99d2"}} />
            <div style={{fontSize:"small",fontWeight:"lighter",}}>
                <FormattedMessage
                    id="wishlist"
                    defaultMessage="Sevimlilar"
                />
            </div>
        </IconButton>

      {!!user2?.data?.favoritesCount  && (
        <FlexBox
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="3px"
        >
          <Tiny color="white" fontWeight="600">
           {user2?.data?.favoritesCount}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );
  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <Image
                  src={info.logo}
                  className="logo_image"
                  alt="logo"
              />
            </a>
          </Link>
        </FlexBox>

        <FlexBox  flex="1 1 0">
          <SearchBox />
        </FlexBox>

        <FlexBox
            className="header-right"
            alignItems="right"
        >
           <FlexBox flex="1 1 0">
               <Box
                   position="relative"
                   flex="1 1 0"
                   maxWidth="200px"
                   mx="auto"
               >
                   <StyledSearchBox>
                       <>
                           {/*<TextField*/}
                           {/*    style=*/}
                           {/*        {{*/}
                           {/*            display:"block",*/}
                           {/*            backgroundColor:"white",*/}
                           {/*            cursor:"context-menu",*/}
                           {/*            paddingLeft:'40px',*/}
                           {/*            paddingRight:'10px',*/}
                           {/*            borderColor:"white",*/}
                           {/*            zIndex:0,*/}
                           {/*            background: "rgba(255, 255, 255, 0)",*/}
                           {/*            marginTop:"10px"*/}
                           {/*        }}*/}
                           {/*     disabled={true}*/}
                           {/*    readOnly={true}*/}
                           {/*    fullwidth*/}
                           {/*/>*/}
                       </>
                   </StyledSearchBox>
               </Box>
           </FlexBox>

            <IconButton
                onClick={()=>dispatch2(change_modal_status(!modal))}
                style=
                    {{
                        zIndex:0,
                        background: "rgba(255, 255, 255, 0)",
                        marginLeft:"-5px",
                        width:"112px",
                        overflowX:"hidden",
                        borderRadius:"0px",
                        wordBreak:"keep-all",
                        wordWrap:"revert"
                    }}
                color="text.muted"
                bg="white"
            >
                <Icon style={{fontSize:"25px",marginLeft:"2px",left:"40%",position:"relative",marginBottom:"1px"}}>
                    order_s
                </Icon>
                <div
                    style={{
                        fontSize:"small",
                        fontWeight:"lighter",
                        marginLeft:"2px",
                        whiteSpace:"nowrap",
                    }}
                >
                    <FormattedMessage
                        id="order_status"
                        defaultMessage="Buyurtma xolati"
                    />
                </div>

            </IconButton>

            <Modal  isOpen={modal} toggle={()=>dispatch2(change_modal_status(!modal))} className="modal-dialog-centered">
                <ModalHeader toggle={()=>dispatch2(change_modal_status(!modal))}><FormattedMessage id="order_status" defaultMessage="Buyurtma holati" /></ModalHeader>
                <ModalBody >
                    <CheckStatus />
                </ModalBody>
            </Modal>
            {isloggedin === "true" ?
                <>
                    {wishlisthandle}
                </>
                :
                ""
            }
            <Sidenav
                handle={cartHandle}
                position="right"
                open={open}
                width={380}
                toggleSidenav={toggleSidenav}
            >
                <MiniCart toggleSidenav={toggleSidenav}  />
            </Sidenav>
            {isloggedin === "true" ?
                (
                    <div className={classes.root}>
                        <div>
                            <Button
                                ref={anchorRef}
                                aria-controls={open2 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <IconButton className="hover_button_user"  style=
                                                 {{
                                                     zIndex: 0,
                                                         background: "rgba(255, 255, 255, 0)",
                                                     width:"70px",
                                                     overflowX:"hidden",
                                                     borderRadius:"0px",
                                                     wordBreak:"keep-all",
                                                     wordWrap:"revert",
                                                     color:"#ae99d2"
                                                 }}

                                             bg="white" p="4px">
                                    <style jsx>{`
                                        .hover_button_user :hover{
                                            background-color: white;
                                            color: white;
                                        }
                                      `}</style>
                                    <AccountCircle style={{fontSize:"25px",marginLeft:"0px",color:"#ae99d2"}} />
                                    <div style={{fontSize:"small",fontWeight:"lighter",color:"black",width:"60px"}} color="text.muted" >
                                      <div
                                          className="text-secondary"
                                      >
                                          <FormattedMessage
                                              id="desktop_navigation_cabinet"
                                              defaultMessage="Kabinet"
                                          />
                                      </div>

                                    </div>
                                </IconButton>

                            </Button>
                            <Popper
                                open={open2}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style=
                                            {{
                                                transformOrigin: placement === 'bottom'
                                                    ?
                                                        'center top'
                                                    :
                                                        'center bottom'
                                            }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleClose}
                                            >
                                                <MenuList
                                                    id="menu-list-grow"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <MenuItem
                                                        style={{
                                                            padding:"0px",
                                                            margin:"0px"
                                                        }}
                                                    >
                                                        <div style=
                                                                 {{
                                                                     width:"100%",
                                                                     padding:"20px",
                                                                     fontSize:"small"
                                                                 }}
                                                        >
                                                            <label
                                                                style={{
                                                                    fontSize:"large"
                                                                }}
                                                            >
                                                                <FormattedMessage
                                                                    id="hi"
                                                                    defaultMessage="Salom"
                                                                />  {user2?.data?.fullname
                                                                        ?
                                                                             user2?.data?.fullname
                                                                        :
                                                                             user2?.data?.phone
                                                                      }
                                                            </label><br/>
                                                            <FormattedMessage
                                                                id="balance"
                                                                defaultMessage="Balans"
                                                            /> {user?.data?.balance
                                                                ?
                                                                    user?.data?.balance
                                                                :   0
                                                            } <FormattedMessage id="sum" defaultMessage="So'm" />
                                                        </div>
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={()=>router.push("/profile/edit")}
                                                    >
                                                        <Icon
                                                            variant="small"
                                                            defaultcolor="currentColor"
                                                            mr="10px"
                                                        >
                                                            user-profile
                                                        </Icon>
                                                         <FormattedMessage
                                                             id="my_profile"
                                                             defaultMessage="Mening profilim"
                                                         />
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={()=>router.push(shop2 !== null
                                                                    ?
                                                                        "/vendor/products/page/1"
                                                                    :
                                                                        "/vendor/create"
                                                                )}
                                                    >
                                                        <Icon
                                                            variant="small"
                                                            defaultcolor="currentColor"
                                                            mr="10px"
                                                        >
                                                            crown
                                                        </Icon>
                                                        {shop2 ?
                                                                 <FormattedMessage
                                                                     id="shop"
                                                                     defaultMessage="Mening dokonlarim"
                                                                 />
                                                               :
                                                                 <FormattedMessage
                                                                     id="create_shop"
                                                                     defaultMessage="Magazin Yaratish"
                                                                 />
                                                        }
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={handleclick}
                                                    >
                                                    <Icon
                                                        variant="small"
                                                        defaultcolor="currentColor"
                                                        mr="10px"
                                                    >
                                                        logout
                                                    </Icon>
                                                        <FormattedMessage
                                                            id="logout"
                                                            defaultMessage="Chiqish"
                                                        />
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </div>

                ) :  <UserLoginDialog
                    handle={
                        <div>
                            <IconButton
                                bg="white"
                                color="text.muted"
                                style={{
                                    zIndex:0,
                                    background: "rgba(255, 255, 255, 0)"
                                }}
                            >
                                <AccountCircle
                                    style={{fontSize:"25px",color:"#ae99d2"}}
                                />
                                <div
                                    style=
                                        {{
                                            fontSize:"small",
                                            fontWeight:"lighter",
                                            width:"70px",
                                            overflowX:"hidden",
                                            borderRadius:"0px",
                                            wordBreak:"keep-all",
                                            wordWrap:"revert"
                                        }}
                                >
                                    <div
                                        className="text-secondary"
                                    >
                                        <FormattedMessage
                                            id="user"
                                            defaultMessage="Kirish"
                                        />
                                    </div>
                                </div>
                            </IconButton>
                        </div>
                    }
                >
                    <Box>
                        <Login/>
                    </Box>
                </UserLoginDialog>}
            <Link href="/help">
                <IconButton
                    style=
                        {{
                            zIndex:0,
                            background: "rgba(255, 255, 255, 0)",
                            marginLeft:"-5px",
                            width:"70px",
                            overflowX:"hidden",
                            borderRadius:"0px",
                            wordBreak:"keep-all",
                            wordWrap:"revert"
                        }}
                    color="text.muted"
                    bg="white"
                >
                    <HelpRounded
                        style={{
                            fontSize:"25px",
                            marginLeft:"2px",
                            color:"#ae99d2"
                        }}
                    />
                    <div
                        style={{
                            fontSize:"small",
                            fontWeight:"lighter",
                            marginLeft:"2px"
                        }}
                    >
                        <FormattedMessage
                            id="help"
                            defaultMessage="Yordam"
                        />
                    </div>

                </IconButton>

            </Link>


        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
