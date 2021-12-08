
import React, {useState} from "react";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import Box from "@component/Box";
import {H2, H5} from "@component/Typography";
import FlexBox from "@component/FlexBox";
import Rating from "@component/rating/Rating";
import TextArea from "@component/textarea/TextArea";
import Button from "@component/buttons/Button";
import axios from "axios";
import Cookies from "js-cookie"
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {FormattedMessage, useIntl} from "react-intl";
import { BASE_URL } from "./Variables";
import ProductComment from "@component/products/ProductComment";
import {StyledPagination} from "@component/pagination/PaginationStyle";
import Icon from "@component/icon/Icon";

export interface ProductReviewProps {
    reviews?:any,
    ReviewPage?:any,
    setReviewPage?:any,
    setaddedstatus?:any,
    setreviews?:any
}

const Shop_Review: React.FC<ProductReviewProps> = ({
   reviews,
   ReviewPage,
   setReviewPage,
   setaddedstatus,
    setreviews,
}) => {
    const info = useSelector((state:any)=>state.new.shop)
    const [msg,setmsg] = useState("")
    let [rating_error,setrating_error] = useState("")
    let intl = useIntl()
    const router = useRouter()
    let {id} = router.query
    const handleFormSubmit = async (values, { resetForm }) => {
        let f = router.locale
        let formData = new FormData()
        formData.append("ball",values.rating)
        formData.append('message',values.comment)
        formData.append("keyword",info.data.keyword)
        const token2 = Cookies.get("token");
        const loggedin = Cookies.get("isLoggedIn")
        setrating_error("")
        setmsg("")
        if(!values?.rating){
            setrating_error(intl.formatMessage({id:"rating_required"}))
        }
        else if(!values?.comment){
            setmsg(intl.formatMessage({id:"text_required"}))
        }
        else if(loggedin === "true"){

            axios({
                method:"POST",
                url:`${BASE_URL}/shops/create-comment/en`,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${token2}`,
                },
                data:formData
            })
                .then((response)=>{
                    if(response?.data?.errors){
                        setmsg("Qandaydir xatolik sodir bo'ldi")
                    }
                    else {
                        const url = `${BASE_URL}/shops/show/${id}/${f}`
                        axios({
                            method:"GET",
                            url:url,
                        })
                            .then(()=>{
                                setaddedstatus(info.data.keyword+values.comment + values.rating)
                                setmsg(intl.formatMessage({id:"add_comment_success"}))
                                setTimeout(() => {
                                   setmsg("") 
                                }, 2000);
                            })
                            .catch(()=>{
                                setmsg("Qandaydir xatolik yuz berdi")
                            })
                        resetForm();
                    }
                })
                .catch(error=>{
                    console.log(error)
                })

        }
        else{
            setmsg("Iltimos komment yozish uchun saytdan ro'yhatdan o'ting")
        }
    };

    const {
        values,
        errors,
        touched,
        // dirty,
        // isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        // validationSchema: reviewSchema,
        onSubmit: handleFormSubmit,
    });

    return (
        <Box>
            {/* {info.data.ratingList.length !==0 ? info.data.ratingList.map((item, ind) => (
                <ProductComment
                    key={ind}
                    name={item?.userFio}
                    imgUrl={item?.userAvatar}
                    rating={item?.ball}
                    date={item?.date}
                    comment={item?.comment}


                />
            )): ""} */}
            {reviews?.data?.length !==0 ?
                <div className="p-1 mb-4">
                    {reviews?.data?.map((rating,ind) => {
                        return <ProductComment
                            id={ind}
                            key={rating.id}
                            imgUrl={rating.userAvatar}
                            date={rating.date}
                            name={rating.userFio}
                            rating={rating.ball}
                            comment={rating.comment}
                            is_shop={true}
                            extended={rating?.extend}
                            reviews={reviews}
                            setreviews = {(e)=>setreviews(e)}
                        />
                    })}
                    {reviews.last_page !== 1 ?
                        <FlexBox
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            mt="32px"
                        >
                            <StyledPagination>
                                <ReactPaginate
                                    initialPage={ReviewPage}
                                    previousLabel={
                                        <Button
                                            style={{cursor: "pointer"}}
                                            className="control-button"
                                            color="primary"
                                            overflow="hidden"
                                            height="auto"
                                            padding="6px"
                                            borderRadius="50%"
                                        >
                                            <Icon defaultcolor="currentColor" variant="small">
                                                chevron-left
                                            </Icon>
                                        </Button>

                                    }
                                    nextLabel={
                                        <Button
                                            style={{cursor: "pointer"}}
                                            className="control-button"
                                            color="primary"
                                            overflow="hidden"
                                            height="auto"
                                            padding="6px"
                                            borderRadius="50%"
                                        >
                                            <Icon defaultcolor="currentColor" variant="small">
                                                chevron-right
                                            </Icon>
                                        </Button>
                                    }
                                    breakLabel={
                                        <Icon defaultcolor="currentColor" variant="small">
                                            triple-dot
                                        </Icon>
                                    }
                                    pageCount={reviews.last_page}
                                    marginPagesDisplayed={true}
                                    pageRangeDisplayed={false}
                                    onPageChange={(r) => {
                                        setReviewPage(r.selected + 1)
                                    }
                                    }
                                    containerClassName="pagination"
                                    subContainerClassName="pages pagination"
                                    activeClassName="active"
                                    disabledClassName="disabled"
                                />
                            </StyledPagination>
                        </FlexBox>
                    :
                        ""
                    }


                </div>
                :
                ""
            }
            <H2 fontWeight="600" mt="-10px" mb="20">
                <FormattedMessage
                    id="shop_review"
                    defaultMessage="Izoh qoldiring"
                />
            </H2>

            <form onSubmit={handleSubmit}>
                <Box mb="20px">
                    <FlexBox mb="12px">
                        <H5 color="gray.700">
                            <FormattedMessage id="Your Rating" />
                        </H5>
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
                    {rating_error==="" ? "" : <div className="text-danger">{rating_error}</div>}
                </Box>

                <Box mb="24px">
                    <FlexBox mb="12px">
                        <H5 color="gray.700">
                            <FormattedMessage id="Your Review" />
                        </H5>
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
                        errorText={touched.comment && errors.comment}
                    />
                    {msg==="" ? "" : <div className="text-danger">{msg}</div>}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                >
                    <FormattedMessage
                        id="send(jonatish)"
                        defaultMessage="Jo'natish"
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


export default Shop_Review;
