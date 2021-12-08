import {FormattedMessage} from "react-intl";

const Part2 = ({info,setinfo}) =>{
    return (
        <div className="p-3 check_status_container">
            {/*<div className="h4 mt-0 pt-0">*/}
            {/*    <FormattedMessage id="Order Details" />*/}
            {/*</div>*/}
            <div>
               <div className="fw-bold d-inline my-5">Id</div>: {info.orderId}<br/>
                <div className="fw-bold d-inline my-5"><FormattedMessage id="products_total_price" /></div>: {info.product_price} {info.currencyName}<br/>
                <div className="fw-bold d-inline my-5" ><FormattedMessage id="delivery_price" /></div>: {info.delivery_price} {info.currencyName}<br/>
                <div className="fw-bold d-inline my-5"><FormattedMessage id="Discount" /></div>: {info.discount} {info.currencyName}<br/>
                <div className="fw-bold d-inline my-5" ><FormattedMessage id="Total" /></div>: {info.total_price} {info.currencyName}<br/>
                <div className="fw-bold d-inline my-5"><FormattedMessage id="order_status" /></div>: {info.statusName}<br/>
                <br/>
                <button onClick={()=>setinfo([])} className="w-100 btn btn-danger"><FormattedMessage id="go_back" /></button>
            </div>
        </div>
    )
}

export default Part2;