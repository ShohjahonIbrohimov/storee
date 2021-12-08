import { useIntl } from "react-intl";

let DeliveryTimeOptions = ({time,setTime}) =>{
    let intl = useIntl()
    let min = intl.formatMessage({id:"min"})
    let hour = intl.formatMessage({id:"hour"})
    let timeOptions = [
        {
            value:"30",
            text:`30 ${min}`
        },
        {
            value:"40",
            text:`40 ${min}`
        },
        {
            value:"50",
            text:`50 ${min}`
        },
        {
            value:"60",
            text:`1 ${hour}`
        },
        {
            value:"70",
            text:`1 ${hour} 10 ${min}`
        },
        {
            value:"80",
            text:`1 ${hour} 20 ${min}`
        },
        {
            value:"90",
            text:`1 ${hour} 30 ${min}`
        },
        {
            value:"100",
            text:`1 ${hour} 40 ${min}`
        },
        {
            value:"110",
            text:`1 ${hour} 50 ${min}`
        },
        {
            value:"120",
            text:`2 ${hour}`
        },
        {
            value:"150",
            text:`2 ${hour} 30 ${min}`
        },
        {
            value:"180",
            text:`3 ${hour}`
        },
    ]
    return( <div>
                <select required={true} className="form-control" value={time} onChange={(e)=>setTime(e.target.value)} name="DeliveryTimeOptions" id="DeliveryTimeOptions">
                    <option hidden={true}>{intl.formatMessage({id:"choose_delivery_time"})}</option>
                    {timeOptions.map(one=><option value={one.value}> {one.text} </option>)}
                </select>
            </div>
        )
}
export default DeliveryTimeOptions;