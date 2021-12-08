
import React, {useEffect, useState} from "react";
import Container from "../Container";
import FlexBox from "../FlexBox";
import StyledNavbar from "./NavbarStyle";
import { useSelector} from "react-redux";
import { ExpandMoreOutlined } from "@material-ui/icons";
export interface NavbarProps {
  navListOpen?: false;
}
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css"
import useWindowSize from "@hook/useWindowSize";

const Navbar: React.FC<NavbarProps> = () => {
  const categories = useSelector((state: any) => state.new.category);
  const loading = useSelector((state: any) => state.new.category_loading);
  const [megamenu, setmegamenu] = useState(false)
  const [child,setchilds] = useState({ads_image:"",children:[]})
  const [main_category,setcategory] = useState(1)
  const width = useWindowSize()
  let category_title_style
  let title = 22 - categories.length
  let title_small = title - 2
  let x =  categories.filter(category=>main_category  === category.id ? category : "")
  let category_image_style
  if(x[0]?.children.length % 2 ===1 ){
      category_image_style=
          {
            maxWidth:"219px !important",
            borderRight:"1px solid lavender",
            paddingRight:"9px",
            paddingLeft:"12px",
            paddingTop:"13px",
            paddingBottom:"11px",
          }
  }
  else{
        category_image_style=
          {
            maxWidth:"219px !important",
            borderRight:"1px solid lavender",
            paddingRight:"9px",
            paddingLeft:"12px",
            paddingTop:"13px",
            paddingBottom:"11px",
            backgroundColor:"rgba(246,249,252,255)",
          }
  }
  if(width  > 1250)
  {
    category_title_style = {
        paddingRight: '15px',
        margin: "0px",
        marginRight: "0px",
        marginLeft: "-17px",
        textDecoration: "none",
        fontWeight: "normal",
        textTransform: "uppercase",
        fontSize: title + "px",
        objectFit:"contain"
      }
    
  }
  else{
    category_title_style = {
      paddingRight: '15px',
      margin: "0px",
      marginRight: "5px",
      marginLeft: "-17px",
      textDecoration: "none",
      fontWeight: "normal",
      textTransform: "uppercase",
      fontSize: title_small + "px",
      objectFit:"contain"
    }
  }
  useEffect(()=>{
    megamenu ? setchilds( x.length !== 0 ? x[0] : []) : ""
  },[main_category])
  const renderNestedNav = () => {
    return (<Container
            justifyContent="space-around"
            className="w-100"> 
            <div style={{bottom: "6px",width:"100%"}} className="d-flex justify-content-around text-wrap overflow-hidden w-100">
              {loading ? "" : categories.map((nav) => {

                return (
                    <div
                        onClick={
                          () =>
                          {
                              if(main_category !== parseInt(nav.id)){
                                    setmegamenu(true);
                                    setcategory(nav.id)
                              }
                              else {
                                 setmegamenu(!megamenu)
                                 setcategory(undefined)
                              }
                          }
                        }

                        onBlur={() =>{ setmegamenu(false);setcategory(undefined)}}
                        className={main_category === nav.id  ? 'nav-link text-secondary bg-white' : 'nav-link text-secondary fw-bold'}
                        style={category_title_style}
                        color="text.muted"
                        key={nav.keyword}
                    >
                      {nav.title}<ExpandMoreOutlined style={{fontSize:"10px"}} />
                    </div>
              );
            })}
          </div > 
        </Container>)
  };
  return (
    <StyledNavbar>
        <FlexBox style={{marginBottom:"20px",backgroundColor:"rgba(246,249,252,255)"}}>{renderNestedNav()}</FlexBox>
      {megamenu ?
        <Container>
      <div 
        onFocus={() => setmegamenu(megamenu)}
        onMouseEnter={() => {setmegamenu(megamenu);setcategory(main_category)}}
        onMouseLeave={() => {setmegamenu(false);setcategory(undefined)}}
        className="mainmenu"
        style={{ position: "relative" }}
      >

        <div 
          style={{
             position: "absolute", 
             width: "100%", 
             backgroundColor: "white", 
             zIndex: 100000000, 
             left: "0",
             height:"410px",
             marginTop:"-20px",
            }}
        >

          <div className="col-md-12">
            <div className="row">
              {megamenu && child && child.children?.length !==0  ?  child?.children?.map((one,ind)=>{
                  let scroll_style
                  if(one.children.length >15){
                      scroll_style={
                        borderRight:'1px solid lavender',
                        height:'410px',
                        overflowY:'scroll'
                      }
                  }
                  else{
                    scroll_style={
                      borderRight:'1px solid lavender',
                      height:'410px',
                    }
                  }

                  return one.children !== []
                      ?
                         (<>
                             <div key={ind} className="col pt-3" id="asasas12"  style={scroll_style}>

                              <h6 className="text-secondary overflow-hidden text-truncate " style={{textTransform:"uppercase"}}>{one.title}</h6>

                              {one.children.map((child,_ind)=>(
                               <Link href={`/${child.keyword}/page/1`} key={_ind}>
                                  <div
                                    className="mb-1  text-secondary"
                                    style={{
                                      textTransform:"none",
                                      cursor:"pointer",
                                      width:"100%",
                                      height:"20px",
                                      fontSize:"14px"
                                    }}
                                  >
                                    {child.title}
                                  </div>
                                </Link>
                              ))}
                             </div>
                         </>

                        )
                      :
                        (<>
                            <div className="col">
                                <h6 className="text-truncate text-wrap">{one.title}</h6>
                            </div>

                        </>)

              })
                  :""}
                <div className=" col-auto justify-content-end text-right" style={category_image_style}>
                     <img src={child?.ads_image} style={{maxWidth:"219px",height:"376px"}} />
                </div>

            </div>
          </div>
        </div>


      </div>    </Container>: ""}
    </StyledNavbar>
  );
};

export default Navbar;
