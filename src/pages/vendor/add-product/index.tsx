import Button from "@component/buttons/Button";
import Card from "@component/Card";
import DropZone from "@component/DropZone";
import Grid from "@component/grid/Grid";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetch_user_info} from "../../../../Redux/Actions/Action";
import Cookies from "js-cookie"
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import {ButtonGroup, DropdownButton,Dropdown} from "react-bootstrap";
import {useRouter} from "next/router";
import DashboardPageHeader2 from "@component/layout/DashboardPageHeader2";
import useWindowSize from "@hook/useWindowSize";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
const AddProduct = ({data2,currency2,material2,units2}) => {
  const width2 = useWindowSize()
  let intl = useIntl();
  // -------States----------
  const [name,setname] = useState("");
  const [desc,setdesc] = useState("");
  const [cat_id,setcat_id] = useState(undefined);
  const [cat_name,setcat] = useState("");
  const [cat_er,setcat_er] = useState("");
  const [price,setprice] = useState(undefined);
  const [price_c,setprice_c] = useState(undefined);
  const [price_er,setprice_er] = useState("");
  const [width,setwidth] = useState(undefined);
  const [width_unit,setwidth_unit] = useState(undefined);
  const [width_er,setwidth_er] = useState("");
  const [height,setheight] = useState(undefined);
  const [height_unit,setheight_unit] = useState(undefined);
  const [height_er,setheight_er] = useState("");
  // const [deliver,setdeliver] = useState(new Date());
  const [count,setcount] = useState(undefined);
  const [booked,setbooked] = useState(undefined);
  const [discount,setdiscount] = useState(0);
  const [photo,setphoto] = useState([]);
  let [photo_err,setphoto_err] = useState("")
  const [structure,setstructure] = useState([]);
  let [currency,setcurrency] = useState(currency2);
  let [material,setmaterial] = useState(material2)
  let [units,setunits] = useState(units2)
  let [loading,setloading] = useState(false)
  // let [map,setmap] = useState(new Map())
  // -------States----------
  const router = useRouter()
  const lang = router.locale
  useEffect(() => {
      axios({
        method: "GET",
        url: `${BASE_URL}/references/currency/${lang}`,
      })
          .then(res=>{
              setcurrency(res.data)
          })
          .catch(()=>null)
      axios({
        method: "GET",
        url: `${BASE_URL}/flowers/material/list/${lang}`,
      })
          .then(res=>{
            setmaterial(res.data)
          })
          .catch(()=>null)
      axios({
        method: "GET",
        url:`${BASE_URL}/flowers/units/list/${lang}`,
      })
          .then(res=>{
              setunits(res.data)
          })
          .catch(()=>null)
  }, [Cookies.get("lang")]);


  const category_dropdown = items =>{
      return items?.map((item,ind)=>
          item?.children !== null ?
              item?.children?.length !== 0
                ?
                <div className="mb-2" key={ind}>
                  <DropdownButton
                      as={ButtonGroup}
                      key="end"
                      id={`dropdown-button-drop-end`}
                      drop="down"
                      variant="light"
                      title={item?.title}

                  >
                    {category_dropdown(item?.children)}
                  </DropdownButton>
                </div>
            :
                <Dropdown.Item
                    onClick={()=>{setcat_id(item?.id),
                    setcat(item?.title)}}
                    eventKey={item?.id}
                >
                  {item.title}
                </Dropdown.Item>
          :
              <Dropdown.Item
                  onClick={()=>{setcat_id(item?.id),
                  setcat(item?.title)}}
                  eventKey={item?.id}
              >
                {item?.title}
              </Dropdown.Item>
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
  const dispatch = useDispatch()
  dispatch(fetch_user_info(data2))
  let user3 = useSelector((state:any)=>state.token.user)
  const handleFormSubmit = async (values) => {
    values.preventDefault();
    setloading(true)
    let data = new FormData();
    data.append('name', name);
    data.append('description', desc);
    data.append('cat_id', cat_id);
    data.append('keyword',user3.data.is_shops );
    data.append('price', price);
    data.append('currency_id', price_c);
    data.append('width', width);
    data.append('width_unit_id', width_unit);
    data.append('height', height);
    data.append('height_unit_id', height_unit);
    if(typeof count !== "undefined"){
      data.append('count', count);
    }
    data.append('booked', typeof booked !== "undefined" ? booked.toString() : "0" );
    data.append('discount', discount.toString() || "0");
    photo.forEach(function (value, index){
      data.append(`photo[${index}]`, value);
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
    setphoto_err("")
    if(cat_id === undefined){
        window.scrollTo({top:100})
        setcat_er(intl.formatMessage({id:"choose_category"}))
        setloading(false)
    }
    else if(price_c === undefined){
      setprice_er(intl.formatMessage({id:"currency_required"}))
      setloading(false)
    }
    else if(width_unit === undefined){
      setwidth_er(intl.formatMessage({id:"choose_length_scales"}))
      setloading(false)
    }
    else if(height_unit === undefined){
      setheight_er(intl.formatMessage({id:"choose_length_scales"}))
      setloading(false)
    }
    else if(photo === [] || photo.length ===0 || typeof photo === "undefined" ){
      window.scrollTo({top:90})
      setphoto_err(intl.formatMessage({id:"select_image"}))
      setloading(false)
    }
    else{
      const token2 = Cookies.get("token");
      
      axios({
        method:"POST",
        url:`${BASE_URL}/flowers/create/${lang}`,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${token2}`,
        },
        data:data
      })
          .then(()=>{
            router.push("/vendor/products/page/1")
            setloading(false)
          })
          .catch(()=>{
            setloading(false)
            return;
          })
      }
    };

  const handlePhotoAdd = (photos) =>{
      setphoto(prevState=>[...prevState,...photos])
  } 
  const handleRemoveImage = (id,ind) =>{
    let array = [...photo];
    console.log(id)
    array.splice(ind, 1)
    setphoto(array);
  }

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
  return (
    <VendorDashboardLayout title={intl.formatMessage({id:"add_product"})}>
      <NextSeo 
          title={intl.formatMessage({id:"add_product"})}
      />
    <div>
      <DashboardPageHeader2
        title={intl.formatMessage({id:"add_product"})}
        iconName="delivery-box"
        button={
          <Link href="/vendor/products/page/1">
            <Button color="primary" bg="primary.light" px="2rem">
              <FormattedMessage
                id="Back to Product List"
                defaultMessage="Mahsulotlar listiga qaytish"
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
                <Grid item sm={12} xs={12} md={6} >
                  <>
                    <div className="mb-2" >
                      <label>
                        <FormattedMessage
                          id="mobile_navigation_category"
                          defaultMessage="Kategoriya"
                        />
                      </label><br/>
                          <DropdownButton
                              style={{border:"1px solid #c7cbd1",borderRadius:"5px",width:"100%",zIndex:50}}
                              border="secondary"
                              as={ButtonGroup}
                              key="end"
                              id={`dropdown-button-drop-end`}
                              drop="down"
                              variant="light"
                              title={cat_name === "" ? intl.formatMessage({id:"choose_category"}) : cat_name}
                          >
                            {category_dropdown(category)}
                          </DropdownButton>
                    </div>


                  </>

                  {cat_er !== "" ? <div className="text-danger">{cat_er}</div>: ""}
                </Grid>
                <Grid item xs={12}>
                  <DropZone
                    onChange={files=>handlePhotoAdd(files)}
                  />
                </Grid>
                <div>
                    { photo_err !=="" ? <div className="col-12 text-danger">{photo_err}</div>:""}
                </div>
                {photo?.map((img,ind)=>(
                <Grid item sm={3} xs={6} key={ind} >
                      <div style={{position:"relative"}} >
                      <img src={URL.createObjectURL(img)} alt={name || "Product Image"} width="50px" height='50px' />
                        <div  style={{position:"absolute",zIndex:5,top:"-10px",left:"38px",}}>
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
                  >

                    </textarea>
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
                <Grid item sm={8} xs={8} md={3}>
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
                      placeholder={intl.formatMessage({id:"Regular Price"})}
                      onChange={(t)=>setprice(t.target.value)}
                  />
                </Grid>
                <Grid item sm={4} xs={4} md={3}>
                  <label>
                      {intl.formatMessage({id:"unit",defaultMessage:"Birligi"})}
                  </label>
                  <select
                      required={true}
                      onChange={(e)=>setprice_c(e.target.value)}
                      className="form-control"

                      id="sel2"
                  >
                      <option value="" hidden={true}>
                        {intl.formatMessage({id:"unit",defaultMessage:"Birligi"})}
                      </option>
                      {currency?.map(categor=>(
                          <option key={categor.id} value={categor.id}>{categor.code}</option>
                      ))}
                  </select>
                  {price_er !== "" ? <div className="text-danger">{price_er}</div>: ""}

                </Grid>
                <Grid item sm={12} xs={12} md={12}>
                 <label className="mt-1 mb-1" >
                   <FormattedMessage
                    id="Discount(without percentage)"
                    defaultMessage="Chegirma(foiz belgisini yozish shart emas)"
                   />
                 </label>
                      <input
                          type="number"
                          onChange={(r)=>setdiscount(parseInt(r.target.value))}
                          placeholder={intl.formatMessage({id:"Discount(without percentage)",defaultMessage:"Chegirma(foiz belgisini yozish shart emas)"})}
                          className="form-control form-control-color-danger"
                          
                      />
                </Grid>
                {/*<Grid item  xs={12} md={6}>*/}
                {/*  <label>*/}
                {/*    <FormattedMessage*/}
                {/*      id="Delivery Time"*/}
                {/*      defaultMessage="Yetkazib berish vaqti"*/}
                {/*    />*/}
                {/*  </label>*/}
                {/*     <DatePicker*/}
                {/*        selected = {deliver}*/}
                {/*        minDate={new Date()}*/}
                {/*        maxDate={addYears(new Date(),30)}*/}
                {/*        onChange={(date) => {setdeliver(date)}}*/}
                {/*        className="form-control"*/}
                {/*        dateFormat="dd-MM-yyyy"*/}
                {/*      />*/}
                {/*</Grid>*/}
                <Grid item sm={6} xs={6} md={3}>
                  <label className="mt-1 mb-1" >
                    <FormattedMessage
                      id="width"
                      defaultMessage="Eni"
                    />
                  </label>
                  <input
                      type="number"
                      placeholder={intl.formatMessage({id:"width",defaultMessage:"Eni"})}
                      className="form-control form-control-color-danger"
                      required={true}
                      value={width}
                      onChange={(y)=>setwidth(y.target.value)}
                  />
                </Grid>
                <Grid item sm={6} xs={6} md={3}>
                  <label>
                       {intl.formatMessage({id:"width_unit",defaultMessage:"Enini o'lchovi"})}
                  </label>
                  <select
                      required={true}
                      onChange={(r)=>setwidth_unit(r.target.value)}
                      className="form-control"

                      id="sel3"
                  >
                    <option value="" hidden={true}>
                      {intl.formatMessage({id:"width_unit",defaultMessage:"Enini o'lchovi"})}
                    </option>
                    {units?.map(categor=>(
                        <option key={categor?.id}  value={categor?.id}>{categor?.name}</option>
                    ))}
                  </select>
                  {width_er !== "" ? <div className="text-danger">{width_er}</div>: ""}

                </Grid>
                <Grid item sm={6} xs={6} md={3}>
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
                <Grid item sm={6} xs={6} md={3}>
                  <label>
                     {intl.formatMessage({id:"height_unit",defaultMessage:"Bo'yi o'lchovi"})}
                  </label>
                  <select
                      required={true}
                      onChange={(y)=>setheight_unit(y.target.value)}
                      className="form-control"
                      id="sel1"
                  >
                    <option value="" hidden={true}>
                      {intl.formatMessage({id:"height_unit",defaultMessage:"Bo'yi o'lchovi"})}
                    </option>
                    {units?.map(categor=>(
                        <option key={categor?.id}  value={categor?.id}>{categor?.name}</option>
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
                      placeholder={intl.formatMessage({id:"Booked"})}
                      className="form-control form-control-color-danger"
                      value={booked}
                      onChange={(e)=>setbooked(parseInt(e.target.value))}
                  />
                </Grid>
                <Grid item sm={12} md={12} xs={12} style={{textAlign:"center",fontSize:"large"}}>
                    <FormattedMessage
                      id="Consumed_products"
                      defaultMessage="Ishlatilgan materiallar"
                    />
                </Grid><br/>
                {structure?.map((struct,index)=>(
                    <>
                    <Grid
                        item
                        sm={12}
                        xs={12}
                        md={12}
                        key={index}
                        alignContent="center"
                        className="justify-content-center mb-2"
                    >
                      <div
                          className=" border-muted justify-content-center pt-3"
                          style={{borderBottom:"3px solid lavender"}}
                      >
                      </div>
                    </Grid>

                      <div className="col-12">
                          <div className="row">
                              <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                                  <label htmlFor="sel4"><FormattedMessage id="materials" /></label>
                                    <select style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}} required={true} onChange={(t)=>updatematerial2(t,index)} className="form-control"  id="sel4">
                                      <option hidden={true}>
                                        {intl.formatMessage({id:"material_select",defaultMessage:"Materiallardan birini tanlang"})}
                                      </option>
                                      {material?.map((categor)=> {
                                        let r = 0
                                        structure?.map((structu)=>structu?.material_id === categor?.id?.toString() ? r++ : "")
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
                              </div>
                            <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 ">
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
                            </div>
                          </div>
                      </div>


                      <div className="col-12">
                          <div className="row">
                              <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                                  <label htmlFor="sel5">
                                    <FormattedMessage
                                      id="unit"
                                      defaultMessage="Birligi"
                                    />
                                  </label>
                                  <select style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}} onChange={(t)=>updateunit2(t,index)} className="form-control"  id="sel5">
                                      <option hidden={true} style={{textOverflow:"ellipsis",overflow:"hidden",width:"90%",whiteSpace:"nowrap"}}>
                                          {intl.formatMessage({id:"unit_select",defaultMessage:"Iltimos olchov birliklardan birini tanlang"})}
                                      </option>
                                      {units?.map(categor=>(
                                      <option key={categor?.id}  value={categor?.id}>{categor?.name}</option>
                                      ))}
                                  </select>
                              </div>
                            <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 ">
                                <button
                                    onClick={()=>handleremove(index)}
                                    id="delete_x_button"
                                    className="btn w-100 btn-danger ml-0 ml-sm-0 ml-md-0 ml-lg-0 ml-xl-0"
                                    style={delete_style}
                                >
                                  {width2 < 400 ? "X" : "Delete"}
                                </button>
                            </div>
                          </div>
                      </div>
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
                disabled={loading}
              >
                <FormattedMessage
                  id="send"
                  defaultMessage="Saqlash"
                />
              </Button>
              <div className="col-12">
                { photo_err !=="" ? <div className="text-danger">{photo_err}<br/></div>:""}
              </div>
              <div className="col-12">
                { cat_er !=="" ? <div className="text-danger">{cat_er}<br/></div>:""}
              </div>
              <div className="col-12">
                 { price_er !=="" ? <div className="text-danger">{price_er}<br/></div>:""}
              </div>
              <div className="col-12">
                  { width_er !=="" ? <div className="text-danger">{width_er}<br/></div>:""}
              </div>
              <div className="col-12">
                  { height_er !=="" ? <div className="text-danger">{height_er}<br/></div>:""}
              </div>
              </Grid>
            </form>
      </Card>
    </div>
    </VendorDashboardLayout>
  );
};

export default AddProduct;
AddProduct.getInitialProps = async (ctx) => {
  let {token} = cookies(ctx)
  let {lang} = cookies(ctx)
  const request2 = await axios({
    method: "GET",
    url: `${BASE_URL}/profile/max-value/${lang}`,
    headers: {
      "Authorization": `Bearer ${token} `
    },
  })
  const answer = await request2.data;
  const request2_1 = await axios({
    method: "GET",
    url: `${BASE_URL}/references/currency/${lang}`,
  })
  const answer_1 = await request2_1.data;
  const request2_2 = await axios({
    method: "GET",
    url: `${BASE_URL}/flowers/material/list/${lang}`,
  })
  const answer_2 = await request2_2.data;
  const request2_3 = await axios({
    method: "GET",
    url: `${BASE_URL}/flowers/units/list/${lang}`,
  })
  const answer_3 = await request2_3.data;
  return {data2: answer,currency2:answer_1,material2:answer_2,units2:answer_3}
}

