import AppStore from "@component/AppStore";
import Image from "@component/Image";
import Link from "next/link";
import React, {useEffect} from "react";
import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Box from "../Box";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography  from "../Typography";
import {useDispatch, useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import {FormattedMessage, useIntl} from "react-intl";
import {Facebook, Instagram, MusicNoteSharp, Telegram, YouTube} from "@material-ui/icons";
import Cookies from "js-cookie"
import axios from "axios";
import get_company_info from "../../../Redux/Actions/get_company_info";
import change_modal_status from "../../../Redux/Actions/change_modal_status";
import { BASE_URL } from "@component/Variables";
import { useRouter } from "next/router";
import Currencies from "@component/Currencies";

const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer: React.FC = () => {
  const info = useSelector((state:any)=>state.new.company_info);
  let dispatch = useDispatch()
  let router = useRouter()
  let modal = useSelector((state:any)=>state.new.modal)
  useEffect(()=>{
      let lang = router.locale;
      axios.get(`${BASE_URL}/references/about-company/${lang}`)
          .then(res=>{
              dispatch(get_company_info(res.data[0]))
          })
          .catch(()=>null)
  },[Cookies.get("lang")])
  let intl = useIntl();
  let footer = useSelector((state:any)=>state.new.footer)
  let aboutLinks = footer.about_company
  let shops = footer.shops
  let customerCareLinks = footer.services
  // const aboutLinks = [
  //     intl.formatMessage({id:"footer_header_link1_sublink1"}),
  //     intl.formatMessage({id:"footer_header_link1_sublink2"}),
  //     intl.formatMessage({id:"footer_header_link1_sublink3"}),
  //     intl.formatMessage({id:"footer_header_link1_sublink4"}),
  // ];

  // const customerCareLinks = [
  //   intl.formatMessage({id:"footer_header_link2_sublink1"}),
  //   intl.formatMessage({id:"footer_header_link2_sublink2"}),
  //   intl.formatMessage({id:"footer_header_link2_sublink3"}),
  //   intl.formatMessage({id:"footer_header_link2_sublink4"}),
  //   intl.formatMessage({id:"footer_header_link2_sublink5"}),
  // ];

  return (
    <footer style={{bottom:"0px"}}>
      <Box
          bg="#f8cbdf"
          id="footer_container"
      >
        <Container
            p="1rem"
            color="white"

        >
          <Box
              py="3rem"
              px="0rem"
              style={{
                paddingTop:"40px",
                paddingBottom:"50px"
              }}
              overflow="hidden"
          >
            <Grid
                container
                spacing={0}
                id="footer_main_container"
                justifyContent="between"
            >
              <Grid
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  xs={12}
                  className="mb-4 mb-sm-4 mb-md-0 mb-lg-0 mb-xl-0"
              >
                <Link href="/">
                  <a>
                    <Image
                      mb="0.5rem"
                      src={info.logo}
                      alt="logo"
                      className="logo_image"
                      width={200}
                      height={40}
                    />
                  </a>
                </Link>
                 <Typography
                    style={{fontSize:"12px"}}
                    className="text-secondary"
                    py="0.3rem"
                >
                  {info.email}
                </Typography>
                <Typography
                    className="text-secondary"
                    py="0.3rem"
                    mb="1rem"
                    style={{fontSize:"12px",width:"300px"}}
                >
                  <FormattedMessage
                      id="phone_number"
                  />
                  :
                  {info.phone}
                </Typography>


                <AppStore  />
              </Grid>


                  <Grid
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  xs={12}
                  id="footer_navigatgion_header"

              >
                <Typography
                  fontSize="20px"
                  fontWeight="600"
                  mb="0.5rem"
                  lineHeight="1"
                  className="text-secondary"
                  id="footer_header_text"
                >
                  <FormattedMessage
                      id="social_links"
                  />

                </Typography>

                <div>
                    <StyledLink href={info?.telegram} className=" text-secondary"><Telegram /> Telegram</StyledLink>
                    <StyledLink href={info?.facebook} className=" text-secondary"><Facebook /> Facebook</StyledLink>
                    <StyledLink href={info?.youtube} className="text-secondary"><YouTube /> YouTube</StyledLink>
                    <StyledLink href={info?.instagram}  className="text-secondary"><Instagram /> Instagram</StyledLink>
                    <StyledLink href={info?.tiktok}  className="text-secondary"><MusicNoteSharp /> TikTok</StyledLink>
                </div>
              </Grid>


              <Grid
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  xs={12}
                  id="footer_navigatgion_header"
                  className=" mb-4 mb-sm-4 mb-md-0 mb-lg-0 mb-xl-0 mt-3 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0"
              >
                <Typography
                  fontSize="20px"
                  fontWeight="600"
                  mb="0.5rem"
                  lineHeight="1"
                  className="text-secondary"
                  id="footer_header_text"
                >
                   <FormattedMessage
                       id="footer_header_link1"
                       defaultMessage="Biz haqimizda"
                   />
                </Typography>

                <div>
                  {aboutLinks?.map((item, ind) => (
                    <Link href={parseInt(item.type) === 3 ? "/faq" : `/company/${item.keyword}`} key={ind} >
                      <StyledLink
                          className="text-secondary"
                      >
                        {item.name}
                      </StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  xs={12}
                  id="footer_navigatgion_header"
                  className="float-right mb-4 mb-sm-4 mb-md-0 mb-lg-0 mb-xl-0 mr-0"
              >
                <Typography
                  fontSize="20px"
                  fontWeight="600"
                  mb="0.5rem"
                  lineHeight="1"
                  className="text-secondary"
                  id="footer_header_text"
                >
                  <FormattedMessage
                   id="footer_header_link3"
                   defaultMessage="Magazinlar"
                  />
                </Typography>
                {shops?.map(one=>{
                  return <Link href={`/shop/${one.keyword}/page/1`} key={one.id}>
                    <StyledLink
                          className="text-secondary"

                          >
                            {one.name}
                    </StyledLink>
                    </Link>
                })}
                
               
               
              </Grid>

              <Grid
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  xs={12}
                  id="footer_navigatgion_header"
                  className="mr-lg-0 mr-md-0 mr-xl-0 mr-sm-0 mr-0  mb-4 mb-sm-4 mb-md-0 mb-lg-0 mb-xl-0"
              >
                <Typography
                  fontSize="20px"
                  fontWeight="600"
                  mb="0.5rem"
                  id="footer_header_text"
                  lineHeight="1"
                  className="text-secondary"

                >
                  <FormattedMessage
                      id="footer_header_link2"
                  />

                </Typography>

                <div>

                    <Link
                        href="/help"

                    >
                        <StyledLink className="text-secondary" >
                            {intl.formatMessage({id:"need_help"})}
                        </StyledLink>
                    </Link>

                  {customerCareLinks?.map((item, ind) => (
                    <Link href={`/company/${item.keyword}`} key={ind}>
                      <StyledLink
                          className="text-secondary"
                      >
                        {item.name}
                      </StyledLink>
                    </Link>
                  ))}
                    <Link
                        href="/corporate"

                    >
                        <StyledLink className="text-secondary" >
                            {intl.formatMessage({id:"Corparative Sales"})}
                        </StyledLink>
                    </Link>
                  <StyledLink
                      onClick={()=>dispatch(change_modal_status(!modal))}
                      className="text-secondary"
                  >
                      {intl.formatMessage({id: "order_status"})}
                  </StyledLink>

                </div>
              </Grid>
            </Grid>
          </Box>

        </Container>

        <Container
            style={{paddingBottom:"0px",paddingTop:"20px"}}
            className="mb-sm-4 mb-lg-0 mb-md-0 mb-xl-0 mb-4"
        >

          <div
              className="col-12"
              style={{
                paddingBottom:"-20px !important",
                marginTop:"-65px"
              }}
          >

            <div
                className="d-flex flex-wrap justify-content-between "
            >
              <div
                  className="text-secondary "
              >
                <FormattedMessage
                    id="all_rights"
                    defaultMessage=" © 2018-2021 Bisyor - Барча ҳуқуқлар ҳимояланган"
                />

              </div>
              <div className="text-truncate text-secondary text-left text-sm-left text-md-center text-lg-center text-xl-center" id="footer_Address">{info.address}</div>
                <Currencies />
            </div>
          </div>
        </Container>
      </Box>
    </footer>
  );
};



;

export default Footer;
