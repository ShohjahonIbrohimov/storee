import React, {useState} from "react";
import Button from "@component/buttons/Button";
import {DialogActions, DialogContent} from "@mui/material";
import {FormattedMessage, useIntl} from "react-intl";
import axios from "axios";
import {BASE_URL} from "@component/Variables";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

export type BalanceTypes = {
    setopen2?:any
}

let Balance:React.FC<BalanceTypes> = ({setopen2})=>{
    let intl = useIntl()
    let router = useRouter()
    let [amount,setamount] = useState(undefined)
    let [service_name,setservice] = useState(undefined)
    let [error,seterror] = useState("")
    let lang = useRouter().locale
    let token = Cookies.get("token")
    let data = new FormData()
    data.append("price",amount)
    data.append("service_name",service_name)
    let cards = [
        {
            value:"click2",
            img:"/assets/images/payments_now/paymeee.svg"
        },
    ]
    let handlePayment = ()=>{
       if(typeof service_name === "undefined"){
            seterror(intl.formatMessage({id:"accepted_convenient_payment"}).replace(/./,""))
       }
       else{
           axios({
               method:"POST",
               url:`${BASE_URL}/profile/payment-balance/${lang}`,
               headers:{
                   "Authorization":`Bearer ${token}`
               },
               data:data
           })
               .then(res=>{
                   router.push(res.data)
               })
               .catch(()=>null)
       }
    }
    return(<>
            <DialogContent className="col-12">
                <FormattedMessage id="budget_fulfill" />
                <div className="input-group mb-3">
                    <input type="number" min={1} required={true} onChange={(w)=>setamount(w.target.value)} className="form-control"
                           aria-label="Balance payment" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2"><FormattedMessage id="sum" /></span>
                        </div>
                </div>
                <>
                    <div><FormattedMessage id="payment_methods" /></div>
                    <div className="flex flex-wrap pb-3 justify-content-between">
                    {cards?.map((card)=>card.value === service_name ?
                        <div className="positon-relative">
                            <div className="check_order_payment">
                                <img src="/assets/images/check.svg" width="25px" height="25px" alt="check" />
                            </div>
                            <button
                                id="cart_card_img"
                                type="button"
                                onClick={()=>setservice(card.value)}
                                className="btn border border-black mt-2"
                            >
                                <img
                                    src={card.img}
                                    alt={card.value}
                                    width="60"
                                    height="60"
                                />
                            </button>
                        </div>
                        :
                        (

                            <button
                                id="cart_card_img"
                                type="button"
                                onClick={()=>setservice(card.value)}
                                className="btn border border-black mt-2"
                            >
                                <img
                                    src={card.img}
                                    width="60"
                                    height="60"
                                />
                            </button>
                        )
                    )}
                    {error === "" ? "" : <div className="text-danger">{error}</div> }
                </div></>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setopen2(false)}>Cancel</Button>
                <Button onClick={()=>handlePayment()}>Pay</Button>
            </DialogActions>
        </>
    )

}
export default Balance;