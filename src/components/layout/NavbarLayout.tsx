import React from "react";
import Container from "../Container";
import AppLayout from "./AppLayout";


type Props = {
  title?: string;
  description?:string;
  keyword?:string;
};

const NavbarLayout: React.FC<Props> = ({title,description,keyword, children}) => {
  return (
    <AppLayout title={title} description={description} keyword={keyword} >
      <Container my="2rem">{children}</Container>
    </AppLayout>
  );
};

export default NavbarLayout;
