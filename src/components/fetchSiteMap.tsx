import JSZip from "jszip"
import axios from "axios"
import {saveAs} from "file-saver"
import {BASE_URL} from "@component/Variables"
let fetchSiteMap=()=>{
    let zipper = new JSZip()
    axios({
        url:`${BASE_URL}/sitemap/get-sitemap-zip`,
        method:"get",
    })
    .then(async(res)=>{
        await zipper.loadAsync(res.data).then(async(zipped)=>{
            await saveAs(zipped.files,"/")
        })
        console.log(res);
    })
    .catch(()=>null)
}
export default fetchSiteMap;