const get_cart_products = (data) =>{
    return {
        type:'GET_CART_PRODUCTS',
        payload:data
    }
}
export default get_cart_products;