import React, { ReactNode } from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import AppLayout from "./AppLayout";
import CustomerDashboardNavigation from "./CustomerDashboardNavigation";
type Props = {
  title?: string;
  description?:string;
  keyword?:string;
  children?:ReactNode
};
const CustomerDashboardLayout: React.FC<Props> = ({ title,description,keyword,children }) => (
  <AppLayout title={title} description={description} keyword={keyword} >
    <Container my="2rem">
      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            <CustomerDashboardNavigation />
        </Hidden>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default CustomerDashboardLayout;
