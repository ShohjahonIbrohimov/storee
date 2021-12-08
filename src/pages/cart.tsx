import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import React, {Fragment, useEffect, useState} from "react";
import Button from "../components/buttons/Button";
import { Card1 } from "../components/Card1";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import TextField from "../components/text-field/TextField";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetch_user_info} from "../../Redux/Actions/Action";
import CheckoutForm from "@component/checkout/CheckoutForm";
import CheckoutSummary from "@component/checkout/CheckoutSummary";
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import Postcard from "@component/postcard";
import Cookies from "js-cookie"
import { NextSeo } from "next-seo";
import Loading from "@component/Loading";
import Accordions_Cart from "@component/accordions2";
const Cart = ({data}) => {
  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;
  let lang = Cookies.get("lang")
  let [loading,setloading] = useState(false)
  let change = useSelector((state:any)=>state.new.CartIsChanged)
  let loaded_cart = useSelector((state:any)=>state.new.CartLoadedFully)
  let [cartThings,setcartthings] = useState({
  data:[],
    totalProductPrice:"",
    totalDelivery:"",
    totalPrice:"",
    discount:"",
    deliveryTime:""
  })
  
  let utils = useIntl()
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  let fetch_basket_list_panel = ()=>{
   
    let currency_id = Cookies.get("currency_id")
    let currency_text = typeof currency_id === "undefined" ? "" : `?currency=${currency_id}`
    if(cartList.length === 0){
     setcartthings({data:[],totalDelivery:"0",totalPrice:"0",totalProductPrice:"0",discount:"0",deliveryTime:"0"})
    }
    else{
     axios({
       url:`${BASE_URL}/orders/basket-list-panel/${lang}${currency_text}`,
       method:"POST",
       data:{flowers:cartList}
     })
     .then(res=>{
         setcartthings(res.data)
     })
     .catch(()=>null)
  }
}
  useEffect(()=>{
    let currency_id = Cookies.get("currency_id")
    let currency_text = typeof currency_id === "undefined" ? "" : `?currency=${currency_id}`
    if(cartList.length === 0){
     setcartthings({data:[],totalDelivery:"0",totalPrice:"0",totalProductPrice:"0",discount:"0",deliveryTime:"0"})
    }
    else{
     axios({
       url:`${BASE_URL}/orders/basket-list-panel/${lang}${currency_text}`,
       method:"POST",
       data:{flowers:cartList}
     })
     .then(res=>{
         setcartthings(res.data)
     })
     .catch(()=>null)
  }
  },[change,loaded_cart,Cookies.get("lang")])
  

  return (
    <CheckoutNavLayout>
      <NextSeo
          title={utils.formatMessage({id:"cart"})}
      />
      {loading ? 
        <Loading />
        :
        <Fragment>
        <Grid container spacing={6}>
          <Grid item lg={8} md={8} xs={12}>
            <Accordions_Cart
              fetch_basket_list_panel={()=>fetch_basket_list_panel()}
              setcartthings = {(e)=>setcartthings(e)}
              setloading={(e)=>setloading(e)}
              data={cartThings.data}
              cartThings={cartThings.data}
            />
          {/* <Accordion defaultActiveKey="0">
          {cartThings?.data?.map((thing:any,ind)=>{
              return(<Accordion.Item eventKey={ind.toString()}>
              <Accordion.Header className="w-100">{thing.name} </Accordion.Header>
              <Accordion.Body>
                        {thing?.products?.map((item) => (
                          <div className="shadow-none">
                            <ProductCard7
                              key={item.id}
                              mb="1.5rem"
                              id={item.keyword}
                              name={item.name}
                              qty={item.count}
                              price={item.price}
                              imgUrl={item.image}
                              categoryKeyword={item.categoryKeyword}
                              totalPrice = {item?.totalPrice}
                              fetch_basket_list = {()=>fetch_basket_list_panel()}
                              setloading={(e)=>setloading(e)}
                              setcartthings = {(e)=>setcartthings(e)}
                              cart={cartThings}
                            />
                            <Divider/>
                          </div>
                          
                        ))}
                        <H4 className="w-100 text-right delivery_cost_cart">
                        <FormattedMessage id="Shipping" />: {thing?.delivery_money || 0}
                        </H4>
              </Accordion.Body>
            </Accordion.Item>)
          })}
          </Accordion> */}
           
            <div className="mb-4 mt-4">
              <Card1 className="pb-4">
                <Postcard/>
              </Card1>

            </div>
            <div className="mb-4 rounded-3 d-block d-sm-block d-md-none d-lg-none d-xl-none " id="checkout_summary">
              <div className="row justify-content-end ">
                <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-12">
                    <div className="mb-4">
                          <CheckoutSummary data={cartThings}  />
                      </div>
                      <Card1>
                        <TextField placeholder={utils.formatMessage({id:"Voucher"})} readOnly={true} fullwidth />

                        <Button
                          variant="outlined"
                          color="primary"
                          mt="1rem"
                          mb="0px"
                          fullwidth
                        >
                          <FormattedMessage
                            id="Apply Voucher"
                            defaultMessage="Vaucherni ishlatish"
                          />
                        </Button>



                      </Card1>
                </div>
              </div>
            </div>


          <Grid item lg={12} md={12} xs={12}>
            <CheckoutForm deliveryTime={cartThings?.deliveryTime} postcard_visible={false}  />
          </Grid>

          </Grid>
          <Grid item lg={4} md={4} xs={12} className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
            <div className="mb-3">
                <CheckoutSummary  data={cartThings}  />
            </div>
            <Card1>
              <TextField placeholder={utils.formatMessage({id:"Voucher"})} readOnly={true} fullwidth />

              <Button
                variant="outlined"
                color="primary"
                mt="1rem"
                mb="0px"
                fullwidth
              >
                <FormattedMessage
                  id="Apply Voucher"
                  defaultMessage="Vaucherni ishlatish"
                />
              </Button>

            </Card1>

          </Grid>
        </Grid>
      </Fragment>  
    }
    </CheckoutNavLayout>
  );
};

Cart.getInitialProps = async (ctx) =>  {
  let {token,lang} = cookies(ctx)
  console.log("Token:",token)
  const request2 = await axios({
    method:"GET",
    url:`${BASE_URL}/profile/max-value/${lang}`,
    headers:{
      "Authorization":`Bearer ${token} `
    },
  })
  const answer = await request2.data;
  return {data:answer}
}
export default Cart;
