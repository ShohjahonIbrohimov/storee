import {applyMiddleware, combineReducers, createStore} from "redux"
import {fetch_user_info_request, TokenReducer} from "./Reducers/TokenReducer";
import {initialState} from "./Reducers/TokenReducer";
import ThunkMiddleware from "redux-thunk"
// import {persistStore,persistReducer} from "redux-persist"
// import storage from "redux-persist/lib/storage"
import languagereducer, {
    fetch_category_request,
    fetch_company_info,
    fetch_language_request
} from "./Reducers/New Reducer"


// const persistConfig = {
//     key:"root",
//     storage,
//     whitelist:[
//         "token",
//         'new',
//     ]
// }
export const rootreducer3 = combineReducers({
    token:TokenReducer,
    new:languagereducer,
})

export const store = createStore(rootreducer3,applyMiddleware(ThunkMiddleware))
store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(fetch_category_request())
store.dispatch(fetch_language_request())
store.dispatch(fetch_company_info())
