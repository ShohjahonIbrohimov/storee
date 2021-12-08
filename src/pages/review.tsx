import React from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetch_user_info} from "../../Redux/Actions/Action";
import Card from "@component/Card";
import {FormattedMessage,useIntl} from "react-intl";
import {useRouter} from "next/router";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";

const Review = ({data}) => {
    let router = useRouter()
    let intl = useIntl()
    const dispatch = useDispatch()
    dispatch(fetch_user_info(data))
    let order_id = useSelector((state:any)=>state.token.order_id)
    let cards = [
        {
            value:"click2",
            img:"/assets/images/payments_now/paymeee.svg"
        },
    ]
    return (
    <CheckoutNavLayout 
    >
        <NextSeo
            title={intl.formatMessage({id:"successfully_booked"})}
        //     description={intl.formatMessage({id:"successfully_booked"})}
        //     additionalMetaTags={[{
        //     name: 'keyword',
        //     content: intl.formatMessage({id:"successfully_booked"})
        //     }, 
        // ]}
        />
        <div className="col-12 mx-0 px-0 mb-3">
            <div className="row justify-content-center">
                <div className="col-12 mt-4">
                    <Card className="p-1 m-0">
                        <div className="text-break p-3">
                            <h1 className="h5 mt-3 d-inline w-100vw">
                                    
                                    
                                    <label className="text-secondary fs-6 whitespace-break ">
                                        <label  className=" fs-6 text-dark d-inline">
                                            <FormattedMessage id="Your_order" defaultMessage="Sizning buyurtmangiz" />:
                                        </label> 
                                        <div className="d-inline p-1  bg-darker-light ml-1">
                                            №{order_id?.orderId} 
                                        </div>. <FormattedMessage id="price_with_delivery" defaultMessage=" yetkazib berish bilan narxi" />:<label className="fw-bold text-dark d-inline whitespace-nowrap ml-1 mr-0 "  >
                                            {order_id?.totalSumma} 
                                         </label>
                                         {order_id?.cash_or_card === "Plastik" 
                                            ? 
                                                <label className={`text-secondary fs-6 ${router.locale === "en" ? "" : "ml-1"} whitespace-break d-inline`}>
                                                    <FormattedMessage id="accepted_convenient_payment" />
                                                </label>
                                                    
                                            :
                                                ""
                                            }
                                    </label>
                                     
                            </h1>

                            {order_id?.cash_or_card === "Plastik" ?
                                <>
                                    <hr/><div className="flex flex-wrap pb-3 justify-content-between">
                                                {cards?.map((card)=>(

                                                    <button
                                                        id="cart_card_img"
                                                        onClick={()=>router.push(order_id?.paymeUrl)}
                                                        type="button"
                                                        className="btn border border-black mt-2"
                                                    >
                                                        <img
                                                            src={card.img}
                                                            alt={card.value}
                                                            width="60"
                                                            height="60"
                                                        />
                                                </button>
                                                ))}

                        </div><br/><br/></>
                            : ""}
                            <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block" style={{height:"auto"}}>
                                        <img src="/assets/images/banners/review_banner_desktop.jpg" alt="Successfully Booked" style={{width:"100%",height:"auto"}}  />
                            </div>
                            <div className="d-block d-sm-block d-md-none d-lg-none d-xl-none" style={{height:"auto"}}>
                                        <img src="/assets/images/banners/review_image.jpg" alt="Successfully Booked" style={{width:"100%",height:"auto"}}  />
                            </div>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    </CheckoutNavLayout>
    );
};

Review.getInitialProps = async (ctx) =>  {
    let {token,lang} = cookies(ctx)
    console.log("Token:",token)
    let {isLoggedIn} = cookies(ctx)
    let request2
    if(isLoggedIn === "true"){
        request2 = await axios({
            method:"GET",
            url:`${BASE_URL}/profile/max-value/${lang}`,
            headers:{
                "Authorization":`Bearer ${token} `
            },
        })
    }
    else{
        request2 = {
            "data":{
                "data":{
                    "name":null ,
                    "phone":null ,
                    "avatar":null ,
                }
            }
        }
    }
    const answer = await request2.data;
    return {data:answer}
}
export default Review;
   // {
        //     value:"paynet2",
        //     img:"/assets/images/Paynet.png"
        // },
        // {
        //     value:"payme2",
        //     img:"/assets/images/payme.png"
        // },




    // card.value === chosen ?
                                            //     <>
                                            //        <div key={ind} className="d-inline position-relative">
                                            //
                                            //             <img
                                            //                 className="position-absolute"
                                            //                 id="chosen_card"
                                            //                 src="/assets/images/check.svg"
                                            //                 width={20}
                                            //                 height={20}
                                            //             />
                                            //            <button
                                            //                type="button"
                                            //                className="btn border border-info ml-1 mr-1 mt-2"
                                            //            >
                                            //                <img
                                            //
                                            //                    src={card.img}
                                            //                    width="50"
                                            //                    height="50"
                                            //                />
                                            //            </button>
                                            //        </div>
                                            // </>
                                            //
                                            // :