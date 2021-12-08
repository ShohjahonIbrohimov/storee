import Head from "next/head";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import React, { Fragment, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AppProvider } from "../contexts/app/AppContext";
import { GlobalStyles } from "../utils/globalStyles";
import { theme } from "../utils/theme";
import { Provider } from "react-redux";
import { store } from "../../Redux/stores";
import "../../public/category.css";
import "../../public/mixed.css";
import "../../public/loading.css";
// import "../../public/650>.css"
// import "../../public/<650.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/bootstrap.css";
import "../../public/unpkg.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-step-progress-bar/styles.css";
import "react-quill/dist/quill.snow.css";
import ScrollToTop from "react-scroll-to-top";
import ru from "../../content/compiled-locales/ru.json";
import uz from "../../content/compiled-locales/uz.json";
import k from "../../content/compiled-locales/k.json";
import en from "../../content/compiled-locales/en.json";
import { DefaultSeo } from "next-seo";
import { IntlProvider } from "react-intl";
import { YMInitializer } from "react-yandex-metrika";
import { SITE_NAME } from "@component/Variables";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }: any) => {
  let Layout = Component.layout || Fragment;
  let router = useRouter();
  //Alternative Urls for SEO
  let alternatives_locales = router.locales.filter(
    (one) => one !== router.locale
  );
  let array = [];
  alternatives_locales.map((one) => {
    array.push({
      hrefLang: one,
      href: `${SITE_NAME}${one === "uz" ? "" : "/" + one}${router.asPath}`,
    });
  });

  //Alternative Urls for SEO
  const [loading, setloading] = useState(true);
  const [banner, setbanner] = useState([]);
  const [category_products, setcategory_products] = useState([]);
  const [shop_list, setshop_list] = useState([]);
  //Language configuration
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case "ru":
        return ru;
      case "en":
        return en;
      case "k":
        return k;
      default:
        return uz;
    }
  }, [shortLocale]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <IntlProvider
          locale={shortLocale}
          messages={messages}
          onError={() => null}
        >
          <GlobalStyles />
          <YMInitializer accounts={[86371981, 86412148]} />
          <AppProvider>
            <Layout>
              <DefaultSeo
                canonical={`${SITE_NAME}${
                  router.locale === "uz" ? "" : "/" + router.locale
                }${router.asPath}`}
                languageAlternates={array}
                openGraph={{
                  locale: router.locale,
                  site_name: "<p>Dana.uz</p>",
                  url: `${SITE_NAME}${
                    router.locale === "uz" ? "" : "/" + router.locale
                  }${router.asPath}`,
                  images: [
                    {
                      url: "https://api.dana.uz/storage/about_company/1servicesK_d0kfBVUQzESAf8IuQv.png",
                      alt: "Dana.uz",
                    },
                  ],
                }}
              />
              <Component
                {...pageProps}
                loading={loading}
                setloading={(e) => setloading(e)}
                setcategory={(r) => setcategory_products(r)}
                category_products2={category_products}
                shop_list2={shop_list}
                banner2={banner}
                setbanner={(e) => setbanner(e)}
                setshop={(e) => setshop_list(e)}
              />

              <ScrollToTop id="scroll_to_top" smooth color="white" />
            </Layout>
          </AppProvider>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
