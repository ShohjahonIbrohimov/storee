const get_order_id = (data) =>{
    return {
        type:"GET_ORDER_ID",
        payload:data
    }
}
export default get_order_id;