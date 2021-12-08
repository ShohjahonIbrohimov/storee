import React from "react";
// import { getDateDifference } from "../../utils/utils";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import { H5, H6, Paragraph, SemiSpan } from "../Typography";
import {useIntl} from "react-intl"

export interface ProductCommentProps {
  id?:any,
  name;
  imgUrl: string;
  rating: number;
  date: string;
  comment: any;
  is_shop?:boolean,
  extended?:boolean,
  reviews?:any,
  setreviews?:any
}

const ProductComment: React.FC<ProductCommentProps> = ({
  name,
  imgUrl,
  rating,
  date,
  comment,
  is_shop,
  extended,
  reviews,
  setreviews,
  id
}) => {
  let intl = useIntl()
  let handleFullcomment =()=>{
    let array = {...reviews}
    array.data[id].extend = !array.data[id].extend
    setreviews(array)
  }
  return (
   <>
       <Box mb="0px"  maxWidth="100vw">
        <FlexBox alignItems="center" mb="0.5rem">
          <Avatar size={35} src={imgUrl} />
          <Box ml="1rem">
            <H5 fontSize={is_shop  ? 13 : 15} mb="4px">{name}</H5>
            <FlexBox alignItems="center">
              <Rating value={rating} color="warn" readonly />
              <H6 fontSize={is_shop && 12} mx="10px">{rating}</H6>
              <SemiSpan fontSize={is_shop && 12}>{date}</SemiSpan>
            </FlexBox>
          </Box>
        </FlexBox>

        <Paragraph className="d-inline"  fontSize={is_shop && 12} mb="0.5rem" color="gray.700">{comment.length > 478 && !extended ? <div className="d-inline">{comment?.slice(0,478) + "..."}</div> : comment}</Paragraph>
         {comment.length > 478  ? <button onClick={()=>handleFullcomment()} className=" comments_full d-inline"> {!extended ? intl.formatMessage({id:"full"}) :intl.formatMessage({id:"less"}) }</button> : ""}
      </Box>
  </>
  );
};

export default ProductComment;
