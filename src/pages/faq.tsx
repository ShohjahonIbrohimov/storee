import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import Accordions from "@component/accordions";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@component/Variables";
import Cookies from "js-cookie"
import Loading from "@component/Loading";
import Grid from "@component/grid/Grid";
import { useRouter } from "next/router";
let FAQ = ()=>{
    let [loading,setloading] = useState(true)
    let [data,setdata] = useState({name:"",text:""})
    let router = useRouter()
    let lang = router.locale
    useEffect(()=>{
        axios({
            method:"GET",
            url:`${BASE_URL}/references/helps/faq-list/${lang}`
        })
        .then((res)=>{
            setdata(res.data)
            setloading(false)
        })
        .catch(()=>null)
    },[Cookies.get("lang"),lang])
    if(loading){
        return<>
             <NextSeo
                title={data?.name}
                description={data?.text}
                additionalMetaTags={[{
                name: 'keyword',
                content: data?.name
                }, ]}
                openGraph={{
                    type:"website",
                  }}
            />
            <Loading/>
        </>
    }
    return(
        <VendorDashboardLayout>
            <NextSeo
                title={data?.name}
                description={data?.text}
                additionalMetaTags={[{
                name: 'keyword',
                content: data?.name
                }, ]}
                openGraph={{
                    type:"website",
                  }}
            />
            <div style={{marginBottom:"50px"}}>
                <div  style={{color:"#f7961"}}>
                    <DashboardPageHeader2
                    title="FAQ"
                    />
                  
                            <Grid  style={{padding:"5px",paddingBottom:"0px",paddingTop:"0px",marginLeft:"7px"}}>
                                <Accordions data={data} accordionClass="faq_accordions" />
                            </Grid>
                   
                
                </div>
            </div>
        </VendorDashboardLayout>
    )
}
export default FAQ;