import "bootstrap/dist/css/bootstrap.min.css"
import DropZone from "@component/DropZone";
import Box from "@component/Box";
import React, {useState} from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {FormattedMessage, useIntl} from "react-intl";
const ContactForm = () =>{
      let intl = useIntl()
      const [photo,setphoto] = useState([])
      const handlePhotoAdd = (photos) =>{
      setphoto(prevState=>[...prevState,...photos])
      }
      const handleRemoveImage = (id,ind) =>{
        let array = [...photo];
        console.log(id)
        array.splice(ind, 1)
        setphoto(array);
      }
    return (
        <Box>
            <div>
                <div className="row ml-0 pl-0">
                    <div className="col-md-9">
                        <label>
                            <FormattedMessage
                                id="Your Message"
                                defaultMessage="Sizning smsingiz"
                            />

                        </label>
                        <br/>
                        <textarea
                            className="form-control h-99"
                            placeholder={intl.formatMessage({id:"Your message"})}
                            rows={photo.length !==0 ? 13 : 11}
                        >

                        </textarea>
                    </div>
                    <div className="col-md-3 h-100" >
                        <label>
                            <FormattedMessage
                                id="Any Document"
                                defaultMessage="Biror Dokument"
                            />
                        </label>
                        <DropZone
                            onChange={(files) => {handlePhotoAdd(files)}}
                        >
                        </DropZone><br/>
                        <div className="d-flex flex-wrap w-100">
                         {photo.map((img,ind)=>(

                                <div className="ml-3 mt-2" key={ind}>
                                    <div
                                        style=
                                            {{
                                                position:"relative",
                                                width:"50px"
                                            }}
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            width="50px"
                                            height='50px'
                                        />
                                        <div
                                            style=
                                                {{
                                                    position:"absolute",
                                                    zIndex:10000000,
                                                    top:"-10px",
                                                    left:"38px",
                                                }}
                                        >
                                            <HighlightOffIcon
                                                className="text-danger"
                                                onClick={()=>handleRemoveImage(img.id,ind)}
                                            />
                                        </div>
                                  </div>
                                </div>

                            ))}
                             </div>
                        <button className="btn btn-primary col-md-12 mt-3">
                            <FormattedMessage
                                id="submit"
                            />
                        </button>
                    </div>
                </div>
            </div>

        </Box>
    )
}
export default ContactForm;