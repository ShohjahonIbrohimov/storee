import {FormattedMessage} from "react-intl";

const Part1 = ({handleSubmit,setorder_id,orderError}) => {
    return(
        <div className=" check_status_container" >
            <h6>
                <FormattedMessage id="order_status" defaultMessage="Buyurtma xolati" />
            </h6>
            <FormattedMessage id="check_order_status" /><div className="fw-bold d-inline"><FormattedMessage id="button_check_status" /></div>
            <form onSubmit={handleSubmit}>
                <br/>
                <input type="number" min={1} required={true} className="form-control" onChange={(r)=>setorder_id(r.target.value)} />
                {orderError === "" ? "" : <div className="text-danger">{orderError}</div>}
                <br/>
                <button type="submit" className="btn btn-info text-white"><FormattedMessage id="check_button_status" /> </button>
            </form>

        </div>
    )
}
export  default  Part1;