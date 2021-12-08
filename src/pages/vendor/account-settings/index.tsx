import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import React, {useEffect, useState} from "react";
import Map3 from "@component/map3";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import cookies from "next-cookies";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import Cookies from "js-cookie"
import {FormattedMessage, useIntl,createIntl,createIntlCache} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic"
import InputMask from "react-input-mask";
import DeliveryTimeOptions from "@component/DeliveryTimeOptions";


const ReactQuill = dynamic(
	() => {
		return import('react-quill');
	},
	{ ssr: false }
);

const AccountSettings = ({data,shop_data}) => {
    let intl = useIntl()
    const cache = createIntlCache()

    const intl2 = createIntl({
        locale: 'ru-Ru',
    }, cache)
    const [categories,setcategories] = useState([])
    const [coordinate,setcoordinate] = useState(shop_data.data.coordinate_x !== null && shop_data.data.coordinate_y !== null  ? [shop_data.data.coordinate_x,shop_data.data.coordinate_y] : "")
    const loading = useSelector((state:any)=>state.new.category_loading)
    const dispatch = useDispatch()
    dispatch(fetch_user_info(data))
    let lang = useSelector((state:any)=>state.new.lang)
    console.log(shop_data);
    useEffect(()=>{
        axios({
            method: "GET",
            url: `${BASE_URL}/shops/shops-category/${lang || Cookies.get("lang")}`,

        })
            .then((res)=>{
                setcategories(res.data)
            })
            .catch(()=>null)
    },[Cookies.get("lang")])
    //----------------------------------------
    const [name,setname] = useState(shop_data.data.name ? shop_data.data.name : "")
    const [description,setdescription] = useState(shop_data.data.description ? shop_data.data.description : "")
    const [category_id,setcategory_id] = useState(shop_data.data.category_id ? shop_data.data.category_id : "")
    const [work_start_time,set_work_start_time] = useState(shop_data.data.order_begin_time ? shop_data.data.order_begin_time : "")
    const [work_end_time,set_work_end_time] = useState(shop_data.data.order_end_time ? shop_data.data.order_end_time : "")
    const [image,setimage] = useState(shop_data.data.logo ? shop_data.data.logo : undefined)
    const [link,setlink] = useState(shop_data.data.videos ? shop_data.data.videos : [])
    const [image2,setimage2] = useState(shop_data.data.logo ? shop_data.data.logo : "")
    const [message,setmessage] = useState("")
    const [address,setaddress] = useState(shop_data.data.address)
    const [youtube,setyoutube] = useState(shop_data.data.youtube ? shop_data.data.youtube : "")
    const [site,setsite] = useState(shop_data.data.site ? shop_data.data.site : "")
    const [phone,setphone] = useState(shop_data.data.phone ? shop_data.data.phone : "")
    const [facebook,setfacebook] = useState(shop_data.data.facebook ? shop_data.data.facebook : "")
    const [tiktok,settiktok] = useState(shop_data.data.tiktok ? shop_data.data.tiktok : "")
    const [telegram,settelegram] = useState(shop_data.data.telegram ? shop_data.data.telegram : "")
    const [instagram,setinstagram] = useState(shop_data.data.instagram ? shop_data.data.instagram : "")
    let [background,setbackground] = useState(shop_data?.data?.background_image ? shop_data?.data?.background_image : undefined )
    const user = useSelector((state:any)=>state.token.user)
    let [delivery_money,setdelivery_money] = useState(shop_data?.data?.delivery_money)
    let [delivery_time,setdelivery_time] = useState(shop_data?.data?.delivery_time ? shop_data?.data?.delivery_time : "")
    //------------------
    const handleFormSubmit2 = (event) => {
        event.preventDefault()
        let lang = Cookies.get("lang")
        let formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("category_id",category_id);
        formData.append("order_begin_time",work_start_time);
        formData.append("order_end_time",work_end_time);
        formData.append("image",image);
        formData.append("coordinate_x",coordinate[0]);
        formData.append("coordinate_y",coordinate[1]);
        formData.append("address",address);
        formData.append("delivery_money",delivery_money)
        formData.append("youtube",youtube || "")
        formData.append("site",site || "")
        formData.append("phone",phone)
        formData.append("delivery_time",delivery_time)
        formData.append("facebook",facebook)
        formData.append("instagram",instagram)
        formData.append("tiktok",tiktok)
        formData.append("telegram",telegram)
        if(typeof background !== "undefined" || typeof background !== "string"){
            formData.append("background_image",background)
        }
        if(typeof delivery_time === "undefined"  || typeof delivery_time !== "number"){
            setmessage(intl.formatMessage({id:"choose_delivery_time"}))
            setTimeout(()=>{
                setmessage("")
            },3000)
        }

        if(description === "" || typeof description === "undefined" || description === "<p><br></p>"){
            setmessage(intl.formatMessage({id:"required_description"}))
            setTimeout(()=>{
                setmessage("")
            },3000)
        }
        else{
            link.forEach(function (value, index){
                formData.append(`link[${index}]`, value);
            });
            const token2 = Cookies.get("token");
            axios({
                method:"POST",
                url:`${BASE_URL}/shops/update/${user.data.is_shops}/${lang}`,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${token2}`,
                },
                data:formData
            })
                .then(()=>{
                    setmessage(intl.formatMessage({id:"changed_info_success",defaultMessage:"Sizning malumotlaringiz muvaffaqoyatli ozgartirildi"}))
                    setTimeout(()=>{
                        setmessage("")
                    },3000)
                })
                .catch(()=>{
                    return;
                })
        }
    };
    const updatelink = (e,link2)=>{
        e.preventDefault()
        let array = [...link]
        array[link2] = e.target.value
        setlink(array)
    }
    const handleAdd = () =>{
        let array = [...link]
        array.push("")
        setlink(array)
    }
    const handleremove = (index) =>{
        let array = [...link];
        array.splice(index,1)
        setlink(array);
    }
    return (
        <VendorDashboardLayout>
            <NextSeo 
                title={intl.formatMessage({id:"mobile_navigation_account",defaultMessage:"Akkount"})}
            />
            <div className="mb-lg-5 mt-lg-0">
                <DashboardPageHeader2 title={intl.formatMessage({id:"mobile_navigation_account",defaultMessage:"Akkount"})} iconName="settings_filled" />

                <Card1 p="24px 30px">
                    {message!== "" ? <div className=" alert text-dark fixed-top" style={{textAlign:'center',backgroundColor:"lavender"}}>{message}</div> : ""}
                    <Box
                        borderRadius="10px"
                        overflow="hidden"
                        height="173px"
                        mb="1.5rem"
                        position="relative"
                        style={{
                            background:
                                `url(${typeof background === "undefined" || typeof background === "string" ? background || "" :URL.createObjectURL(background)  }) center/cover`,
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="flex-end"
                            position="absolute"
                            bottom="20px"
                            left="24px"
                        >
                            <Avatar
                                src={image2}
                                alt={name}
                                size={80}
                                border="4px solid"
                                borderColor="gray.100"
                            />

                            <Box ml="-20px" zIndex={1}>
                                <label htmlFor="profile-image">
                                    <Button
                                        as="span"
                                        size="small"
                                        bg="gray.300"
                                        color="secondary"
                                        height="auto"
                                        p="6px"
                                        borderRadius="50%"
                                    >
                                        <Icon>camera</Icon>
                                    </Button>
                                </label>
                            </Box>
                            <Hidden>
                                <input
                                    className="hidden"
                                    onChange={(e) => {
                                        setimage2(URL.createObjectURL(e.target.files[0]))
                                        setimage(e.target.files[0])
                                    }}
                                    id="profile-image"
                                    accept="image/*"
                                    type="file"
                                />
                            </Hidden>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="flex-end"
                            position="absolute"
                            top="20px"
                            right="24px"
                        >
                            <label htmlFor="cover-image">
                            <Button
                                as="span"
                                size="small"
                                bg="primary.light"
                                color="secondary"
                                height="auto"
                                p="6px"
                                borderRadius="50%"
                            >
                                <Icon color="primary">camera</Icon>
                            </Button>
                            </label>
                            <Hidden>
                            <input
                                className="hidden"
                                onChange={(e) => setbackground(e.target.files[0])}
                                id="cover-image"
                                accept="image/*"
                                type="file"
                            />
                            </Hidden>
                        </Box>
                    </Box>
                    <form onSubmit={handleFormSubmit2}>
                        <Box mb="30px">
                            <Grid container horizontal_spacing={6} vertical_spacing={4}>
                                <Grid item md={12} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="shop_name"
                                            defaultMessage="Magazin Nomi"
                                        />
                                    </label>
                                    <input type="text" name="name" autoComplete="new-name" value={name} required={true} onChange={(r)=>setname(r.target.value)} className="form-control" />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <label htmlFor="sel1">
                                        <FormattedMessage
                                            id="mobile_navigation_category"
                                            defaultMessage="Kategoriya"
                                        />
                                    </label>
                                    <select
                                        required={true}
                                        name="category"
                                        value={category_id}
                                        onChange={(r)=>setcategory_id(r.target.value)}
                                        className="form-control"
                                        id="sel1"
                                        style={{textTransform:"capitalize"}}
                                    >
                                        {loading ? "" : categories.map(category=>(
                                            <option value={category.id} key={category.id}  style={{textTransform:"capitalize"}} >{category.title}</option>
                                        ))}
                                    </select>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="delivery_time"
                                            defaultMessage="Yetkazib berish vaqti"
                                        />
                                    </label>
                                    <DeliveryTimeOptions time={delivery_time} setTime={(e)=>setdelivery_time(e)} />
                                    {/* <input type="number" required={true} value={delivery_time} name="start" onChange={(r)=>setdelivery_time(r.target.value)} className="form-control" /> */}
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="work_start_time"
                                            defaultMessage="Siz ishni boshlaysiz"
                                        />
                                    </label>
                                    <input type="time" required={true} value={work_start_time} name="start" onChange={(r)=>set_work_start_time(r.target.value)} className="form-control" />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <label>

                                        <FormattedMessage
                                            id="work_end_time"
                                            defaultMessage="Siz ishni tugatasiz"
                                        />

                                    </label>
                                    <input type="time" required={true} value={work_end_time} onChange={(r)=>set_work_end_time(r.target.value)} className="form-control" />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="input-group w-100 justify-content-between" >
                                    <div className="w-100">
                                            <label>

                                                <FormattedMessage
                                                    id="delivery_price"
                                                    defaultMessage="Yetkazib berish narxi"
                                                />

                                            </label>
                                            <input
                                                type="text"
                                                required={true}
                                                value={intl2.formatNumber(delivery_money)}
                                                onChange={(r)=> r.target.value!=="" ? setdelivery_money(parseInt(r.target.value.replace(/\s+/g,""))) : setdelivery_money(0)}
                                                className="form-control"
                                            />
                                    </div>
                                        {/*<div className="input-group-append " style={{marginTop:"45px"}}>*/}
                                        {/*    So'm*/}
                                        {/*</div>*/}
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12} >
                                    <label htmlFor="number">
                                        <FormattedMessage id="phone_number" defaultMessage="Telefon Nomer" />
                                    </label>
                                    <InputMask
                                        mask="+\9\9\8-99-999-99-99"
                                        onChange={(e)=>setphone(e.target.value)}
                                        value={phone}
                                        required={true}
                                    >
                                    {()=>(
                                        <input
                                            type="text"
                                            required={true}
                                            className="form-control"
                                            placeholder={"+998-xx-xxx-xx-xx"}
                                            name="number"
                                        />
                                    )}
                                    </InputMask>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                            <label>
                                                <FormattedMessage
                                                    id="youtube"
                                                    defaultMessage="YouTube"
                                                />
                                            </label>
                                            <input
                                                type="text"

                                                value={youtube}
                                                name="start"
                                                onChange={(r)=>setyoutube(r.target.value)}
                                                className="form-control"
                                            />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <label>
                                            <FormattedMessage
                                                id="site"
                                                defaultMessage="Sayt"
                                            />

                                        </label>
                                        <input
                                            type="text"

                                            value={site}
                                            onChange={(r)=>setsite(r.target.value)}
                                            className="form-control"
                                        />
                                    </Grid>
                                <Grid item md={6} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="telegram"
                                            defaultMessage="Telegram"
                                        />
                                    </label>
                                    <input
                                        type="text"

                                        value={telegram}
                                        name="start"
                                        onChange={(r)=>settelegram(r.target.value)}
                                        className="form-control"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="instagram"
                                            defaultMessage="Instagram"
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        value={instagram}
                                        name="start"
                                        onChange={(r)=>setinstagram(r.target.value)}
                                        className="form-control"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="facebook"
                                            defaultMessage="Facebook"
                                        />
                                    </label>
                                    <input
                                        type="text"

                                        value={facebook}
                                        name="start"
                                        onChange={(r)=>setfacebook(r.target.value)}
                                        className="form-control"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="tiktok"
                                            defaultMessage="Tiktok"
                                        />
                                    </label>
                                    <input
                                        type="text"

                                        value={tiktok}
                                        name="start"
                                        onChange={(r)=>settiktok(r.target.value)}
                                        className="form-control"
                                    />
                                </Grid>
                                    {link.map((lin,index)=>(
                                        < ><Grid key={index} style={{marginLeft:"10px",marginRight:"10px"}} item md={12} xs={12}>
                                            <label>
                                                <FormattedMessage
                                                    id="shop_links"
                                                    defaultMessage="Sizning do'kongizga aloqador kanal... ga linklar"
                                                />
                                            </label>
                                            <div
                                                className="input-group mb-3"
                                                key={lin.key}
                                            >
                                                <input
                                                    type="text"
                                                    name="link"
                                                    value={lin}
                                                    required={true}
                                                    onChange={(r)=>updatelink(r,index)}
                                                    className="form-control"
                                                />
                                                <div className="input-group-append">
                                                    <button onClick={()=>handleremove(index)} className="btn btn-danger" type="submit">X</button>
                                                </div>  <br />
                                            </div>
                                        </Grid>
                                        </>
                                    ))}
                                    <Grid item md={12} xs={12}>
                                        <div className="btn btn-light"  onClick={handleAdd} style={{width:"100%",textAlign:"center",}}>+</div>
                                    </Grid>



                                <Grid item md={12} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="description"
                                            defaultMessage="Tavsif"
                                        />
                                    </label>
                                    <ReactQuill
                                        className="reactquill-height"
                                        value={description}
                                        onChange={(e)=>{setdescription(e),console.log(e);
                                        }}
                                    />
                                    {/* <textarea rows={10} required={true} value={description} onChange={(r)=>setdescription(r.target.value)} className="form-control"></textarea> */}
                                </Grid>

                                <Grid item md={12} xs={12}>
                                    <label>
                                        <FormattedMessage
                                            id="your_address"
                                            defaultMessage="Adres"
                                        />
                                    </label>
                                    <input type="text" autoComplete="new-address" placeholder={intl.formatMessage({id:"your_address"})} name="name" value={address} required={true} onChange={(r)=>setaddress(r.target.value)} className="form-control mb-3" />
                                    <label className="mb-2 ">
                                        <FormattedMessage
                                            id="your_address_map"
                                            defaultMessage="Sizning Manziligingiz(kartadan belgilang)"
                                        />
                                    </label>
                                    <Map3 set={(e)=>setcoordinate(e)} coordinate={coordinate}/>
                                </Grid>

                            </Grid>
                        </Box>

                        <Button type="submit" variant="contained" color="primary">
                            <FormattedMessage
                                id="update_vendor_info_button"
                                defaultMessage="Magazin malumotlarini yangilash"
                            />
                        </Button>
                    </form>
                </Card1>
            </div>
        </VendorDashboardLayout>
    );
};

export default AccountSettings;
AccountSettings.getInitialProps = async (ctx) => {
    let {token} = cookies(ctx)
    let {lang} = cookies(ctx)
    let x
    if(lang){
        x = lang
    }
    else{
        x = "uz"
    }
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${x}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })
    const answer = await request2.data;
    const request2_1 = await axios({
        method: "GET",
        url: `${BASE_URL}/shops/show/${answer.data.is_shops}/${x}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })
    const answer_1 = await request2_1.data;
    return {data: answer,shop_data:answer_1}
}




