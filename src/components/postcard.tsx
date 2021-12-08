import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import get_postcardtext from "../../Redux/Actions/get_postcardtext";

let Postcard = ()=>{
    let dispatch = useDispatch()
    let [otkridka,setotkridka] = useState(false)
    return(

        <>
            <label className="form-check-label pb-0 mt-1 pl-3 pr-4">
            <input
                className="form-check-input"
                onChange={()=>setotkridka(!otkridka)}
                type="checkbox"
            />
            <FormattedMessage
                id="Add PostCard"
                defaultMessage="Otkridka Qo'shish"
            />
            -
            <div className="fw-bold d-inline fst-italic">
                <FormattedMessage
                    id="Free"
                    defaultMessage="Bepul"
                />
                !
            </div>
            </label><br/>
            {otkridka ? (
                <>
                    <label>
                    <FormattedMessage
                        id="postcard text"
                        defaultMessage="Tabrik Matni"
                    />
                </label>
                <textarea className="form-control" onChange={(r)=>{
                    dispatch(get_postcardtext(r.target.value));
                    return;
                }} rows={3} />
                
                
                <div className="mt-2" style={{fontStyle:"italic",fontSize:"11px"}}>
                    <FormattedMessage id="text_below_postcard" />
                </div>
                
            
            </>
            ) : ''}
        </>
           
    )
}
export default Postcard