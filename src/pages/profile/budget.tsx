import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import {fetch_user_info} from "../../../Redux/Actions/Action";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import cookies from "next-cookies"
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography, {Small} from "@component/Typography";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Button from "@component/buttons/Button";
// import IconButton from '@material-ui/core/IconButton';
// import {Tooltip} from "@material-ui/core";
// import {Info} from "@material-ui/icons"
import {useIntl} from "react-intl";
import {FormattedMessage} from "react-intl";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";
import { DataGrid } from '@mui/x-data-grid';
import {Dialog,DialogTitle} from "@mui/material";
import Balance from "@component/Balance";
import Cookies from "js-cookie"


const Budget = ({data}) => {
  let intl = useIntl()
  const user = useSelector((state:any)=>state.token.user)
  let [open2,setopen2] = useState(false)
  let [paymentHistory,setpaymentHistory] = useState([])
  /* DataGrid*/
  let lang = useSelector((state:any)=>state.new.lang)
  let token = Cookies.get("token")
    useEffect(()=>{
        axios({
            method:"GET",
            url:`${BASE_URL}/profile/payment-history/${lang}`,
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
            .then((res)=>{
                setpaymentHistory(res.data)
            })
            .catch(()=>null)
    },[])
const columns = [
  {
    field:"id",
    headerName:"№",
    headerClassName:"budget_class",
    width: 50,
    // headerAlign: 'center',
    editable: false
  },
  {
    field:"datePay",
    headerName: intl.formatMessage({id:"date"}),
    width: 200,
    headerClassName:"budget_class",
    editable: false,
    // headerAlign: 'center',
  },
  {
        field: "amount",
        headerName: intl.formatMessage({id:"Amount"}),
        width: 190,
        editable: false,
        // headerAlign: 'center',
  },
  {
        field: "status",
        headerName: intl.formatMessage({id:"Status"}),
        headerClassName:"budget_class",
        width:200,
        editable: false,
        // headerAlign: 'center',
  },
  {
      field: "psystem",
      headerName:intl.formatMessage({id:"Type"}),
      headerClassName:"budget_class",
      width: 200,
      // headerAlign: 'center',
      editable: false
  },

  // {
  //   field:"datePay",
  //   headerName: intl.formatMessage({id:"Validity Period"}),
  //   width: width<650 ? 170 :220,
  //   editable: false,
  // },

];


  const dispatch = useDispatch()
  dispatch(fetch_user_info(data))



  return (
    <DashboardLayout title={intl.formatMessage({id:"hisob",defaultMessage:"Mening Hisobim"})}>
      <NextSeo
        title={intl.formatMessage({id:"Mening Hisobim"})}
      />
    <div>
      <div >
          <DashboardPageHeader
              iconName="money-transfer"
              title={intl.formatMessage({id:"hisob",defaultMessage:"Mening Hisobim"})}

          />
      </div>

             <Box mb="30px" >
                <Grid container spacing={6}>
                  <Grid item lg={5} md={5} sm={12} xs={12} style={{position:"relative"}}>
                    <FlexBox as={Card} p="14px 14px" height="100%" alignItems="center">
                      <Box ml="0px" flex="1 1 0">
                        <FlexBox
                          flexWrap="wrap"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <div >
                            <FlexBox alignItems="center">
                              <Typography fontSize="25px">
                                  <FormattedMessage
                                    id="budget"
                                    defaultMessage="Balans"
                                  />:
                              </Typography>
                              <Typography ml="4px" fontSize="25px" color="primary.main">
                                  {user?.data?.balance ? user?.data?.balance : 0} <FormattedMessage id="sum" defaultMessage="So'm" />
                              </Typography>
                               {/*<div style={{position:"absolute",right:"20px",top:"20px"}}>*/}
                               {/*    /!*<Tooltip*!/*/}
                               {/*    /!*    title={intl.formatMessage({id:"Balance Tooltip text",defaultMessage:"Mening hisobim"})}*!/*/}
                               {/*    /!*    style={{padding:"3px",margin:"0px",fontSize:"35px !important"}}*!/*/}
                               {/*    /!*    placement="left-end"*!/*/}
                               {/*    /!*    aria-label="delete"*!/*/}
                               {/*    /!*>*!/*/}
                               {/*    /!*    <IconButton aria-label="help">*!/*/}
                               {/*    /!*        <Info />*!/*/}
                               {/*    /!*    </IconButton>*!/*/}
                               {/*    /!*</Tooltip>*!/*/}
                               {/*</div>*/}
                            </FlexBox>
                          </div>

                        </FlexBox><br/>
                           <Grid container>
                               <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Small color="text.muted" textAlign="center">
                                   <FormattedMessage
                                    id="wallet"
                                    defaultMessage="Hamyon"
                                   /> :<br/>0 <FormattedMessage id="sum" defaultMessage="So'm" />
                                </Small>
                            </Grid>
                           <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Small color="text.muted" textAlign="center">
                                    <FormattedMessage
                                        id="bonus"
                                        defaultMessage="Bonus"
                                    /> :<br/>0 <FormattedMessage
                                        id="sum"
                                        defaultMessage="So'm"
                                    />
                                </Small>
                            </Grid>
                           <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Small color="text.muted" textAlign="center">
                                    <FormattedMessage
                                        id="cashback"
                                        defaultMessage="Kashbak"
                                    /> :<br/>0 <FormattedMessage
                                    id="sum"
                                    defaultMessage="So'm"
                                    />
                                </Small>
                            </Grid>
                           </Grid><br/>

                            <Button
                                color="primary"
                                bg="primary.light"
                                onClick={()=>setopen2(true)}
                            >
                              <FormattedMessage
                                  id="replenish"
                                  defaultMessage="Hisobni to'ldirish"
                              />
                            </Button>
                              <Dialog
                                  open={open2}
                                  onClose={()=>setopen2(false)}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                              >
                                  <DialogTitle>Subscribe</DialogTitle>
                                  <>
                                     <Balance setopen2={(e)=>setopen2(e)} />
                                  </>

                              </Dialog>

                      </Box>
                    </FlexBox>

                  </Grid>
                     <Grid item lg={12} md={12} sm={12} xs={12}>
                       <Card style={{height:"200px",width:"100%",overflowX:"hidden"}}>
                       <DataGrid
                          checkboxSelection={false}
                          rows={paymentHistory}
                          columns={columns}
                          pageSize={3}
                          // rowsPerPageOptions={[100]}
                          disableColumnFilter={true}
                          disableColumnMenu={true}
                          disableColumnSelector={true}

                        />
                       </Card>
                  </Grid>
                </Grid>

              </Box>
    </div>
    </DashboardLayout>
  );
};


export default Budget;

Budget.getInitialProps = async (ctx) =>  {
    let {token,lang} = cookies(ctx)
    const request2 = await axios({
        method:"GET",
        url:`${BASE_URL}/profile/max-value/${lang}`,
        headers:{
            "Authorization":`Bearer ${token} `
        },
    })
    const answer = await request2.data;



  return {data:answer}
}
