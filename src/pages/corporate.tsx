import AppLayout from "@component/layout/AppLayout";
import {NextSeo} from "next-seo";
import CategorySectionCreator from "@component/CategorySectionCreator";
import {Card1} from "@component/Card1";
import Grid from "@component/grid/Grid";
import React, {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import InputMask from "react-input-mask";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {BASE_URL} from "@component/Variables";
let Corporate = ()=>{
    let [recaptcha,setrecaptcha] = useState(false)
    let [phone,setphone] = useState("")
    let [name,setname] = useState("")
    let [company,setcompany] = useState("")
    let [email,setemail] = useState("")
    let [message,setmessage] = useState("")
    let intl = useIntl()
    function onChange() {
        setrecaptcha(!recaptcha)
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        if(recaptcha){
            let data = new FormData()
            data.append("fullname",name)
            data.append("phone",phone)
            data.append("email",email)
            data.append("company_name",company)
            axios({
                method:"POST",
                url:`${BASE_URL}`,
                data:data
            })
                .then(()=>{
                    setmessage(intl.formatMessage({id:"corporate_send_sucess"}))
                    setTimeout(()=>{
                        setmessage("")
                    },3000)
                })
                .catch(()=>null)
        }
        else{
            setmessage(intl.formatMessage({id:"recaptcha_verify"}))
        }
    }

    return(
        <AppLayout >
            <NextSeo
                title={intl.formatMessage({id:"Corparative Sales"})}
                description={intl.formatMessage({id:"Corparative Sales"})}
                additionalMetaTags={[{
                    name: 'keyword',
                    content: intl.formatMessage({id:"Corparative Sales"})
                },
                ]}
            />
            <div style={{marginTop:"50px",marginBottom:"50px"}}>
                <div  style={{color:"#f7961"}}>
                    <CategorySectionCreator
                        title={intl.formatMessage({id:"Corparative Sales"})}
                    >
                        <Card1>
                            <Grid >
                                <div className="col-12 h6">Lorem Ipsum Nimadir nimadir nimadir nimadir</div>
                                <form className="col-12" onSubmit={handleSubmit} >
                                   <div className="row">
                                       <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                           <label>
                                               {intl.formatMessage({id:"full_name"})}
                                           </label>
                                           <input
                                               type="text"
                                               id="name"
                                               required={true}
                                               value={name}
                                               onChange={(e)=>setname(e.target.value)}
                                               className="form-control"
                                               placeholder={intl.formatMessage({id:"full_name"})}
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
                                       <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                           <label>
                                               {intl.formatMessage({id:"email"})}
                                           </label>
                                           <input
                                               type="email"
                                               id="Email"
                                               required={true}
                                               value={email}
                                               onChange={(e)=>setemail(e.target.value)}
                                               className="form-control"
                                               placeholder={intl.formatMessage({id:"email"})}
                                           />
                                       </div>
                                       <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                           <label>
                                               {intl.formatMessage({id:"company_name"})}
                                           </label>
                                           <input
                                               type="text"
                                               id="Company Name"
                                               required={true}
                                               value={company}
                                               onChange={(e)=>setcompany(e.target.value)}
                                               className="form-control"
                                               placeholder={intl.formatMessage({id:"company_name"})}
                                           />
                                       </div>
                                   </div>
                                    <br/>
                                    <ReCAPTCHA
                                        sitekey="6LdqZYEdAAAAALBQaR5hr0lkGYhmfgQ0s9pYcjXK"
                                        onChange={onChange}
                                    />
                                    <br/>

                                    <button className="btn btn-danger" >{intl.formatMessage({id:"submit"})}</button>
                                    {message === "" ? "" :   <div className="text-danger" >{message}</div>}
                                </form>
                            </Grid>
                        </Card1>
                    </CategorySectionCreator>
                </div>
            </div>
        </AppLayout>
    )
}
export default Corporate;