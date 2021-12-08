import Card from "@component/Card";
import { Chip } from "@component/Chip";
import HoverBox from "@component/HoverBox";
// import LazyImage from "@component/LazyImage";
import useWindowSize from "@hook/useWindowSize";
import React from "react";
export interface ProductCard6Props {
  imgUrl: string;
  s_imgUrl:string;
  title: string;
  subtitle: string;
}

const ProductCard6: React.FC<ProductCard6Props> = ({
  title,
  imgUrl,
  s_imgUrl
}) => {
  const size = useWindowSize();  
  let product_style;
  let title_style;
  if(size < 650 ){
    product_style = {
      borderRadius:"120px",
      // width:"60px",
      // height:"60px",
    }
    title_style={
      color:"black",
      textAlign:"center",
      fontSize:"10px",
      wordBreak: "keep-all",
      wordWrap:"inherit",
      overflow:"hidden",
      textOverflow:"ellipsis",
    }
  }
  else{
    product_style = {
      borderRadius:"120px",
    }
    title_style = {
      color:"black",
      textAlign:"center",
      fontSize:"13px",
    }
  }
  return (
    <Card 
      position="relative" 
      style={{marginLeft:"20px",marginTop:"",cursor:"pointer",}}  
      className='d-flex flex-column align-items-center bg-transparent shadow-none height-fit'
      >
        <HoverBox position="relative" style={product_style} >
        {/* <LazyLoadImage
              src={size < 750 ? s_imgUrl : imgUrl}
              alt={title}
              className="category_image"
              visibleByDefault={false}
              threshold={-50}
              effect="blur"
              placeholderSrc=""
            /> */}
        <img
          className="category_image"
          // quality={100}
          src={size < 750 ? s_imgUrl : imgUrl}
          // layout="fill"
          alt={title}
          // objectFit="cover"
        />
      </HoverBox>
      <div style={{textAlign:"center"}}><Chip
        style={title_style}
        color="white"
        fontWeight="600"
        p="7px 10px"
        top="6.375rem"
        left="1.5rem"
        zIndex={2}
        className="text-wrap font-weight-normal"

      >
        {title}
      </Chip></div>


    </Card>
  );
};

export default ProductCard6;
