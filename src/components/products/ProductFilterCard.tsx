import React from "react";
// import Accordion from "../accordion/Accordion";
// import AccordionHeader from "../accordion/AccordionHeader";
// import Avatar from "../avatar/Avatar";
import Card from "../Card";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
// import Rating from "../rating/Rating";
import TextField from "../text-field/TextField";
import { H5, H6 } from "../Typography";
import {useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
const ProductFilterCard = () => {
    let categories = useSelector((state:any)=>state.new.category)
  return (
    <Card p="18px 27px" elevation={5}>

      <H6 mb="16px">Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number"  fullwidth />
        <H5 color="text.muted" px="0.5rem">
          -
        </H5>
        <TextField placeholder="250" type="number"   fullwidth />
      </FlexBox>

      <Divider my="24px" />

      <H6 mb="16px">Categories</H6>
      {categories.map((item) => (
          <>
              <label className="form-check-label" htmlFor={item.id} key={item.id}>
                  <input
                      type="radio"
                      className="form-check-input"
                      id={item.id}
                      name="categories"
                      value={item.id}

                  />
                  {item.title}

              </label><br/>
          </>
      ))}

      <Divider my="24px" />
    </Card>
  );
};


export default ProductFilterCard;
