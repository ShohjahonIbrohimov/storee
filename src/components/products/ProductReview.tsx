import React, {useEffect, useState} from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import TextArea from "../textarea/TextArea";
import { H3, H5} from "../Typography";
import ProductComment from "./ProductComment";
import { useFormik } from "formik";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import Cookies from "js-cookie"
import get_one_product_info from "../../../Redux/Actions/get_one_product_info";
import axios from "axios";
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "@component/Variables";
export interface ProductReviewProps {}
const ProductReview: React.FC<ProductReviewProps> = () => {
  const router = useRouter()
  let intl = useIntl()
  const [msg,setmsg] = useState("")
  const [rating_error,setrating_error] = useState("")
  const dispatch= useDispatch()

  const handleFormSubmit = async (values, { resetForm }) => {
    const {keyword} = router.query;
    const token = Cookies.get("token") || "adfasds"
    const lang = Cookies.get("lang")|| "uz"
    const formData = new FormData()
    formData.append("keyword",keyword.toString())
    formData.append("ball",values.rating)
    formData.append("comment",values.comment)
    let logged_in = Cookies.get("isLoggedIn")

    setrating_error("")
    setmsg("")
    if(!values?.rating){
      setrating_error(intl.formatMessage({id:"rating_required"}))
    }
    else if(!values?.comment){
      setmsg(intl.formatMessage({id:"text_required"}))
      }
    else if(logged_in === "true"){
      axios({
        method:"POST",
        url:`${BASE_URL}/flowers/rate/${lang}`,
        headers:{
          "Authorization":"Bearer " + token
        },
        data:formData
      })
          .then(response=>{
            if(response.data.errors){
              setmsg(intl.formatMessage({id:"error_booking"}))
            }
            else{
              axios(`${BASE_URL}/flowers/show/${keyword}/${lang}`)
                  .then(response=>{
                    dispatch(get_one_product_info(response.data))
                  })
              setmsg(intl.formatMessage({id:"add_comment_success"}))
              setTimeout(() => {
                setmsg("")
              }, 2000);
              resetForm();
            }
          })
    }
    else{
      setmsg("Iltimos komment yozish saytdan ro'yhatdan o'ting")
    }

  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: handleFormSubmit,
  });
  let [reviews,setreviews] = useState({data:[]})
  // const info = useSelector((state:any)=>state.new.one_product_info)
  useEffect(()=>{
    axios({
      method:"GET",
      url:`${BASE_URL}/flowers/rating-list/${router.query.keyword}`
    })
        .then(res=>{
          console.log(res.data)
          setreviews(res.data)
        })
        .catch(()=>null)
  },[])
  return (
    <Box>
      {reviews?.data?.map((rating,ind) => {
        return <ProductComment
            id={ind}
            key={rating.id}
            imgUrl={rating.userAvatar}
            date={rating.date}
            name={rating?.userFio}
            rating={rating.ball}
            comment={rating.comment}
            extended={rating?.extend}
            reviews={reviews}
            setreviews={(e)=>setreviews(e)}
        />
      })}

      <H3 fontWeight="700" mt="5px" mb="20">
        <FormattedMessage
            id="write_review"
            defaultMessage="Izoh qoldiring"
        />

      </H3>

      <form onSubmit={handleSubmit}>
        <Box mb="20px">
          <FlexBox mb="12px">
            <div style={{fontWeight:"bolder"}}>
                 <FormattedMessage
                  id="Your Rating"
                  defaultMessage="Your Rating"
                 />
              </div>

            <H5 color="error.main">*</H5>
          </FlexBox>
          
          <Rating
            outof={5}
            color="warn"
            size="medium"
            readonly={false}
            value={values.rating || 0}
            onChange={(value) => setFieldValue("rating", value)}
          
          />
          {rating_error === "" ? "" : <div
              style=
                  {{
                    color:"red",
                    fontSize:"small"
                  }}
          >
            {rating_error}
          </div> }
        </Box>
        
        <Box mb="24px">
          <FlexBox mb="12px">
              <div style={{fontWeight:"bolder"}}>
                 <FormattedMessage
                   id="Your Review"
                  defaultMessage="Sizning izohingiz"
                 />
              </div>
            <H5 color="error.main">*</H5>
          </FlexBox>
          
          <TextArea
            name="comment"
            placeholder={intl.formatMessage({id:"review_placeholder"})}
            fullwidth
            rows={8}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment || ""}
            // errorText={touched.comment && errors.comment}
          />
          {msg === "" ? "" : <div
              style=
                  {{
                    color:"red",
                    fontSize:"small"
                  }}
          >
            {msg}
          </div> }
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
        >
          <FormattedMessage
              id="submit"
              defaultMessage="Saqlash"
          />
        </Button>
      </form>
    </Box>
  );
};

const initialValues = {
  rating: "",
  comment: "",
  date: new Date().toISOString(),
};


export default ProductReview;
