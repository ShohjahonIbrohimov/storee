import { useRouter } from "next/router";
import React, { useState} from "react";
import Button from "../buttons/Button";
import Grid from "../grid/Grid";
import InputMask from "react-input-mask";
import Typography from "../Typography";
import {useDispatch, useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import Map3 from "../map3";
import Cookies from "js-cookie"
import axios from "axios";
import {useAppContext} from "@context/app/AppContext";
import get_cart_products from "../../../Redux/Actions/get_cart_products";
import get_order_id from "../../../Redux/Actions/get_order_id";
import {FormattedMessage, useIntl} from "react-intl";
import get_current_product from "../../../Redux/Actions/get_current_product";
import { BASE_URL } from "@component/Variables";
import Postcard from "@component/postcard";
import { Card1 } from "@component/Card1";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { StaticDateTimePicker } from "@mui/lab";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { addMinutes } from "date-fns";

export interface CheckoutFormProps {
    postcard_visible?:boolean,
    deliveryTime?:any
  }


const CheckoutForm:React.FC<CheckoutFormProps> = ({postcard_visible,deliveryTime})=>{
  const router = useRouter();
  let intl = useIntl()
  console.log(addMinutes(new Date(Date.now()),parseInt(deliveryTime)));
  
  let current_product = useSelector((state:any)=>state.token.current_product)
  let postcard = useSelector((state:any)=>state.token.postcard_text)
  const user = useSelector((state:any)=>state.token.user)
  const [name,setname] = useState(user?.data?.fullname)
  const [phone,setphone] = useState(user?.data?.phone)
  const [coordinates,setcoordinates] = useState(null)
  const [message,setmessage] = useState("")
  const [cash_or_card,setpayment] = useState("Naqd")
  const [date,setdata] = useState(undefined)
  let [address,setaddress] = useState("")
  const dispatch2 = useDispatch()
  let [open2,setopen2] = useState(false)
  // Changing cart state
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
    const handleCartAmountChange = (amount,product) =>  {
        console.log("Header")
        dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: {
                ...product,
                imgUrl:product.image,
                id:product.keyword,
                qty: amount,
            },
        });
    }
  const handleFormSubmit = async (values) => {

      values.preventDefault()
      let token = Cookies.get("token")
      let lang = Cookies.get("lang")
      const data = new FormData()

      data.append('is_order', '1');
      data.append("cash_or_card",cash_or_card)
      data.append("delivery_time",date?.toLocaleDateString("ru-Ru",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric"}))
      data.append("address",address)
      data.append("card",postcard)
      data.append("keyword",current_product)
      data.append('name', name);
      data.append('phone', phone);
      if(coordinates?.length  === 0 || typeof coordinates === "undefined" || coordinates || coordinates === null){
         setmessage(intl.formatMessage({id:"Iltimos yetkazib berish joyini tanlang"}))
      }
      else{
          data.append('coordinate_x', coordinates[0]);
          data.append('coordinate_y', coordinates[1]);
      }
      if(typeof date === "undefined"){
        setmessage(intl.formatMessage({id:"choose_delivery_time"}))
      }
      else if(Cookies.get("isLoggedIn") === "true"){
        let url = current_product === "" ? `${BASE_URL}/orders/set-orders/${lang}` : `${BASE_URL}/orders/buy-now/ru`
        if(coordinates === null){
            setmessage(intl.formatMessage({id:"choose_place_map"}))
        }
        else{
            axios( {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    "Authorization":`Bearer ${token}`
                },
                data : data
            })
                .then((res)=>{
                    if(res?.data?.errors === "true" || res?.data?.errors === true) {
                        return;
                    }
                    else{
                        setmessage(intl.formatMessage({id:"successfully_booked"}))
                        dispatch2(get_order_id(res.data))
                        //Checking cart
                        let lang4
                        const lang2 = router.locale|| "uz";
                        const token = Cookies.get("token")
                        if(typeof lang2 !== "undefined"){
                            lang4 = lang2
                        }
                        else{
                            lang4 = "uz"
                        }
                        if(Cookies.get("isLoggedIn") === "true" && current_product === ""){
                            axios({
                                method:"GET",
                                url:`${BASE_URL}/orders/basket-list/${lang4}`,
                                headers:{
                                    "Authorization":`Bearer ${token}`
                                }
                            })
                                .then(response =>{

                                    try{
                                        if(current_product === ""){
                                            cartList.forEach(product=>handleCartAmountChange2(0,product))
                                            dispatch2(get_cart_products(response.data));
                                            response.data.products.map(product=>handleCartAmountChange(product.count,product))
                                        }
                                    }
                                    catch{
                                        return;
                                    }
                                })
                                .catch(errors2=>{
                                    console.log(errors2)
                                })
                        }
                        dispatch2(get_current_product(""))
                        router.push("/review")
                    }
                })
                .catch(()=>{
                    return;
            })
        }
    }

    else{
        if(current_product === "") {
            cartList.forEach((value, index) => {
                data.append(`products[${index}][keyword]`, value.id);
                data.append(`products[${index}][count]`, value.qty);
            })
        }
        else{
            data.append("keyword",current_product)
        }
        let url = current_product === "" ? `${BASE_URL}/orders/set-orders/${lang}` : `${BASE_URL}/orders/buy-now/${lang}`
        axios( {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
            },
            data : data
        })
            .then((res)=>{
                if(res?.data?.errors){
                    setmessage(intl.formatMessage({id:"error_booking"}))

                }else{
                    dispatch2(get_order_id(res?.data))
                    setmessage(intl.formatMessage({id:"successfully_booked"}))
                    if(current_product === ""){
                        cartList.forEach(product=>handleCartAmountChange2(0,product))
                    }
                    dispatch2(get_current_product(""))
                    router.push("/review")
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
  };

  return (

        <form onSubmit={handleFormSubmit}>
          <Card1 mb="2rem" className="shadow-none">
            <div className="col-12 mx-0 px-0">
                <Typography className="fw-bold h6" fontWeight="600" mb="1rem">
                    <FormattedMessage id="Order Details" defaultMessage="Buyurtma tafsilotlari " />
                </Typography>
            </div>
            <div className="col-md-12 mx-0 px-0">
                <div className="row">
                    <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xl-6">
                      <label>
                          <FormattedMessage
                              id="Name"
                              defaultMessage="Ismingiz"
                          />
                      </label>
                      <input
                          required={true}
                          type="text"
                          value={name}
                          className="form-control"
                          onChange={(e)=>setname(e.target.value)}
                      />
                    </div>
                  <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xl-6 mt-3 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0">
                    <label htmlFor="number">
                        <FormattedMessage id="phone_number" defaultMessage="Telefon Nomer" />
                    </label>
                  
                    <InputMask
                        mask="+\9\9\8-99-999-99-99"
                        onChange={(e)=>setphone(e.target.value)}
                        value={phone}
                        required={true}
                    >
                      {()=>(
                          <input
                              type="text"
                              required={true}
                              className="form-control"
                              placeholder={"+998-xx-xxx-xx-xx"}
                              name="number"
                          />
                      )}
                    </InputMask><br/>
                  </div>
                    <div className="col-md-12">
                        <label>
                            <FormattedMessage
                                id="Delivery Time"
                                defaultMessage="Yetkazib berish vaqti"
                            />
                        </label>
                
                        <input 
                            type="datetime" 
                            placeholder={intl.formatMessage({id:"choose_delivery_time"})}
                            value={typeof date === "undefined" ? "" : new Date(date)?.toLocaleDateString("ru-Ru",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric"})}
                            className="form-control" 
                            readOnly={true} 
                            onClick={()=>setopen2(!open2)}
                        />
                        <Dialog
                            open={open2}
                            onClose={()=>setopen2(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDateTimePicker
                                        ampm={false}
                                        minDateTime={addMinutes(Date.now(),parseInt(deliveryTime))}
                                        // minTime={addMinutes(Date.now(),parseInt(deliveryTime))}
                                        mask="__/__/____ __:__"
                                        displayStaticWrapperAs="desktop"
                                        disableCloseOnSelect={true}
                                        openTo="day"
                                        value={new Date(date)}
                                        inputFormat="dd/mm/yyyy hh:ss"
                                        onChange={(newValue) => {
                                        setdata(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={()=>setopen2(false)} autoFocus>
                                Ok
                            </Button>
                            </DialogActions>
                        </Dialog>
                        {/* <DatePicker
                            minDate={new Date()}
                            maxDate={addYears(new Date(),30)}
                            type="datetime-local"
                            selected={date}
                            required={true}
                            className="form-control"
                            onChange={(date)=>setdata(date)}
                            placeholderText="dd/mm/yyyy"
                            dropdownMode = "select"
                            dateFormat="dd/MM/yyyy"
                        /> */}
                    </div>
                    <div className="col-md-12 col-12 col-sm-12  col-lg-12  col-xl-12 py-2 mt-2">
                        <div className="row">
                            <div className="col-12 fw-bold h6">
                                <FormattedMessage
                                    id="payment_methods"
                                    defaultMessage="Tolov Turi"
                                />
                            </div>
                            <div className="col-6">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="check1">
                                        <input
                                            checked={cash_or_card !== "Plastik" ? true : false}
                                            type="radio"
                                            required={true}
                                            onClick={()=>setpayment("Naqd")}
                                            className="form-check-input"
                                            id="check1"
                                            name="option2"
                                            value="Naqd"
                                        />
                                        <FormattedMessage
                                            id="Cash"
                                            defaultMessage="Naqd Pul"
                                        />
                                    </label>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="check2">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            onClick={()=>setpayment("Plastik")}
                                            id="check2"
                                            name="option2"
                                        />
                                        <FormattedMessage
                                            id="Cards"
                                            defaultMessage="Plastik Karta"
                                        />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                   {
                       postcard_visible 
                       ? 
                            <div className="col-12 mb-3">
                                <Postcard />
                            </div>
                        :
                        ""
                   }

                    <div className="col-md-12 col-12 col-sm-12  col-lg-12  col-xl-12 ">
                        <label>
                            <FormattedMessage
                                id="your_address"
                                defaultMessage="Sizning Addresingiz"
                            />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={intl.formatMessage({id:"address"})}
                            value={address}
                            required={true}
                            onChange={(e)=>setaddress(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 col-12 col-sm-12  col-lg-12  col-xl-12 pt-2 ">
                        <label>
                            <FormattedMessage
                                id="your_address_map"
                                defaultMessage="Sizning manzilingiz(kartadan belgilang)"
                            />
                        </label>
                        <Map3 set={(e)=>setcoordinates(e)} coordinate={coordinates}/>
                    </div>

                  </div>
                </div>
          </Card1>

            <Grid container spacing={7}>
                <Grid item sm={12} xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullwidth
                    >
                        <FormattedMessage
                            id="book"
                            defaultMessage="Xarid qilish"
                        />
                    </Button>
                    {message === "" ? "" : <div className="text-danger"> {message}</div>}
                </Grid>
            </Grid>
        </form>
  );
};
              {/*  <TextField*/}
              {/*    name="shipping_zip"*/}
              {/*    label="Zip Code"*/}
              {/*    type="number"*/}
              {/*    fullwidth*/}
              {/*    mb="1rem"*/}
              {/*    onBlur={handleBlur}*/}
              {/*    onChange={handleChange}*/}
              {/*    value={values.shipping_zip || ""}*/}
              {/*    errorText={touched.shipping_zip && errors.shipping_zip}*/}
              {/*  />*/}
              {/*  <TextField*/}
              {/*    name="shipping_address1"*/}
              {/*    label="Address 1"*/}
              {/*    fullwidth*/}
              {/*    onBlur={handleBlur}*/}
              {/*    onChange={handleChange}*/}
              {/*    value={values.shipping_address1 || ""}*/}
              {/*    errorText={*/}
              {/*      touched.shipping_address1 && errors.shipping_address1*/}
              {/*    }*/}
              {/*  />*/}
              {/*</Grid>*/}
              {/*<Grid item sm={6} xs={12}>*/}
              {/*  <TextField*/}
              {/*    name="shipping_email"*/}
              {/*    label="Email Address"*/}
              {/*    type="email"*/}
              {/*    fullwidth*/}
              {/*    mb="1rem"*/}
              {/*    onBlur={handleBlur}*/}
              {/*    onChange={handleChange}*/}
              {/*    value={values.shipping_email || ""}*/}
              {/*    errorText={touched.shipping_email && errors.shipping_email}*/}
              {/*  />*/}
              {/*  <TextField*/}
              {/*    name="shipping_company"*/}
              {/*    label="Company"*/}
              {/*    fullwidth*/}
              {/*    mb="1rem"*/}
              {/*    onBlur={handleBlur}*/}
              {/*    onChange={handleChange}*/}
              {/*    value={values.shipping_company || ""}*/}
              {/*    errorText={*/}
              {/*      touched.shipping_company && errors.shipping_company*/}
              {/*    }*/}
              {/*  />*/}
              {/*  <Select*/}
              {/*    mb="1rem"*/}
              {/*    label="Country"*/}
              {/*    options={countryList}*/}
              {/*    value={values.shipping_country || "US"}*/}
              {/*    onChange={(country) => {*/}
              {/*      setFieldValue("shipping_country", country);*/}
              {/*    }}*/}
              {/*    errorText={*/}
              {/*      touched.shipping_country && errors.shipping_country*/}
              {/*    }*/}
              {/*  />*/}
              {/*  <TextField*/}
              {/*    name="shipping_address2"*/}
              {/*    label="Address 2"*/}
              {/*    fullwidth*/}
              {/*    onBlur={handleBlur}*/}
              {/*    onChange={handleChange}*/}
              {/*    value={values.shipping_address2 || ""}*/}
              {/*    errorText={*/}
              {/*      touched.shipping_address2 && errors.shipping_address2*/}
              {/*    }*/}
              {/*  />*/}


          {/*<Card1 mb="2rem">*/}
          {/*  <Typography fontWeight="600" mb="1rem">*/}
          {/*    Billing Address*/}
          {/*  </Typography>*/}

          {/*  <CheckBox*/}
          {/*    label="Same as shipping address"*/}
          {/*    color="secondary"*/}
          {/*    mb={sameAsShipping ? "" : "1rem"}*/}
          {/*    onChange={handleCheckboxChange(values, setFieldValue)}*/}
          {/*  />*/}

          {/*  {!sameAsShipping && (*/}
          {/*    <Grid container spacing={7}>*/}
          {/*      <Grid item sm={6} xs={12}>*/}
          {/*        <TextField*/}
          {/*          name="billing_name"*/}
          {/*          label="Full Name"*/}
          {/*          fullwidth*/}
          {/*          mb="1rem"*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_name || ""}*/}
          {/*          errorText={touched.billing_name && errors.billing_name}*/}
          {/*        />*/}
          {/*        <TextField*/}
          {/*          name="billing_contact"*/}
          {/*          label="Phone Number"*/}
          {/*          fullwidth*/}
          {/*          mb="1rem"*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_contact || ""}*/}
          {/*          errorText={*/}
          {/*            touched.billing_contact && errors.billing_contact*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <TextField*/}
          {/*          name="billing_zip"*/}
          {/*          label="Zip Code"*/}
          {/*          type="number"*/}
          {/*          fullwidth*/}
          {/*          mb="1rem"*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_zip || ""}*/}
          {/*          errorText={touched.billing_zip && errors.billing_zip}*/}
          {/*        />*/}
          {/*        <TextField*/}
          {/*          name="billing_address1"*/}
          {/*          label="Address 1"*/}
          {/*          fullwidth*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_address1 || ""}*/}
          {/*          errorText={*/}
          {/*            touched.billing_address1 && errors.billing_address1*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </Grid>*/}
          {/*      <Grid item sm={6} xs={12}>*/}
          {/*        <TextField*/}
          {/*          name="billing_email"*/}
          {/*          label="Email Address"*/}
          {/*          type="email"*/}
          {/*          fullwidth*/}
          {/*          mb="1rem"*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_email || ""}*/}
          {/*          errorText={touched.billing_email && errors.billing_email}*/}
          {/*        />*/}
          {/*        <TextField*/}
          {/*          name="billing_company"*/}
          {/*          label="Company"*/}
          {/*          fullwidth*/}
          {/*          mb="1rem"*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_company || ""}*/}
          {/*          errorText={*/}
          {/*            touched.billing_company && errors.billing_company*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <Select*/}
          {/*          mb="1rem"*/}
          {/*          label="Country"*/}
          {/*          options={countryList}*/}
          {/*          errorText={*/}
          {/*            touched.billing_country && errors.billing_country*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <TextField*/}
          {/*          name="billing_address2"*/}
          {/*          label="Address 2"*/}
          {/*          fullwidth*/}
          {/*          onBlur={handleBlur}*/}
          {/*          onChange={handleChange}*/}
          {/*          value={values.billing_address2 || ""}*/}
          {/*          errorText={*/}
          {/*            touched.billing_address2 && errors.billing_address2*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  )}*/}
          {/*</Card1>*/}



// const initialValues = {
//   shipping_name: "",
//   shipping_email: "",
//   shipping_contact: "",
//   shipping_company: "",
//   shipping_zip: "",
//   shipping_country: "",
//   shipping_address1: "",
//   shipping_address2: "",
//
//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_zip: "",
//   billing_country: "",
//   billing_address1: "",
//   billing_address2: "",
// };

// const checkoutSchema = yup.object().shape({
//   // shipping_name: yup.string().required("required"),
//   // shipping_email: yup.string().email("invalid email").required("required"),
//   // shipping_contact: yup.string().required("required"),
//   // shipping_zip: yup.string().required("required"),
//   // shipping_country: yup.object().required("required"),
//   // shipping_address1: yup.string().required("required"),
//   // billing_name: yup.string().required("required"),
//   // billing_email: yup.string().required("required"),
//   // billing_contact: yup.string().required("required"),
//   // billing_zip: yup.string().required("required"),
//   // billing_country: yup.string().required("required"),
//   // billing_address1: yup.string().required("required"),
// });

export default CheckoutForm;
