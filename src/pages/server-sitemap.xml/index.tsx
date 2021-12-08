import { BASE_URL } from "@component/Variables";
import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps= async(ctx) =>{
    let fields = []
    /*
        Category Sitemap
    */
    let categories = await axios({
        url:`${BASE_URL}/sitemap/category-list`,
        method:"GET"
    })
    let category_field = categories.data.map(one=>({
        loc:`https://dana.uz/${one.keyword}/page/1`,
        lastmod:new Date().toISOString()
    }))
    


    /*
        Flowers Sitemap
    */
    let flowers = await axios({
        url:`${BASE_URL}/sitemap/flowers-list`,
        method:"GET"
    })
    
    let flowers_field = flowers.data.map(one=>({
        loc:`https://dana.uz/${one.categoryKeyword}/${one.flowerKeyword}`,
        lastmod:new Date().toISOString()
    }))



    /*
        Shops Sitemap
    */
        let shops = await axios({
            url:`${BASE_URL}/sitemap/shops-list`,
            method:"GET"
        })
        
        let shops_field = shops.data.map(one=>({
            loc:`https://dana.uz/shop/${one.keyword}/page/1`,
            lastmod:new Date().toISOString()
        }))

    /*
        Footer Sitemap
    */
    let footer = await axios({
            url:`${BASE_URL}/sitemap/help-list`,
            method:"GET"
        })
    
    let footer_things = footer.data.map(one=>one?.type !== 3
        ?
            {
                loc:`https://dana.uz/company/${one.keyword}`,
                lastmod:new Date().toISOString()
            }
        :
            {
                loc:`https://dana.uz/faq`,
                lastmod:new Date().toISOString()
            }
    )

    
    
    fields = [...category_field,...flowers_field,...shops_field,...footer_things]
    return getServerSideSitemap(ctx,fields)
}

export default function Site(){}