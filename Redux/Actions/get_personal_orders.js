const get_personal_orders = (data) =>{
    return {
        type:"GET_PERSONAL_ORDERS",
        payload:data
    }
}
export default get_personal_orders;