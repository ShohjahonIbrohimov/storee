import Card from "@component/Card";
import { Span } from "@component/Typography";
import Link from "next/link";
import React, {useCallback, useEffect, useState} from "react";
import Box from "../Box";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";
import "bootstrap/dist/css/bootstrap.min.css"
import useWindowSize from "@hook/useWindowSize";
import { useRouter } from "next/router";
import {useIntl} from "react-intl";

export interface SearchBoxProps {}

const   SearchBox: React.FC<SearchBoxProps> = () => {
  const size = useWindowSize()
  const router = useRouter()
  const [search2,setsearch2] = useState("")
  const [resultList, setResultList] = useState([]);
  let intl = useIntl()
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(search2 === ""){
      return;
    }
    else{
      router.push(`/product/search/${search2}/page/1`)
    }
  }
  const handleSubmit2 = ()=>{
    if(search2 === ""){
      return;
    }
    else{
      router.push(`/product/search/${search2}/page/1`)
    }
  }
  const hanldeSearch = useCallback((event) => {
    event.preventDefault();
    setsearch2(event.target.value)

  }, []);
  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box position="relative" flex="1 1 0" minWidth="150px" mx="auto" style={{width:'100%'}}>
      <StyledSearchBox>
        {size<901
        ?
            <>
             
             <form style={{width:"100%"}} method="GET" onSubmit={handleSubmit}>
               <input
                   required={true}
                   className="form-control border-none form-control-shadow-danger"
                   placeholder={intl.formatMessage({id:"search"})}
                   style={{paddingLeft:'40px', paddingRight:'10px',width:"100%",border:"1px solid lavender",color:"black"}}
                   onChange={hanldeSearch}
               />          
             </form>
            </>
        :
            <>

              <form className="search_header_field" onSubmit={handleSubmit}>
                <TextField
                    className="form-control"
                    placeholder={intl.formatMessage({id:"search"})}
                    fullwidth
                    required={true}
                    style=
                      {{
                        paddingLeft:'10px',
                        borderRadius:'0px',
                        margin:"0px",
                        height:"40px",
                        paddingRight:"5px",
                        borderTopLeftRadius:"5px",
                        borderBottomLeftRadius:"5px"
                      }}
                    onChange={hanldeSearch}
                />
              </form>
              <div
                  onClick={handleSubmit2}
                  className="search-icon"
                  style=
                      {{
                        height:"40px",
                        width:"40px",
                        borderTopRightRadius:"5px",
                        borderBottomRightRadius:"5px",
                        backgroundColor:'#ae99d2',
                        position:"relative",
                        cursor:"pointer"
                      }}
              >
                <Icon  size="18px" style={{position:"absolute",top:"25%",left:"25%"}}>
                  search
                </Icon>
              </div>

            </>
        }

      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};


export default SearchBox;

