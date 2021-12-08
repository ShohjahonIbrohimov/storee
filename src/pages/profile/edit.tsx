import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import {fetch_user_Failure} from "../../../Redux/Reducers/Action2";
import { Formik } from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import cookies from "next-cookies"
import Cookies from "js-cookie"
import {FormattedMessage, useIntl} from "react-intl";
import { addYears} from "date-fns";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import {StaticDatePicker} from "@mui/lab";
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
const ProfileEditor = ({data}) => {
  let intl = useIntl();
  let router = useRouter()
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(fetch_user_info(data));
  },[])
  let user = useSelector((state:any)=>state.token.user)
    console.log(user)
  const [fullname,setfullname] = useState("");
  const [birthdate,setbirthdate] = useState(new Date());
  const [gender,setgender] = useState("");
  const [address,setaddress] = useState("");
  const [image,setimage] = useState(undefined);
  const [avatar,setavatar] = useState("");
  const [gender_error,setgender_error] = useState("");
  const [message,setmessage] = useState("");
    // const [fullname,setfullname] = useState(user?.errors   ? "" : user?.data?.fullname);
    // const [birthdate,setbirthdate] = useState(user?.errors && user?.data?.birthday ? new Date() : new Date(user?.data?.birthday ? data?.data?.birthday : new Date() ));
    // const [gender,setgender] = useState(user?.errors ? "" :user?.data?.gender);
    // const [address,setaddress] = useState(user?.errors ? "" :user?.data?.address);
    // const [image,setimage] = useState(undefined);
    // const [avatar,setavatar] = useState(user?.errors ? "" :user?.data?.avatar);
    // const [gender_error,setgender_error] = useState("");
    // const [message,setmessage] = useState("");
  let [open2,setopen2] = useState(false)
    useEffect(()=>{
        setfullname(user?.data?.fullname)
        setbirthdate(user?.errors && user?.data?.birthday ? new Date() : new Date(user?.data?.birthday ? data?.data?.birthday : new Date() ))
        setgender(user?.data?.gender)
        setaddress(user?.data?.address)
        setavatar(user?.data?.avatar)
    },[user])
  useEffect(() => {
      userInformationFetch()
    }, []);
  let lang = router.locale
  let userInformationFetch = () =>{
      const token2 = Cookies.get("token");
     
        axios({
            method:"GET",
            url:`${BASE_URL}/profile/max-value/${lang}`,
            headers:{
                "Authorization":`Bearer ${token2}`
            },
        })
            .then(response =>{
                dispatch(fetch_user_info(response.data))
            })
            .catch(errors2=>{
                dispatch(fetch_user_Failure(errors2.data))
            })
  }
  const handleFormSubmit2 = (event) => {
    event.preventDefault()
    
    const formData = new FormData()
    formData.append("fio",fullname);
    formData.append("birth_day",birthdate.toLocaleDateString())
    formData.append("gender",gender)
    formData.append("address",address)
    if(typeof image !== typeof "asdasd"){
        formData.append('image', image);
    }
    if(gender === "" || gender === null){
            setgender_error("Iltimos jinsingizni kiriting")
      }
  else {
          const token2 = Cookies.get("token")
          axios({
              method: "POST",
              url: `${BASE_URL}/profile/update/${lang}`,
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token2}`,
              },
              data: formData
          })
              .then(response => {
                  setmessage("Malumotlaringiz muvaffaqiyatli o'zgartirildi!!")
                  setTimeout(()=>{
                        setmessage("")
                  },3000)
                  dispatch(fetch_user_info(response.data))
              })
              .catch(() => {
                  return;
              })
      }
  };

  return (
    <DashboardLayout title={intl.formatMessage({id:"edit_p",defaultMessage:"Profilni tahrirlash"})}>
      <NextSeo 
        title={intl.formatMessage({id:"edit_p",defaultMessage:"Profilni tahrirlash"})}
      />
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title={intl.formatMessage({id:"edit_p",defaultMessage:"Profilni tahrirlash"})}

      />

      <Card1>
      {message!== "" ? <div className=" alert text-dark fixed-top" style={{textAlign:'center',backgroundColor:"lavender",marginTop:"-10px"}}>{message}</div> : ""}
        <FlexBox alignItems="flex-end" mb="22px">
          <Avatar src={avatar} size={64} />

          <Box ml="-20px" zIndex={1}>
            <label htmlFor="profile-image">
              <Button
                as="span"
                size="small"
                bg="gray.300"
                color="secondary"
                height="auto"
                p="6px"
                borderRadius="50%"
              >
                <Icon>camera</Icon>
              </Button>
            </label>
          </Box>
          <Hidden>
            <input
              className="hidden"
              onChange=
              {
                  (e) => {
                    setimage(e.target.files[0])
                    setavatar(URL.createObjectURL(e.target.files[0]))
                  }
              }
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Hidden>
        </FlexBox>

        <Formik
          initialValues
          onSubmit={handleFormSubmit2}
        >
            <form onSubmit={handleFormSubmit2}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                      <label>
                          <FormattedMessage
                            id="full_name"
                            defaultMessage="Toliq Ism"
                          />
                      </label>
                      <input type="text" required={true} value={fullname} onChange={(e)=>{setfullname(e.target.value)}} className="form-control" />
                  </Grid>
                  <Grid item md={6} xs={12}>
                        <label>

                            <FormattedMessage
                                id="birthdate"
                                defaultMessage="Tugilgan Kun"
                            />
                        </label>
                        <br/>
                      <input
                        type="text"
                        className="form-control"
                        value={birthdate.toLocaleDateString("ru-Ru",{day:"numeric",month:"numeric",year:"numeric"})}
                        readOnly={true}
                        onClick={()=>setopen2(true)}
                      />
                      <Dialog
                          open={open2}
                          onClose={()=>setopen2(false)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                      >
                          <DialogContent>
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <StaticDatePicker
                                      maxDate={addYears(new Date(),-12)}
                                      // minTime={addMinutes(Date.now(),parseInt(deliveryTime))}
                                      mask="__/__/____ __:__"
                                      displayStaticWrapperAs="desktop"
                                      disableCloseOnSelect={true}
                                      openTo="day"
                                      value={new Date(birthdate)}
                                      inputFormat="dd/mm/yyyy"
                                      onChange={(newValue) => {
                                          setbirthdate(newValue);
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


                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="sel1">

                        <FormattedMessage
                            id="select_gender"
                            defaultMessage="Jinsingiz"
                        />

                    </label>
                    <select required={true} value={gender} onChange={(w)=>setgender(w.target.value)} className="form-control" id="sel1">
                      <>
                          <option hidden={true} >
                            {intl.formatMessage({id:"select_gender",defaultMessage:"Jinsingizni tanlang"})}
                          </option>
                          <option value="1" >
                              {intl.formatMessage({id:"Male",defaultMessage:"Erkak"})}

                          </option>
                          <option value="2" >
                              {intl.formatMessage({id:"Female",defaultMessage:"Ayol"})}
                          </option>
                      </>

                    </select>
                      {gender_error !== "" ? <div className="text-danger">{gender_error}</div> : ""}
                  </Grid>
                  <Grid item md={6} xs={12} >
                          <label>
                              <FormattedMessage
                                id="address"
                                defaultMessage="Address"
                              />
                          </label>
                          <input type="text" required={true} value={address} onChange={(e)=>setaddress(e.target.value)} className="form-control" />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">

                  <FormattedMessage
                    id="send"
                    defaultMessage="Saqlash"
                  />
              </Button>
            </form>
        </Formik>
      </Card1>
    </div>
    </DashboardLayout>
  );
};



export default ProfileEditor;

export async function getServerSideProps(ctx){
    let {token} = cookies(ctx)
    let {lang} = cookies(ctx)
    let x
    if(lang){
        x = lang
    }
    else{
        x="uz"
    }
    const request2 = await axios({
        method:"GET",
        url:`${BASE_URL}/profile/max-value/${x}`,
        headers:{
            "Authorization":`Bearer ${token} `
        },
    })
    const answer = await request2.data;
    if(answer?.errors){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }
  return {
      props:{
          data:answer
      }
  }
}
