import Accordion from "@component/accordion/Accordion";
import AccordionHeader from "@component/accordion/AccordionHeader";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Header from "@component/header/Header";
import MobileCategoryImageBox from "@component/mobile-category-nav/MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "@component/mobile-category-nav/MobileCategoryNavStyle";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Typography, { H1 } from "@component/Typography";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import {useSelector} from "react-redux";
import Image from "next/image"
import { useIntl } from "react-intl";
import { NextSeo } from "next-seo";
const MobileCategoryNav = () => {
  const categories = useSelector((state:any)=>state.new.category)
  const category = null;
  let intl = useIntl()
  const [title,settitle] = useState(null)
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [keyword,setkeyword] = useState("");
  const handleCategoryClick = (cat) => () => {
      setSubCategoryList(cat.children);
      settitle(cat.title)
      setkeyword(cat.keyword)
  };
  useEffect(()=>{
    settitle(categories[0].title)
    setSubCategoryList(categories[0].children)
    setkeyword(categories[0].keyword)
  },[])


  return (
    <MobileCategoryNavStyle >
      <NextSeo
              title={intl.formatMessage({id:"categories"})}
              description={intl.formatMessage({id:"categories"})} 
              additionalMetaTags={[{
                name: 'keyword',
                content: intl.formatMessage({id:"categories"})
              }, ]}
      />
      <Header className="header" />
      <div className="main-category-holder">
        {categories.map((item) => (
          <Box
            className="main-category-box p-0 m-0"
            borderLeft={`${category?.keyword === item.keyword ? "3" : "0"}px solid`}
            onClick={handleCategoryClick(item)}
            key={item.title}
          >
          <Image quality={100} src={item.icon_b} width={75} height={75}  />

            <Typography
              className="ellipsis pb-2 bg-white"
              textAlign="center"
              fontSize="11px"
              lineHeight="1"
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </div>
      <Box className="container">
        {category?.menuComponent === "MegaMenu1" ? (
          subCategoryList.map((item, ind) => (
            <Fragment key={ind}>
              <Divider />
              <Accordion>
                <AccordionHeader px="0px" py="10px">
                  <Typography fontWeight="600" fontSize="15px">
                    {item.title}
                  </Typography>
                </AccordionHeader>
                <Box mb="2rem" mt="0.5rem">
                  <div className="container">
                      <div className="row ">
                        {item.subCategories?.map((item, ind) => (
                            <div key={ind} className="col-md-2 col-sm-6 col-6 col-xl-2 col-lg-1">
                              <Link href="/product/search/423423">
                                <a>
                                  <MobileCategoryImageBox {...item} />
                                </a>
                              </Link>
                            </div>
                        ))}
                      </div>
                  </div>
                </Box>
              </Accordion>
            </Fragment>
          ))
        ) : (
            <>
            <AccordionHeader px="0px" py="10px" style={{marginBottom:"10px"}}>
              <Typography fontWeight="600" fontSize="15px" style={{width:"100%",marginTop:"10px"}}>
                <H1 className="d-inline" fontSize="15px">{title}</H1>
                <div className="text-secondary" style={{float:"right",marginRight:"70px",fontWeight:"normal",fontSize:"small"}}>
                  <Link href={`/${keyword}/page/1`}>
                    View All
                  </Link>
                </div>
              </Typography>
            </AccordionHeader>
            <Box mb="2rem" mt="0.5rem" mr="5rem">
            <div className="col-sm-5 col-md-12 col-lg-12 col-xl-12">
              <div className="row ">
              {subCategoryList.map((item, ind) => (
                  <div key={ind} className="col-md-2 col-sm-4 col-6 col-xl-2 col-lg-1">
                    <Link href={`/${item.keyword}/page/1`}>
                      <a>
                        <MobileCategoryImageBox title={item.title} imgUrl={item.icon_b}  />
                      </a>
                    </Link>
                  </div>
              ))}
              </div>
            </div>
            </Box>
            </>
        )}
      </Box>
      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
};

export default MobileCategoryNav;
