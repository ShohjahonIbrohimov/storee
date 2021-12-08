import Button from "@component/buttons/Button";
import Card from "@component/Card";
import DropZone from "@component/DropZone";
import Grid from "@component/grid/Grid";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Link from "next/link";
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import Cookies from "js-cookie"
import {useRouter} from "next/router";
import {ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import useWindowSize from "@hook/useWindowSize";
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
const EditProduct = ({data,currency,material,units,one}) => {
  let intl = useIntl()
  // let price2 = one.data.price.split(" ")
  // price2.splice(price2.length-1,1)
  // let price5 = "";
  // price2.forEach(value=>{
  //   price5+=value;
  // })
  // -------States----------
  const [name,setname] = useState(one.data.name)
  const [desc,setdesc] = useState(one.data.description)
  const [cat_id,setcat_id] = useState(one.data.categoryId)
  const [cat_name,setcat] = useState(one.data.categoryName)
  const [cat_er,setcat_er] = useState("")
  const [price,setprice] = useState(one?.data?.priceFlowers)
  const [price_c,setprice_c] = useState(one?.data?.currency_id)
  const [price_er,setprice_er] = useState("")
  const [width,setwidth] = useState(one.data.width)
  const [width_unit,setwidth_unit] = useState(one.data.width_unit_id)
  const [width_er,setwidth_er] = useState("")
  const [height,setheight] = useState(one.data.height)
  const [height_unit,setheight_unit] = useState(one.data.height_unit_id)
  const [height_er,setheight_er] = useState("")
  const [count,setcount] = useState(one.data.count)
  const [booked,setbooked] = useState(one.data.booked)
  const [discount,setdiscount] = useState(one.data.discount||0)
  const [photo,setphoto] = useState(one?.data?.image ? one?.data?.image : [])
  let [photo_err,setphoto_err] = useState("")
  const [structure,setstructure] = useState(one.data.structure)
  let width2 = useWindowSize()
  // -------States----------
  console.log(structure)
  const category_dropdown = items =>{
    return items.map((item,ind)=>
        item.children.length !==0
            ?
            <div className="mb-2" key={ind}>
              <DropdownButton
                  as={ButtonGroup}
                  key="end"
                  id={`dropdown-button-drop-bottom`}
                  drop="down"
                  variant="light"
                  title={item.title}
              >
                {category_dropdown(item.children)}
              </DropdownButton>
            </div>
            :
            <Dropdown.Item onClick={()=>{setcat_id(item.id),setcat(item.title)}} eventKey={item.id}>{item.title}</Dropdown.Item>

    )}
  const updatematerial2 = (e,id) =>{
    e.preventDefault()
    let array = [...structure]
    array[id].material_id = e.target.value;
    setstructure(array)
  }
  const updatecount2 = (t,id) =>{
    t.preventDefault()
    let array = [...structure]
    array[id].count = t.target.value;
    setstructure(array)
  }
  const updateunit2 = (x,id )=>{
    x.preventDefault()
    let array = [...structure]
    array[id].unit_id =x.target.value;
    setstructure(array)
  }
  const addstructure = ()=>{
    let array = [...structure]
    array.push({
      material_id:undefined,
      count:0,
      unit_id:undefined
    })
    setstructure(array)
  }
  const handleremove = (id) => {
    let array = [...structure];
    array.splice(id - 1, 1)
    setstructure(array);
  }
  const category = useSelector((state:any)=>state.new.category)
  let delete_style
  if(width2 < 650){
    delete_style = {
      marginTop:"29px",
      paddingRight:"15px",
      paddingLeft:"15px",
      marginLeft:"0%"
    }
  }
  else{
    delete_style = {
      marginTop:"29px",
      paddingRight:"24px",
      paddingLeft:"24px",
      marginLeft:"0%"
    }
  }
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))
  let router = useRouter()
  const handlePhotoAdd = (photos) =>{
    setphoto(prevState=>[...prevState,...photos])
} 
const handleRemoveImage = (id,ind) =>{
  let array = [...photo];
  console.log(id)
  array.splice(ind, 1)
  setphoto(array);
}
  // const coordinates = useSelector(state=>state.new.coordinates)
  const handleFormSubmit = async (values) => {

        values.preventDefault();
        let data = new FormData();
        data.append('name', name);
        data.append('description', desc);
        data.append('cat_id', cat_id);
        data.append('shop_id',one?.data?.shop_id);
        data.append('price', price.toString());
        data.append('currency_id', price_c);
        data.append('width', width);
        data.append('width_unit_id', width_unit);
        data.append('height', height);
        data.append('height_unit_id', height_unit);
        data.append('count', count || 0);
        data.append('booked', booked || 0);
        data.append('discount', discount || 0);
        photo.forEach(function (value, index){
          if(typeof value !== "string"){
            data.append(`photo[${index}]`, value);
          }
        });
        structure.forEach(function (value, index){
          data.append(`structure[${index}][material_id]`, value.material_id);
          data.append(`structure[${index}][count]`, value.count.toString());
          data.append(`structure[${index}][unit_id]`, value.unit_id);
        });
        setcat_er("")
        setprice_er("")
        setwidth_er("")
        setheight_er("")
    let r = router.asPath.split("/")[3]
        if(cat_id === undefined){
          setcat_er(intl.formatMessage({id:"choose_category"}))
          window.scrollTo({top:100});
        }
        else if(price_c === undefined){

          setprice_er(intl.formatMessage({id:"currency_unit"}))
        }
        else if(width_unit === undefined){

          setwidth_er(intl.formatMessage({id:"units_error"}))
        }
        else if(height_unit === undefined){
          setheight_er(intl.formatMessage({id:"units_error"}))
        }
        else if(photo === [] || photo.length ===0 || typeof photo === "undefined" ){
          window.scrollTo({top:90})
          setphoto_err(intl.formatMessage({id:"select_image"}))
        }
        else{
          const token2 = Cookies.get("token");
          const lang = Cookies.get("lang") || "uz"
          axios({
            method:"POST",
            url:`${BASE_URL}/flowers/update/${r}/${lang}`,
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization":`Bearer ${token2}`,
            },
            data:data
          })
              .then(()=>{
                router.push("/vendor/products/page/1")
              })
              .catch(()=>{
                return;
              })
        }
      }
  ;

  return (
    <VendorDashboardLayout >
      <NextSeo
            title={intl.formatMessage({id:"edit_product"})}
      />
      <div>
        <DashboardPageHeader2
            title={intl.formatMessage({id:"edit_product",defaultMessage:"Mahsulotni tahrirlash"})}
            iconName="delivery-box"
            button={
              <Link href="/vendor/products/page/1">
                <Button color="primary" bg="primary.light" px="2rem">
                    <FormattedMessage
                      id="back_to_product_list"
                      defaultMessage="Mahsulot listiga qaytish"
                    />
                </Button>
              </Link>
            }
        />

        <Card p="30px">
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12} md={6}>
                <label>
                  <FormattedMessage
                       id="Product Name"
                       defaultMessage="Nomi"
                   />
                </label>
                <input
                    type="text"
                    required={true}
                    value={name}
                    onChange={(r)=>setname(r.target.value)}
                    className="form-control"
                />
              </Grid>
              <Grid item sm={12} xs={12} md={6}>
                <label htmlFor="sel6">
                  <FormattedMessage
                    id="mobile_navigation_category"
                    defaultMessage="Kategoriyalar"
                  />:
                </label><br/>
                <DropdownButton
                    style={{border:"1px solid #c7cbd1",borderRadius:"5px",width:"100%"}}
                    border="secondary"
                    as={ButtonGroup}
                    key="end"
                    id={`dropdown-button-drop-down`}
                    drop="down"
                    variant="light"
                    title={cat_name === "" ? "PLease choose one of category for your product" : cat_name}
                >
                  {category_dropdown(category)}
                </DropdownButton>
                {cat_er !== "" ? <div className="text-danger">{cat_er}</div>: ""}
              </Grid>
              <Grid item xs={12}>
                <DropZone
                    onChange={(files) => {
                      handlePhotoAdd(files)
                    }}
                />
              </Grid>
              <div>{ photo_err !=="" ? <div className="col-12 text-danger">{photo_err}</div>:""}</div>
              {photo.map((img,ind)=>(
                <Grid item sm={3} xs={6} key={ind} >
                      <div style={{position:"relative"}} >
                      <img src={typeof img === "string" ?  img  : URL.createObjectURL(img)} alt={name} width="50px" height='50px' />
                        <div  style={{position:"absolute",zIndex:10,top:"-10px",left:"38px",}}>
                            <HighlightOffIcon className="text-danger" onClick={()=>handleRemoveImage(img.id,ind)} />
                        </div>
                      </div>
                </Grid>
                ))}
              <Grid item xs={12} md={12} sm={12}>
                <label className="mt-1 mb-1" >
                  <FormattedMessage
                    id="description"
                    defaultMessage="Tavsif"
                  />
                </label>
                <textarea
                    onChange={(e)=>setdesc(e.target.value)}
                    cols={20}
                    rows={7}
                    required = {true}
                    value={desc}
                    className="form-control"
                />
              </Grid>
              <Grid item sm={12} xs={12} md={6}>
                <label className="mt-1 mb-1" >
                  <FormattedMessage
                    id="Amount"
                    defaultMessage="Soni"
                  />
                </label>
                <input
                    type="number"
                    className="form-control form-control-color-danger"
                    value={count}
                    placeholder={intl.formatMessage({id:"Amount"})}
                    onChange={(e)=>setcount(e.target.value)}
                />
              </Grid>

              <Grid item sm={8} xs={9} md={3}>
                <label className="mt-1 mb-1">

                  <FormattedMessage
                    id="Regular Price"
                    defaultMessage="Narxi"
                  />
                </label>
                <input
                    value={price}
                    type="number"
                    required={true}
                    className="form-control"
                    placeholder={intl.formatMessage({id:"Regular Price",defaultMessage:"Narx"})}
                    onChange={(t)=>setprice(parseInt(t.target.value))}
                />
              </Grid>
              <Grid item sm={4} xs={3} md={3}>
                <label>
                    {intl.formatMessage({id:'currency',defaultMessage:"Pul birligi"})}
                </label>
                <select
                    required={true}
                    onChange={(e)=>setprice_c(e.target.value)}
                    className="form-control"
                    value={price_c}
                    id="sel2"
                >
                  <option value="" hidden={true}>
                    {intl.formatMessage({id:'currency',defaultMessage:"Pul birligi"})}
                    </option>
                  {currency.map(categor=>(
                      <option key={categor.id} value={categor.id}>{categor.code}</option>
                  ))}
                </select>
                {price_er !== "" ? <div className="text-danger">{price_er}</div>: ""}

              </Grid>
              <Grid item sm={12} xs={12} md={12}>
                <label className="mt-1 mb-1" >
                  <FormattedMessage
                    id="Discount(without percentage)"
                    defaultMessage="Chegirma(foiz yozish shart emas)"
                  />
                </label>
                <input
                    type="number"
                    onChange={(r)=>setdiscount(r.target.value)}
                    placeholder={intl.formatMessage({id:"Discount(without percentage)"})}
                    className="form-control form-control-color-danger"
                    value={discount}
                    
                />
              </Grid>
              {/*<Grid item  xs={12} md={6}>*/}
              {/*  <label>*/}
              {/*    <FormattedMessage*/}
              {/*      id="Delivery Time"*/}
              {/*      defaultMessage="Yetkazib berish vaqti"*/}
              {/*    />*/}
              {/*  </label>*/}

              {/*  <DatePicker*/}
              {/*          selected = {deliver}*/}
              {/*          minDate={new Date()}*/}
              {/*          maxDate={addYears(new Date(),30)}*/}
              {/*          onChange={(date) => {setdeliver(date)}}*/}
              {/*          className="form-control"*/}
              {/*          dateFormat="dd/MM/yyyy"*/}

              {/*        />*/}
              {/*</Grid>*/}
              <Grid item sm={8} xs={8} md={3}>
                <label className="mt-1 mb-1" >
                  <FormattedMessage
                    id="width"
                    defaultMessage="Eni"
                  />
                </label>
                <input
                    type="number"
                    placeholder={intl.formatMessage({id:"width"})}
                    className="form-control form-control-color-danger"
                    required={true}
                    value={width}
                    onChange={(y)=>setwidth(y.target.value)}
                />
              </Grid>
              <Grid item sm={4} xs={4} md={3}>
                <label>
                  {intl.formatMessage({id:"width_unit"})}
                </label>
                <select
                    required={true}
                    onChange={(r)=>setwidth_unit(r.target.value)}
                    className="form-control"

                    id="sel3"
                    value={width_unit}
                >
                  <option value="" hidden={true}>
                    {intl.formatMessage({id:"width_unit"})}
                  </option>
                  {units.map(categor=>(
                      <option key={categor.id}  value={categor.id}>{categor.name}</option>
                  ))}
                </select>
                {width_er !== "" ? <div className="text-danger">{width_er}</div>: ""}

              </Grid>
              <Grid item sm={8} xs={8} md={3}>
                <label className="mt-1 mb-1" >
                  <FormattedMessage
                    id="height"
                    defaultMessage="Bo'yi"
                  />
                </label>
                <input
                    type="number"
                    placeholder={intl.formatMessage({id:"height"})}
                    className="form-control form-control-color-danger"
                    required={true}
                    value={height}
                    onChange={(t)=>setheight(t.target.value)}
                />
              </Grid>
              <Grid item sm={4} xs={4} md={3}>
                <label>
                  {intl.formatMessage({id:"height_unit",defaultMessage:"Bo'yi O'lchovi"})}
                </label>
                <select
                    required={true}
                    onChange={(y)=>setheight_unit(y.target.value)}
                    className="form-control"

                    id="sel1"
                    value={height_unit}
                >
                  <option value="" hidden={true}>
                    {intl.formatMessage({id:"height_unit",defaultMessage:"Bo'yi O'lchovi"})}
                  </option>
                  {units.map(categor=>(
                      <option key={categor.id}  value={categor.id}>{categor.name}</option>
                  ))}
                </select>
                {height_er !== "" ? <div className="text-danger">{height_er}</div>: ""}

              </Grid>
              <Grid item sm={12} xs={12}>
                <label className="mt-1 mb-1" >
                  <FormattedMessage
                    id="Booked"
                    defaultMessage="Oldindan band qilib qoyilganlar soni"
                  />
                </label>
                <input
                    type="number"
                    placeholder={intl.formatMessage({id:"Booked",defaultMessage:"Oldindan band qilib qoyilganlar soni"})}
                    className="form-control form-control-color-danger"
                    value={booked}
                    onChange={(e)=>setbooked(e.target.value)}
                />
              </Grid>
              <Grid item sm={12} md={12} style={{textAlign:"center",fontSize:"large"}}>
                <FormattedMessage
                  id="Consumed_products"
                  defaultMessage="Ishlatilgan maxsulotlar"
                />
              </Grid>
              {structure.map((struct,index)=>(
                    <>
                    <Grid item sm={12} xs={12}  md={12} key={index}  alignContent="center" className="justify-content-center mb-2"  >
                      <div
                          className=" border-muted justify-content-center pt-3"
                          style={{borderBottom:"3px solid lavender"}}
                      />
                    </Grid>
                    <Grid item sm={7} xs={7} md={9} className="ml-3" style={{marginRight:"5%"}}>
                      <label htmlFor="sel4">
                        Material
                        <FormattedMessage
                          id="Used Products"
                          defaultMessage="Mahsulot"
                        />
                      </label>
                      <select value={struct.material_id} style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}} required={true} onChange={(t)=>updatematerial2(t,index)} className="form-control"  id="sel4">
                        <option>
                          {intl.formatMessage({id:'material_select'})}
                        </option>
                        {material.map(categor=>{
                          let r = 0
                          structure?.map((structu)=>structu?.material_id=== parseInt(categor?.id) ? r++ : "")
                          if(r<1) {
                            return (
                                <option key={categor?.id} value={categor?.id}>{categor?.name}</option>)
                          }
                          else{
                            return (
                                <option key={categor?.id} hidden={true} value={categor?.id}>{categor?.name}</option>)
                          }
                        })}
                      </select>
                    </Grid>
                  <Grid item sm={3} xs={3} md={2} className="float-right justify-content-right align-items-right ml-2 ml-sm-2 ml-md-0 ml-lg-0 ml-xl-0" >
                    <label className="mt-1 mb-1" >
                      <FormattedMessage
                        id="Amount"
                        defaultMessage="Soni"
                      />
                    </label>
                   <input
                      type="number"
                      className="form-control form-control-color-danger"
                      value={struct.count || ""}
                      placeholder={intl.formatMessage({id:"Amount"})}
                      onChange={(e)=>updatecount2(e,index)}
                    />
                  </Grid>
                  <Grid item sm={8} xs={8} md={9}  className="ml-3" style={{marginRight:"5%"}} >
                    <label htmlFor="sel5">
                      <FormattedMessage
                        id="unit"
                        defaultMessage="Birligi"
                      />
                    </label>
                    <select value={struct.unit_id} style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}} onChange={(t)=>updateunit2(t,index)} className="form-control"  id="sel5">
                        <option style={{textOverflow:"ellipsis",overflow:"hidden",width:"90%",whiteSpace:"nowrap"}}>
                          {intl.formatMessage({id:'unit_select',defaultMessage:"iltimos birligini tanlang"})}
                        </option>
                        {units.map(categor=>(
                        <option key={categor.id}  value={categor.id}>{categor.name}</option>
                        ))}
                    </select>
                  </Grid>
                    <Grid item sm={2} xs={2} md={2} className="text-right float-right justify-content-right" >
                          <button onClick={()=>handleremove(index)} className="btn btn-danger w-100 ml-2 ml-sm-2 ml-md-0 ml-lg-0 ml-xl-0" style={delete_style}>
                            {width2 < 400 ? "X" : intl.formatMessage({id:"delete"})}
                          </button>
                    </Grid>
                    
                    </>
                ))}

              
              <Grid item md={12} xs={12}  >
                <div
                    className="btn btn-light"
                    onClick={addstructure}
                    style={{textAlign:"center",width:"100%",cursor:"pointer"}}
                >
                  <FormattedMessage
                    id="add_used_products"
                    defaultMessage="Ishlatilgan material qo'shish +"
                  />

                </div>
              </Grid>
              <Button
                  mt="25px"
                  variant="contained"
                  color="primary"
                  type="submit"
              >
                <FormattedMessage
                  id="send"
                  defaultMessage="Saqlash"
                />
              </Button><br/>
              <div className="col-12 text-danger">{cat_er === "" ? "" : cat_er}</div>
              <div className="col-12 text-danger">{price_er === "" ? "" : price_er}</div>
              <div className="col-12 text-danger">{height_er === "" ? "" : height_er}</div>
              <div className="col-12 text-danger">{width_er === "" ? "" : width_er}</div>
              <div className="col-12 text-danger">{photo_err === "" ? "" : photo_err}</div>
            </Grid>
          </form>
        </Card>
      </div>
   </VendorDashboardLayout>
  );
};

