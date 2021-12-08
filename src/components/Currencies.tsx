import Image from "@component/Image";
import React from "react";

let Currencies = ()=>{
    return(
        <div
         className="mt-sm-2 mt-2 mt-lg-0 mt-md-0 mt-xl-0"
        >
        <div
            className="d-flex flex-wrap justify-content-lg-end justify-content-md-between justify-content-sm-center justify-content-center justify-content-xl-between mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0"
        >
            <div
                className="align-content-start width-fit-content"
                id="uzcard"

            >

                <Image
                    alt="payme"
                    src="/assets/images/payme.png"
                />
            </div>
            <div
                className="width-fit-content"
                // className="col-md-2 col-lg-2 col-sm-3 col-2 col-xl-2"
                id="uzcard"
            >
                <Image
                    alt="click"
                    src="/assets/images/click.png"
                />
            </div>
            <div
                className="width-fit-content"
                id="uzcard"
            >
                <Image
                    alt="paynet"
                    src="/assets/images/Paynet.png"
                />
            </div>
            <div
                className="width-fit-content"
                // className="col-md-2 col-lg-2 col-sm-3 col-2 col-xl-2"
                id="uzcard"
            >
                <Image
                    alt="uzcard"
                    src="/assets/images/uzcard.png"

                />
            </div>
            <div
                className="width-fit-content"
                // className="col-md-2 col-lg-2 col-sm-3 col-2 col-xl-2"
                id="uzcard"
            >
                <Image
                    alt="uzcard"
                    src="/assets/images/apelsin.png"

                />
            </div>
            <div
                className="width-fit-content"
                // className="col-md-2 col-lg-2 col-sm-3 col-2 col-xl-2"
                id="uzcard"
            >
                <Image
                    alt="oson"
                    src="/assets/images/oson.png"

                />
            </div>
        </div>
    </div>
            )
}
export default Currencies;