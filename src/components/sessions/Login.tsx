import { useFormik } from "formik";
import axios from "axios"
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Button from "../buttons/Button";
import { H3, H5 } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-phone-number-input/style.css'
import {useDispatch} from "react-redux"
import { get_token} from "../../../Redux/Actions/Action"
import {close_login} from "../../../Redux/Actions/LoginModel";
import Cookies from "js-cookie"
import get_cart_products from "../../../Redux/Actions/get_cart_products";
import {useAppContext} from "@context/app/AppContext";
import {FormattedMessage, useIntl} from "react-intl";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { BASE_URL, FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from "@component/Variables";


const Login2: React.FC = () => {
  const router = useRouter()
  const [telephonenumber, Settelephonenumber] = useState(" ");
  const [errors2, seterrors2] = useState(" ")
  const [errors3, seterrors3] = useState(" ")
  const [change,setchange] = useState(false)
  const [button,setbutton] = useState(true)
  const [code,setcode] = useState(undefined)
  const [error,seterror] = useState(" ")
  let intl = useIntl()

const responseFacebook = (response) => {
  let data  = new FormData()
  data.append("phone",response?.phone)
  data.append("id",response?.id)
  data.append("fio",response?.name)
  data.append("email",response?.email)
  data.append("type","2")
  axios({
      method:"POST",
      url:`${BASE_URL}/login/social-set`,
      headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
      },
      data:data
  })
      .then(response=>{
            
            let today = new Date()
            let day = today.getUTCDate()
            today.setDate(day+30)
            Cookies.remove("token")
            Cookies.remove("isLoggedIn")
            document.cookie =`token=${response.data.access_token}; path=/; expires=${today}`;
            document.cookie = `isLoggedIn=true; path=/; expires=${today}`;
            dispatch2(get_token(response.data.access_token))
            dispatch2(close_login())
              if(response.data.errors){
                  return ;
                }
              else{
                    //--------------------- Clearing data from carts---------------------------
                   handleremovecart()
                   router.push(router.asPath)
              }
      })
      .catch(()=>{
          return;
      })
}
 const responseGoogle = (response) => {
  let data  = new FormData()
  console.log(response);
  
  data.append("phone",response?.profileObj?.phone)
  data.append("id",response?.googleId)
  data.append("fio",response?.profileObj?.name)
  data.append("email",response?.profileObj?.email)
  data.append("type","1")
  axios({
      method:"POST",
      url:`${BASE_URL}/login/social-set`,
      headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
      },
      data:data
  })
      .then(response=>{
           
            let today = new Date()
            let day = today.getUTCDate()
            today.setDate(day+30)
            Cookies.remove("token")
            Cookies.remove("isLoggedIn")
            document.cookie =`token=${response.data.access_token}; path=/; expires=${today}`;
            document.cookie = `isLoggedIn=true; path=/; expires=${today}`;
            dispatch2(get_token(response.data.access_token))
            dispatch2(close_login())
            if(response.data.errors){
                return ;
            }
            else{
                //--------------------- Clearing data from carts---------------------------
                handleremovecart()
                router.push(router.asPath)
            }
      })
      .catch(()=>{
          return;
      })


 }
  const dispatch2 = useDispatch()
  const handle222222 = (event) => {
    event.preventDefault()
    const phone = event.target.value.slice(1,17);
    const x = phone.replace(/-/g,"")
    const x2 = x.replace(/_/g,"")
    const isValid = x2.length === 12 ? true : false
    if(isValid) {
      const phone_number = event.target.value.toString().replace(/-/g,"")
      Settelephonenumber(phone_number)
      seterrors2("")
    }
    else {
      if (event.target.value === "") {

        seterrors2(intl.formatMessage({id:"input_phone"}))
      }
      else {
        seterrors2(intl.formatMessage({id:"correct_phone"}))
      }
    }

  }
  const handlecode = (event) => {
    event.preventDefault();
    if(event.target.value.length === 4){
        seterrors3("")
        setcode(event.target.value)

    }
    else{
      seterrors3(intl.formatMessage({id:"correct_password"}))
    }
  }
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
    const handleremovecart = () =>{
        try{
            if(Cookies.get("isLoggedIn") === true){
                cartList.forEach((value)=>{handleCartAmountChange2(0,value)})
            }
        }
        catch{
            return;
        }
        let lang4
        const lang2 = Cookies.get("lang") || "uz";
        const token = Cookies.get("token")
        if(typeof lang2 !== "undefined"){
            lang4 = lang2
        }
        else{
            lang4 = "uz"
        }
        let currency_text = typeof Cookies.get("currency_id") === "undefined" ? "" : `?currency=${Cookies.get("currency_id")}`
        if(Cookies.get("isLoggedIn") === "true"){
            axios({
                method:"GET",
                url:`${BASE_URL}/orders/basket-list/${lang4}${currency_text}`,
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
                .then(response =>{
                    dispatch2(get_cart_products(response.data));
                    try{
                        cartList.forEach(product=>handleCartAmountChange2(0,product))
                        response.data.products.map(product=>handleCartAmountChange(product.count,product))
                    }
                    catch{
                        return;
                    }
                })
                .catch(errors2=>{
                    console.log(errors2)
                })
        }
    }
  const handleSubmit4 = (e) =>{
    e.preventDefault()
    axios({
      url: `${BASE_URL}/login/auth`,
      method: "POST",

      data: { "phone": telephonenumber,"code": code},
    })
        .then(response=>{
           
            let today = new Date()
            let day = today.getUTCDate()
            today.setDate(day+30)
            Cookies.remove("token")
            Cookies.remove("isLoggedIn")
            document.cookie =`token=${response.data.access_token}; path=/; expires=${today}`;
            document.cookie = `isLoggedIn=true; path=/; expires=${today}`;
            dispatch2(get_token(response.data.access_token))
            dispatch2(close_login())
            if(response.data.errors){
                return ;
            }
            else{
                //--------------------- Clearing data from carts---------------------------
                handleremovecart()
                router.push(router.asPath)
            }
          // router.push("/profile")
        })
        .catch(errors =>{
          console.log(errors)
          seterror(intl.formatMessage({id:"correct_password"}))
        })


  }
  const handleSubmit5 = (e) => {
    e.preventDefault();
    axios({
      url: `${BASE_URL}/login/verify`,
      method: "POST",
      headers: {
        'content-type': 'application/json',
        "Accept": "application/json"
      },
      data: { "phone": telephonenumber },
    })
      .then(() => {
        setchange(true)
        setbutton(true)
        setTimeout(()=>{
            setbutton(false)
        },60 * 1000)

      })
  }


  const handleFormSubmit = async (values) => {
    router.push("/profile");
    console.log(values);
  };

  const {
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (

      <StyledSessionCard
          mx="auto"
          my="2rem"
          boxShadow="large"
      >
      {change ? (
            <div>
              <form
                  className="content"
                  onSubmit={handleSubmit4}
              >
                  <H3
                      textAlign="center"
                      mb="0.5rem"
                  >
                     <FormattedMessage
                         id="welcome_login"
                     />
                  </H3>
                  <H3
                    fontWeight="600"
                    fontSize="15px"
                    color="green"
                    textAlign="center"
                    mb="2.25rem"
                  >
                      <FormattedMessage
                          id='input_sms'
                          defaultMessage="Kodni kiriting"
                      />
                  </H3>
                  <label
                      htmlFor="number"
                  >
                      <FormattedMessage
                          id="kod"
                      />
                  </label>
                  <InputMask
                      mask="9999"
                      onChange={handlecode}
                  >
                    {(inputProp)=>(
                       <input
                           {...inputProp}
                           type="tel"
                           className="form-control"
                           placeholder="____"
                           name="kod"
                       />
                    )}
                  </InputMask>

                  {errors3 === " " ? "" : (
                  <div
                      style={{ color: "red" }}
                  >
                      {errors3}
                  </div>)}
                  {error!== " " ?
                          <div
                              style={{color:"red"}}
                          >
                              {error}
                          </div>
                      :
                        ""
                  }
                  <br />
                  <Button
                      disabled={errors3 !== ""}
                      mb="0.6rem"
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullwidth
                  >
                      <FormattedMessage
                          id="send"
                          defaultMessage="Jo'natish"
                      />
                  </Button>

                {button ? (
                            <div className="mb-2">
                                <FormattedMessage
                                    id="send_ask_again"
                                    defaultMessage="Kodni qaytadan jo'natishni 1 minutdan so'ng so'rashingiz mukin " />
                            </div>
                          )
                        :
                        ""
                }
                <div className="d-flex justify-content-between">
                    <Button
                      onClick={()=>setchange(false)}

                      mb="1.65rem"
                      variant="contained"
                      className="bg-success text-white w-50 mr-1"
                      type="submit"

                  >
                    <FormattedMessage
                        id="go_back"
                    />
                  </Button>
                  <Button
                      className="w-50 ml-1 px-0"
                      onClick={handleSubmit5}
                      disabled={button === true}
                      mb="1.65rem"
                      variant="contained"
                      color="primary"
                      type="submit"

                  >
                    <FormattedMessage
                        id="send_again"
                    />
                  </Button>
                </div>
                </form>

            </div>
          ):
          (
                <form
                    className="content"
                    onSubmit={handleSubmit5}
                >
                  <H3
                      textAlign="center"
                      mb="0.5rem"
                  >
                      <FormattedMessage
                          id="welcome_login"
                      />

                  </H3>

                  <H5
                    fontWeight="600"
                    fontSize="12px"
                    color="gray.800"
                    textAlign="center"
                    mb="2.25rem"
                  >
                      <FormattedMessage
                          id="login_phone"
                      />

                  </H5>
                    <div className="pt-0 mt-0 mb-2" style={{marginLeft:"-7px",marginRight:"0px"}}>
                        <div className="row justify-content-between p-0">
                            <div className="col-6" >
                                <GoogleLogin
                                    autoLoad={false}
                                    clientId={GOOGLE_CLIENT_ID}
                                    onSuccess={(r)=>responseGoogle(r)}
                                    onFailure={()=>null}
                                    className="w-100 py-1 shadow-none border border-muted"
                                    render={renderProps=>(
                                        <button
                                            type="button"
                                            className="btn w-100 rounded-0  ml-2 border border-muted"
                                            style={{paddingBottom:"9px",paddingTop:"9px"}}
                                            onClick={renderProps.onClick}
                                        >
                                            <div
                                                className="d-inline text-left float-left pl-2"
                                                style={{marginTop:"-2px"}}
                                            >
                                                Google
                                            </div>
                                            <img
                                                className="float-right"
                                                style={{marginTop:"2px"}}
                                                src="/assets/images/google.svg"
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    )}
                                  />
                            </div>
                            <div className="col-6 ">
                                <FacebookLogin
                                    appId={FACEBOOK_APP_ID}
                                    fields="name,email,picture"
                                    callback={(t)=>responseFacebook(t)}
                                    className="m-0 p-0"
                                     render={renderProps=>(
                                        <button
                                            type="button"
                                            className="btn w-100 py-1 rounded-0   border border-muted"
                                            onClick={renderProps.onClick}
                                        >
                                            <div
                                                className="d-inline text-left float-left "
                                                style={{marginTop:"3px"}}
                                            >
                                                Facebook
                                            </div>
                                            <img
                                                className="float-right"
                                                style={{marginTop:"2px"}}
                                                src="/assets/images/Facebook-rounded.svg"
                                                width={30}
                                                height={30}
                                            />
                                        </button>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                  <label
                      htmlFor="number"
                  >
                      <FormattedMessage
                          id="phone_number"
                      />
                  </label>
                  <InputMask
                  mask="+\9\9\8-99-999-99-99"
                  onChange={handle222222}
                  >
                    {()=>(
                      <input
                          type="text"
                          className="form-control"
                          placeholder={"+998-__-___-__-__"}
                          name="number"
                      />
                    )}
                  </InputMask>

                  {errors2 === " " ? "" : (
                      <div
                          style={{ color: "red" }}
                      >
                          {errors2}
                      </div>)}
                  <br />
                  <Button
                      disabled={errors2 !== ""}
                      mb="1.65rem"
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullwidth
                  >
                      <FormattedMessage
                          id="send_message"
                      />


                  </Button>
                    <br/>

                </form>
          )
      }

      <br />
    </StyledSessionCard>

  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login2;