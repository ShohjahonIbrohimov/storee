const getcoordinates = (event)=> {
    return {
        type:"GET_COORDINATES",
        payload:event
    }
}
export default getcoordinates;