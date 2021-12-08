import React from "react";
import Box from "../Box";
import Typography from "../Typography";
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";

export interface ProductDescriptionProps {}

const ProductDescription: React.FC<ProductDescriptionProps> = () => {
  const info = useSelector((state:any)=>state.new.one_product_info)
  return (
    <Box>
      <Typography>
          <div style={{fontWeight:"bolder"}}>
              <FormattedMessage
                  id="Used Products"
                  defaultMessage="Ishlatilgan mahsulotlar"
              />
          </div><br/>
          {info?.data?.structure?.map((structur,ind)=>(<div key={ind}>{structur.materialName } : {structur.count}  {structur.unitName}</div>) )}
          <br/>
          {info?.data?.description ?
          <>
               <div style={{fontWeight:"bolder"}}>
                 <FormattedMessage
                     id="Full Description"
                 />:
              </div><br/>
              <div  style={{wordWrap:"break-word",wordBreak:"break-word"}}>
                  {info.data.description}
              </div>
          </>
              :
          ""
          }
      </Typography>
    </Box>
  );
};

export default ProductDescription;
