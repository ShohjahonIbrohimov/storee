export const fetch_user_Failure = (error)=>{
    return {
        type:"GET_USER_INFO_FAILURE",
        error:error
    }
}