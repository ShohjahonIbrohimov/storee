const get_category_products = (data) =>{
    return {
        type:"GET_CATEGORY_PRODUCTS",
        payload:data
    }
}
export default get_category_products;