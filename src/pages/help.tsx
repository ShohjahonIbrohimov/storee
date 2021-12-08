import {fetch_user_info} from "../../Redux/Actions/Action";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Grid from "@component/grid/Grid";
import { H6} from "@component/Typography";
import "bootstrap/dist/css/bootstrap.min.css"
import AppLayout from "@component/layout/AppLayout";
import CategorySectionCreator from "@component/CategorySectionCreator";
import InputMask from "react-input-mask";
import Cookies from "js-cookie"
import {Card1} from "@component/Card1";
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
const Help = () => {
  let intl = useIntl()
  const dispatch = useDispatch()
  const [name,setname] = useState("")
  const [phone,setphone] = useState("")
  const [msg,setmsg] = useState("")
  const [error,seterror] = useState("")
  useEffect(() => {
      let token = Cookies.get("token")
      let lang = Cookies.get("lang")
      axios({
        method:"GET",
        url:`${BASE_URL}/profile/max-value/${lang}`,
        headers:{
            "Authorization":`Bearer ${token} `
        },
    })
          .then(res=>{
              setname(res.data.data.fullname);
              setphone(res.data.data.phone);
              dispatch(fetch_user_info(res.data))
          })
          .catch(()=>{
              return;
          })
  }, []);

  const handleSubmit = (e) =>{
      let token = Cookies.get("token")
      e.preventDefault()
      let data = new FormData();
      data.append('name', name);
      data.append('phone', phone);
      data.append('message', msg);
      axios({
          method:"POST",
          url:`${BASE_URL}/references/contacts`,
          headers:{
              "Authorization" : `Bearer ${token}`
          },
          data:data
      })
          .then(response=>{
              if(response?.data?.errors){
                  seterror("Qandaydir xatolik yuz berdi")
                  setTimeout(()=>{
                    seterror("")
                  },3000)
              }
              else{
                seterror("Sizning xabaringiz muvaffaqqiyatli adminlarga yetkazildi")
                setTimeout(()=>{
                    seterror("")
                  },3000)
              }
          })
  }
  return (
    <AppLayout>
        <NextSeo
            title={intl.formatMessage({id:"connect_A"})}
            description={intl.formatMessage({id:"help_text"})}
            additionalMetaTags={[{
            name: 'keyword',
            content: intl.formatMessage({id:"connect_A"})
            }, ]}
        />
        <div  style={{color:'#f7961'}}><br/><br/>
        <CategorySectionCreator
                    iconName="help2"
                    title={intl.formatMessage({id:"connect_A"})}
                    >
            <Card1>
                <Grid style={{padding:"0px"}}>
                        <div className="col-12">
                            <H6 color="text.hint" my="0px" fontWeight="600">
                                <FormattedMessage
                                    id="help_text"
                                    defaultMessage="Agar sizda sayt haqida savollar bo'lsa biz bilan bog'laning"
                                />
                            </H6>
                        </div>
                    <br/>
                        <form onSubmit={handleSubmit}>
                            {error === "" ? "" : <div className=" alert text-dark fixed-top" style={{textAlign:'center',backgroundColor:"lavender",marginTop:"-10px"}}>{error}</div>}
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>
                                            <FormattedMessage
                                                id="Name"
                                                defaultMessage="Ism"
                                            />
                                        </label>
                                        <input
                                            required={true}
                                            value={name}
                                            type="text"
                                            className="form-control"
                                            onChange={(e)=>setname(e.target.value)}
                                        /><br/>
                                    </div>
                                    <div className="col-md-6">
                                        <label>
                                            <FormattedMessage
                                                id="phone_number"
                                                defaultMessage="Telefon Nomer"
                                            />
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
                                </div>
                            </div>
                        <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    value={msg}
                                    onChange={(e)=>setmsg(e.target.value)}
                                    required={true}
                                    rows={10}
                                >
                            </textarea><br/>
                            <button className="btn btn-danger">{intl.formatMessage({id:"send(jonatish)"})}</button>
                        </div>

                        </form>
                </Grid>
            </Card1>
        </CategorySectionCreator><br/><br/><br/>
        </div>
    </AppLayout>
  );
};



export default Help;

