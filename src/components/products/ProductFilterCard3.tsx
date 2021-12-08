import React from "react";
// import Accordion from "../accordion/Accordion";
// import AccordionHeader from "../accordion/AccordionHeader";
// import Avatar from "../avatar/Avatar";
import Card from "../Card";
// import Divider from "../Divider";
import FlexBox from "../FlexBox";
// import Rating from "../rating/Rating";
import TextField from "../text-field/TextField";
import { H5, H6 } from "../Typography";
import {useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import {FormattedMessage} from "react-intl";
const ProductFilterCard3 = ({
        setfrom_price,
        setto_price,
        setcat_id,
    }) => {

    const categories = useSelector((state:any)=>state.new.category)

    return (
        <Card p="18px 27px" elevation={5}>

            <H6 mb="16px">
                <FormattedMessage
                    id="Price Range"
                />
            </H6>
            <FlexBox justifyContent="space-between" alignItems="center">
                <TextField
                    type="number"
                    onChange={(e)=>{setfrom_price(e.target.value);}}
                    fullwidth
                />
                <H5 color="text.muted" px="0.5rem">
                    -
                </H5>
                <TextField
                    type="number"
                    onChange={(e)=>{setto_price(e.target.value);}}
                    fullwidth
                />
            </FlexBox>

            <div className="ml-0 mt-3">
            <H6 mb="16px">

                <FormattedMessage
                    id="mobile_navigation_category"
                    defaultMessage="Kategoriyalar"
                />
            </H6>
            {categories.map((item) => (
                <>
                    <label className="form-check-label ml-4 mb-2" htmlFor={item.id} key={item.id}>
                        <input
                            onChange={(e)=>{setcat_id(e.target.value);}}
                            type="radio"
                            className="form-check-input "
                            id={item.id}
                            name="categories"
                            value={item.keyword}

                        />
                        {item.title}

                    </label><br/>
                </>
            ))}
            </div>
        </Card>
    );
};
export default ProductFilterCard3;