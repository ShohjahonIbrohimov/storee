import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
import Topbar from "@component/topbar/Topbar";
import Head from "next/head";
import React, {useEffect, useState,useCallback} from "react";
import StyledAppLayout from "./AppLayoutStyle";
import Navbar from "@component/navbar/Navbar";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
  description?:string;
  keyword?:string;
};

const AppLayout: React.FC<Props> = ({
  children,
  navbar,
  description,
  keyword,
  title = "Dana.uz"
}) => {
  let router = useRouter()
  let lang = router.locale
    let [y,setY] = useState(0)
    let [up,setup] = useState(true)
    const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setup(true)
      } else if (y < window.scrollY) {
        setup(false)
      }
      // if(window.pageYOffset===0){
      //     setup(false)
      // }
      setY(window.scrollY);
    },
    [y]
  );
    useEffect(()=>{
      setY(window.scrollY);
      window.addEventListener("scroll", handleNavigation);
      return ()=>{
        window.removeEventListener("scroll", handleNavigation);
    }},[handleNavigation])
    return(<StyledAppLayout>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta name="description" lang={lang} content={description}></meta>
            <meta name="keywords" lang={lang} content={keyword}></meta>
        </Head>
        <Sticky fixedOn={0}>
            <>
                <Topbar/>
                <Header/>
                {up ? <Navbar navListOpen={false} /> : ""}
            </>
        </Sticky>

        {navbar && <div className="section-after-sticky">{navbar}</div>}
        {!navbar ? (
            <div className="section-after-sticky">{children}</div>
        ) : (
            children
        )}

        <MobileNavigationBar/>
        <Footer/>
    </StyledAppLayout>
    )
};

export default AppLayout;
