import Section1 from "../components/home-1/Section1";
import Section12 from "../components/home-1/Section12";
import Section2 from "../components/home-1/Section2";
import Section3 from "../components/home-1/Section3";
import AppLayout from "../components/layout/AppLayout";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import {fetch_user_info} from "../../Redux/Actions/Action";
import {useDispatch, useSelector} from "react-redux";
import {useEffect,useState} from "react";
import Cookies from "js-cookie"
import categoryfetch_success from "../../Redux/Actions/CategoryFetching";
import get_category_products from "../../Redux/Actions/get_category_products";
import get_banner from "../../Redux/Actions/get_banner";
import Section15 from "@component/home-1/Section15";
import useWindowSize from "@hook/useWindowSize";
import get_services from "../../Redux/Actions/get_services";
import cookies from "next-cookies";
import {BASE_URL} from "@component/Variables"
import {NextSeo} from "next-seo"
import { useRouter } from "next/router";


// export const config = {unstable_runtimeJs:false}
const IndexPage = ({banner,category_products,shop_list,setcategory,data2,setbanner}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(get_banner(banner))
      dispatch(fetch_user_info(data2))
      dispatch(get_category_products(category_products))
    },[])
    const token1 = Cookies.get('token')
    const isLoggedin = Cookies.get('isLoggedIn')
    const token2 = useSelector((state:any)=>state.token.token)
    const size = useWindowSize()
    let router = useRouter()
    let lang = router.locale
    let lang4 = useSelector((state:any)=>state.new.lang)
    let current_currency = useSelector((state:any)=>state.token.current_currency)
    let [seo,setseo] = useState({site_settings_main_title:"",site_settings_main_description:"",site_settings_main_keyword:"",logo:""})
    let [loading2,setloading2] = useState(true)
    useEffect(() => {
      let currency_id = Cookies.get("currency_id");
      let token  = Cookies.get("token")
      let currency_text = typeof currency_id !== "undefined" ?  `?currency=${currency_id}` : ""
         axios({
          method:"GET",
          url:`${BASE_URL}/flowers/category-item/${router.locale}${currency_text}`,
          headers:{
              "Authorization":`Bearer ${token}`
          }
      })
      .then(res=>{
        dispatch(get_category_products(res.data))
        setcategory(res.data)
      })
      .catch(()=>{
        return;
      })
    }, [current_currency,Cookies.get("currency_id"),Cookies.get("isLoggedIn"),Cookies.get("lang"),lang4]);

    useEffect(() => {
        
        let token = Cookies.get("token")
         axios({
            method:"GET",
            url:`${BASE_URL}/profile/max-value/${lang}`,
            headers:{
                "Authorization":`Bearer ${token} `
            },
        })
         .then(response=>{
             dispatch(fetch_user_info(response.data))
         })

    }, [token1,token2,isLoggedin]);
    useEffect(()=>{
        let token  = Cookies.get("token")
        const lang = Cookies.get("lang");
        axios.get(`${BASE_URL}/seo/home-page/${lang}`)
          .then((res)=>{
            setseo(res.data)
          })
          .catch(()=>null)
        axios({
            method:"GET",
            url:`${BASE_URL}/flowers/main-category/list/${lang}`,
        })
            .then(response =>{
                dispatch(categoryfetch_success(response.data))
            })
            .catch(errors2=>{
                console.log(errors2)
            })
        axios.get(`${BASE_URL}/references/services/${lang}`)
            .then(res=>{
                dispatch(get_services(res.data))
            })
            .catch(()=>{
                return;
            })
            axios({
                      method:"GET",
                      url:`${BASE_URL}/banner/list/${lang}`,
                      headers:{
                          "Authorization":`Bearer ${token} `
                      },
            })
                .then(res=>{
                  let banner_id = res?.data?.length !== 0  && res?.data? res?.data[0]?.id : ""
                  axios({
                          method:"GET",
                          url:`${BASE_URL}/banner/item-list/${banner_id}/${lang}`,
                  })
                      .then(res=>{
                            setbanner(res.data)
                            dispatch(get_banner(res.data))
                            setloading2(false)
                      })
                          .catch(()=>{
                            setloading2((false))
                            return;
                            
                      })
                })
                .catch(()=>{
                  return;
                })
    },[Cookies.get("lang"),lang])
  return (
        <AppLayout>
          <NextSeo
              title={!loading2 ? seo?.site_settings_main_title : ""} 
              description={!loading2 ? seo?.site_settings_main_description:""} 
              additionalMetaTags={[
                {
                name: 'keyword',
                content: !loading2 ? seo?.site_settings_main_keyword : ""
              },
             ]}
             openGraph={{
                 type:"ssite",
                 images:[
                     {
                         url:seo?.logo,
                         alt:"Dana.uz"
                     }
                 ]
             }}
              
           />
          <div>
              {size < 650 
              ? 
                  <>
                      <Section3 />
                      <Section1 />
                  </> 
              : 
                  
                  <>
                      <Section1 />
                      <Section3 />
                  </>
              }

              <main className="container">
                  <Section2  />
                  <Section15 shop_list={shop_list} />
                  <Section12 />
              </main>

          </div>
        </AppLayout>
        
        )
};
export async function getStaticProps(ctx){
  let {token,lang,currency_id} = cookies(ctx)
  let currency_text = typeof currency_id !== "undefined" ?  `?currency=${currency_id}` : ""
  console.log("Token:",token)
  const request2 = await axios({
    method:"GET",
    url:`${BASE_URL}/profile/max-value/${lang}`,
    headers:{
      "Authorization":`Bearer ${token} `
    },
  })
  let category_request = await axios({
    method:"GET",
    url:`${BASE_URL}/flowers/category-item/${lang}${currency_text}`,
    headers:{
        "Authorization":`Bearer ${token}`
    }
  })
  let shop_request = await axios({
    method: "GET",
    url: `${BASE_URL}/shops/list-home-page/${lang}`,
  })
  let banner_request;
  try{
    let bannerList_request = await axios({
      method:"GET",
      url:`${BASE_URL}/banner/list/${lang}`,
      headers:{
          "Authorization":`Bearer ${token} `
      },
    })
    let banner_id = bannerList_request?.data?.length !== 0  && bannerList_request?.data? bannerList_request?.data[0]?.id : ""
    banner_request = await axios({
      method:"GET",
      url:`${BASE_URL}/banner/item-list/${banner_id}/${lang}`,
    })
  }
  catch{
    banner_request={data:[]}
  }
  let banners = banner_request.data
  let shop_list = shop_request.data
  let category = category_request.data
  const answer = await request2.data;



  return {
           props:{
               data2:answer,
               category_products:category,
               shop_list:shop_list,
               banner:banners
           },
           revalidate:2
    }
}
export default IndexPage;