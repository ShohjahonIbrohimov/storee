import {useState} from "react";
import axios from "axios";
import Part1 from "@component/OrderStatus/Part1";
import Part2 from "@component/OrderStatus/Part2";
import Cookies from "js-cookie";
import { BASE_URL } from "@component/Variables";
import {useIntl} from "react-intl"

const CheckStatus = ()=>{
    let [order_id,setorder_id] = useState("")
    let [order_info,setorder_info] = useState([])
    let [orderError,setorderError] = useState("")
    let intl = useIntl()
    console.log(order_info)
    let handleSubmit = (e) =>{
        event.preventDefault()
        let lang = Cookies.get("lang")
        let currency_id = Cookies.get("currency_id")
        let currency_text = typeof currency_id !== "undefined" ? `&currency=${currency_id}` :""
        e.preventDefault()
        axios.get(`${BASE_URL}/orders/check-status-order/${lang}?order_id=${order_id}${currency_text}`)
            .then(res=>{
                setorder_info(res.data)
            })
            .catch(()=>setorderError("№ " + order_id + intl.formatMessage({id:"order_not_found"})))
    }
    return(
        <div className="pb-0 mb-0" >
            {order_info.length !==0 ? <Part2 info={order_info} setinfo={(t)=>setorder_info(t)} /> : <Part1 orderError={orderError} handleSubmit={(r)=>handleSubmit(r)} setorder_id={(t)=>setorder_id(t)} /> }
        </div>
    )
}
export  default  CheckStatus;