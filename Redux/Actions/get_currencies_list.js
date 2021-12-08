let get_currencies_list = (data)=>{
    return{
        type:"GET_CURRENCY_LIST",
        payload:data
    }
}
export default get_currencies_list;