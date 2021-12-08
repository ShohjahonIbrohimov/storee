import React from "react";
import FlexBox from "../components/FlexBox";
import Login2 from "../components/sessions/register_component";
import { useIntl } from "react-intl";
import { NextSeo } from "next-seo";
const Register = () => {
  let intl = useIntl()
  return (
    <>
      <NextSeo
        title={intl.formatMessage({id:"register"})}
        description={intl.formatMessage({id:"register"})}
        additionalMetaTags={[{
          name: 'keyword',
          content: intl.formatMessage({id:"register"})
        }, 
      ]}
      />
      <div
      className="bg-white"
      style={{backgroundImage:"url('/assets/images/new/0aa4.jpg')",backgroundSize:"100% 100%",paddingLeft:"25px",paddingRight:"25px"}}
      >
          <FlexBox
              minHeight="100vh"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
          >
              <Login2 />
        </FlexBox>
      </div>
    </>
    
  );
};

export default Register;