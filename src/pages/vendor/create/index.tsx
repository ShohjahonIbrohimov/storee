import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import React, {useEffect, useState} from "react";
import Map3 from "@component/map3";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import cookies from "next-cookies";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import "bootstrap/dist/css/bootstrap.min.css"
import {useRouter} from "next/router";
import AppLayout from "@component/layout/AppLayout";
import Cookies from "js-cookie"
import {createIntl, createIntlCache, FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import InputMask from "react-input-mask";
import DeliveryTimeOptions from "@component/DeliveryTimeOptions";
const ReactQuill = dynamic(
	() => {
		return import('react-quill');
	},
	{ ssr: false }
);
const CreateShop = ({ data2,categories }) => {
    const router = useRouter();
    const cache = createIntlCache()

    const intl2 = createIntl({
        locale: 'ru-Ru',
    }, cache)
    let lang = useSelector((state:any)=>state.new.lang)
    let [Maincategory,setMaincategory] = useState(categories)
    useEffect(()=>{
        axios({
            method: "GET",
            url: `${BASE_URL}/shops/shops-category/${lang || Cookies.get("lang")}`,

        })
            .then((res)=>{
                setMaincategory(res.data)
            })
            .catch(()=>null)
    },[Cookies.get("lang")])
    let intl = useIntl()
    useEffect(()=>{
       if(data2?.data?.is_shops !== null){
           router.push("/vendor/products/page/1")
       }
    },[])
    const [coordinate,setcoordinate] = useState(null)
    const [map_e,setmap_er] = useState("")
    const loading = useSelector((state:any)=>state.new.category_loading)
    const dispatch = useDispatch()
    dispatch(fetch_user_info(data2))
    //----------------------------------------
    const [name,setname] = useState("")
    const [description,setdescription] = useState("")
    const [category_id,setcategory_id] = useState(undefined)
    const [category_e,sercat_er] = useState("")
    const [work_start_time,set_work_start_time] = useState(undefined)
    const [work_end_time,set_work_end_time] = useState(undefined)
    const [image,setimage] = useState(undefined)
    const [img_e,setimg_e] = useState("")
    const [link,setlink] = useState([])
    const [image2,setimage2] = useState("")
    const [succes,setsuccess] = useState("")
    const [address,setaddress] = useState("")
    const [youtube,setyoutube] = useState("")
    const [site,setsite] = useState("")
    const [delivery_time,setdelivery_time] = useState("")
    const [facebook,setfacebook] = useState("")
    const [tiktok,settiktok] = useState("")
    const [telegram,settelegram] = useState("")
    const [instagram,setinstagram] = useState("")
    let [background,setbackground] = useState(undefined)
    let [delivery_money,setdelivery_money] = useState(undefined)
    let [phone,setphone] = useState("")
    //------------------
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
    const handleremove = (id) => {
        let array = [...link];
        array.splice(id - 1, 1)
        setlink(array);
    }
    const handleFormSubmit2 = (event) => {

        setimg_e("")
        setsuccess("")
        setmap_er("")
        sercat_er("")
        event.preventDefault()
        const token2 = Cookies.get("token");
        if(coordinate === null){
            setmap_er(intl.formatMessage({id:"choose_place_map"}))
            setsuccess(intl.formatMessage({id:"choose_place_map"}))
        }
        else if(category_id === undefined){
            sercat_er(intl.formatMessage({id:"choose_category"}))
            setsuccess(intl.formatMessage({id:"choose_category"}))
        }
        else if(image === undefined){
            setimg_e(intl.formatMessage({id:"select_image"}))
            setsuccess(intl.formatMessage({id:"select_image"}))
        }
        else if(address === ""){
            setimg_e(intl.formatMessage({id:"choose_place_map"}))
            setsuccess(intl.formatMessage({id:"choose_place_map"}))
        }
        else if(delivery_time === ""){
            setsuccess(intl.formatMessage({id:"choose_delivery_time"}))
        }
        else if(description === "" || typeof description === "undefined" ||description === "<p><br></p>"){
            setsuccess(intl.formatMessage({id:"required_description"}))
        }
        else if(coordinate !== null && category_id !== undefined){
            let formData = new FormData()
            formData.append("name",name);
            formData.append("description",description);
            formData.append("category_id",category_id);
            formData.append("order_begin_time",work_start_time);
            formData.append("order_end_time",work_end_time);
            formData.append("image",image);
            formData.append("coordinate_x",coordinate[0])
            formData.append("coordinate_y",coordinate[1])
            formData.append("address",address)
            formData.append("delivery_money",delivery_money)
            formData.append("youtube",youtube)
            formData.append("site",site || "")
            formData.append("phone",phone || "")
            formData.append("delivery_time",delivery_time)
            formData.append("facebook",facebook)
            formData.append("instagram",instagram)
            formData.append("tiktok",tiktok)
            formData.append("telegram",telegram)

            if(typeof background !=="undefined"){
                formData.append("background_image",background)
            }
            link.forEach(function (value, index){
                formData.append(`link[${index}]`, value);
            });
            axios({
                method:"POST",
                url:`${BASE_URL}/shops/create/${lang}`,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${token2}`,
                },
                data:formData
            })
                .then(()=>{
                    setsuccess(intl.formatMessage({id:"create_shop_success"}))
                    router.push("/vendor/products/page/1")
                })
                .catch(()=>{
                    return;
                })
        }

    };
    return (
        <AppLayout >
            <NextSeo 
                title={intl.formatMessage({id:"business_account",defaultMessage:"Akkount"})}
            />
            <div className="container mb-lg-5 mt-lg-5">
                <DashboardPageHeader2
                    title={intl.formatMessage({id:"business_account",defaultMessage:"Akkount"})}
                    iconName="settings_filled"
                />

                <Card1 p="24px 30px">
                    <Box
                        borderRadius="10px"
                        overflow="hidden"
                        height="173px"
                        mb="1.5rem"
                        position="relative"
                        style={{
                            background:
                                `url(${typeof background !== "undefined" ? URL.createObjectURL(background) : "/assets/images/banners/banner-10.png"}) center/cover`,
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="flex-end"
                            position="absolute"
                            bottom="20px"
                            left="24px"
                        >
                            {img_e === "" ? "" : <div className="text-danger">{img_e}</div>}
                            <Avatar
                                src={image2}
                                alt={name||"avatar"}
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
                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                autoComplete="new-password"
                                                required={true}
                                                onChange={(r)=>setname(r.target.value)}
                                                className="form-control"
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                                <label htmlFor="sel1">
                                                <FormattedMessage
                                                    id="mobile_navigation_category"
                                                    defaultMessage="Kategoriya"
                                                />
                                                </label>
                                                <select  required={true} name="category"  onChange={(r)=>setcategory_id(r.target.value)}  className="form-control" id="sel1" >
                                                    <option hidden={true} value="">
                                                        {intl.formatMessage({id:"choose_category",defaultMessage:"Kategoriyalardan birini tanlang"})}
                                                    </option>
                                                    {loading ? "" : Maincategory?.map(category3=>(
                                                        <option
                                                            key={category3.id}
                                                            value={category3.id}

                                                        >
                                                            {category3.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {category_e === "" ? "" : <div className="text-danger">{category_e}</div>}
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <label>
                                                <FormattedMessage
                                                    id="delivery_time"
                                                    defaultMessage="Yetkazib berish vaqti"
                                                />
                                            </label>
                                            <DeliveryTimeOptions time={delivery_time} setTime={(e)=>setdelivery_time(e)} />
                                            {/*<input type="number" min={1} required={true} value={delivery_time} name="start" onChange={(r)=>setdelivery_time(r.target.value)} className="form-control" />*/}
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <label>
                                                <FormattedMessage
                                                    id="work_start_time"
                                                    defaultMessage="Ish boshlash Vaqt"
                                                />
                                            </label>
                                            <input
                                                type="time"
                                                required={true}
                                                value={work_start_time}
                                                name="start"
                                                onChange={(r)=>set_work_start_time(r.target.value)}
                                                className="form-control"
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <label>
                                                <FormattedMessage
                                                    id="work_end_time"
                                                    defaultMessage="Ish tugash vaqti"
                                                />

                                            </label>
                                            <input
                                                type="time"
                                                required={true}
                                                value={work_end_time}
                                                onChange={(r)=>set_work_end_time(r.target.value)}
                                                className="form-control"
                                            />
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
                                                    value={typeof delivery_money !== "undefined" || delivery_money  ?  intl2.formatNumber(delivery_money) :undefined}
                                                    onChange={(r)=> r.target.value !=="" || r?.target?.value ? setdelivery_money(parseInt(r.target.value.replace(/\s+/g,""))) : setdelivery_money(0)}
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
                                            < ><Grid style={{marginLeft:"10px",marginRight:"10px"}} key={index} item md={12} xs={12}>
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
                                                        <button
                                                            onClick={()=>handleremove(index)}
                                                            className="btn btn-danger"
                                                            type="submit"
                                                        >
                                                            X
                                                        </button>
                                                    </div>  <br />
                                                </div>
                                            </Grid>
                                            </>
                                        ))}
                                        <Grid item md={12} xs={12}>
                                            <div
                                                className="btn btn-light"
                                                onClick={handleAdd}
                                                style={{width:"100%",textAlign:"center",}}
                                            >
                                                <FormattedMessage
                                                    id="add_links"
                                                    defaultMessage="Link Qo'shish + "
                                                />
                                            </div>
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
                                            {/* <textarea
                                                rows={10}
                                                required={true}
                                                value={description}
                                                onChange={(r)=>setdescription(r.target.value)}
                                                className="form-control"
                                            /> */}
                                        </Grid>

                                        <Grid item md={12} xs={12}>
                                            <label>

                                                <FormattedMessage
                                                    id="your_address"
                                                    defaultMessage="Sizning manzilingiz"
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder={intl.formatMessage({id:"your_address"})}
                                                value={address}
                                                required={true}
                                                autoComplete="new-address"
                                                onChange={(r)=>setaddress(r.target.value)}
                                                className="form-control mb-3"
                                            />
                                                <label className="mb-2 ">
                                                    <FormattedMessage
                                                        id="choose_place_map"
                                                        defaultMessage="Sizning Manziligingiz(kartadan belgilang)"
                                                    />
                                                </label>

                                            <Map3 set={(e)=>setcoordinate(e)} coordinate={coordinate}/>
                                            {map_e === "" ? "" : <div className="text-danger">{map_e}</div>}
                                        </Grid>

                                    </Grid>
                                </Box>

                                <Button type="submit" variant="contained" color="primary">
                                    <FormattedMessage
                                        id="create_shop"
                                        defaultMessage="Magazin yaratish"
                                    />
                                </Button>
                                {succes === "" ? "" : <div className="text-danger">{succes}</div>}
                            </form>
                </Card1>
            </div>
        </AppLayout>
    );
};
CreateShop.getInitialProps = async (ctx) => {
    let {token,lang} = cookies(ctx)
    const request2 = await axios({
        method: "GET",
        url: `${BASE_URL}/profile/max-value/${lang}`,
        headers: {
            "Authorization": `Bearer ${token} `
        },
    })
    const request3 = await axios({
        method: "GET",
        url: `${BASE_URL}/shops/shops-category/${lang || "uz" }`,

    })

    const answer = await request2.data;
    const answer2 = await request3.data
    return {data2: answer,categories:answer2}
}
export default CreateShop;
// const initialValues = {
//   first_name: "",
//   last_name: "",
//   country: "",
//   city: "",
//   email: "",
//   contact: "",
// };

// const accountSchema = yup.object().shape({
//   first_name: yup.string().required("required"),
//   last_name: yup.string().required("required"),
//   country: yup.mixed().required("required"),
//   city: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup.string().required("required"),
// });




