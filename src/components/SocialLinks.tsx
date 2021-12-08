import React from "react";
import Link from "next/link"
export type SocialLinksType = {
    facebookUrl?:string,
    instagramUrl?:string,
    telegramUrl?:string,
    tiktokUrl?:string
}
let SocialLinks:React.FC<SocialLinksType>= ({
    facebookUrl,
    instagramUrl,
    telegramUrl,
    tiktokUrl
})=>{
    let images = [
      // telegramUrl &&  {
      //       imgUrl:"/assets/images/social/telegram2.png",
      //       value:"telegram",
      //       url:telegramUrl
      //   },
      //  instagramUrl && {
      //       imgUrl:"/assets/images/social/instagram.png",
      //       value:"instagram",
      //       url:instagramUrl
      //   },
      //  facebookUrl && {
      //       imgUrl:"/assets/images/social/facebook.png",
      //       value:"facebook",
      //       url:facebookUrl
      //   },
      //   tiktokUrl &&{
      //       imgUrl:"/assets/images/social/tiktok.png",
      //       value:"tiktok",
      //       url:tiktokUrl
      //   },
    ]
    instagramUrl && images.push({
        imgUrl:"/assets/images/social/instagram.png",
        value:"instagram",
        url:instagramUrl
    })
    telegramUrl && images.push({
        imgUrl:"/assets/images/social/telegram2.png",
        value:"telegram",
        url:telegramUrl
    })
    facebookUrl && images.push({
        imgUrl:"/assets/images/social/facebook.png",
        value:"facebook",
        url:facebookUrl
    })
    tiktokUrl && images.push({
        imgUrl:"/assets/images/social/tiktok.png",
        value:"tiktok",
        url:tiktokUrl
    })

    return(<div className="d-flex flex-wrap social-links">
        {images?.map(one=>
                <Link href={one?.url}>
                    <div className="p-1">
                        <img
                            className="cursor-pointer2"
                            src={one?.imgUrl}
                            width="15px"
                            height="15px"
                            alt={one?.value}
                        />
                    </div>
                </Link>

        )}
    </div>
    )
}
export default SocialLinks;