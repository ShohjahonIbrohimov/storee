import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Box from "../Box";
import Grid from "../grid/Grid";
import Stepper from "../stepper/Stepper";
import AppLayout from "./AppLayout";
import {useIntl} from "react-intl";



type Props = {
  title?: string;
  description?:string;
  keyword?:string;
};


const CheckoutNavLayout: React.FC<Props> = ({ children,title,description,keyword }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const router = useRouter();
  const { pathname } = router;
  let intl = useIntl()
  const stepperList = [
    {
      title: intl.formatMessage({id:"cart",defaultMessage:"Savatcha"}),
      disabled: true,
    },
    {
      title: intl.formatMessage({id:"Details",defaultMessage:"Details"}),
      disabled: true,
    },
    {
      title: intl.formatMessage({id:"payment"}),
      disabled: true,
    },

  ];
  const handleStepChange = (_step, ind) => {
    switch (ind) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/cart");
        break;
      case 2:
        router.push("/review");
        break;
      case 3:
        router.push("/orders");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if(pathname.startsWith("/cart")){
        setSelectedStep(1);
        setSelectedStep(2);
    }
    else if(pathname.startsWith("/review")){
      setSelectedStep(3); 
    }
        
        
  }, [pathname]);

  return (
    <AppLayout title={title} description={description} keyword={keyword} >
      <Container my="2rem">
        <Box mb="14px">
          <Grid container spacing={6}>
            <Grid item lg={12} md={12} xs={12}>
                <Stepper
                  stepperList={stepperList}
                  selectedStep={selectedStep}
                  onChange={handleStepChange}
                />
            </Grid>
          </Grid>
        </Box>
        {children}
      </Container>
    </AppLayout>
  );
};



export default CheckoutNavLayout;
