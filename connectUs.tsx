import CategorySectionCreator from "@component/CategorySectionCreator";
import {Card1} from "@component/Card1";
import Grid from "@component/grid/Grid";
import React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Icon from "@component/icon/Icon";
import {useSelector} from "react-redux";
import Map_Shop from "@component/map_shop";

let ConnectUs = ()=>{
    let intl = useIntl();
    const info = useSelector((state:any)=>state.new.company_info);
    let  coordinates = []
    coordinates.push(info.coor_x || 41.31342149832057)
    coordinates.push(info.coor_y || 69.20685900365736)
    return(
    <VendorDashboardLayout>
        <div>
            <div  style={{color:"#f7961"}}>
                <CategorySectionCreator
                    title={intl.formatMessage({id:"connectUs"})}
                >
                    <Card1>
                        <Grid style={{padding:"10px"}}>
                            <FormattedMessage id="connectUsText" />
                        </Grid>
                    </Card1>
                    <div className="d-inline d-flex flex-wrap">
                        <Icon className="mt-4" color="primary">
                            map-pin-2
                        </Icon>

                        <div className="d-inline ml-2" style={{marginTop:"30px"}}> {info.address}</div>
                    </div>
                    <div className="d-inline d-flex flex-wrap">
                        <Icon className="mt-4" color="primary">
                            phone
                        </Icon>

                        <div className="d-inline ml-2" style={{marginTop:"30px"}}> {info.phone}</div>

                        <div style={{width:"95%"}} className="mt-4">
                            <Map_Shop coordinate={coordinates} />
                        </div>
                    </div>
                </CategorySectionCreator>
            </div>
        </div>
    </VendorDashboardLayout>
    )
}
export default ConnectUs;