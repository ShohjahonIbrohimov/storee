const get_search_results = (data)=>{
    return {
        type:"GET_SEARCH_RESULTS",
        payload:data
    }
}
export default get_search_results;