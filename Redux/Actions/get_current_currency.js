const get_current_currency = (data)=>{
    return {
        type:"GET_CURRENT_CURRENCY",
        payload:data
    }
}
export default get_current_currency;