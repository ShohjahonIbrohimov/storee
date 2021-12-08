import React from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import VendorDashboardNavigation from "./VendorDashboardNavigation";
import AppLayout from "./AppLayout";
import CompanyDashboardNavigation from "./CompanyDashboardNavigation";
import { useRouter } from "next/router";



type Props = {
  title?: string;
  description?:string;
  keyword?:string;
};


const VendorDashboardLayout: React.FC<Props> = ({ title,description,keyword,children }) =>{ 
  let router = useRouter()
  let pathname = router.pathname
  console.log(pathname);
  
  return(
  <AppLayout title={title} description={description} keyword={keyword}>
    <Container my="2rem">
      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
         {pathname.startsWith("/company")  || pathname === "/faq" || pathname === "/connectUs" ? <CompanyDashboardNavigation /> :<VendorDashboardNavigation />}
        </Hidden>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
)};

export default VendorDashboardLayout;