// const initialValues = {
//   name: "",
//   stock: "",
//   price: "",
//   sale_price: "",
//   description: "",
//   tags: "",
//   category: "",
//   address:""
// };
//
// const checkoutSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   category: yup.string().required("required"),
//   description: yup.string().required("required"),
//   stock: yup.number().required("required"),
//   price: yup.number().required("required"),
//   sale_price: yup.number().required("required"),
//   tags: yup.object().required("required"),
// });


export default EditProduct;
EditProduct.getInitialProps = async (ctx) => {
  let { id } = ctx.query
  let {token} = cookies(ctx)
  let {lang} = cookies(ctx)
  let x;
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
    url: `${BASE_URL}/references/currency/${x}`,
  })
  const answer_1 = await request2_1.data;
  const request2_2 = await axios({
    method: "GET",
    url: `${BASE_URL}/flowers/material/list/${x}`,
  })
  const answer_2 = await request2_2.data;
  const request2_3 = await axios({
    method: "GET",
    url: `${BASE_URL}/flowers/units/list/${x}`,
  })
  const answer_3 = await request2_3.data;
  const request2_4 = await axios({
    method: "GET",
    url: `${BASE_URL}/flowers/show/${id}/${x}`,
  })
  const answer_4 = await request2_4.data;
  return {data: answer,currency:answer_1,material:answer_2,units:answer_3,one:answer_4}
}
