export const get_token = (token) => {
    return {
        type: "GET_TOKEN",
        payload: token
    }
}

export const fetch_user_info = (info) =>{
    return {
        type:"GET_USER_INFO",
        payload:info
    }
}
