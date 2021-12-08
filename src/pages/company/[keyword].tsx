import Loading from "@component/Loading";
import { BASE_URL } from "@component/Variables";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useDispatch } from "react-redux";
import { fetch_user_info } from "../../../Redux/Actions/Action";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import { NextSeo } from "next-seo";
const CompanyServices = ()=>{
    let [loading,setloading] = useState(true)
    let router = useRouter()
    let [data,setdata] = useState({"name":"","text":""})
    let dispatch = useDispatch()
    let {keyword} = router.query
    let token = Cookies.get("token")
    let lang = router.locale  ||Cookies.get("lang")
    useEffect(()=>{
        axios({
            method:"GET",
            url:`${BASE_URL}/profile/max-value/${lang}`,
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
            .then(res=>{
                dispatch(fetch_user_info(res.data))
            })
            .catch(()=>null)
        axios({
            method:"GET",
            url:`${BASE_URL}/references/helps/show/${lang}`,
        })
            .then(res=>{
                dispatch(fetch_user_info(res.data))
            })
            .catch(()=>null)
        axios({
            method:"GET",
            url:`${BASE_URL}/references/helps/show/${keyword}/${lang}`
        })
            .then(res=>{
                console.log(res.data);
                setdata(res.data)
                setloading(false)
            })
            .catch(()=>null)
    },[Cookies.get("lang"),keyword,router.locale])
    if(loading){
        return <>
            <NextSeo
            title={data?.name}
            description={data?.text}
            additionalMetaTags={[{
            name: 'keyword',
            content: data?.name
            }, ]}
            />
            <Loading />
        </>
    }
    else{
    return(<VendorDashboardLayout >
            <NextSeo
                title={data?.name}
                description={data?.text}
                additionalMetaTags={[{
                name: 'keyword',
                content: data?.name
                }, ]}
            />
            <div style={{marginBottom:"50px"}}>
                <div  style={{color:"#f7961"}}>
                    <DashboardPageHeader2
                    title={data?.name}
                    />
                    <Card1 style={{marginLeft:"13px",marginRight:"13px"}}>
                            <Grid  style={{padding:"5px",paddingBottom:"5px",paddingTop:"8px"}}>
                            <div className="whitespace-break" dangerouslySetInnerHTML={{__html: data.text}} ></div> 
                            </Grid>
                    </Card1>
                
                </div>
            </div>
        </VendorDashboardLayout>
    )
    }
}
export default CompanyServices;

