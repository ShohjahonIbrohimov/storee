
import {useIntl} from "react-intl";
import cookies from "next-cookies";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetch_user_info} from "../../Redux/Actions/Action";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import AppLayout from "@component/layout/AppLayout";
import { BASE_URL } from "@component/Variables";
import { NextSeo } from "next-seo";

const AboutPage = ({data}) => {
    let dispatch = useDispatch()
    let intl = useIntl()
    dispatch(fetch_user_info(data))
    return (
        <AppLayout title={intl.formatMessage({id:"footer_header_link1"})}>
            <NextSeo
                title={intl.formatMessage({id:"footer_header_link1"})}
                description={intl.formatMessage({id:"footer_header_link1"})}
                additionalMetaTags={[{
                name: 'keyword',
                content: intl.formatMessage({id:"footer_header_link1"})
            }, ]}
            />
              <div style={{marginTop:"50px",marginBottom:"50px"}}>
                <div  style={{color:"#f7961"}}>
                    <CategorySectionCreator
                    iconName="office"
                    title={intl.formatMessage({id:"footer_header_link1"})}
                    >
                    <Card1>
                            <Grid style={{padding:"30px"}}>
        
                            </Grid>
                    </Card1>
                    </CategorySectionCreator>
                </div>
            </div>
        </AppLayout>
    )
};

AboutPage.getInitialProps = async (ctx) =>  {
    let {token,lang} = cookies(ctx)
    console.log("Token:",token)
    const request2 = await axios({
        method:"GET",
        url:`${BASE_URL}/profile/max-value/${lang}`,
        headers:{
            "Authorization":`Bearer ${token} `
        },
    })
    const answer = await request2.data;



  return {data:answer}
}
export default AboutPage;
