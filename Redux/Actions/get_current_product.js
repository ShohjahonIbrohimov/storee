let get_current_product = (data)=>{
    return {
        type:"GET_CURRENT_PRODUCT_KEYWORD",
        payload:data,
    }
}
export default get_current_product;